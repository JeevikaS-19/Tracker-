"use client"

import { useState } from "react"
import { Plus, FileText, Calendar, Edit, Trash2, Eye, Upload, Download, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface Assignment {
  id: number
  title: string
  subject: string
  description: string
  dueDate: string
  hoursToComplete: number
  isGraded: boolean
  maxMarks: number
  priority: "high" | "medium" | "low"
  status: "not-started" | "in-progress" | "completed"
  progress: number
  files: { name: string; size: string; type: string; uploadDate: string }[]
  notes: string
  createdAt: string
}

export default function AssignmentPlanner() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Calculus Problem Set 5",
      subject: "Mathematics",
      description: "Complete exercises 1-25 on integration techniques",
      dueDate: "2024-01-20",
      hoursToComplete: 8,
      isGraded: true,
      maxMarks: 100,
      priority: "high",
      status: "in-progress",
      progress: 60,
      files: [
        { name: "calculus_notes.pdf", size: "2.4 MB", type: "pdf", uploadDate: "2024-01-15" },
        { name: "integration_examples.docx", size: "1.2 MB", type: "doc", uploadDate: "2024-01-14" },
      ],
      notes:
        "Completed exercises 1-15. Need to review substitution method for remaining problems. Professor mentioned this will be heavily weighted in final grade.",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "World War II Research Paper",
      subject: "History",
      description: "5000-word research paper on the causes of World War II",
      dueDate: "2024-01-25",
      hoursToComplete: 20,
      isGraded: true,
      maxMarks: 150,
      priority: "high",
      status: "not-started",
      progress: 0,
      files: [{ name: "research_sources.pdf", size: "3.1 MB", type: "pdf", uploadDate: "2024-01-12" }],
      notes: "Gathered initial sources. Need to create outline and start writing introduction.",
      createdAt: "2024-01-08",
    },
    {
      id: 3,
      title: "Lab Safety Quiz",
      subject: "Chemistry",
      description: "Online quiz covering lab safety protocols",
      dueDate: "2024-01-18",
      hoursToComplete: 1,
      isGraded: true,
      maxMarks: 25,
      priority: "low",
      status: "not-started",
      progress: 0,
      files: [],
      notes: "Quick review needed. Should be straightforward.",
      createdAt: "2024-01-15",
    },
  ])

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    hoursToComplete: 1,
    isGraded: true,
    maxMarks: 100,
  })

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)

  const subjects = ["Mathematics", "History", "Chemistry", "Biology", "Physics", "English"]

  const calculatePriority = (
    dueDate: string,
    maxMarks: number,
    hoursToComplete: number,
    isGraded: boolean,
  ): "high" | "medium" | "low" => {
    if (!isGraded) return "low"

    const today = new Date()
    const deadline = new Date(dueDate)
    const daysUntilDue = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    let priorityScore = 0

    // Deadline factor (0-40 points)
    if (daysUntilDue <= 2) priorityScore += 40
    else if (daysUntilDue <= 5) priorityScore += 30
    else if (daysUntilDue <= 10) priorityScore += 20
    else priorityScore += 10

    // Marks factor (0-30 points)
    if (maxMarks >= 100) priorityScore += 30
    else if (maxMarks >= 50) priorityScore += 20
    else priorityScore += 10

    // Time complexity factor (0-30 points)
    if (hoursToComplete >= 15) priorityScore += 30
    else if (hoursToComplete >= 8) priorityScore += 20
    else priorityScore += 10

    if (priorityScore >= 70) return "high"
    if (priorityScore >= 50) return "medium"
    return "low"
  }

  const addAssignment = () => {
    if (newAssignment.title && newAssignment.subject && newAssignment.dueDate) {
      const priority = calculatePriority(
        newAssignment.dueDate,
        newAssignment.maxMarks,
        newAssignment.hoursToComplete,
        newAssignment.isGraded,
      )

      const assignment: Assignment = {
        id: Date.now(),
        ...newAssignment,
        priority,
        status: "not-started",
        progress: 0,
        files: [],
        notes: "",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setAssignments([...assignments, assignment])
      setNewAssignment({
        title: "",
        subject: "",
        description: "",
        dueDate: "",
        hoursToComplete: 1,
        isGraded: true,
        maxMarks: 100,
      })
    }
  }

  const updateProgress = (id: number, progress: number) => {
    setAssignments(
      assignments.map((assignment) => {
        if (assignment.id === id) {
          const status = progress === 0 ? "not-started" : progress === 100 ? "completed" : "in-progress"
          return { ...assignment, progress, status }
        }
        return assignment
      }),
    )
  }

  const updateNotes = (id: number, notes: string) => {
    setAssignments(assignments.map((assignment) => (assignment.id === id ? { ...assignment, notes } : assignment)))
  }

  const addFile = (assignmentId: number, file: { name: string; size: string; type: string }) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              files: [...assignment.files, { ...file, uploadDate: new Date().toISOString().split("T")[0] }],
            }
          : assignment,
      ),
    )
  }

  const removeFile = (assignmentId: number, fileName: string) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, files: assignment.files.filter((file) => file.name !== fileName) }
          : assignment,
      ),
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "not-started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center text-red-600 text-xs font-bold">
            PDF
          </div>
        )
      case "doc":
        return (
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold">
            DOC
          </div>
        )
      case "ppt":
        return (
          <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center text-orange-600 text-xs font-bold">
            PPT
          </div>
        )
      default:
        return <FileText className="w-6 h-6 text-gray-600" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const deadline = new Date(dueDate)
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Assignment Planner</h2>
          <p className="text-gray-600">Manage your assignments and track progress</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Add a new assignment with detailed information for automatic priority calculation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="assignment-title">Assignment Title</Label>
                <Input
                  id="assignment-title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  placeholder="Enter assignment title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignment-subject">Subject</Label>
                  <Select
                    value={newAssignment.subject}
                    onValueChange={(value) => setNewAssignment({ ...newAssignment, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignment-due">Deadline</Label>
                  <Input
                    id="assignment-due"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="assignment-description">Description</Label>
                <Textarea
                  id="assignment-description"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  placeholder="Assignment details and requirements..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hours-to-complete">Hours to Complete</Label>
                  <Input
                    id="hours-to-complete"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newAssignment.hoursToComplete}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, hoursToComplete: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="max-marks">Maximum Marks</Label>
                  <Input
                    id="max-marks"
                    type="number"
                    min="0"
                    value={newAssignment.maxMarks}
                    onChange={(e) => setNewAssignment({ ...newAssignment, maxMarks: Number.parseInt(e.target.value) })}
                    disabled={!newAssignment.isGraded}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is-graded"
                  checked={newAssignment.isGraded}
                  onCheckedChange={(checked) => setNewAssignment({ ...newAssignment, isGraded: checked })}
                />
                <Label htmlFor="is-graded">This assignment is graded</Label>
              </div>

              {newAssignment.title && newAssignment.dueDate && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium mb-1">Calculated Priority:</div>
                  <Badge
                    variant={getPriorityColor(
                      calculatePriority(
                        newAssignment.dueDate,
                        newAssignment.maxMarks,
                        newAssignment.hoursToComplete,
                        newAssignment.isGraded,
                      ),
                    )}
                  >
                    {calculatePriority(
                      newAssignment.dueDate,
                      newAssignment.maxMarks,
                      newAssignment.hoursToComplete,
                      newAssignment.isGraded,
                    ).toUpperCase()}
                  </Badge>
                </div>
              )}

              <Button onClick={addAssignment} className="w-full">
                Create Assignment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.subject}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setSelectedAssignment(assignment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {assignment.title}
                          {assignment.isGraded && <Award className="h-5 w-5 text-yellow-500" />}
                        </DialogTitle>
                        <DialogDescription>{assignment.subject}</DialogDescription>
                      </DialogHeader>
                      {selectedAssignment && (
                        <Tabs defaultValue="details" className="w-full">
                          <TabsList>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="materials">Course Materials</TabsTrigger>
                            <TabsTrigger value="notes">Notes</TabsTrigger>
                          </TabsList>

                          <TabsContent value="details" className="space-y-4">
                            <div>
                              <Label>Description</Label>
                              <p className="text-sm text-gray-600 mt-1">{selectedAssignment.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Due Date</Label>
                                <p className="text-sm font-medium mt-1">{selectedAssignment.dueDate}</p>
                                <p className="text-xs text-gray-500">
                                  {getDaysUntilDue(selectedAssignment.dueDate) > 0
                                    ? `${getDaysUntilDue(selectedAssignment.dueDate)} days remaining`
                                    : getDaysUntilDue(selectedAssignment.dueDate) === 0
                                      ? "Due today!"
                                      : `${Math.abs(getDaysUntilDue(selectedAssignment.dueDate))} days overdue`}
                                </p>
                              </div>
                              <div>
                                <Label>Priority</Label>
                                <div className="mt-1">
                                  <Badge variant={getPriorityColor(selectedAssignment.priority)}>
                                    {selectedAssignment.priority}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Time Required</Label>
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm font-medium">{selectedAssignment.hoursToComplete}h</span>
                                </div>
                              </div>
                              <div>
                                <Label>Grading</Label>
                                <p className="text-sm font-medium mt-1">
                                  {selectedAssignment.isGraded ? `${selectedAssignment.maxMarks} marks` : "Not graded"}
                                </p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <div className="mt-1">
                                  <Badge className={`text-xs ${getStatusColor(selectedAssignment.status)}`}>
                                    {selectedAssignment.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label>Progress ({selectedAssignment.progress}%)</Label>
                              <div className="flex items-center gap-2 mt-2">
                                <Progress value={selectedAssignment.progress} className="flex-1" />
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={selectedAssignment.progress}
                                  onChange={(e) =>
                                    updateProgress(selectedAssignment.id, Number.parseInt(e.target.value))
                                  }
                                  className="w-20"
                                />
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="materials" className="space-y-4">
                            <div>
                              <Label htmlFor="file-upload">Upload Course Materials</Label>
                              <Input
                                id="file-upload"
                                type="file"
                                multiple
                                className="mt-2"
                                onChange={(e) => {
                                  const files = e.target.files
                                  if (files) {
                                    Array.from(files).forEach((file) => {
                                      const fileInfo = {
                                        name: file.name,
                                        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                                        type: file.name.split(".").pop()?.toLowerCase() || "unknown",
                                      }
                                      addFile(selectedAssignment.id, fileInfo)
                                    })
                                  }
                                }}
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                Upload PDFs, documents, images, or any files related to this assignment
                              </p>
                            </div>

                            <div>
                              <Label>Uploaded Files ({selectedAssignment.files.length})</Label>
                              <div className="space-y-2 mt-2">
                                {selectedAssignment.files.map((file, index) => (
                                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                                    {getFileIcon(file.type)}
                                    <div className="flex-1">
                                      <div className="font-medium text-sm">{file.name}</div>
                                      <div className="text-xs text-gray-500">
                                        {file.size} • Uploaded {file.uploadDate}
                                      </div>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => removeFile(selectedAssignment.id, file.name)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                {selectedAssignment.files.length === 0 && (
                                  <div className="text-center py-8 text-gray-500">
                                    <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No files uploaded yet</p>
                                    <p className="text-sm">Upload course materials to get started</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="notes" className="space-y-4">
                            <div>
                              <Label htmlFor="assignment-notes">Assignment Notes</Label>
                              <Textarea
                                id="assignment-notes"
                                value={selectedAssignment.notes}
                                onChange={(e) => updateNotes(selectedAssignment.id, e.target.value)}
                                placeholder="Track your progress, challenges, next steps, important points, and any other notes related to this assignment..."
                                className="min-h-[300px] mt-2"
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                Use this space to track your progress, note important points, and plan your approach
                              </p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{assignment.description}</p>

                <div className="flex items-center justify-between">
                  <Badge variant={getPriorityColor(assignment.priority)} className="text-xs">
                    {assignment.priority}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>{assignment.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {assignment.hoursToComplete}h
                  </div>
                  <div className="flex items-center gap-1">
                    {assignment.isGraded && <Award className="h-3 w-3" />}
                    {assignment.isGraded ? `${assignment.maxMarks} marks` : "Not graded"}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2" />
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  Due: {assignment.dueDate}
                  <span
                    className={`ml-auto ${getDaysUntilDue(assignment.dueDate) <= 2 ? "text-red-600 font-medium" : ""}`}
                  >
                    (
                    {getDaysUntilDue(assignment.dueDate) > 0
                      ? `${getDaysUntilDue(assignment.dueDate)} days left`
                      : getDaysUntilDue(assignment.dueDate) === 0
                        ? "Due today!"
                        : `${Math.abs(getDaysUntilDue(assignment.dueDate))} days overdue`}
                    )
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
