'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, Camera, Hotel, Newspaper } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TravelStatsChart from './travel-stats-chart'

const generateRandomStats = () => ({
  totalUsers: Math.floor(Math.random() * 1000) + 9000,
  tours: Math.floor(Math.random() * 50) + 100,
  activities: Math.floor(Math.random() * 100) + 400,
  hotels: Math.floor(Math.random() * 50) + 250,
  blogPosts: Math.floor(Math.random() * 200) + 800,
})

const generateRandomActivity = () => {
  const actions = ['Booked a tour', 'Completed a trip', 'Posted a review', 'Shared photos', 'Earned points']
  const items = ['Paris Adventure', 'Bali Retreat', 'Tokyo Explorer', 'New York City Tour', 'African Safari']
  const timeFrames = ['1 hour ago', '2 hours ago', 'Yesterday', '2 days ago', 'Last week']

  return {
    id: Math.random().toString(36).substr(2, 9),
    action: actions[Math.floor(Math.random() * actions.length)],
    item: items[Math.floor(Math.random() * items.length)],
    date: timeFrames[Math.floor(Math.random() * timeFrames.length)],
  }
}

export default function UserDashboard() {
  const [stats, setStats] = useState(generateRandomStats())
  const [recentActivities, setRecentActivities] = useState([
    generateRandomActivity(),
    generateRandomActivity(),
    generateRandomActivity(),
    generateRandomActivity(),
    generateRandomActivity(),
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateRandomStats())
      setRecentActivities(prevActivities => {
        const newActivities = [...prevActivities]
        newActivities.pop()
        newActivities.unshift(generateRandomActivity())
        return newActivities
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { title: 'Total Users', value: stats.totalUsers, icon: User },
          { title: 'Tours', value: stats.tours, icon: MapPin },
          { title: 'Activities', value: stats.activities, icon: Camera },
          { title: 'Hotels', value: stats.hotels, icon: Hotel },
          { title: 'Blog Posts', value: stats.blogPosts, icon: Newspaper },
        ].map((item, index) => (
          <Card key={index} className='border-gray-400 rounded-xl bg-white dark:bg-gray-700'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold"
                >
                  {item.value}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
            <div className='flex gap-4 w-full'>
                
      <Card className='h-[450px] overflow-hidden w-full rounded-xl border-gray-400'>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions on Journey Verse</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence initial={false}>
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4 mb-4 "
              >
                <div className="bg-secondary/10 p-2 rounded-full">
                  {activity.action.includes('Booked') ? (
                    <Hotel className="h-6 w-6 text-secondary" />
                  ) : activity.action.includes('Completed') ? (
                    <MapPin className="h-6 w-6 text-secondary" />
                  ) : (
                    <Newspaper className="h-6 w-6 text-secondary" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm">{activity.item}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card className='w-full rounded-xl border-gray-400'>
        <CardHeader>
          <CardTitle>Travel Stats</CardTitle>
          <CardDescription>Your travel activity over time</CardDescription>
        </CardHeader>
        <CardContent className='w-full'>
          <TravelStatsChart />
        </CardContent>
      </Card>
            </div>
    </div>
  )
}

