import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Link from "next/link"
import { areas, getLandmarksByAreaId } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"

export function AreaList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => {
        const areaLandmarks = getLandmarksByAreaId(area.id)
        return (
          <Card
            key={area.id}
            className="area-card border border-slate-200 hover:border-sky-200 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-white to-sky-50 rounded-t-lg">
              <CardTitle className="text-sm font-medium text-slate-700">{area.name}</CardTitle>
              <div className="flex items-center">
                <span className="text-xs text-slate-500 mr-2">{area.type}</span>
                <MapPin className="h-4 w-4 text-sky-500" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-sky-600">{areaLandmarks.length}</div>
              <p className="text-xs text-slate-500">Landmarks</p>
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">{area.description}</p>
              <p className="text-xs text-slate-400 mt-2">Updated {formatDate(area.updatedAt)}</p>
              <Button className="mt-4 w-full bg-sky-500 hover:bg-sky-600" asChild>
                <Link href={`/areas/${area.id}`}>Manage Area</Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

