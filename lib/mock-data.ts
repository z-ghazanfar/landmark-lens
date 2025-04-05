import type { Area, Landmark, Path } from "@/types"

// Mock Areas
export const areas: Area[] = [
  {
    id: "1",
    name: "Historic Downtown",
    description: "Explore the rich history of downtown with its 19th century architecture and cultural landmarks.",
    type: "historic",
    location: { lat: 40.7128, lng: -74.006 },
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
  },
  {
    id: "2",
    name: "University Campus Tour",
    description: "Discover the beautiful campus grounds, historic buildings, and modern facilities.",
    type: "campus",
    location: { lat: 40.7282, lng: -73.9942 },
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-06-18T11:20:00Z",
  },
  {
    id: "3",
    name: "Art Museum Experience",
    description:
      "An immersive tour through the city's premier art museum with detailed information about key exhibits.",
    type: "museum",
    location: { lat: 40.7794, lng: -73.9632 },
    createdAt: "2023-03-22T13:45:00Z",
    updatedAt: "2023-06-15T16:30:00Z",
  },
]

// Mock Landmarks for Historic Downtown (Area 1)
const downtownLandmarks: Landmark[] = [
  {
    id: "101",
    areaId: "1",
    name: "City Hall",
    description: "A magnificent Beaux-Arts building completed in 1812 and the seat of city government.",
    type: "audio",
    location: { lat: 40.7128, lng: -74.006 },
    content: {
      title: "The History of City Hall",
      description: "Learn about the architectural significance and historical events that took place at City Hall.",
      mediaUrl: "/audio/city-hall-history.mp3",
      mediaType: "audio",
      transcript:
        "City Hall was designed by architect Joseph François Mangin and completed in 1812. It is one of the oldest continuously used city halls in the United States...",
      duration: 195, // 3:15 minutes
      author: "Dr. Sarah Johnson, City Historian",
      createdAt: "2023-05-20T11:30:00Z",
    },
    createdAt: "2023-05-20T11:30:00Z",
    updatedAt: "2023-06-10T09:45:00Z",
  },
  {
    id: "102",
    areaId: "1",
    name: "Old State House",
    description: "A historic government building dating back to 1713, now serving as a museum.",
    type: "image",
    location: { lat: 40.7135, lng: -74.0101 },
    content: {
      title: "The Old State House Through Time",
      description: "View historical photographs showing how this landmark has changed over three centuries.",
      mediaUrl: "/images/old-state-house-collage.jpg",
      mediaType: "image",
      author: "Historical Society Archives",
      createdAt: "2023-05-22T14:20:00Z",
    },
    createdAt: "2023-05-22T14:20:00Z",
    updatedAt: "2023-06-12T10:15:00Z",
  },
  {
    id: "103",
    areaId: "1",
    name: "Liberty Square",
    description: "A historic public square that was the site of important protests and gatherings.",
    type: "audio",
    location: { lat: 40.709, lng: -74.0089 },
    content: {
      title: "Voices of Liberty Square",
      description:
        "Listen to dramatic readings of speeches that were delivered in this square during pivotal moments in history.",
      mediaUrl: "/audio/liberty-square-speeches.mp3",
      mediaType: "audio",
      transcript:
        "Friends, citizens, countrymen! We gather here today as our forefathers did, to assert our rights as free people...",
      duration: 240, // 4 minutes
      author: "City Theater Company",
      createdAt: "2023-05-25T16:45:00Z",
    },
    createdAt: "2023-05-25T16:45:00Z",
    updatedAt: "2023-06-14T13:30:00Z",
  },
]

// Mock Landmarks for University Campus (Area 2)
const campusLandmarks: Landmark[] = [
  {
    id: "201",
    areaId: "2",
    name: "University Library",
    description: "A grand neoclassical building housing over 5 million volumes and rare manuscripts.",
    type: "audio",
    location: { lat: 40.7282, lng: -73.9942 },
    content: {
      title: "The Heart of Knowledge",
      description:
        "Discover the history and treasures of the University Library, including its famous rare book collection.",
      mediaUrl: "/audio/university-library-tour.mp3",
      mediaType: "audio",
      transcript:
        "Welcome to the University Library, established in 1856 and home to one of the most significant collections of rare books and manuscripts in the country...",
      duration: 210, // 3:30 minutes
      author: "Prof. Michael Chen, University Archivist",
      createdAt: "2023-04-15T10:20:00Z",
    },
    createdAt: "2023-04-15T10:20:00Z",
    updatedAt: "2023-06-05T11:45:00Z",
  },
  {
    id: "202",
    areaId: "2",
    name: "Science Center",
    description: "A modern facility dedicated to research and education in the sciences.",
    type: "image",
    location: { lat: 40.7305, lng: -73.9925 },
    content: {
      title: "Innovation in Action",
      description:
        "See cutting-edge research facilities and learn about groundbreaking discoveries made at the Science Center.",
      mediaUrl: "/images/science-center-innovations.jpg",
      mediaType: "image",
      author: "University Communications Office",
      createdAt: "2023-04-18T13:10:00Z",
    },
    createdAt: "2023-04-18T13:10:00Z",
    updatedAt: "2023-06-08T15:30:00Z",
  },
  {
    id: "203",
    areaId: "2",
    name: "Memorial Hall",
    description: "A historic building commemorating alumni who served in various conflicts.",
    type: "audio",
    location: { lat: 40.726, lng: -73.996 },
    content: {
      title: "Echoes of Sacrifice",
      description: "Listen to the stories of alumni who served their country and the history of this memorial.",
      mediaUrl: "/audio/memorial-hall-history.mp3",
      mediaType: "audio",
      transcript:
        "Memorial Hall was dedicated in 1920 to honor the 412 alumni who served in World War I. The names inscribed on these walls tell stories of courage and sacrifice...",
      duration: 180, // 3 minutes
      author: "Veterans Association",
      createdAt: "2023-04-22T09:45:00Z",
    },
    createdAt: "2023-04-22T09:45:00Z",
    updatedAt: "2023-06-10T14:15:00Z",
  },
]

