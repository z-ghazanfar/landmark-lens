import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CreateAreaForm } from "@/components/create-area-form"

export default function CreateAreaPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Area" text="Set up a new exploration area for your AR experience." />
      <div className="grid gap-10">
        <CreateAreaForm />
      </div>
    </DashboardShell>
  )
}

