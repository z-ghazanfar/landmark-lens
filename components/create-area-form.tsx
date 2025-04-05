"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Loader2 } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// This would typically come from an environment variable
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xhbmRtYXJrbGVucyJ9.exampletoken123456"

export function CreateAreaForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [areaType, setAreaType] = useState("outdoor")
  const [location, setLocation] = useState("")
  const [mapLoading, setMapLoading] = useState(true)

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    // Default to New York City
    const defaultLocation = {
      lng: -74.006,
      lat: 40.7128,
      zoom: 12,
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [defaultLocation.lng, defaultLocation.lat],
      zoom: defaultLocation.zoom,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

    // Create a draggable marker
    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: "#0ea5e9",
    })
      .setLngLat([defaultLocation.lng, defaultLocation.lat])
      .addTo(map.current)

    // Update coordinates when marker is dragged
    marker.current.on("dragend", () => {
      const lngLat = marker.current!.getLngLat()
      setLocation(`${lngLat.lat.toFixed(6)}, ${lngLat.lng.toFixed(6)}`)
    })

    // Set initial location
    setLocation(`${defaultLocation.lat.toFixed(6)}, ${defaultLocation.lng.toFixed(6)}`)

    // Allow clicking on the map to move the marker
    map.current.on("click", (e) => {
      marker.current!.setLngLat(e.lngLat)
      setLocation(`${e.lngLat.lat.toFixed(6)}, ${e.lngLat.lng.toFixed(6)}`)
    })

    map.current.on("load", () => {
      setMapLoading(false)
    })

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Creating area:", { name, description, areaType, location })
    // After successful creation, redirect to the dashboard
    router.push("/")
  }

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-white to-sky-50 rounded-t-lg">
        <CardTitle className="text-slate-700 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-sky-500" />
          Area Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Area Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Downtown Historic Tour"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-slate-200 focus:border-sky-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe this area and what visitors will experience"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border-slate-200 focus:border-sky-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="areaType" className="text-slate-700">
              Area Type
            </Label>
            <Select value={areaType} onValueChange={setAreaType}>
              <SelectTrigger className="border-slate-200 focus:border-sky-300">
                <SelectValue placeholder="Select area type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="indoor">Indoor</SelectItem>
                <SelectItem value="campus">Campus</SelectItem>
                <SelectItem value="museum">Museum</SelectItem>
                <SelectItem value="historic">Historic Site</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700">Area Location</Label>
            <div className="border border-slate-200 rounded-md overflow-hidden">
              {mapLoading ? (
                <div className="aspect-video bg-slate-50 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-sky-500 animate-spin" />
                  <span className="ml-2 text-slate-600">Loading map...</span>
                </div>
              ) : (
                <div ref={mapContainer} className="aspect-video" style={{ minHeight: "300px" }} />
              )}
            </div>
            <div className="pt-2">
              <Label htmlFor="location" className="text-slate-700">
                Coordinates
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border-slate-200 focus:border-sky-300"
              />
              <p className="text-sm text-slate-500 mt-1">Drag the marker or click on the map to set the area center</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-sky-500 hover:bg-sky-600">
              Create Area
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

