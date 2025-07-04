"use client"

import { useState } from "react"
import { Plus, Check, Clock, AlertCircle, Edit, Trash2 } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: number
  title: string
  description: string
  subject: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
  createdAt: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Math Assignment - Chapter 5",
      description: "Complete exercises 1-20 on derivatives",
      subject: "Mathematics",
      dueDate: "2024-01-16",
      priority: "high",
      completed: false,
      createdAt: "2024-01-14",
    },
    {
      id: 2,
      title: "History Essay",
      description: "Write 1500 words on World War II causes",
      subject: "History",
      dueDate: "2024-01-18",
      priority: "medium",
      completed: false,
      createdAt: "2024-01-13",
    },
    {
      id: 3,
      title: "Science Lab Report",
      description: "Document chemistry experiment results",
      subject: "Chemistry",
      dueDate: "2024-01-22",
      priority: "low",
      completed: false,
      createdAt: "2024-01-12",
    },
    {
      id: 4,
      title: "Read Chapter 3",
      description: "Biology textbook reading assignment",
      subject: "Biology",
      dueDate: "2024-01-15",
      priority: "medium",
      completed: true,
      createdAt: "2024-01-10",
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
    priority: "medium" as "high" | "medium" | "low",
  })

  const subjects = ["Mathematics", "History", "Chemistry", "Biology", "Physics", "English"]

  const addTask = () => {
    if (newTask.title && newTask.subject && newTask.dueDate) {
      const task: Task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTasks([...tasks, task])
      setNewTask({
        title: "",
        description: "",
        subject: "",
        dueDate: "",
        priority: "medium",
      })
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
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

  const activeTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Task Manager</h2>
          <p className="text-gray-600">
            {activeTasks.length} active tasks, {completedTasks.length} completed
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task to track your assignments and deadlines.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task details..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-subject">Subject</Label>
                  <Select value={newTask.subject} onValueChange={(value) => setNewTask({ ...newTask, subject: value })}>
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
                  <Label htmlFor="task-priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: "high" | "medium" | "low") => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="task-due">Due Date</Label>
                <Input
                  id="task-due"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <Button onClick={addTask} className="w-full">
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Tasks ({activeTasks.length})
          </CardTitle>
          <CardDescription>Tasks that need your attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-4 p-4 border rounded-lg">
              <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {task.subject}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority} priority
                      </Badge>
                      <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activeTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active tasks. Great job!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Completed Tasks ({completedTasks.length})
            </CardTitle>
            <CardDescription>Tasks you've finished</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-4 p-4 border rounded-lg opacity-75">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium line-through">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {task.subject}
                        </Badge>
                        <span className="text-xs text-gray-500">Completed</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
