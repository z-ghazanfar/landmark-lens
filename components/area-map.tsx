"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapIcon, Loader2 } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { getAreaById, getLandmarksByAreaId } from "@/lib/mock-data"

// This would typically come from an environment variable
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xhbmRtYXJrbGVucyJ9.exampletoken123456"

export function AreaMap({ areaId }: { areaId: string }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize the map only on the client side
    if (!mapContainer.current || map.current) return

    try {
      const area = getAreaById(areaId)
      const landmarks = getLandmarksByAreaId(areaId)

      if (!area) {
        setMapError("Area not found")
        setLoading(false)
        return
      }

      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11", // Light style to match our UI
        center: [area.location.lng, area.location.lat],
        zoom: 14,
      })

      // Add navigation controls (zoom, rotation)
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Wait for map to load before adding markers
      map.current.on("load", () => {
        // Add markers for each landmark
        landmarks.forEach((landmark) => {
          // Create a marker element
          const markerEl = document.createElement("div")
          markerEl.className = "landmark-marker"
          markerEl.style.width = "24px"
          markerEl.style.height = "24px"
          markerEl.style.backgroundImage =
            landmark.type === "audio"
              ? 'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%236366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>\')'
              : 'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%236366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>\')'
          markerEl.style.backgroundSize = "cover"
          markerEl.style.cursor = "pointer"

          // Create a popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="max-width: 200px;">
                <strong style="font-size: 14px;">${landmark.name}</strong>
                <p style="font-size: 12px; margin: 5px 0;">${landmark.description}</p>
                <p style="font-size: 11px; color: #6b7280; margin-bottom: 0;">
                  ${landmark.type === "audio" ? "Audio Guide" : "Visual Guide"}
                </p>
              </div>
            `)

          // Add marker to map
          new mapboxgl.Marker(markerEl)
            .setLngLat([landmark.location.lng, landmark.location.lat])
            .setPopup(popup)
            .addTo(map.current!)
        })

        setLoading(false)
      })

      // Clean up on unmount
      return () => {
        if (map.current) {
          map.current.remove()
          map.current = null
        }
      }
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError("Failed to load map. Please check your connection and try again.")
      setLoading(false)
    }
  }, [areaId])

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-white to-emerald-50 rounded-t-lg">
        <CardTitle className="text-slate-700 flex items-center">
          <MapIcon className="mr-2 h-5 w-5 text-emerald-500" />
          Area Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="aspect-video bg-slate-50 rounded-md flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
            <span className="ml-2 text-slate-600">Loading map...</span>
          </div>
        )}

        {mapError && (
          <div className="aspect-video bg-slate-50 rounded-md flex items-center justify-center">
            <p className="text-red-500">{mapError}</p>
          </div>
        )}

        <div
          ref={mapContainer}
          className={`aspect-video rounded-md ${loading ? "hidden" : "block"}`}
          style={{ minHeight: "400px" }}
        />
      </CardContent>
    </Card>
  )
}

