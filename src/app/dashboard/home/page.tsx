import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment, Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "./_components/dashboard-shell";
import { CardSkeleton } from "./_components/card-skeleton";
import { DashboardStats } from "./_components/dashboard-stats";
import { RecentActivity } from "./_components/recent-activity";
import { RevenueChart } from "./_components/revenue-chart";

export default async function page() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/");

  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Overview">
        <DashboardShell>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4 mx-4">
            <Suspense fallback={<CardSkeleton />}>
              <DashboardStats />
            </Suspense>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mx-4 mb-20">
            <Suspense fallback={<CardSkeleton className="md:col-span-4" />}>
              <div className="md:col-span-4">
                <RevenueChart />
              </div>
            </Suspense>
            <Suspense fallback={<CardSkeleton className="md:col-span-3" />}>
              <div className="md:col-span-3">
                <RecentActivity />
              </div>
            </Suspense>
          </div>
        </DashboardShell>
      </DashboardLayout>
    </Fragment>
  );
}
