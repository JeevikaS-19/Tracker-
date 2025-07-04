"use client"

import { useState } from "react"
import { Plus, Search, FileText, Folder, Star, Edit, Trash2, Share, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WhiteboardTool from "./whiteboard-tool"
import AiOutlineTool from "./ai-outline-tool"

interface Note {
  id: number
  title: string
  subject: string
  content: string
  date: string
  starred: boolean
  type: "text" | "mindmap" | "flowchart" | "outline"
  externalLink?: string
  editorType?: "google-docs" | "word" | "onenote"
}

interface FolderMaterial {
  id: number
  name: string
  type: "pdf" | "doc" | "ppt" | "image" | "note"
  size: string
  uploadDate: string
  subject: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Calculus Derivatives",
      subject: "Mathematics",
      content: "Key concepts and formulas for derivatives...",
      date: "2024-01-15",
      starred: true,
      type: "text",
      externalLink: "https://docs.google.com/document/d/example1",
      editorType: "google-docs",
    },
    {
      id: 2,
      title: "World War II Timeline",
      subject: "History",
      content: "Important dates and events...",
      date: "2024-01-14",
      starred: false,
      type: "text",
      externalLink: "https://office.live.com/start/Word.aspx?example2",
      editorType: "word",
    },
    {
      id: 3,
      title: "Chemical Reactions Mind Map",
      subject: "Chemistry",
      content: "Visual representation of reaction types...",
      date: "2024-01-13",
      starred: true,
      type: "mindmap",
    },
    {
      id: 4,
      title: "Physics Formulas",
      subject: "Physics",
      content: "Collection of important physics formulas...",
      date: "2024-01-12",
      starred: false,
      type: "text",
      externalLink: "https://www.onenote.com/notebooks/example4",
      editorType: "onenote",
    },
  ])

  const [folders] = useState([
    { id: 1, name: "Mathematics", count: 8, color: "blue" },
    { id: 2, name: "History", count: 6, color: "green" },
    { id: 3, name: "Chemistry", count: 7, color: "purple" },
    { id: 4, name: "Physics", count: 9, color: "orange" },
  ])

  const [folderMaterials] = useState<FolderMaterial[]>([
    {
      id: 1,
      name: "Calculus_Chapter_5_Notes.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      subject: "Mathematics",
    },
    {
      id: 2,
      name: "Integration_Techniques.docx",
      type: "doc",
      size: "1.2 MB",
      uploadDate: "2024-01-14",
      subject: "Mathematics",
    },
    {
      id: 3,
      name: "Derivative_Rules_Summary.pdf",
      type: "pdf",
      size: "0.8 MB",
      uploadDate: "2024-01-13",
      subject: "Mathematics",
    },
    {
      id: 4,
      name: "WWII_Timeline.pdf",
      type: "pdf",
      size: "3.1 MB",
      uploadDate: "2024-01-13",
      subject: "History",
    },
    {
      id: 5,
      name: "Battle_Strategies.ppt",
      type: "ppt",
      size: "5.2 MB",
      uploadDate: "2024-01-12",
      subject: "History",
    },
    {
      id: 6,
      name: "Chemical_Bonds_Diagram.png",
      type: "image",
      size: "1.8 MB",
      uploadDate: "2024-01-11",
      subject: "Chemistry",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const subjects = ["Mathematics", "History", "Chemistry", "Physics", "Biology", "English"]

  const openNoteInEditor = (note: Note) => {
    if (note.externalLink) {
      window.open(note.externalLink, "_blank")
    } else {
      // Create new document based on editor type
      let editorUrl = ""
      switch (note.editorType) {
        case "google-docs":
          editorUrl = "https://docs.google.com/document/create"
          break
        case "word":
          editorUrl = "https://office.live.com/start/Word.aspx"
          break
        case "onenote":
          editorUrl = "https://www.onenote.com/notebooks"
          break
        default:
          editorUrl = "https://docs.google.com/document/create"
      }
      window.open(editorUrl, "_blank")
    }
  }

  const getEditorIcon = (editorType?: string) => {
    switch (editorType) {
      case "google-docs":
        return <div className="w-4 h-4 bg-blue-500 rounded"></div>
      case "word":
        return <div className="w-4 h-4 bg-blue-600 rounded"></div>
      case "onenote":
        return <div className="w-4 h-4 bg-purple-600 rounded"></div>
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getFolderMaterials = (folderName: string) => {
    return folderMaterials.filter((material) => material.subject === folderName)
  }

  const getFolderNotes = (folderName: string) => {
    return notes.filter((note) => note.subject === folderName)
  }

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
      case "image":
        return (
          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 text-xs font-bold">
            IMG
          </div>
        )
      case "note":
        return <FileText className="w-8 h-8 text-gray-600" />
      default:
        return <FileText className="w-8 h-8 text-gray-600" />
    }
  }

  if (selectedFolder) {
    const folderMats = getFolderMaterials(selectedFolder)
    const folderNts = getFolderNotes(selectedFolder)
    const folder = folders.find((f) => f.name === selectedFolder)

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedFolder(null)} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Notes
          </Button>
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${folder?.color}-500 text-white`}>
                <Folder className="h-6 w-6" />
              </div>
              {selectedFolder}
            </h2>
            <p className="text-gray-600">
              {folderMats.length} materials • {folderNts.length} notes
            </p>
          </div>
        </div>

        <Tabs defaultValue="materials" className="w-full">
          <TabsList>
            <TabsTrigger value="materials">Materials ({folderMats.length})</TabsTrigger>
            <TabsTrigger value="notes">Notes ({folderNts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folderMats.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      {getFileIcon(material.type)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm truncate">{material.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {material.size} • {material.uploadDate}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="outline" className="text-xs">
                      {material.type.toUpperCase()}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folderNts.map((note) => (
                <Card
                  key={note.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openNoteInEditor(note)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getEditorIcon(note.editorType)}
                          {note.title}
                          {note.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </CardTitle>
                        <CardDescription>{note.subject}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <Share className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{note.content}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {note.type === "mindmap" ? "Mind Map" : "Text Note"}
                      </Badge>
                      <span className="text-xs text-gray-500">{note.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">My Notes</h2>
          <p className="text-gray-600">Store and organize your study materials</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription>Create a new note or mind map for your studies.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter note title" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
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
              </div>

              <div>
                <Label htmlFor="type">Note Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select note type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text Note</SelectItem>
                    <SelectItem value="mindmap">Mind Map</SelectItem>
                    <SelectItem value="flowchart">Flow Chart</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PDF Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <Label htmlFor="pdf-upload">Upload Reference Material (PDF)</Label>
                <Input id="pdf-upload" type="file" accept=".pdf" className="mt-2" />
                <p className="text-sm text-gray-500 mt-1">Upload PDF materials to reference while taking notes</p>
              </div>

              {/* External Editor Links */}
              <div>
                <Label>Link to External Editor</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://docs.google.com/document/create", "_blank")}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    Google Docs
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://office.live.com/start/Word.aspx", "_blank")}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    Word Online
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://www.onenote.com/notebooks", "_blank")}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    OneNote
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Create your note in your preferred editor and link it back here
                </p>
              </div>

              <div>
                <Label htmlFor="content">Content / External Link</Label>
                <Textarea
                  id="content"
                  placeholder="Start writing your note or paste the link to your external document..."
                  className="min-h-[200px]"
                />
              </div>

              <Button className="w-full">Create Note</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList>
          <TabsTrigger value="notes">All Notes</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openNoteInEditor(note)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {note.type === "mindmap" ? (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        ) : (
                          getEditorIcon(note.editorType)
                        )}
                        {note.title}
                        {note.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        {note.externalLink && <ExternalLink className="h-4 w-4 text-gray-400" />}
                      </CardTitle>
                      <CardDescription>{note.subject}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <Share className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {note.type === "mindmap" ? "Mind Map" : "Text Note"}
                    </Badge>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <Card
                key={folder.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedFolder(folder.name)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto w-16 h-16 bg-${folder.color}-100 rounded-lg flex items-center justify-center mb-2`}
                  >
                    <Folder className={`h-8 w-8 text-${folder.color}-600`} />
                  </div>
                  <CardTitle className="text-lg">{folder.name}</CardTitle>
                  <CardDescription>
                    {getFolderMaterials(folder.name).length} materials • {getFolderNotes(folder.name).length} notes
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes
              .filter((note) => note.starred)
              .map((note) => (
                <Card
                  key={note.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openNoteInEditor(note)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getEditorIcon(note.editorType)}
                          {note.title}
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {note.externalLink && <ExternalLink className="h-4 w-4 text-gray-400" />}
                        </CardTitle>
                        <CardDescription>{note.subject}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{note.content}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {note.type === "mindmap" ? "Mind Map" : "Text Note"}
                      </Badge>
                      <span className="text-xs text-gray-500">{note.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tools</CardTitle>
          <CardDescription>Create different types of study materials with integrated tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Text Note</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Text Note</DialogTitle>
                  <DialogDescription>Choose your preferred text editor</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Button
                    onClick={() => window.open("https://docs.google.com/document/create", "_blank")}
                    className="w-full flex items-center gap-3 justify-start h-12"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Google Docs</div>
                      <div className="text-xs text-gray-500">Create online document</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => window.open("https://office.live.com/start/Word.aspx", "_blank")}
                    className="w-full flex items-center gap-3 justify-start h-12"
                    variant="outline"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Microsoft Word Online</div>
                      <div className="text-xs text-gray-500">Create Word document</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => window.open("https://www.onenote.com/notebooks", "_blank")}
                    className="w-full flex items-center gap-3 justify-start h-12"
                    variant="outline"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">OneNote</div>
                      <div className="text-xs text-gray-500">Create notebook page</div>
                    </div>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                  <span>Mind Map</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Mind Map</DialogTitle>
                  <DialogDescription>Choose your preferred mind mapping tool</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Button
                    onClick={() => window.open("https://app.diagrams.net/", "_blank")}
                    className="w-full flex items-center gap-3 justify-start h-12"
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Draw.io (diagrams.net)</div>
                      <div className="text-xs text-gray-500">Free online diagramming</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => window.open("https://www.mindmeister.com/", "_blank")}
                    className="w-full flex items-center gap-3 justify-start h-12"
                    variant="outline"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">MindMeister</div>
                      <div className="text-xs text-gray-500">Collaborative mind mapping</div>
                    </div>
                  </Button>
                  <Button
                    onClick={() => window.open("https://coggle.it/", "_blank")}
                    className="w-full flex items-center gap-3 justify-start h-12"
                    variant="outline"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Coggle</div>
                      <div className="text-xs text-gray-500">Simple mind mapping</div>
                    </div>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
                  <span>Flow Chart</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Create Flow Chart</DialogTitle>
                  <DialogDescription>Choose a flowchart tool or use our built-in whiteboard</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="external" className="w-full">
                  <TabsList>
                    <TabsTrigger value="external">External Tools</TabsTrigger>
                    <TabsTrigger value="whiteboard">Built-in Whiteboard</TabsTrigger>
                  </TabsList>
                  <TabsContent value="external" className="space-y-4">
                    <Button
                      onClick={() => window.open("https://app.diagrams.net/", "_blank")}
                      className="w-full flex items-center gap-3 justify-start h-12"
                    >
                      <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Draw.io</div>
                        <div className="text-xs text-gray-500">Professional flowcharts</div>
                      </div>
                    </Button>
                    <Button
                      onClick={() => window.open("https://www.lucidchart.com/", "_blank")}
                      className="w-full flex items-center gap-3 justify-start h-12"
                      variant="outline"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Lucidchart</div>
                        <div className="text-xs text-gray-500">Collaborative diagramming</div>
                      </div>
                    </Button>
                  </TabsContent>
                  <TabsContent value="whiteboard">
                    <WhiteboardTool />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <span>AI Outline</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>AI-Powered Study Assistant</DialogTitle>
                  <DialogDescription>Generate outlines, summaries, and find learning resources</DialogDescription>
                </DialogHeader>
                <AiOutlineTool />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
