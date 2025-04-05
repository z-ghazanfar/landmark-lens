import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AreaList } from "@/components/area-list"
import { CreateAreaButton } from "@/components/create-area-button"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="LandmarkLens Dashboard" text="Manage your AR exploration areas and landmarks.">
        <CreateAreaButton />
      </DashboardHeader>
      <div className="grid gap-10">
        <AreaList />
      </div>
    </DashboardShell>
  )
}

