"use client"

import { useState } from "react"
import { Plus, BookOpen, Edit, Trash2, MapPin } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Subject {
  id: number
  name: string
  code: string
  type: "hardcore" | "softcore" | "elective" | "personal"
  color: string
  classroom: string
  instructor: string
  credits: number
}

export default function StudyScheduleManager() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: "Advanced Calculus",
      code: "MATH301",
      type: "hardcore",
      color: "blue",
      classroom: "Room 101",
      instructor: "Dr. Smith",
      credits: 4,
    },
    {
      id: 2,
      name: "World History",
      code: "HIST201",
      type: "softcore",
      color: "green",
      classroom: "Room 205",
      instructor: "Prof. Johnson",
      credits: 3,
    },
    {
      id: 3,
      name: "Creative Writing",
      code: "ENG150",
      type: "elective",
      color: "purple",
      classroom: "Room 302",
      instructor: "Ms. Davis",
      credits: 2,
    },
    {
      id: 4,
      name: "Guitar Lessons",
      code: "MUSIC001",
      type: "personal",
      color: "orange",
      classroom: "Music Room",
      instructor: "Mr. Wilson",
      credits: 1,
    },
  ])

  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    type: "hardcore" as "hardcore" | "softcore" | "elective" | "personal",
    color: "blue",
    classroom: "",
    instructor: "",
    credits: 3,
  })

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)

  const colors = [
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
    { value: "pink", label: "Pink", class: "bg-pink-500" },
    { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
    { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
  ]

  const subjectTypes = [
    { value: "hardcore", label: "Hardcore Subject", description: "Core major requirements" },
    { value: "softcore", label: "Softcore Subject", description: "Supporting courses" },
    { value: "elective", label: "Elective", description: "Optional courses" },
    { value: "personal", label: "Personal Course", description: "Self-study or hobbies" },
  ]

  const addSubject = () => {
    if (newSubject.name && newSubject.code) {
      const subject: Subject = {
        id: Date.now(),
        ...newSubject,
      }
      setSubjects([...subjects, subject])
      setNewSubject({
        name: "",
        code: "",
        type: "hardcore",
        color: "blue",
        classroom: "",
        instructor: "",
        credits: 3,
      })
    }
  }

  const updateSubject = () => {
    if (editingSubject) {
      setSubjects(subjects.map((subject) => (subject.id === editingSubject.id ? editingSubject : subject)))
      setEditingSubject(null)
    }
  }

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      pink: "bg-pink-500",
      yellow: "bg-yellow-500",
      indigo: "bg-indigo-500",
    }
    return colorMap[color] || "bg-blue-500"
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hardcore":
        return "destructive"
      case "softcore":
        return "default"
      case "elective":
        return "secondary"
      case "personal":
        return "outline"
      default:
        return "default"
    }
  }

  const getTotalCredits = () => {
    return subjects.reduce((total, subject) => total + subject.credits, 0)
  }

  const getSubjectsByType = (type: string) => {
    return subjects.filter((subject) => subject.type === type)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Study Schedule Manager</h2>
          <p className="text-gray-600">Manage your subjects and course schedule</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>Add a new subject to your study schedule.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject-name">Subject Name</Label>
                  <Input
                    id="subject-name"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    placeholder="e.g., Advanced Calculus"
                  />
                </div>
                <div>
                  <Label htmlFor="subject-code">Subject Code</Label>
                  <Input
                    id="subject-code"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    placeholder="e.g., MATH301"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject-type">Subject Type</Label>
                <Select
                  value={newSubject.type}
                  onValueChange={(value: "hardcore" | "softcore" | "elective" | "personal") =>
                    setNewSubject({ ...newSubject, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject type" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject-color">Color</Label>
                  <Select
                    value={newSubject.color}
                    onValueChange={(value) => setNewSubject({ ...newSubject, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${color.class}`}></div>
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subject-credits">Credits</Label>
                  <Input
                    id="subject-credits"
                    type="number"
                    min="1"
                    max="6"
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject({ ...newSubject, credits: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject-classroom">Classroom</Label>
                  <Input
                    id="subject-classroom"
                    value={newSubject.classroom}
                    onChange={(e) => setNewSubject({ ...newSubject, classroom: e.target.value })}
                    placeholder="e.g., Room 101"
                  />
                </div>
                <div>
                  <Label htmlFor="subject-instructor">Instructor</Label>
                  <Input
                    id="subject-instructor"
                    value={newSubject.instructor}
                    onChange={(e) => setNewSubject({ ...newSubject, instructor: e.target.value })}
                    placeholder="e.g., Dr. Smith"
                  />
                </div>
              </div>
              <Button onClick={addSubject} className="w-full">
                Add Subject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalCredits()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Hardcore</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getSubjectsByType("hardcore").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Electives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getSubjectsByType("elective").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Subjects by Type */}
      {subjectTypes.map((type) => {
        const typeSubjects = getSubjectsByType(type.value)
        if (typeSubjects.length === 0) return null

        return (
          <Card key={type.value}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {type.label} ({typeSubjects.length})
              </CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeSubjects.map((subject) => (
                  <Card key={subject.id} className="border-l-4" style={{ borderLeftColor: `var(--${subject.color})` }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getColorClass(subject.color)}`}></div>
                            <CardTitle className="text-lg">{subject.name}</CardTitle>
                          </div>
                          <CardDescription>{subject.code}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setEditingSubject(subject)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Subject</DialogTitle>
                                <DialogDescription>Update subject information.</DialogDescription>
                              </DialogHeader>
                              {editingSubject && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Subject Name</Label>
                                      <Input
                                        value={editingSubject.name}
                                        onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                                      />
                                    </div>
                                    <div>
                                      <Label>Subject Code</Label>
                                      <Input
                                        value={editingSubject.code}
                                        onChange={(e) => setEditingSubject({ ...editingSubject, code: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Classroom</Label>
                                      <Input
                                        value={editingSubject.classroom}
                                        onChange={(e) =>
                                          setEditingSubject({ ...editingSubject, classroom: e.target.value })
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>Instructor</Label>
                                      <Input
                                        value={editingSubject.instructor}
                                        onChange={(e) =>
                                          setEditingSubject({ ...editingSubject, instructor: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <Button onClick={updateSubject} className="w-full">
                                    Update Subject
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteSubject(subject.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" />
                          {subject.classroom}
                        </div>
                        <div className="text-sm text-gray-600">{subject.instructor}</div>
                        <div className="flex items-center justify-between">
                          <Badge variant={getTypeColor(subject.type)} className="text-xs">
                            {subject.credits} credits
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
