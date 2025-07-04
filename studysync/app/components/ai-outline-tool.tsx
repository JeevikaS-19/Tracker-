"use client"

import { useState } from "react"
import {
  Sparkles,
  Download,
  FileText,
  Video,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Loader2,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GeneratedContent {
  outline: string
  summary: string
  keyPoints: { title: string; content: string; elaboration?: string }[]
  videos: { title: string; channel: string; duration: string; url: string; description: string }[]
}

interface SearchResult {
  type: "outline" | "summary" | "keyPoint" | "video"
  title: string
  content: string
  relevance: number
  section?: string
}

export default function AiOutlineTool() {
  const [topic, setTopic] = useState("")
  const [additionalContext, setAdditionalContext] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [aiProvider, setAiProvider] = useState<"copilot" | "gemini">("copilot")
  const [expandedPoints, setExpandedPoints] = useState<Set<number>>(new Set())
  const [elaboratingPoint, setElaboratingPoint] = useState<number | null>(null)

  const generateContent = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000))

    const mockContent: GeneratedContent = {
      outline: `# ${topic} - Comprehensive Study Guide

## I. Introduction and Fundamentals
### A. Definition and Core Concepts
- Understanding the basic principles of ${topic}
- Historical development and evolution
- Key terminology and vocabulary
- Relationship to broader field of study

### B. Prerequisites and Background Knowledge
- Essential mathematical/theoretical foundations
- Recommended prior coursework
- Fundamental skills required
- Common misconceptions to avoid

## II. Theoretical Framework
### A. Primary Theories and Models
- Classical approaches and methodologies
- Modern theoretical developments
- Comparative analysis of different schools of thought
- Integration of contemporary research

### B. Key Principles and Laws
- Fundamental governing principles
- Mathematical relationships and formulas
- Empirical observations and patterns
- Exceptions and special cases

## III. Practical Applications
### A. Real-World Implementation
- Industry applications and use cases
- Problem-solving methodologies
- Case studies and examples
- Best practices and standards

### B. Tools and Techniques
- Essential software and equipment
- Analytical methods and procedures
- Data collection and analysis
- Quality control and validation

## IV. Advanced Topics
### A. Current Research and Developments
- Cutting-edge research areas
- Emerging trends and technologies
- Future directions and possibilities
- Interdisciplinary connections

### B. Specialized Applications
- Advanced problem-solving techniques
- Complex system analysis
- Innovation and creative applications
- Professional specializations

## V. Assessment and Mastery
### A. Learning Objectives and Outcomes
- Knowledge-based learning goals
- Skill development targets
- Competency assessments
- Performance indicators

### B. Study Strategies and Resources
- Effective learning approaches
- Recommended textbooks and materials
- Online resources and databases
- Practice problems and exercises

## VI. Further Learning and Development
### A. Advanced Coursework
- Recommended follow-up courses
- Specialization pathways
- Graduate-level opportunities
- Professional certifications

### B. Career Applications
- Relevant career paths
- Industry requirements
- Professional development
- Networking opportunities`,

      summary: `## Comprehensive Study Approach for ${topic}

### Overview
This study guide provides a structured approach to mastering ${topic}, designed for students seeking comprehensive understanding and practical application. The content is organized to build knowledge progressively from fundamental concepts to advanced applications.

### Key Learning Areas
1. **Foundational Knowledge**: Essential concepts, terminology, and historical context
2. **Theoretical Framework**: Core principles, models, and governing laws
3. **Practical Applications**: Real-world implementation and problem-solving
4. **Advanced Topics**: Current research and specialized applications
5. **Assessment Preparation**: Learning objectives and study strategies
6. **Future Development**: Career paths and continued learning opportunities

### Study Approach Recommendations
- **Time Investment**: Allocate 15-20 hours per week for comprehensive coverage
- **Learning Modalities**: Combine theoretical study with practical exercises
- **Assessment Strategy**: Regular self-testing and application-based projects
- **Resource Utilization**: Leverage multiple sources including textbooks, online materials, and peer collaboration

### Success Indicators
- Ability to explain core concepts clearly
- Successful application of principles to new problems
- Integration of knowledge across different topic areas
- Demonstration of critical thinking and analysis skills

### Integration with Other Subjects
Understanding ${topic} enhances knowledge in related fields and provides foundation for advanced study. Consider connections to mathematics, science, technology, and practical applications in your chosen field.`,

      keyPoints: [
        {
          title: "Fundamental Principles",
          content: "Core concepts that form the foundation of understanding in this subject area.",
        },
        {
          title: "Problem-Solving Strategies",
          content: "Systematic approaches to analyzing and solving complex problems.",
        },
        {
          title: "Historical Context",
          content: "Evolution of ideas and key developments that shaped current understanding.",
        },
        {
          title: "Interdisciplinary Connections",
          content: "Relationships between this topic and other fields of study.",
        },
        {
          title: "Current Research Trends",
          content: "Latest developments and future directions in the field.",
        },
        {
          title: "Assessment Strategies",
          content: "Effective methods for evaluating knowledge and skills.",
        },
      ],

      videos: [
        {
          title: `${topic} - Complete Beginner's Guide`,
          channel: "EduMaster Academy",
          duration: "45:32",
          url: `https://youtube.com/search?q=${encodeURIComponent(topic + " beginner guide")}`,
          description: "Comprehensive introduction covering all fundamental concepts",
        },
        {
          title: `Advanced ${topic} Techniques`,
          channel: "Expert Learning Hub",
          duration: "1:23:15",
          url: `https://youtube.com/search?q=${encodeURIComponent(topic + " advanced techniques")}`,
          description: "Deep dive into complex applications and problem-solving methods",
        },
        {
          title: `${topic} in 10 Minutes`,
          channel: "Quick Study",
          duration: "10:47",
          url: `https://youtube.com/search?q=${encodeURIComponent(topic + " quick overview")}`,
          description: "Rapid overview of key concepts for quick review",
        },
        {
          title: `Real-World Applications of ${topic}`,
          channel: "Practical Science",
          duration: "32:18",
          url: `https://youtube.com/search?q=${encodeURIComponent(topic + " real world applications")}`,
          description: "How these concepts apply in professional and everyday contexts",
        },
        {
          title: `${topic} Problem Solving Workshop`,
          channel: "Study Solutions",
          duration: "56:42",
          url: `https://youtube.com/search?q=${encodeURIComponent(topic + " problem solving")}`,
          description: "Step-by-step problem solving with worked examples",
        },
        {
          title: `History and Evolution of ${topic}`,
          channel: "Academic Insights",
          duration: "28:55",
          url: `https://youtube.com/search?q=${encodeURIComponent(topic + " history evolution")}`,
          description: "Historical development and key figures in the field",
        },
      ],
    }

    setGeneratedContent(mockContent)
    setIsGenerating(false)
  }

  const elaborateOnPoint = async (index: number) => {
    if (!generatedContent) return

    setElaboratingPoint(index)

    // Simulate AI elaboration
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const elaborations = [
      `**Why This Matters:**
The fundamental principles serve as the building blocks for all advanced concepts in this field. Without a solid grasp of these basics, students often struggle with more complex applications.

**Key Components to Master:**
- Core definitions and terminology
- Basic mathematical relationships
- Underlying assumptions and limitations
- Historical development of key ideas

**Study Strategy:**
Focus on understanding rather than memorization. Create concept maps to visualize relationships between different principles. Practice explaining concepts in your own words.

**Assessment Approach:**
Expect questions that test both recall and application. Be prepared to explain how fundamental principles apply to new scenarios.

**Common Pitfalls:**
- Rushing through basics to get to "interesting" material
- Memorizing formulas without understanding derivations
- Ignoring historical context and development

**Real-World Applications:**
These principles form the foundation for professional practice and are essential for problem-solving in industry settings.`,

      `**Strategic Problem-Solving Framework:**
Effective problem-solving requires a systematic approach that can be applied consistently across different types of challenges.

**The IDEAL Method:**
- **I**dentify the problem clearly
- **D**efine goals and constraints
- **E**xplore possible strategies
- **A**ct on the chosen strategy
- **L**ook back and evaluate

**Advanced Techniques:**
- Breaking complex problems into manageable components
- Using analogies and pattern recognition
- Applying multiple solution methods for verification
- Developing intuition through extensive practice

**Study Recommendations:**
Work through progressively challenging problems. Start with guided examples, then attempt similar problems independently. Keep a problem-solving journal to track strategies that work.

**Assessment Preparation:**
Practice under timed conditions. Focus on showing your work clearly and explaining your reasoning process.

**Professional Applications:**
These problem-solving skills transfer directly to workplace challenges and are highly valued by employers.`,

      `**Historical Evolution and Significance:**
Understanding the historical development provides crucial context for why certain approaches evolved and how current practices emerged.

**Key Historical Periods:**
- Early foundational work (dates and key figures)
- Major breakthroughs and paradigm shifts
- Modern developments and current trends
- Future directions and emerging areas

**Influential Figures:**
Learn about the major contributors and their specific contributions. Understanding their motivations and challenges provides insight into the field's development.

**Study Approach:**
Create a timeline of major developments. Understand not just what happened, but why certain discoveries were significant at the time.

**Contemporary Relevance:**
Historical understanding helps predict future trends and provides perspective on current debates and challenges in the field.

**Assessment Value:**
Historical questions often appear on exams and demonstrate deeper understanding of the subject matter.`,

      `**Cross-Disciplinary Integration:**
Modern academic and professional work increasingly requires understanding connections between different fields of study.

**Primary Connections:**
- Mathematics: Quantitative analysis and modeling
- Science: Empirical methods and experimental design
- Technology: Tools and computational approaches
- Social Sciences: Human factors and societal impact

**Synthesis Opportunities:**
Look for ways to apply concepts from this subject to problems in other areas. This deepens understanding and demonstrates mastery.

**Study Strategy:**
Actively seek connections to other courses you're taking. Discuss interdisciplinary applications with professors and peers.

**Career Advantages:**
Professionals who can work across disciplines are increasingly valuable in today's interconnected world.

**Research Opportunities:**
Many cutting-edge research projects occur at the intersection of different fields.`,

      `**Current Research Landscape:**
Staying current with research trends is essential for advanced study and professional development.

**Major Research Areas:**
- Emerging methodologies and techniques
- Technology-driven innovations
- Interdisciplinary collaborations
- Practical applications and implementations

**Key Research Questions:**
Understand what questions researchers are currently trying to answer and why these questions matter.

**Study Resources:**
- Recent journal articles and publications
- Conference proceedings and presentations
- Professional organization websites
- Research group publications

**Future Implications:**
Consider how current research might change the field in the next 5-10 years.

**Student Opportunities:**
Look for undergraduate research opportunities or ways to engage with current research through coursework.`,

      `**Comprehensive Assessment Strategies:**
Effective assessment goes beyond traditional testing to evaluate deep understanding and practical application.

**Assessment Types:**
- Formative assessments (ongoing feedback)
- Summative assessments (final evaluation)
- Authentic assessments (real-world applications)
- Peer assessments (collaborative evaluation)

**Preparation Strategies:**
- Regular self-testing and practice
- Creating study guides and concept maps
- Forming study groups for discussion
- Seeking feedback from instructors

**Performance Indicators:**
- Ability to explain concepts clearly
- Successful problem-solving under pressure
- Integration of knowledge across topics
- Application to novel situations

**Long-term Learning:**
Focus on strategies that promote retention and transfer of knowledge beyond the immediate assessment.

**Professional Relevance:**
Assessment skills translate to professional self-evaluation and continuous improvement in career settings.`,
    ]

    const updatedContent = { ...generatedContent }
    updatedContent.keyPoints[index].elaboration = elaborations[index]
    setGeneratedContent(updatedContent)

    setExpandedPoints((prev) => new Set([...prev, index]))
    setElaboratingPoint(null)
  }

  const togglePointExpansion = (index: number) => {
    const newExpanded = new Set(expandedPoints)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      if (!generatedContent?.keyPoints[index].elaboration) {
        elaborateOnPoint(index)
        return
      }
      newExpanded.add(index)
    }
    setExpandedPoints(newExpanded)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="ai-provider">AI Provider</Label>
          <Select value={aiProvider} onValueChange={(value: "copilot" | "gemini") => setAiProvider(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copilot">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  Microsoft Copilot
                </div>
              </SelectItem>
              <SelectItem value="gemini">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                  Google Gemini
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="topic">Study Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter the topic you want to study (e.g., Calculus, World War II, Photosynthesis)"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="context">Additional Context (Optional)</Label>
          <Textarea
            id="context"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Provide any specific requirements, learning level, or focus areas..."
            className="mt-2 min-h-[80px]"
          />
        </div>

        <Button
          onClick={generateContent}
          disabled={!topic.trim() || isGenerating}
          className="w-full flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating with {aiProvider === "copilot" ? "Microsoft Copilot" : "Google Gemini"}...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Study Materials
            </>
          )}
        </Button>
      </div>

      {generatedContent && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                {aiProvider === "copilot" ? (
                  <>
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    Powered by Microsoft Copilot
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                    Powered by Google Gemini
                  </>
                )}
              </Badge>
              <Badge variant="secondary">Generated for: {topic}</Badge>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download All
            </Button>
          </div>

          <Tabs defaultValue="outline" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="outline">Study Outline</TabsTrigger>
              <TabsTrigger value="summary">AI Summary</TabsTrigger>
              <TabsTrigger value="keypoints">Key Points</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="outline" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Comprehensive Study Outline
                      </CardTitle>
                      <CardDescription>Structured learning path with detailed sections</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Maximize2 className="h-4 w-4 mr-2" />
                            Full Screen
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh]">
                          <DialogHeader>
                            <DialogTitle>Study Outline - {topic}</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[70vh]">
                            <div className="prose prose-sm max-w-none p-4">
                              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                {generatedContent.outline}
                              </pre>
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {generatedContent.outline}
                      </pre>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        AI-Generated Summary
                      </CardTitle>
                      <CardDescription>Key insights and study recommendations</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Maximize2 className="h-4 w-4 mr-2" />
                            Full Screen
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh]">
                          <DialogHeader>
                            <DialogTitle>AI Summary - {topic}</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[70vh]">
                            <div className="prose prose-sm max-w-none p-4">
                              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                {generatedContent.summary}
                              </pre>
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {generatedContent.summary}
                      </pre>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keypoints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Interactive Key Points
                  </CardTitle>
                  <CardDescription>Click on any point to get detailed elaboration</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-3">
                      {generatedContent.keyPoints.map((point, index) => (
                        <div key={index} className="border rounded-lg">
                          <button
                            onClick={() => togglePointExpansion(index)}
                            className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                            disabled={elaboratingPoint === index}
                          >
                            <div className="flex-1">
                              <h3 className="font-medium text-lg mb-1">{point.title}</h3>
                              <p className="text-gray-600 text-sm">{point.content}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {elaboratingPoint === index ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : expandedPoints.has(index) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </div>
                          </button>

                          {expandedPoints.has(index) && point.elaboration && (
                            <div className="px-4 pb-4 border-t bg-gray-50">
                              <ScrollArea className="h-64 mt-3">
                                <div className="prose prose-sm max-w-none">
                                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                    {point.elaboration}
                                  </pre>
                                </div>
                              </ScrollArea>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Curated Video Resources
                  </CardTitle>
                  <CardDescription>Educational videos to supplement your learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="grid gap-4">
                      {generatedContent.videos.map((video, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                              <Video className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-lg mb-1 line-clamp-1">{video.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{video.channel}</p>
                              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{video.description}</p>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline" className="text-xs">
                                  {video.duration}
                                </Badge>
                                <Button
                                  size="sm"
                                  onClick={() => window.open(video.url, "_blank")}
                                  className="flex items-center gap-2"
                                >
                                  <Video className="h-4 w-4" />
                                  Watch on YouTube
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
