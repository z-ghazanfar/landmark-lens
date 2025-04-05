import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LandmarkList } from "@/components/landmark-list"
import { CreateLandmarkButton } from "@/components/create-landmark-button"
import { AreaMap } from "@/components/area-map"
import { GenerateLandmarks } from "@/components/generate-landmarks"
import { MapLandmarkEditor } from "@/components/map-landmark-editor"
import { getAreaById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default async function AreaPage({ params }: { params: { areaId: string } }) {
  const { areaId } = await params
  const area = getAreaById(areaId)

  if (!area) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`Area: ${area.name}`} text={area.description}>
        <CreateLandmarkButton />
      </DashboardHeader>
      <div className="grid gap-10">
        <AreaMap areaId={areaId} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MapLandmarkEditor areaId={areaId} />
          <GenerateLandmarks areaId={areaId} />
        </div>
        <LandmarkList areaId={areaId} />
      </div>
    </DashboardShell>
  )
}

