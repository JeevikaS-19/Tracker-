"use client"

import { useState } from "react"
import { Plus, Clock, MapPin, Edit, Trash2 } from "lucide-react"
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

export default function Timetable() {
  const [schedule, setSchedule] = useState([
    { id: 1, day: "Monday", time: "08:00 AM", subject: "Mathematics", room: "Room 101", color: "blue", duration: "2h" },
    { id: 2, day: "Monday", time: "10:30 AM", subject: "Physics", room: "Lab 2", color: "green", duration: "1.5h" },
    { id: 3, day: "Monday", time: "02:00 PM", subject: "Chemistry", room: "Lab 1", color: "purple", duration: "2h" },
    { id: 4, day: "Tuesday", time: "09:00 AM", subject: "History", room: "Room 205", color: "orange", duration: "1h" },
    { id: 5, day: "Tuesday", time: "11:00 AM", subject: "English", room: "Room 301", color: "red", duration: "1h" },
    { id: 6, day: "Tuesday", time: "01:00 PM", subject: "Biology", room: "Lab 3", color: "pink", duration: "1.5h" },
    {
      id: 7,
      day: "Wednesday",
      time: "08:30 AM",
      subject: "Mathematics",
      room: "Room 101",
      color: "blue",
      duration: "1h",
    },
    {
      id: 8,
      day: "Wednesday",
      time: "10:00 AM",
      subject: "Computer Science",
      room: "Lab 4",
      color: "indigo",
      duration: "2h",
    },
    { id: 9, day: "Thursday", time: "09:00 AM", subject: "Physics", room: "Lab 2", color: "green", duration: "1.5h" },
    { id: 10, day: "Thursday", time: "02:00 PM", subject: "Art", room: "Studio 1", color: "yellow", duration: "2h" },
    { id: 11, day: "Friday", time: "08:00 AM", subject: "Chemistry", room: "Lab 1", color: "purple", duration: "1h" },
    {
      id: 12,
      day: "Friday",
      time: "10:00 AM",
      subject: "History",
      room: "Room 205",
      color: "orange",
      duration: "1.5h",
    },
  ])

  const [subjects] = useState([
    {
      name: "Mathematics",
      color: "blue",
      instructor: "Dr. Smith",
      credits: 4,
      room: "Room 101",
      schedule: "Mon 8AM, Wed 8:30AM",
    },
    {
      name: "Physics",
      color: "green",
      instructor: "Prof. Johnson",
      credits: 3,
      room: "Lab 2",
      schedule: "Mon 10:30AM, Thu 9AM",
    },
    {
      name: "Chemistry",
      color: "purple",
      instructor: "Dr. Brown",
      credits: 4,
      room: "Lab 1",
      schedule: "Mon 2PM, Fri 8AM",
    },
    { name: "Biology", color: "pink", instructor: "Dr. Wilson", credits: 3, room: "Lab 3", schedule: "Tue 1PM" },
    {
      name: "History",
      color: "orange",
      instructor: "Prof. Davis",
      credits: 3,
      room: "Room 205",
      schedule: "Tue 9AM, Fri 10AM",
    },
    { name: "English", color: "red", instructor: "Ms. Taylor", credits: 2, room: "Room 301", schedule: "Tue 11AM" },
    {
      name: "Computer Science",
      color: "indigo",
      instructor: "Dr. Lee",
      credits: 4,
      room: "Lab 4",
      schedule: "Wed 10AM",
    },
    { name: "Art", color: "yellow", instructor: "Ms. Garcia", credits: 2, room: "Studio 1", schedule: "Thu 2PM" },
  ])

  const [editingClass, setEditingClass] = useState<any>(null)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const times = [
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ]

  const colors = [
    { value: "blue", class: "bg-blue-100 text-blue-800 border-blue-200" },
    { value: "green", class: "bg-green-100 text-green-800 border-green-200" },
    { value: "orange", class: "bg-orange-100 text-orange-800 border-orange-200" },
    { value: "purple", class: "bg-purple-100 text-purple-800 border-purple-200" },
    { value: "red", class: "bg-red-100 text-red-800 border-red-200" },
    { value: "pink", class: "bg-pink-100 text-pink-800 border-pink-200" },
  ]

  const getColorClass = (color: string) => {
    return colors.find((c) => c.value === color)?.class || "bg-blue-100 text-blue-800 border-blue-200"
  }

  const convertTo24Hour = (time: string) => {
    const [timePart, period] = time.split(" ")
    const [hours, minutes] = timePart.split(":").map(Number)
    let hour24 = hours

    if (period === "PM" && hours !== 12) {
      hour24 += 12
    } else if (period === "AM" && hours === 12) {
      hour24 = 0
    }

    return hour24 * 60 + minutes // Return total minutes for easy comparison
  }

  const getScheduleForDay = (day: string) => {
    return schedule.filter((item) => item.day === day).sort((a, b) => convertTo24Hour(a.time) - convertTo24Hour(b.time))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">My Timetable</h2>
          <p className="text-gray-600">Manage your class schedule and deadlines</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>Add a new class to your timetable.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day">Day</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toLowerCase()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {times.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.name} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="room">Room/Location</Label>
                  <Input placeholder="e.g., Room 101" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input placeholder="e.g., 1h 30m" />
                </div>
              </div>
              <Button className="w-full">Add Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Weekly View */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {days.map((day) => (
          <Card key={day} className="min-h-[400px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{day}</CardTitle>
              <CardDescription>
                {getScheduleForDay(day).length} {getScheduleForDay(day).length === 1 ? "class" : "classes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {getScheduleForDay(day).map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div
                      className={`p-3 rounded-lg border ${getColorClass(item.color)} relative group cursor-pointer hover:shadow-md transition-shadow`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium">{item.time}</div>
                        <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="font-semibold text-sm mb-1">{item.subject}</div>
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3" />
                        {item.room}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Class</DialogTitle>
                      <DialogDescription>Update class information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Day</Label>
                          <Select defaultValue={item.day.toLowerCase()}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map((day) => (
                                <SelectItem key={day} value={day.toLowerCase()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Time</Label>
                          <Select defaultValue={item.time}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {times.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Subject</Label>
                        <Select defaultValue={item.subject}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.name} value={subject.name}>
                                {subject.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Room/Location</Label>
                          <Input defaultValue={item.room} />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input defaultValue={item.duration} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Save Changes</Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subject Management */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Management</CardTitle>
          <CardDescription>Manage your subjects and their color coding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {subjects.map((subject) => (
              <div key={subject.name} className="relative group">
                <div className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-8 h-8 ${getColorClass(subject.color)} rounded-full`}></div>
                  <span className="text-sm font-medium text-center">{subject.name}</span>
                </div>

                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  <div className="font-medium">{subject.name}</div>
                  <div>Instructor: {subject.instructor}</div>
                  <div>Credits: {subject.credits}</div>
                  <div>Room: {subject.room}</div>
                  <div>Schedule: {subject.schedule}</div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Important dates and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <div className="font-medium">Math Assignment</div>
                <div className="text-sm text-gray-600">Due tomorrow</div>
              </div>
              <Badge variant="destructive">High Priority</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div>
                <div className="font-medium">History Essay</div>
                <div className="text-sm text-gray-600">Due in 3 days</div>
              </div>
              <Badge variant="secondary">Medium Priority</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <div className="font-medium">Science Project</div>
                <div className="text-sm text-gray-600">Due next week</div>
              </div>
              <Badge variant="outline">Low Priority</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
