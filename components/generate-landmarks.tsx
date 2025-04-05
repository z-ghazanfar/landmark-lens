"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Sparkles } from "lucide-react"

export function GenerateLandmarks({ areaId }: { areaId: string }) {
  const [areaDescription, setAreaDescription] = useState("")
  const [generatedLandmarks, setGeneratedLandmarks] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate a list of 5 interesting landmarks for an area described as: "${areaDescription}". For each landmark, provide a name and a brief description. Format the output as a numbered list.`,
        system:
          "You are an AI assistant specializing in creating engaging and informative AR experiences for tourists and explorers.",
      })
      setGeneratedLandmarks(text)
    } catch (error) {
      console.error("Error generating landmarks:", error)
      setGeneratedLandmarks("An error occurred while generating landmarks. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-white to-amber-50 rounded-t-lg">
        <CardTitle className="text-slate-700 flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
          Generate Landmarks with AI
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Describe the area (e.g., 'historic downtown with 19th century architecture')"
              value={areaDescription}
              onChange={(e) => setAreaDescription(e.target.value)}
              className="border-slate-200 focus:border-amber-300"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !areaDescription}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            {isLoading ? "Generating..." : "Generate Landmarks"}
          </Button>
          {generatedLandmarks && (
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <Textarea value={generatedLandmarks} readOnly className="h-64 bg-white border-slate-200" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

