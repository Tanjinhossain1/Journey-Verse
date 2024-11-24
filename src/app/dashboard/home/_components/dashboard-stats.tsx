"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import {
  Users,
  Hotel,
  MapPin,
  Activity,
  DollarSign,
  ChartNoAxesCombined,
  Smile,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Simulated API call
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: Math.floor(Math.random() * 50000) + 50000000,
        happyClient: Math.floor(Math.random() * 10000) + 5000000,
        totalHotelOrders: Math.floor(Math.random() * 5000) + 1000,
        totalTourOrders: Math.floor(Math.random() * 3000) + 800,
        totalActivityOrders: Math.floor(Math.random() * 2000) + 500,
        totalRevenue: Math.floor(Math.random() * 500000) + 150000,
        totalProfit: Math.floor(Math.random() * 500000) + 100000,
        totalImpression: Math.floor(Math.random() * 500000) + 50000000,
      });
    }, 1000);
  });
};

type dataType = {
  totalUsers: number;
  happyClient: number;
  totalHotelOrders: number;
  totalTourOrders: number;
  totalActivityOrders: number;
  totalRevenue: number;
  totalProfit: number;
  totalImpression: number;
};
export function DashboardStats() {
  const [data, setData] = useState<dataType>({
    totalUsers: 50000000,
    happyClient: 5000000,
    totalHotelOrders: 1000,
    totalTourOrders: 800,
    totalActivityOrders: 500,
    totalRevenue: 150000,
    totalProfit: 100000,
    totalImpression: 50000000,
  });

  useEffect(() => {
    const updateData = async () => {
      const newData = (await fetchData()) as dataType;
      setData(newData);
    };

    updateData();
    const interval = setInterval(updateData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StatCard
        title="Total Users"
        value={data.totalUsers}
        icon={<Users className="h-6 w-6" />}
        change={Math.floor(Math.random() * 100) - 50}
        gradient="from-blue-700 to-blue-400"
      />
      <StatCard
        title="Hotel Orders"
        value={data.totalHotelOrders}
        icon={<Hotel className="h-6 w-6" />}
        change={Math.floor(Math.random() * 50) - 25}
        gradient="from-green-700 to-green-400"
      />
      <StatCard
        title="Tour Orders"
        value={data.totalTourOrders}
        icon={<MapPin className="h-6 w-6" />}
        change={Math.floor(Math.random() * 40) - 20}
        gradient="from-yellow-700 to-yellow-400"
      />
      <StatCard
        title="Activity Orders"
        value={data.totalActivityOrders}
        icon={<Activity className="h-6 w-6" />}
        change={Math.floor(Math.random() * 30) - 15}
        gradient="from-purple-700 to-purple-400"
      />
      <StatCard
        title="Total Revenue"
        value={data.totalRevenue}
        icon={<DollarSign className="h-6 w-6" />}
        change={Math.floor(Math.random() * 5000) - 2500}
        gradient="from-red-600 to-red-400"
      />
      <StatCard
        title="Total Profit"
        value={data.totalProfit}
        icon={<DollarSign className="h-6 w-6" />}
        change={Math.floor(Math.random() * 5000) - 2500}
        gradient="from-cyan-500 to-red-600"
      />
      <StatCard
        title="Total Impression"
        value={data.totalImpression}
        icon={<ChartNoAxesCombined className="h-6 w-6" />}
        change={Math.floor(Math.random() * 8000) - 2500}
        gradient="from-teal-600 to-blue-400"
      />
      <StatCard
        title="Happy Client"
        value={data.happyClient}
        icon={<Smile className="h-6 w-6" />}
        change={Math.floor(Math.random() * 100) - 50}
        gradient="from-blue-400 via-purple-400 to-pink-400"
      />
    </>
  );
}

function StatCard({
  title,
  value,
  icon,
  change,
  gradient,
}: {
  title: string;
  value: number;
  icon: ReactNode | MotionValue<number> | MotionValue<string>;
  change: number;
  gradient: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg rounded-xl border-gray-300">
            <CardHeader
              className={`flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r ${gradient} opacity-85`}
            >
              <CardTitle className="text-shadow-3d font-bold text-xl">
                <span className="text-white">{title}</span>
              </CardTitle>
              <motion.div
                whileHover={{ rotate: 15 }}
                className="text-white bg-white bg-opacity-20 p-2 rounded-full"
              >
                {icon}
              </motion.div>
            </CardHeader>
            <CardContent className="pt-4 bg-white dark:bg-gray-700 dark:text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold flex gap-2 items-center"
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="text-gray-500 bg-white dark:bg-white bg-opacity-20"
                  >
                    {icon}
                  </motion.div>
                 <p> {value.toLocaleString()}</p>
                </motion.div>
              </AnimatePresence>
              <motion.p
                className={`text-xs mt-2  ${
                  change > 0 ? "text-green-600" : "text-red-500"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {change > 0 ? "↑" : "↓"} {Math.abs(change)} (
                {((change / value) * 100).toFixed(2)}%)
              </motion.p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
