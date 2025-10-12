"use client"

import { usePathname } from "next/navigation"
import GlobalBoard from "./GlobalBoard"

export default function ConditionalGlobalBoard() {
  const pathname = usePathname()
  
  // Only show the global board on map-editing pages
  // Hide on all other pages including auth, rooms, calls, etc.
  const hideOnPages = [
    "/",
    "/pricing",
    "/login", 
    "/signup",
    "/logout",
    "/vision",
    "/call",
    "/rooms",
    "/profile",
    "/auth"
  ]
  
  // Check if current path should hide the board
  const shouldHide = hideOnPages.some(page => pathname?.startsWith(page))
  
  if (shouldHide) return null
  
  return <GlobalBoard />
}


