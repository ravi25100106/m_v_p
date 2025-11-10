"use client"

import * as React from "react"
import {
  BookOpen,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const navMain = [
  {
    title: "Documents",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Papers Send",
        url: "#",
      },
      {
        title: "Papers Receive",
        url: "#",
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<{ name: string; email: string; avatar: string }>(
    { name: "", email: "", avatar: "/avatars/shadcn.jpg" }
  )

  React.useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" })
        const data = await res.json()
        if (!active) return
        if (data && data.user) {
          setUser({
            name: data.user.name || "",
            email: data.user.email || "",
            avatar: data.user.avatar || "/avatars/shadcn.jpg",
          })
        }
      } catch {
        // ignore
      }
    })()
    return () => { active = false }
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
