"use client"

import { useState } from "react"
import { Folder, FileText, Upload, Download, Eye, Trash2 } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Material {
  id: number
  name: string
  type: "pdf" | "doc" | "ppt" | "note" | "image" | "other"
  size: string
  uploadDate: string
  subject: string
}

interface Subject {
  id: number
  name: string
  code: string
  color: string
  materialCount: number
}

export default function CourseMaterials() {
  const [subjects] = useState<Subject[]>([
    { id: 1, name: "Advanced Calculus", code: "MATH301", color: "blue", materialCount: 8 },
    { id: 2, name: "World History", code: "HIST201", color: "green", materialCount: 12 },
    { id: 3, name: "Chemistry Lab", code: "CHEM205", color: "purple", materialCount: 6 },
    { id: 4, name: "Physics", code: "PHYS101", color: "orange", materialCount: 10 },
  ])

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: "Calculus_Chapter_5_Notes.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      subject: "MATH301",
    },
    {
      id: 2,
      name: "Integration_Techniques.docx",
      type: "doc",
      size: "1.2 MB",
      uploadDate: "2024-01-14",
      subject: "MATH301",
    },
    {
      id: 3,
      name: "WWII_Timeline.pdf",
      type: "pdf",
      size: "3.1 MB",
      uploadDate: "2024-01-13",
      subject: "HIST201",
    },
    {
      id: 4,
      name: "Lab_Report_Template.docx",
      type: "doc",
      size: "0.8 MB",
      uploadDate: "2024-01-12",
      subject: "CHEM205",
    },
  ])

  const [selectedSubject, setSelectedSubject] = useState<string>("MATH301")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 text-xs font-bold">
            PDF
          </div>
        )
      case "doc":
        return (
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold">
            DOC
          </div>
        )
      case "ppt":
        return (
          <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-600 text-xs font-bold">
            PPT
          </div>
        )
      case "note":
        return <FileText className="w-8 h-8 text-gray-600" />
      case "image":
        return (
          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 text-xs font-bold">
            IMG
          </div>
        )
      default:
        return <FileText className="w-8 h-8 text-gray-600" />
    }
  }

  const getSubjectMaterials = (subjectCode: string) => {
    return materials.filter((material) => material.subject === subjectCode)
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
          <h2 className="text-3xl font-bold">Course Materials</h2>
          <p className="text-gray-600">Organize and access your study materials by subject</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Course Material</DialogTitle>
              <DialogDescription>Add new files to your course materials.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="material-subject">Subject</Label>
                <select className="w-full p-2 border rounded-md">
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.code}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="file-upload">Choose Files</Label>
                <Input id="file-upload" type="file" multiple className="mt-2" />
                <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, PPT, images, and more</p>
              </div>
              <Button className="w-full">Upload Files</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {subjects.map((subject) => (
            <TabsTrigger key={subject.id} value={subject.code} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getColorClass(subject.color)}`}></div>
              {subject.code}
            </TabsTrigger>
          ))}
        </TabsList>

        {subjects.map((subject) => (
          <TabsContent key={subject.id} value={subject.code} className="space-y-4">
            {/* Subject Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getColorClass(subject.color)} text-white`}>
                    <Folder className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>
                      {subject.code} • {getSubjectMaterials(subject.code).length} files
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Materials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getSubjectMaterials(subject.code).map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      {getFileIcon(material.type)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm truncate">{material.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {material.size} • {material.uploadDate}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {material.type.toUpperCase()}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getSubjectMaterials(subject.code).length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Folder className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No materials yet</h3>
                  <p className="text-gray-500 mb-4">Upload your first course material for {subject.name}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload to {subject.name}</DialogTitle>
                        <DialogDescription>Add files to this subject folder.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="file-upload">Choose Files</Label>
                          <Input id="file-upload" type="file" multiple className="mt-2" />
                        </div>
                        <Button className="w-full">Upload Files</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Storage Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Summary</CardTitle>
          <CardDescription>Overview of your course materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="text-center">
                <div
                  className={`w-12 h-12 mx-auto rounded-lg ${getColorClass(subject.color)} text-white flex items-center justify-center mb-2`}
                >
                  <Folder className="h-6 w-6" />
                </div>
                <div className="font-medium text-sm">{subject.code}</div>
                <div className="text-xs text-gray-500">{getSubjectMaterials(subject.code).length} files</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
