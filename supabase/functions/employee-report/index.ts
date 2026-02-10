import postgres from "npm:postgres@3.4.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const employeeId = url.searchParams.get("employee_id");

  if (!employeeId) {
    return new Response(JSON.stringify({ error: "employee_id is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const connectionString = Deno.env.get("SPECTRE_DB_URL")!;
  const sql = postgres(connectionString, { prepare: false });

  try {
    const rows = await sql`
      SELECT report_json FROM spectre.employee_reports WHERE id = ${employeeId} LIMIT 1
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Report not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ report_json: rows[0].report_json }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("DB query error:", err);
    return new Response(JSON.stringify({ error: "Database error", details: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } finally {
    await sql.end();
  }
});
