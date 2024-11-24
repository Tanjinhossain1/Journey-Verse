'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Hotel, MapPin, Activity } from 'lucide-react'

const activityTypes = [
  { type: 'New User', icon: Users, color: 'text-blue-500' },
  { type: 'Hotel Booking', icon: Hotel, color: 'text-green-500' },
  { type: 'Tour Booking', icon: MapPin, color: 'text-yellow-500' },
  { type: 'Activity Booking', icon: Activity, color: 'text-purple-500' },
]

const userNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry']

type Activities = {
    id: string
    type: string
    icon: React.FC
    color: string
    user: string
    amount: number
    time: string
    location: string
}

function generateActivity():Activities {
  const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: activityType.type,
    icon: activityType.icon,
    color: activityType.color,
    user: userNames[Math.floor(Math.random() * userNames.length)],
    amount: Math.floor(Math.random() * 500) + 100,
    time: new Date().toLocaleTimeString(),
    location: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'][Math.floor(Math.random() * 5)],
  }
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activities[]>([])
  const [hoveredActivity, setHoveredActivity] = useState<Activities | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prevActivities => {
        const newActivity = generateActivity()
        const updatedActivities = [newActivity, ...prevActivities.slice(0, 4)]
        return updatedActivities
      })
    }, 3000) // Add new activity every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className='rounded-xl border-gray-400 h-[450px] overflow-hidden'>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mb-4 last:mb-0 overflow-hidden"
              onMouseEnter={() => setHoveredActivity(activity)}
              onMouseLeave={() => setHoveredActivity(null)}
            >
              {hoveredActivity === activity && <ActivityDetails activity={activity} />}
              <ActivityItem activity={activity} />
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ activity }:{activity:Activities}) {
  const Icon = activity.icon

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200 overflow-hidden">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${activity.color} bg-opacity-10`}>
          <Icon />
        </div>
        <div>
          <p className="font-semibold">{activity.type}</p>
          <p className="text-sm text-muted-foreground">{activity.user}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">${activity.amount}</p>
        <p className="text-sm text-muted-foreground">{activity.time}</p>
      </div>
    </div>
  )
}

function ActivityDetails({ activity }:{activity:Activities}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-2 p-2 bg-background rounded-lg shadow-lg border border-border text-sm"
    >
      <p><span className="font-medium">Location:</span> {activity.location}</p>
      <p><span className="font-medium">ID:</span> {activity.id}</p>
    </motion.div>
  )
}

