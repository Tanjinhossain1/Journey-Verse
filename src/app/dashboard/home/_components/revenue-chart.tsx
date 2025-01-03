"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const generateData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let prevRevenue = 5000;
  let prevProfit = 2000;
  return months.map((month) => {
    const revenue = Math.max(
      0,
      prevRevenue + Math.floor(Math.random() * 2000) - 1000
    );
    const profit = Math.max(
      0,
      prevProfit + Math.floor(Math.random() * 1000) - 500
    );
    const hotelOrders = Math.floor(Math.random() * 100) + 50;
    const tourOrders = Math.floor(Math.random() * 80) + 30;
    const activityOrders = Math.floor(Math.random() * 60) + 20;
    prevRevenue = revenue;
    prevProfit = profit;
    return { month, revenue, profit, hotelOrders, tourOrders, activityOrders };
  });
};

type DataType = {
  month: string;
  revenue: number;
  profit: number;
  hotelOrders: number;
  tourOrders: number;
  activityOrders: number;
};
export function RevenueChart() {
  const [data, setData] = useState(generateData());
  const [hoveredData, setHoveredData] = useState<DataType | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
    }, 2000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (props: {
    activePayload: { payload: SetStateAction<DataType | null> }[];
  }) => {
    if (props.activePayload) {
      setHoveredData(props.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <Card className="rounded-xl border-gray-400">
      <CardHeader>
        <CardTitle>Revenue & Profit Trends</CardTitle>
      </CardHeader>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            profit: {
              label: "Profit",
              color: "hsl(var(--chart-2))",
            },
            hotelOrders: {
              label: "Hotel Orders",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[376px] w-full dark:text-white"
        >
          <ResponsiveContainer  className="text-white" width="100%" height="100%">
            <LineChart
              data={data}
              onMouseMove={(props) =>
                handleMouseMove(
                  props as {
                    activePayload: {
                      payload: SetStateAction<DataType | null>;
                    }[];
                  }
                )
              }
              onMouseLeave={handleMouseLeave}
              className="dark:text-white"
            >
              <XAxis className="dark:text-white" dataKey="month" />
              <YAxis className="dark:text-white" />
              <Tooltip  content={<CustomTooltip hoveredData={hoveredData as DataType} />} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4caf50"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
                className="dark:text-white"
            
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#2196f3" 
                strokeWidth={2} className="dark:text-white"
                dot={false}
                activeDot={{ r: 8 }}
              /> 
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
    </Card>
  );
}

function CustomTooltip({
  active,
  payload,
  hoveredData,
}: {
  active?: string;
  payload?: { value: number }[];
  hoveredData?: DataType;
}) {
  if (active && payload && payload.length) {
    return (
        hoveredData && (
          <div
            className="absolute bg-background p-4 rounded-xl bg-white dark:bg-gray-600 shadow-lg border border-border w-[350px]"
            style={{
            //   left: "50%",
            //   transform: "translateX(-50%)",
              bottom: "20px",
              zIndex: 10,
            }}
          >
            <h3 className="font-semibold text-lg mb-2">
              {hoveredData.month} Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Revenue:
                </p>
                <p className="font-semibold">
                  ${hoveredData.revenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Profit:</p>
                <p className="font-semibold">
                  ${hoveredData.profit.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hotel Orders:</p>
                <p className="font-semibold">{hoveredData.hotelOrders}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tour Orders:</p>
                <p className="font-semibold">{hoveredData.tourOrders}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Activity Orders:
                </p>
                <p className="font-semibold">{hoveredData.activityOrders}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders:</p>
                <p className="font-semibold">
                  {hoveredData.hotelOrders +
                    hoveredData.tourOrders +
                    hoveredData.activityOrders}
                </p>
              </div>
            </div>
          </div>
        )
    );
  }
  return null;
}
