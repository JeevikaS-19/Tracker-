"use client"

import { useState } from "react"
import { Plus, DollarSign, Target, Clock, BookOpen, Edit, Trash2 } from "lucide-react"
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
import BudgetTracker from "./budget-tracker"
import AssignmentPlanner from "./assignment-planner"
import StudyScheduleManager from "./study-schedule-manager"
import CourseMaterials from "./course-materials"

export default function Workbooks() {
  const [workbooks, setWorkbooks] = useState([
    { id: 1, name: "Budget Tracker", type: "money", color: "green", tasks: 5, icon: DollarSign },
    { id: 2, name: "Assignment Planner", type: "tasks", color: "blue", tasks: 12, icon: Target },
    { id: 3, name: "Study Schedule", type: "workload", color: "purple", tasks: 8, icon: Clock },
    { id: 4, name: "Course Materials", type: "subjects", color: "orange", tasks: 15, icon: BookOpen },
  ])

  const [newWorkbook, setNewWorkbook] = useState({ name: "", type: "", color: "blue" })

  const workbookTypes = [
    { value: "money", label: "Money Management", icon: DollarSign },
    { value: "tasks", label: "Task Planning", icon: Target },
    { value: "workload", label: "Workload Management", icon: Clock },
    { value: "subjects", label: "Subject Organization", icon: BookOpen },
  ]

  const colors = [
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
    { value: "pink", label: "Pink", class: "bg-pink-500" },
  ]

  const addWorkbook = () => {
    if (newWorkbook.name && newWorkbook.type) {
      const typeInfo = workbookTypes.find((t) => t.value === newWorkbook.type)
      setWorkbooks([
        ...workbooks,
        {
          id: Date.now(),
          name: newWorkbook.name,
          type: newWorkbook.type,
          color: newWorkbook.color,
          tasks: 0,
          icon: typeInfo?.icon || Target,
        },
      ])
      setNewWorkbook({ name: "", type: "", color: "blue" })
    }
  }

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      pink: "bg-pink-500",
    }
    return colorMap[color] || "bg-blue-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">My Workbooks</h2>
          <p className="text-gray-600">Organize your tasks by category</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Workbook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workbook</DialogTitle>
              <DialogDescription>Create a new workbook to organize your tasks and goals.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Workbook Name</Label>
                <Input
                  id="name"
                  value={newWorkbook.name}
                  onChange={(e) => setNewWorkbook({ ...newWorkbook, name: e.target.value })}
                  placeholder="Enter workbook name"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newWorkbook.type}
                  onValueChange={(value) => setNewWorkbook({ ...newWorkbook, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select workbook type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workbookTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Select
                  value={newWorkbook.color}
                  onValueChange={(value) => setNewWorkbook({ ...newWorkbook, color: value })}
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
              <Button onClick={addWorkbook} className="w-full">
                Create Workbook
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workbooks.map((workbook) => {
          const IconComponent = workbook.icon
          return (
            <Dialog key={workbook.id}>
              <DialogTrigger asChild>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${getColorClass(workbook.color)} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="mt-4">{workbook.name}</CardTitle>
                    <CardDescription>{workbookTypes.find((t) => t.value === workbook.type)?.label}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {workbook.tasks} {workbook.tasks === 1 ? "item" : "items"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    {workbook.name}
                  </DialogTitle>
                </DialogHeader>
                {workbook.type === "money" && <BudgetTracker />}
                {workbook.type === "tasks" && <AssignmentPlanner />}
                {workbook.type === "workload" && <StudyScheduleManager />}
                {workbook.type === "subjects" && <CourseMaterials />}
              </DialogContent>
            </Dialog>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common workbook templates to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <DollarSign className="h-6 w-6" />
                  <span>Budget Planner</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget Tracker
                  </DialogTitle>
                </DialogHeader>
                <BudgetTracker />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Target className="h-6 w-6" />
                  <span>Goal Tracker</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Assignment Planner
                  </DialogTitle>
                </DialogHeader>
                <AssignmentPlanner />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Clock className="h-6 w-6" />
                  <span>Time Manager</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Study Schedule Manager
                  </DialogTitle>
                </DialogHeader>
                <StudyScheduleManager />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <BookOpen className="h-6 w-6" />
                  <span>Study Planner</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Course Materials
                  </DialogTitle>
                </DialogHeader>
                <CourseMaterials />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