// Mock Landmarks for Art Museum (Area 3)
const museumLandmarks: Landmark[] = [
  {
    id: "301",
    areaId: "3",
    name: "Impressionist Gallery",
    description: "A collection of masterpieces from the Impressionist movement.",
    type: "audio",
    location: { lat: 40.7794, lng: -73.9632 },
    content: {
      title: "The Light and Color of Impressionism",
      description:
        "An audio guide exploring the techniques and significance of key Impressionist works in the collection.",
      mediaUrl: "/audio/impressionist-gallery-guide.mp3",
      mediaType: "audio",
      transcript:
        "The Impressionist movement began in the 1870s when a group of artists including Monet, Renoir, and Degas broke with traditional academic painting...",
      duration: 270, // 4:30 minutes
      author: "Dr. Emily Wong, Curator of European Painting",
      createdAt: "2023-03-25T11:30:00Z",
    },
    createdAt: "2023-03-25T11:30:00Z",
    updatedAt: "2023-06-02T10:45:00Z",
  },
  {
    id: "302",
    areaId: "3",
    name: "Modern Art Wing",
    description: "Contemporary works from leading artists of the 20th and 21st centuries.",
    type: "image",
    location: { lat: 40.781, lng: -73.9622 },
    content: {
      title: "Breaking Boundaries",
      description: "Visual explanations of revolutionary modern art movements and their impact on culture.",
      mediaUrl: "/images/modern-art-movements.jpg",
      mediaType: "image",
      author: "Museum Education Department",
      createdAt: "2023-03-28T14:15:00Z",
    },
    createdAt: "2023-03-28T14:15:00Z",
    updatedAt: "2023-06-05T16:20:00Z",
  },
  {
    id: "303",
    areaId: "3",
    name: "Sculpture Garden",
    description: "An outdoor space featuring monumental works by renowned sculptors.",
    type: "audio",
    location: { lat: 40.7785, lng: -73.9645 },
    content: {
      title: "Form and Space: The Language of Sculpture",
      description: "An audio tour of the museum's most significant sculptural works and the stories behind them.",
      mediaUrl: "/audio/sculpture-garden-tour.mp3",
      mediaType: "audio",
      transcript:
        "As you enter the sculpture garden, you'll notice how the artworks interact with the natural environment. The first piece on your right is Alexander Calder's 'Floating Forms'...",
      duration: 240, // 4 minutes
      author: "James Rivera, Sculpture Curator",
      createdAt: "2023-04-02T13:40:00Z",
    },
    createdAt: "2023-04-02T13:40:00Z",
    updatedAt: "2023-06-08T11:25:00Z",
  },
]

// Combine all landmarks
export const landmarks: Landmark[] = [...downtownLandmarks, ...campusLandmarks, ...museumLandmarks]

// Mock Paths
export const paths: Path[] = [
  {
    id: "1001",
    areaId: "1",
    name: "Historic Downtown Walking Tour",
    description: "A chronological journey through the city's historic district",
    landmarks: ["101", "102", "103"],
    color: "#4338ca", // indigo-700
    createdAt: "2023-05-30T09:00:00Z",
    updatedAt: "2023-06-15T11:30:00Z",
  },
  {
    id: "1002",
    areaId: "2",
    name: "Campus Highlights Tour",
    description: "Visit the most significant buildings on campus",
    landmarks: ["201", "202", "203"],
    color: "#0ea5e9", // sky-500
    createdAt: "2023-04-25T14:15:00Z",
    updatedAt: "2023-06-12T10:45:00Z",
  },
  {
    id: "1003",
    areaId: "3",
    name: "Art Through the Ages",
    description: "A curated journey through art history",
    landmarks: ["301", "302", "303"],
    color: "#10b981", // emerald-500
    createdAt: "2023-04-05T16:30:00Z",
    updatedAt: "2023-06-10T13:20:00Z",
  },
]

// Helper functions to work with the mock data
export function getAreaById(id: string): Area | undefined {
  return areas.find((area) => area.id === id)
}

export function getLandmarksByAreaId(areaId: string): Landmark[] {
  return landmarks.filter((landmark) => landmark.areaId === areaId)
}

export function getLandmarkById(id: string): Landmark | undefined {
  return landmarks.find((landmark) => landmark.id === id)
}

export function getPathsByAreaId(areaId: string): Path[] {
  return paths.filter((path) => path.areaId === areaId)
}

export function getPathById(id: string): Path | undefined {
  return paths.find((path) => path.id === id)
}

