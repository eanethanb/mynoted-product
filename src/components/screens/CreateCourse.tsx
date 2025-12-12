import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical, FileText, Upload, MessageSquare, Sparkles } from 'lucide-react';
import PaywallModal from '@/components/PaywallModal';
import Disclaimer from '@/components/Disclaimer';

interface Topic {
  id: string;
  name: string;
  subtopics: string[];
}

const CreateCourse = () => {
  const [showPaywall, setShowPaywall] = useState(false);
  
  // Manual course state
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [manualCoursesCreated, setManualCoursesCreated] = useState(0);
  const [manualTopicsCreated, setManualTopicsCreated] = useState(0);

  // JD-based state
  const [jdText, setJdText] = useState('');
  const [jdUploads, setJdUploads] = useState(0);
  const [extractedJdTopics, setExtractedJdTopics] = useState<string[]>([]);
  const [selectedJdTopics, setSelectedJdTopics] = useState<string[]>([]);

  // Manager feedback state
  const [feedbackText, setFeedbackText] = useState('');
  const [managerGoals, setManagerGoals] = useState('');
  const [feedbackSessions, setFeedbackSessions] = useState(0);
  const [extractedFeedbackTopics, setExtractedFeedbackTopics] = useState<string[]>([]);
  const [selectedFeedbackTopics, setSelectedFeedbackTopics] = useState<string[]>([]);

  const addTopic = () => {
    if (manualTopicsCreated >= 1) {
      setShowPaywall(true);
      return;
    }
    const newTopic: Topic = {
      id: Date.now().toString(),
      name: '',
      subtopics: [],
    };
    setTopics([...topics, newTopic]);
    setManualTopicsCreated((prev) => prev + 1);
  };

  const updateTopicName = (id: string, name: string) => {
    setTopics(topics.map((t) => (t.id === id ? { ...t, name } : t)));
  };

  const addSubtopic = (topicId: string) => {
    setTopics(
      topics.map((t) =>
        t.id === topicId ? { ...t, subtopics: [...t.subtopics, ''] } : t
      )
    );
  };

  const updateSubtopic = (topicId: string, index: number, value: string) => {
    setTopics(
      topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subtopics: t.subtopics.map((s, i) => (i === index ? value : s)),
            }
          : t
      )
    );
  };

  const removeTopic = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  const handleCreateManualCourse = () => {
    if (manualCoursesCreated >= 1) {
      setShowPaywall(true);
      return;
    }
    setManualCoursesCreated((prev) => prev + 1);
    // Reset form
    setCourseName('');
    setCourseDescription('');
    setTopics([]);
  };

  const handleExtractFromJD = () => {
    if (jdUploads >= 1) {
      setShowPaywall(true);
      return;
    }
    setJdUploads((prev) => prev + 1);
    // Simulate AI extraction
    setExtractedJdTopics([
      'Strategic Planning & Business Development',
      'P&L Management',
      'Team Leadership & Scaling',
      'Cross-functional Collaboration',
      'Stakeholder Communication',
      'Data-Driven Decision Making',
    ]);
  };

  const handleGenerateJdCourse = () => {
    if (selectedJdTopics.length > 3) {
      setShowPaywall(true);
      return;
    }
    // Generate course logic
  };

  const toggleJdTopic = (topic: string) => {
    if (selectedJdTopics.includes(topic)) {
      setSelectedJdTopics(selectedJdTopics.filter((t) => t !== topic));
    } else {
      if (selectedJdTopics.length >= 3) {
        setShowPaywall(true);
        return;
      }
      setSelectedJdTopics([...selectedJdTopics, topic]);
    }
  };

  const handleExtractFromFeedback = () => {
    if (feedbackSessions >= 1) {
      setShowPaywall(true);
      return;
    }
    setFeedbackSessions((prev) => prev + 1);
    // Simulate AI extraction
    setExtractedFeedbackTopics([
      'Executive Presence & Communication',
      'Strategic Thinking',
      'Delegation & Empowerment',
      'Conflict Resolution',
      'Influence Without Authority',
      'Change Management',
    ]);
  };

  const toggleFeedbackTopic = (topic: string) => {
    if (selectedFeedbackTopics.includes(topic)) {
      setSelectedFeedbackTopics(selectedFeedbackTopics.filter((t) => t !== topic));
    } else {
      if (selectedFeedbackTopics.length >= 3) {
        setShowPaywall(true);
        return;
      }
      setSelectedFeedbackTopics([...selectedFeedbackTopics, topic]);
    }
  };

  const handleGenerateFeedbackCourse = () => {
    if (selectedFeedbackTopics.length > 3) {
      setShowPaywall(true);
      return;
    }
    // Generate course logic
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Create Free Course</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Build personalized learning paths tailored to your career goals
        </p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="manual" className="gap-2">
            <Plus className="h-4 w-4" />
            Manual
          </TabsTrigger>
          <TabsTrigger value="jd" className="gap-2">
            <FileText className="h-4 w-4" />
            From Job Description
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            From Manager Feedback
          </TabsTrigger>
        </TabsList>

        {/* Manual Course Creation */}
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="h-5 w-5 text-primary" />
                Create Course Manually
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  placeholder="e.g., Strategic Leadership Fundamentals"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseDescription">Course Description</Label>
                <Textarea
                  id="courseDescription"
                  placeholder="Describe what this course will cover..."
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Topics</Label>
                  <Button variant="outline" size="sm" onClick={addTopic}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Topic
                  </Button>
                </div>

                {topics.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No topics added yet. Click "Add Topic" to start.
                  </p>
                )}

                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Topic name"
                        value={topic.name}
                        onChange={(e) => updateTopicName(topic.id, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTopic(topic.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>

                    <div className="mt-3 space-y-2 pl-6">
                      {topic.subtopics.map((subtopic, index) => (
                        <Input
                          key={index}
                          placeholder="Subtopic"
                          value={subtopic}
                          onChange={(e) =>
                            updateSubtopic(topic.id, index, e.target.value)
                          }
                          className="text-sm"
                        />
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addSubtopic(topic.id)}
                        className="text-muted-foreground"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add Subtopic
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleCreateManualCourse} disabled={!courseName}>
                  Create Course
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Free: 1 custom course, 1 topic. Additional topics or courses require upgrade.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* JD-based Course Creation */}
        <TabsContent value="jd">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Create Course from Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jdText">Paste Job Description</Label>
                <Textarea
                  id="jdText"
                  placeholder="Paste the full job description here. AI will extract skills, responsibilities, and interview topics..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  rows={6}
                />
              </div>

              <Button
                onClick={handleExtractFromJD}
                disabled={!jdText}
                className="w-full gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Extract Topics with AI
              </Button>

              {extractedJdTopics.length > 0 && (
                <div className="space-y-3">
                  <Label>Select Topics for Your Course (up to 3 free)</Label>
                  <div className="grid gap-2">
                    {extractedJdTopics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-3 rounded-md border border-border p-3"
                      >
                        <Checkbox
                          id={topic}
                          checked={selectedJdTopics.includes(topic)}
                          onCheckedChange={() => toggleJdTopic(topic)}
                        />
                        <Label htmlFor={topic} className="cursor-pointer text-sm">
                          {topic}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleGenerateJdCourse}
                    disabled={selectedJdTopics.length === 0}
                    className="w-full"
                  >
                    Generate Course ({selectedJdTopics.length} topics selected)
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Free: 1 JD upload, up to 3 topics. Unlimited JD uploads and topic extraction require upgrade.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manager Feedback Course Creation */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                Create Course from Manager Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="feedbackText">Paste Manager Feedback</Label>
                <Textarea
                  id="feedbackText"
                  placeholder="Paste your performance review, manager feedback, or development notes..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload PDF/image of performance review
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Upload File
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerGoals">Forward-looking Goals from Manager</Label>
                <Textarea
                  id="managerGoals"
                  placeholder="Enter any specific goals or areas for improvement your manager has mentioned..."
                  value={managerGoals}
                  onChange={(e) => setManagerGoals(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleExtractFromFeedback}
                disabled={!feedbackText && !managerGoals}
                className="w-full gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Extract Growth Areas with AI
              </Button>

              {extractedFeedbackTopics.length > 0 && (
                <div className="space-y-3">
                  <Label>AI-Identified Growth Areas (select up to 3 free)</Label>
                  <div className="grid gap-2">
                    {extractedFeedbackTopics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-3 rounded-md border border-border p-3"
                      >
                        <Checkbox
                          id={`fb-${topic}`}
                          checked={selectedFeedbackTopics.includes(topic)}
                          onCheckedChange={() => toggleFeedbackTopic(topic)}
                        />
                        <Label htmlFor={`fb-${topic}`} className="cursor-pointer text-sm">
                          {topic}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleGenerateFeedbackCourse}
                    disabled={selectedFeedbackTopics.length === 0}
                    className="w-full"
                  >
                    Generate Learning Path ({selectedFeedbackTopics.length} areas selected)
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Free: 1 feedback session, up to 3 topics. Unlimited feedback sessions and topic extraction require upgrade.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Disclaimer />

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default CreateCourse;
