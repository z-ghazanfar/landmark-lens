"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, Image, Loader2 } from "lucide-react"
import { getLandmarkById } from "@/lib/mock-data"
import type { Landmark } from "@/types"

export function EditLandmarkForm({ areaId, landmarkId }: { areaId: string; landmarkId: string }) {
  const router = useRouter()
  const [landmark, setLandmark] = useState<Landmark | null>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<"audio" | "image">("audio")
  const [contentTitle, setContentTitle] = useState("")
  const [contentDescription, setContentDescription] = useState("")

  useEffect(() => {
    // Fetch landmark data
    const landmarkData = getLandmarkById(landmarkId)

    if (landmarkData) {
      setLandmark(landmarkData)
      setName(landmarkData.name)
      setDescription(landmarkData.description)
      setType(landmarkData.type)
      setContentTitle(landmarkData.content.title)
      setContentDescription(landmarkData.content.description)
    }

    setLoading(false)
  }, [landmarkId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log("Updating landmark:", {
      id: landmarkId,
      name,
      description,
      type,
      content: {
        title: contentTitle,
        description: contentDescription,
      },
    })
    // After successful update, redirect back to the area page
    router.push(`/areas/${areaId}`)
  }

  if (loading) {
    return (
      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mr-2" />
          <span className="text-slate-600">Loading landmark data...</span>
        </CardContent>
      </Card>
    )
  }

  if (!landmark) {
    return (
      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="py-10">
          <p className="text-center text-red-500">Landmark not found</p>
          <Button
            className="mt-4 mx-auto block bg-indigo-500 hover:bg-indigo-600"
            onClick={() => router.push(`/areas/${areaId}`)}
          >
            Return to Area
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-white to-indigo-50 rounded-t-lg">
        <CardTitle className="text-slate-700 flex items-center">
          {type === "audio" ? (
            <FileAudio className="mr-2 h-5 w-5 text-indigo-400" />
          ) : (
            <Image className="mr-2 h-5 w-5 text-indigo-400" />
          )}
          Edit Landmark
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-slate-200 focus:border-indigo-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border-slate-200 focus:border-indigo-300"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700">Type</Label>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as "audio" | "image")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 p-2 rounded-md bg-slate-50">
                <RadioGroupItem value="audio" id="audio" className="text-indigo-500" />
                <Label htmlFor="audio" className="text-slate-700 flex items-center">
                  <FileAudio className="mr-2 h-4 w-4 text-indigo-400" />
                  Audio
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-md bg-slate-50">
                <RadioGroupItem value="image" id="image" className="text-indigo-500" />
                <Label htmlFor="image" className="text-slate-700 flex items-center">
                  <Image className="mr-2 h-4 w-4 text-indigo-400" />
                  Image
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-lg font-medium text-slate-700 mb-4">Content Information</h3>

            <div className="space-y-2">
              <Label htmlFor="contentTitle" className="text-slate-700">
                Content Title
              </Label>
              <Input
                id="contentTitle"
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                required
                className="border-slate-200 focus:border-indigo-300"
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="contentDescription" className="text-slate-700">
                Content Description
              </Label>
              <Textarea
                id="contentDescription"
                value={contentDescription}
                onChange={(e) => setContentDescription(e.target.value)}
                required
                className="border-slate-200 focus:border-indigo-300"
              />
            </div>

            {type === "audio" && (
              <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Audio File</h4>
                <p className="text-sm text-slate-600 mb-2">Current file: {landmark.content.mediaUrl || "None"}</p>
                <Button type="button" variant="outline" className="w-full border-slate-200 text-slate-700">
                  Replace Audio File
                </Button>
              </div>
            )}

            {type === "image" && (
              <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Image File</h4>
                <p className="text-sm text-slate-600 mb-2">Current file: {landmark.content.mediaUrl || "None"}</p>
                <Button type="button" variant="outline" className="w-full border-slate-200 text-slate-700">
                  Replace Image File
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600">
              Update Landmark
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

