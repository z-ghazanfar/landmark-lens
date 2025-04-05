// Area Types
export interface Area {
  id: string
  name: string
  description: string
  type: AreaType
  location: Coordinates
  createdAt: string
  updatedAt: string
}

export type AreaType = "outdoor" | "indoor" | "campus" | "museum" | "historic"

// Landmark Types
export interface Landmark {
  id: string
  areaId: string
  name: string
  description: string
  type: LandmarkType
  location: Coordinates
  content: LandmarkContent
  createdAt: string
  updatedAt: string
}

export type LandmarkType = "audio" | "image"

export interface Coordinates {
  lat: number
  lng: number
}

// Content Types
export interface LandmarkContent {
  title: string
  description: string
  mediaUrl?: string
  mediaType?: "image" | "audio"
  transcript?: string // For audio content
  duration?: number // For audio content in seconds
  author?: string
  createdAt: string
}

// Path Types
export interface Path {
  id: string
  areaId: string
  name: string
  description: string
  landmarks: string[] // Array of landmark IDs in order
  color: string
  createdAt: string
  updatedAt: string
}

