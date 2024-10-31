import React from 'react'
import { Bar, BarChart , CartesianGrid , XAxis} from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {ChartContainer } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Monitor } from "lucide-react"
import DashIcon from "../../src/assets/Dashicon.png"
import PieChat from './PieChat'
import DashboardCard from './DashboardCard'
import TableDash from './TableDash'
import SidebarComp from './SidebarComp'

const DashboardOffA = () => {
  const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
      { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
      { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    ]
     
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
        icon: Monitor,
        // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
        // OR a theme object with 'light' and 'dark' keys
        theme: {
          light: "#2563eb",
          dark: "#dc2626",
        },
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    };
  return (
    <>
    <div className="flex">
   <div className="">
    <div className="flex ml-32">
    <DashboardCard/>
    </div>
    <div className="flex ml-44 mt-10">
    <div className="w-[35vw] h-[20vh] inline-block">
 <ChartContainer config={chartConfig} >
      <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip
  content={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
/>
    <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
    </div>
    <div className="ml-[2rem] ">
    <PieChat/>
  </div>
    <div className="ml-[2rem] ">
    <TableDash/>
  </div>
  </div>
    </div>
    </div>
    </>
  )
}

export default DashboardOffA


