import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export function CreateAreaButton() {
  return (
    <Button className="bg-white text-slate-700 hover:bg-slate-100 border border-slate-200" asChild>
      <Link href="/areas/create">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Area
      </Link>
    </Button>
  )
}

