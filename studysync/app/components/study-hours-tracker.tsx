"use client"

import { useState } from "react"
import { Plus, Clock, Play, Pause, Square, Calendar } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

interface StudySession {
  id: number
  subject: string
  duration: number // in minutes
  date: string
  notes: string
  type: "focused" | "review" | "practice" | "reading"
}

export default function StudyHoursTracker() {
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: 1,
      subject: "Mathematics",
      duration: 120,
      date: "2024-01-15",
      notes: "Worked on calculus derivatives",
      type: "focused",
    },
    {
      id: 2,
      subject: "History",
      duration: 90,
      date: "2024-01-15",
      notes: "Reading about World War II",
      type: "reading",
    },
    {
      id: 3,
      subject: "Chemistry",
      duration: 60,
      date: "2024-01-14",
      notes: "Lab report writing",
      type: "practice",
    },
    {
      id: 4,
      subject: "Physics",
      duration: 75,
      date: "2024-01-14",
      notes: "Review session for upcoming test",
      type: "review",
    },
  ])

  const [newSession, setNewSession] = useState({
    subject: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    type: "focused" as "focused" | "review" | "practice" | "reading",
  })

  const [timer, setTimer] = useState({
    isRunning: false,
    minutes: 0,
    seconds: 0,
    subject: "",
  })

  const subjects = ["Mathematics", "History", "Chemistry", "Biology", "Physics", "English"]

  const addSession = () => {
    if (newSession.subject && newSession.duration && newSession.date) {
      const session: StudySession = {
        id: Date.now(),
        subject: newSession.subject,
        duration: Number.parseInt(newSession.duration),
        date: newSession.date,
        notes: newSession.notes,
        type: newSession.type,
      }
      setSessions([...sessions, session])
      setNewSession({
        subject: "",
        duration: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
        type: "focused",
      })
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getTotalHours = () => {
    return sessions.reduce((total, session) => total + session.duration, 0)
  }

  const getWeeklyHours = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return sessions
      .filter((session) => new Date(session.date) >= oneWeekAgo)
      .reduce((total, session) => total + session.duration, 0)
  }

  const getTodayHours = () => {
    const today = new Date().toISOString().split("T")[0]
    return sessions.filter((session) => session.date === today).reduce((total, session) => total + session.duration, 0)
  }

  const getSubjectBreakdown = () => {
    const breakdown: { [key: string]: number } = {}
    sessions.forEach((session) => {
      breakdown[session.subject] = (breakdown[session.subject] || 0) + session.duration
    })
    return Object.entries(breakdown).map(([subject, minutes]) => ({
      subject,
      minutes,
      hours: minutes / 60,
    }))
  }

  const weeklyGoal = 30 * 60 // 30 hours in minutes
  const weeklyProgress = (getWeeklyHours() / weeklyGoal) * 100

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Study Hours Tracker</h2>
          <p className="text-gray-600">Track your study time and stay motivated</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Log Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Study Session</DialogTitle>
              <DialogDescription>Record a completed study session.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-subject">Subject</Label>
                  <Select
                    value={newSession.subject}
                    onValueChange={(value) => setNewSession({ ...newSession, subject: value })}
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
                  <Label htmlFor="session-duration">Duration (minutes)</Label>
                  <Input
                    id="session-duration"
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                    placeholder="60"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-date">Date</Label>
                  <Input
                    id="session-date"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select
                    value={newSession.type}
                    onValueChange={(value: "focused" | "review" | "practice" | "reading") =>
                      setNewSession({ ...newSession, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="focused">Focused Study</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="practice">Practice</SelectItem>
                      <SelectItem value="reading">Reading</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="session-notes">Notes (optional)</Label>
                <Input
                  id="session-notes"
                  value={newSession.notes}
                  onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                  placeholder="What did you study?"
                />
              </div>
              <Button onClick={addSession} className="w-full">
                Log Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(getTodayHours())}</div>
            <p className="text-sm text-gray-600">Study time today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(getWeeklyHours())}</div>
            <p className="text-sm text-gray-600">Weekly progress</p>
            <Progress value={weeklyProgress} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">{Math.round(weeklyProgress)}% of weekly goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(getTotalHours())}</div>
            <p className="text-sm text-gray-600">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Study Timer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Study Timer
          </CardTitle>
          <CardDescription>Start a focused study session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-mono">
                {String(timer.minutes).padStart(2, "0")}:{String(timer.seconds).padStart(2, "0")}
              </div>
              <Select value={timer.subject} onValueChange={(value) => setTimer({ ...timer, subject: value })}>
                <SelectTrigger className="w-48">
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
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Pause className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Square className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Breakdown</CardTitle>
          <CardDescription>Time spent on each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getSubjectBreakdown().map(({ subject, minutes, hours }) => (
              <div key={subject} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{subject}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatDuration(minutes)}</div>
                  <div className="text-sm text-gray-500">{hours.toFixed(1)} hours</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Sessions
          </CardTitle>
          <CardDescription>Your latest study sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5)
              .map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{session.subject}</div>
                    <div className="text-sm text-gray-600">{session.notes}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {session.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{session.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatDuration(session.duration)}</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
