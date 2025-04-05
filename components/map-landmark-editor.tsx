"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapIcon, MapPin, FileAudio, Image, Loader2 } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// This would typically come from an environment variable
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xhbmRtYXJrbGVucyJ9.exampletoken123456"

interface LandmarkLocation {
  lat: number
  lng: number
}

export function MapLandmarkEditor({ areaId }: { areaId: string }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const [loading, setLoading] = useState(true)
  const [landmarkLocation, setLandmarkLocation] = useState<LandmarkLocation | null>(null)
  const [landmarkType, setLandmarkType] = useState<"audio" | "image">("audio")

  // Sample area center - in a real app, this would be determined by the area
  const areaCoordinates = {
    lat: 40.7128,
    lng: -74.006,
    zoom: 13,
  }

  useEffect(() => {
    // Initialize the map only on the client side
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [areaCoordinates.lng, areaCoordinates.lat],
      zoom: areaCoordinates.zoom,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

    // Create a draggable marker
    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: "#6366f1",
    })
      .setLngLat([areaCoordinates.lng, areaCoordinates.lat])
      .addTo(map.current)

    // Update coordinates when marker is dragged
    marker.current.on("dragend", () => {
      const lngLat = marker.current!.getLngLat()
      setLandmarkLocation({
        lat: lngLat.lat,
        lng: lngLat.lng,
      })
    })

    // Set initial location
    setLandmarkLocation({
      lat: areaCoordinates.lat,
      lng: areaCoordinates.lng,
    })

    // Allow clicking on the map to move the marker
    map.current.on("click", (e) => {
      marker.current!.setLngLat(e.lngLat)
      setLandmarkLocation({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      })
    })

    map.current.on("load", () => {
      setLoading(false)
    })

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [areaId])

  const handleSaveLocation = () => {
    if (!landmarkLocation) return

    // In a real app, you would save this to your backend
    console.log("Saving landmark location:", {
      type: landmarkType,
      location: landmarkLocation,
    })

    // Show confirmation
    alert(`Landmark location saved: ${landmarkLocation.lat.toFixed(6)}, ${landmarkLocation.lng.toFixed(6)}`)
  }

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-white to-emerald-50 rounded-t-lg">
        <CardTitle className="text-slate-700 flex items-center">
          <MapIcon className="mr-2 h-5 w-5 text-emerald-500" />
          Place Landmark on Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="aspect-video bg-slate-50 rounded-md flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
            <span className="ml-2 text-slate-600">Loading map...</span>
          </div>
        ) : (
          <>
            <div ref={mapContainer} className="aspect-video rounded-md" style={{ minHeight: "300px" }} />

            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-indigo-500 mr-2" />
                <h3 className="text-slate-700 font-medium">Landmark Position</h3>
              </div>

              {landmarkLocation && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-slate-600 text-sm">Latitude</Label>
                    <Input value={landmarkLocation.lat.toFixed(6)} readOnly className="bg-white" />
                  </div>
                  <div>
                    <Label className="text-slate-600 text-sm">Longitude</Label>
                    <Input value={landmarkLocation.lng.toFixed(6)} readOnly className="bg-white" />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <Label className="text-slate-700 mb-2 block">Landmark Type</Label>
                <RadioGroup
                  value={landmarkType}
                  onValueChange={(value) => setLandmarkType(value as "audio" | "image")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-white border border-slate-200">
                    <RadioGroupItem value="audio" id="map-audio" className="text-indigo-500" />
                    <Label htmlFor="map-audio" className="text-slate-700 flex items-center">
                      <FileAudio className="mr-2 h-4 w-4 text-indigo-400" />
                      Audio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-white border border-slate-200">
                    <RadioGroupItem value="image" id="map-image" className="text-indigo-500" />
                    <Label htmlFor="map-image" className="text-slate-700 flex items-center">
                      <Image className="mr-2 h-4 w-4 text-indigo-400" />
                      Image
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={handleSaveLocation} className="w-full bg-emerald-500 hover:bg-emerald-600">
                Save Landmark Location
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                Drag the marker or click on the map to set the landmark location
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

