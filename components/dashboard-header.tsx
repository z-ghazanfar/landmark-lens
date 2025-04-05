import type React from "react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="dashboard-header flex items-center justify-between px-2 bg-gradient-to-r from-sky-100 to-indigo-100 text-slate-700 rounded-lg p-6 mb-6 border border-slate-200">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-slate-600">{text}</p>}
      </div>
      {children}
    </div>
  )
}

