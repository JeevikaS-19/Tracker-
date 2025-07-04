"use client"

import { useState } from "react"
import { Calendar, BookOpen, FileText, Target } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "./components/dashboard"
import Workbooks from "./components/workbooks"
import Timetable from "./components/timetable"
import Notes from "./components/notes"
import Header from "./components/header"

export default function StudentOrganizer() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="workbooks" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Workbooks
            </TabsTrigger>
            <TabsTrigger value="timetable" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timetable
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="workbooks">
            <Workbooks />
          </TabsContent>

          <TabsContent value="timetable">
            <Timetable />
          </TabsContent>

          <TabsContent value="notes">
            <Notes />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
