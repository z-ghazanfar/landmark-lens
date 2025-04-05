import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EditLandmarkForm } from "@/components/edit-landmark-form"

export default function EditLandmarkPage({ params }: { params: { areaId: string; landmarkId: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Edit Landmark`}
        text={`Editing landmark ${params.landmarkId} in area ${params.areaId}`}
      />
      <div className="grid gap-10">
        <EditLandmarkForm areaId={params.areaId} landmarkId={params.landmarkId} />
      </div>
    </DashboardShell>
  )
}

