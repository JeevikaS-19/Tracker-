"use client"

import type React from "react"

import { useState } from "react"
import { Clock, DollarSign, Target, BookOpen, Search, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TaskManager from "./task-manager"
import StudyHoursTracker from "./study-hours-tracker"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface SearchResult {
  id: string
  title: string
  type: "task" | "schedule" | "subject" | "goal" | "budget"
  content: string
  metadata?: string
  priority?: string
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const upcomingTasks = [
    { id: 1, title: "Math Assignment", subject: "Mathematics", due: "Tomorrow", priority: "high" },
    { id: 2, title: "History Essay", subject: "History", due: "3 days", priority: "medium" },
    { id: 3, title: "Science Lab Report", subject: "Physics", due: "1 week", priority: "low" },
  ]

  const todaySchedule = [
    { time: "9:00 AM", subject: "Mathematics", room: "Room 101" },
    { time: "11:00 AM", subject: "Physics", room: "Lab 2" },
    { time: "2:00 PM", subject: "History", room: "Room 205" },
  ]

  const subjects = [
    { name: "Mathematics", code: "MATH101", instructor: "Dr. Smith" },
    { name: "Physics", code: "PHYS201", instructor: "Prof. Johnson" },
    { name: "History", code: "HIST150", instructor: "Dr. Brown" },
    { name: "Chemistry", code: "CHEM101", instructor: "Prof. Davis" },
    { name: "English", code: "ENG102", instructor: "Dr. Wilson" },
    { name: "Computer Science", code: "CS101", instructor: "Prof. Lee" },
  ]

  const goals = [
    { title: "Study Hours Goal", current: 24.5, target: 30, unit: "hours" },
    { title: "Tasks Completed", current: 8, target: 12, unit: "tasks" },
    { title: "Assignment Submissions", current: 15, target: 20, unit: "assignments" },
  ]

  const budgetItems = [
    { category: "Books", amount: 120, type: "expense" },
    { category: "Supplies", amount: 45, type: "expense" },
    { category: "Food", amount: 80, type: "expense" },
    { category: "Remaining Budget", amount: 245, type: "balance" },
  ]

  // Search functionality
  const performSearch = (query: string) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    const results: SearchResult[] = []
    const searchTerm = query.toLowerCase()

    // Search through tasks
    upcomingTasks.forEach((task) => {
      if (task.title.toLowerCase().includes(searchTerm) || task.subject.toLowerCase().includes(searchTerm)) {
        results.push({
          id: `task-${task.id}`,
          title: task.title,
          type: "task",
          content: `${task.subject} - Due ${task.due}`,
          metadata: task.subject,
          priority: task.priority,
        })
      }
    })

    // Search through schedule
    todaySchedule.forEach((item, index) => {
      if (item.subject.toLowerCase().includes(searchTerm) || item.room.toLowerCase().includes(searchTerm)) {
        results.push({
          id: `schedule-${index}`,
          title: item.subject,
          type: "schedule",
          content: `${item.time} - ${item.room}`,
          metadata: item.time,
        })
      }
    })

    // Search through subjects
    subjects.forEach((subject, index) => {
      if (
        subject.name.toLowerCase().includes(searchTerm) ||
        subject.code.toLowerCase().includes(searchTerm) ||
        subject.instructor.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: `subject-${index}`,
          title: subject.name,
          type: "subject",
          content: `${subject.code} - ${subject.instructor}`,
          metadata: subject.code,
        })
      }
    })

    // Search through goals
    goals.forEach((goal, index) => {
      if (goal.title.toLowerCase().includes(searchTerm)) {
        results.push({
          id: `goal-${index}`,
          title: goal.title,
          type: "goal",
          content: `${goal.current} / ${goal.target} ${goal.unit}`,
          metadata: `${Math.round((goal.current / goal.target) * 100)}% complete`,
        })
      }
    })

    // Search through budget items
    budgetItems.forEach((item, index) => {
      if (item.category.toLowerCase().includes(searchTerm)) {
        results.push({
          id: `budget-${index}`,
          title: item.category,
          type: "budget",
          content: `$${item.amount}`,
          metadata: item.type,
        })
      }
    })

    setSearchResults(results)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    performSearch(query)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "task":
        return <Target className="h-4 w-4" />
      case "schedule":
        return <Clock className="h-4 w-4" />
      case "subject":
        return <BookOpen className="h-4 w-4" />
      case "goal":
        return <Target className="h-4 w-4" />
      case "budget":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-red-100 text-red-800"
      case "schedule":
        return "bg-blue-100 text-blue-800"
      case "subject":
        return "bg-green-100 text-green-800"
      case "goal":
        return "bg-purple-100 text-purple-800"
      case "budget":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tasks, subjects, schedule, goals..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
              <div className="text-sm text-gray-600 mb-2">
                Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
              </div>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0">{getTypeIcon(result.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{result.title}</h4>
                      <Badge className={`text-xs ${getTypeBadgeColor(result.type)}`}>{result.type}</Badge>
                      {result.priority && (
                        <Badge
                          variant={
                            result.priority === "high"
                              ? "destructive"
                              : result.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {result.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate">{result.content}</p>
                    {result.metadata && <p className="text-xs text-gray-500 mt-1">{result.metadata}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="mt-4 text-center py-4 text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{searchQuery}"</p>
              <p className="text-xs mt-1">Try searching for tasks, subjects, schedule, or goals</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Student!</h2>
        <p className="text-indigo-100">You have 3 tasks due this week and 2 upcoming exams.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 due this week</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Task Management</DialogTitle>
            </DialogHeader>
            <TaskManager />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Study Hours Tracker</DialogTitle>
            </DialogHeader>
            <StudyHoursTracker />
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245</div>
            <p className="text-xs text-muted-foreground">Remaining this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.subject}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {task.due}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-600 min-w-[70px]">{item.time}</div>
                <div>
                  <h4 className="font-medium">{item.subject}</h4>
                  <p className="text-sm text-gray-600">{item.room}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>Your study goals for this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Study Hours Goal</span>
              <span>24.5 / 30 hours</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Tasks Completed</span>
              <span>8 / 12 tasks</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
