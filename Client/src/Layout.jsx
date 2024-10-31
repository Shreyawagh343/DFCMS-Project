import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarComp from "./Components/SidebarComp"
 
export default function Layout({ children }) {
  return (
    <SidebarProvider>
      < SidebarComp />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}