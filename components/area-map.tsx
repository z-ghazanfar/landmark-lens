"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapIcon, Loader2 } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { getAreaById, getLandmarksByAreaId } from "@/lib/mock-data"

// This would typically come from an environment variable
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// Atlanta coordinates: longitude, latitude
const ATLANTA_COORDINATES = [-84.3880, 33.7490]

export function AreaMap({ areaId }: { areaId: string }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    try {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: ATLANTA_COORDINATES, // Center on Atlanta
        zoom: 11, // Adjusted zoom level for city view
        bearing: 0,
        pitch: 0,
        antialias: true,
        scrollZoom: {
          around: 'center',
          smooth: true
        }
      })

      // Enable scroll zoom around mouse position
      map.current.scrollZoom.setWheelZoomRate(1/450)  // Adjust zoom speed
      map.current.scrollZoom.setZoomRate(1/450)       // Adjust zoom speed

      map.current.on('load', () => {
        setLoading(false)
        window.setTimeout(() => {
          map.current?.resize()
        }, 0)
      })

      map.current.dragRotate.disable()
      map.current.touchZoomRotate.disableRotation()

    } catch (error) {
      setMapError('Failed to load map')
      setLoading(false)
    }

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Area Map</CardTitle>
        <MapIcon className="h-5 w-5 text-slate-500" />
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-[600px]">
            <Loader2 className="h-8 w-8 text-slate-500 animate-spin" />
          </div>
        )}
        {mapError && (
          <div className="flex items-center justify-center h-[600px] text-red-500">
            {mapError}
          </div>
        )}
        <div 
          ref={mapContainer} 
          className={`w-full h-[600px] rounded-md ${loading ? 'hidden' : 'block'}`}
          style={{ 
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <style jsx global>{`
            .mapboxgl-map {
              width: 100% !important;
              height: 100% !important;
            }
            .mapboxgl-canvas {
              width: 100% !important;
              height: 100% !important;
            }
          `}</style>
        </div>
      </CardContent>
    </Card>
  )
}

