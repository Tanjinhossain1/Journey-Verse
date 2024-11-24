'use client'

import { useState, useEffect } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const generateRandomData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Auc','Nov','Dec'][i],
    trips: Math.floor(Math.random() * 5) + 1,
    expenses: Math.floor(Math.random() * 1000) + 200,
  }))
}

export default function TravelStatsChart() {
  const [data, setData] = useState(generateRandomData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-4 w-full border-0 border-gray-400">
      <ChartContainer
        config={{
          trips: {
            label: 'Trips',
            color: 'hsl(var(--chart-1))',
          },
          expenses: {
            label: 'Expenses ($)',
            color: 'hsl(var(--chart-2))',
          },
        }}
        className="h-[300px] w-full border-gray-400"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="trips"
              stroke="#07baba"
              strokeWidth={2}
              yAxisId="left"
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ba0480"
              strokeWidth={2}
              yAxisId="right"
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  )
}

