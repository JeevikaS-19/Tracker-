"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Pen, Square, Circle, ArrowRight, Type, Eraser, Download, Trash2 } from "lucide-react"

export default function WhiteboardTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"pen" | "rectangle" | "circle" | "arrow" | "text" | "eraser">("pen")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Set default styles
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setStartPos({ x, y })

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth

    if (tool === "pen") {
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (tool === "pen") {
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.beginPath()
      ctx.arc(x, y, strokeWidth * 2, 0, 2 * Math.PI)
      ctx.fill()
      ctx.globalCompositeOperation = "source-over"
    }
  }

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(false)

    // Draw shapes
    if (tool === "rectangle") {
      const width = x - startPos.x
      const height = y - startPos.y
      ctx.strokeRect(startPos.x, startPos.y, width, height)
    } else if (tool === "circle") {
      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
      ctx.beginPath()
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
      ctx.stroke()
    } else if (tool === "arrow") {
      // Draw arrow line
      ctx.beginPath()
      ctx.moveTo(startPos.x, startPos.y)
      ctx.lineTo(x, y)
      ctx.stroke()

      // Draw arrowhead
      const angle = Math.atan2(y - startPos.y, x - startPos.x)
      const headLength = 15
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x - headLength * Math.cos(angle - Math.PI / 6), y - headLength * Math.sin(angle - Math.PI / 6))
      ctx.moveTo(x, y)
      ctx.lineTo(x - headLength * Math.cos(angle + Math.PI / 6), y - headLength * Math.sin(angle + Math.PI / 6))
      ctx.stroke()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "flowchart.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Button variant={tool === "pen" ? "default" : "outline"} size="sm" onClick={() => setTool("pen")}>
            <Pen className="h-4 w-4" />
          </Button>
          <Button variant={tool === "rectangle" ? "default" : "outline"} size="sm" onClick={() => setTool("rectangle")}>
            <Square className="h-4 w-4" />
          </Button>
          <Button variant={tool === "circle" ? "default" : "outline"} size="sm" onClick={() => setTool("circle")}>
            <Circle className="h-4 w-4" />
          </Button>
          <Button variant={tool === "arrow" ? "default" : "outline"} size="sm" onClick={() => setTool("arrow")}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant={tool === "text" ? "default" : "outline"} size="sm" onClick={() => setTool("text")}>
            <Type className="h-4 w-4" />
          </Button>
          <Button variant={tool === "eraser" ? "default" : "outline"} size="sm" onClick={() => setTool("eraser")}>
            <Eraser className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Colors */}
        <div className="flex items-center gap-1">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded border-2 ${strokeColor === color ? "border-gray-800" : "border-gray-300"}`}
              style={{ backgroundColor: color }}
              onClick={() => setStrokeColor(color)}
            />
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Stroke Width */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Size:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-16"
          />
          <span className="text-sm w-4">{strokeWidth}</span>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCanvas}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={() => setIsDrawing(false)}
        />
      </div>

      <div className="text-sm text-gray-600">
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Select a tool from the toolbar above</li>
          <li>For shapes and arrows: click and drag to create</li>
          <li>For pen: click and drag to draw freely</li>
          <li>Use the eraser to remove parts of your drawing</li>
          <li>Download your flowchart when finished</li>
        </ul>
      </div>
    </div>
  )
}
