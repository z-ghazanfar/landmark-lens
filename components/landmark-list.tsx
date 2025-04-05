import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, FileAudio, Image } from "lucide-react"
import Link from "next/link"
import { getLandmarksByAreaId } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"

export function LandmarkList({ areaId }: { areaId: string }) {
  const landmarks = getLandmarksByAreaId(areaId)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-700">Landmarks</h2>
      {landmarks.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-600">No landmarks found for this area.</p>
          <p className="text-slate-500 text-sm mt-2">
            Create landmarks using the "Add Landmark" button or generate them with AI.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {landmarks.map((landmark) => (
            <Card
              key={landmark.id}
              className="landmark-card border border-slate-200 hover:border-indigo-200 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-white to-indigo-50 rounded-t-lg">
                <CardTitle className="text-sm font-medium text-slate-700">{landmark.name}</CardTitle>
                <MapPin className="h-4 w-4 text-indigo-400" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center mb-2">
                  {landmark.type === "audio" ? (
                    <FileAudio className="h-5 w-5 text-indigo-400 mr-2" />
                  ) : (
                    <Image className="h-5 w-5 text-indigo-400 mr-2" />
                  )}
                  <span className="text-sm text-slate-600 capitalize">{landmark.type} Content</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mb-2">{landmark.description}</p>
                <p className="text-xs text-slate-400 mb-4">Updated {formatDate(landmark.updatedAt)}</p>
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600" asChild>
                  <Link href={`/areas/${areaId}/landmarks/${landmark.id}/edit`}>Edit Landmark</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

