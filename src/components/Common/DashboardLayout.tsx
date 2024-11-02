import * as React from "react";
import Link from "next/link";
import { Globe, Building2, Hotel, BedDouble, Home, UserPen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const adminMenuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Countries", icon: Globe, href: "/countries" },
  { name: "Cities", icon: Building2, href: "/cities" },
  { name: "Hotels", icon: Hotel, href: "/hotels" },
  { name: "Rooms", icon: BedDouble, href: "/rooms" },
];
const userMenuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "My Profile", icon: UserPen, href: "/myProfile" },
  { name: "orders", icon: Globe, href: "/orders" },
];

export default async function DashboardLayout({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/");
  const MenuItems =
    session?.user?.image === "admin" ? adminMenuItems : userMenuItems;
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="hidden lg:flex">
          <SidebarHeader>
            <h2 className="text-lg font-semibold px-6 py-4">Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-full py-6 pl-6 pr-6">
              <SidebarMenu>
                {MenuItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>

        <Sheet>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar>
              <SidebarHeader>
                <h2 className="text-lg font-semibold px-6 py-4">Dashboard</h2>
              </SidebarHeader>
              <SidebarContent>
                <SheetTitle></SheetTitle>
                <ScrollArea className="h-full py-6 pl-6 pr-6">
                  <SidebarMenu>
                    {MenuItems.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </ScrollArea>
              </SidebarContent>
            </Sidebar>
          </SheetContent>
        </Sheet>

        <SidebarInset>
          <main className="flex-1 overflow-auto ml-2">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">{name}</h1>
            </header>
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
