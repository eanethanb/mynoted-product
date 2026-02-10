import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const employeeId = url.searchParams.get("employee_id");

    if (!employeeId) {
      return new Response(
        JSON.stringify({ error: "employee_id query param is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dbUrl = Deno.env.get("SPECTRE_DB_URL");
    if (!dbUrl) {
      return new Response(
        JSON.stringify({ error: "Database not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { default: postgres } = await import("npm:postgres@3.4.5");
    const sql = postgres(dbUrl, { ssl: "require" });

    try {
      const rows = await sql`
        SELECT run_id, employee_id, report_json, report_type, created_at
        FROM spectre.employee_reports
        WHERE employee_id = ${employeeId}::uuid
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        return new Response(
          JSON.stringify({ error: "No report found for this employee" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(JSON.stringify(rows[0]), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } finally {
      await sql.end();
    }
  } catch (err) {
    console.error("health-check error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
