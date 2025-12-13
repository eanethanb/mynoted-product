import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical, FileText, Upload, MessageSquare, Sparkles, BookOpen, Image } from 'lucide-react';
import PaywallModal from '@/components/PaywallModal';
import Disclaimer from '@/components/Disclaimer';

interface Topic {
  id: string;
  name: string;
  subtopics: string[];
}

const CreateCourse = () => {
  const [showPaywall, setShowPaywall] = useState(false);
  const [showManualBuilder, setShowManualBuilder] = useState(false);
  
  // Manual course state
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [manualCoursesCreated, setManualCoursesCreated] = useState(0);
  const [manualTopicsCreated, setManualTopicsCreated] = useState(0);
  const [quickTopicInput, setQuickTopicInput] = useState('');

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

  const addQuickTopic = () => {
    if (!quickTopicInput.trim()) return;
    if (manualTopicsCreated >= 1) {
      setShowPaywall(true);
      return;
    }
    const newTopic: Topic = {
      id: Date.now().toString(),
      name: quickTopicInput.trim(),
      subtopics: [],
    };
    setTopics([...topics, newTopic]);
    setManualTopicsCreated((prev) => prev + 1);
    setQuickTopicInput('');
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
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">Create Free Course</h1>
        <p className="mt-2 text-xs md:text-sm text-muted-foreground">
          Build personalized learning paths tailored to your career goals
        </p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="manual" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3 flex-col md:flex-row">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Topics, PDFs & Textbooks</span>
            <span className="sm:hidden">Topics</span>
          </TabsTrigger>
          <TabsTrigger value="jd" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3 flex-col md:flex-row">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">From Job Description</span>
            <span className="sm:hidden">JD</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3 flex-col md:flex-row">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">From Manager Feedback</span>
            <span className="sm:hidden">Feedback</span>
          </TabsTrigger>
        </TabsList>

        {/* Topics, PDFs & Textbooks - Simplified Prompt UI */}
        <TabsContent value="manual">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Primary Prompt Block */}
            <div className="relative rounded-2xl bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-pink-50/60 p-6 md:p-10 shadow-sm border border-border/30">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  What do you want to learn today?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Turn PDFs, topics, or table of contents into interactive YouTube lessons, quizzes, and flashcards.
                </p>
              </div>

              {/* Main Input with Inline Actions */}
              <div className="relative flex items-center bg-background rounded-full shadow-md border border-border/50 overflow-hidden">
                <Input
                  placeholder="I want to learn…"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-base md:text-lg h-12 md:h-14 px-5 md:px-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && courseName.trim()) {
                      e.preventDefault();
                      handleCreateManualCourse();
                    }
                  }}
                />
                <div className="flex items-center gap-1 md:gap-2 pr-2">
                  <button
                    className="p-2 md:p-3 hover:bg-muted rounded-full transition-colors"
                    onClick={() => {}}
                    title="Attach file"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <Button
                    onClick={handleCreateManualCourse}
                    disabled={!courseName.trim()}
                    className="rounded-full h-9 md:h-10 px-5 md:px-6"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>

            {/* Upload Actions Card */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all text-sm font-medium text-primary"
                onClick={() => {}}
              >
                <Upload className="h-4 w-4" />
                Upload PDF textbook
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-amber-500/30 bg-amber-50 hover:bg-amber-100 hover:border-amber-500/50 transition-all text-sm font-medium text-amber-700"
                onClick={() => {}}
              >
                <Image className="h-4 w-4" />
                Upload Table of Content image
              </button>
            </div>

            {/* Manual Topics Toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowManualBuilder(!showManualBuilder)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
              >
                Or create a course by adding topics manually
              </button>
            </div>

            {/* Expandable Manual Builder */}
            {showManualBuilder && (
              <Card className="animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Build with Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseDescription" className="text-sm">Course Description (Optional)</Label>
                    <Textarea
                      id="courseDescription"
                      placeholder="Describe what this course will cover..."
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Topics</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addTopic}
                        className="rounded-full text-xs px-3 gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Add Topic
                      </Button>
                    </div>

                    {topics.length === 0 && (
                      <div className="flex items-center gap-2 py-3">
                        <Input
                          placeholder="Type a topic and press Enter…"
                          value={quickTopicInput}
                          onChange={(e) => setQuickTopicInput(e.target.value)}
                          className="text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addQuickTopic();
                            }
                          }}
                        />
                        <Button 
                          onClick={addQuickTopic}
                          disabled={!quickTopicInput.trim()}
                          size="sm"
                          className="rounded-full shrink-0"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    )}

                    {topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                          <Input
                            placeholder="Topic name"
                            value={topic.name}
                            onChange={(e) => updateTopicName(topic.id, e.target.value)}
                            className="flex-1 text-sm"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTopic(topic.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="mt-2 space-y-2 pl-6">
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
                            className="text-muted-foreground text-xs"
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Add Subtopic
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {topics.length > 0 && (
                    <div className="flex justify-end pt-2">
                      <Button 
                        onClick={handleCreateManualCourse} 
                        className="rounded-full px-6"
                      >
                        Create Course
                      </Button>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground text-center">
                    Free: 1 custom course, 1 topic. Additional topics or courses require upgrade.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* JD-based Course Creation */}
        <TabsContent value="jd">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Create Course from Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jdText" className="text-sm">Paste Job Description</Label>
                <Textarea
                  id="jdText"
                  placeholder="Paste the full job description here. AI will extract skills, responsibilities, and interview topics..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  rows={6}
                  className="text-sm"
                />
              </div>

              <Button
                onClick={handleExtractFromJD}
                disabled={!jdText}
                className="w-full gap-2 rounded-full"
              >
                <Sparkles className="h-4 w-4" />
                Extract Topics with AI
              </Button>

              {extractedJdTopics.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm">Select Topics for Your Course (up to 3 free)</Label>
                  <div className="grid gap-2">
                    {extractedJdTopics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-3 rounded-lg border border-border p-3"
                      >
                        <Checkbox
                          id={topic}
                          checked={selectedJdTopics.includes(topic)}
                          onCheckedChange={() => toggleJdTopic(topic)}
                        />
                        <Label htmlFor={topic} className="cursor-pointer text-xs md:text-sm">
                          {topic}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleGenerateJdCourse}
                    disabled={selectedJdTopics.length === 0}
                    className="w-full rounded-full"
                  >
                    Generate Course ({selectedJdTopics.length} topics selected)
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Free: 1 JD upload, up to 3 topics. Unlimited JD uploads and topic extraction require upgrade.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manager Feedback Course Creation */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                Create Course from Manager Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="feedbackText" className="text-sm">Paste Manager Feedback</Label>
                <Textarea
                  id="feedbackText"
                  placeholder="Paste your performance review, manager feedback, or development notes..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                  className="text-sm"
                />
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="rounded-xl border-2 border-dashed border-border p-4 md:p-6 text-center hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                  Upload PDF/image of performance review
                </p>
                <Button variant="outline" size="sm" className="mt-3 rounded-full">
                  Upload File
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerGoals" className="text-sm">Forward-looking Goals from Manager</Label>
                <Textarea
                  id="managerGoals"
                  placeholder="Enter any specific goals or areas for improvement your manager has mentioned..."
                  value={managerGoals}
                  onChange={(e) => setManagerGoals(e.target.value)}
                  rows={3}
                  className="text-sm"
                />
              </div>

              <Button
                onClick={handleExtractFromFeedback}
                disabled={!feedbackText && !managerGoals}
                className="w-full gap-2 rounded-full"
              >
                <Sparkles className="h-4 w-4" />
                Extract Growth Areas with AI
              </Button>

              {extractedFeedbackTopics.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm">AI-Identified Growth Areas (select up to 3 free)</Label>
                  <div className="grid gap-2">
                    {extractedFeedbackTopics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-3 rounded-lg border border-border p-3"
                      >
                        <Checkbox
                          id={`fb-${topic}`}
                          checked={selectedFeedbackTopics.includes(topic)}
                          onCheckedChange={() => toggleFeedbackTopic(topic)}
                        />
                        <Label htmlFor={`fb-${topic}`} className="cursor-pointer text-xs md:text-sm">
                          {topic}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleGenerateFeedbackCourse}
                    disabled={selectedFeedbackTopics.length === 0}
                    className="w-full rounded-full"
                  >
                    Generate Learning Path ({selectedFeedbackTopics.length} areas selected)
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center">
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
