import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function CreateLandmarkButton() {
  return (
    <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Landmark
    </Button>
  )
}

