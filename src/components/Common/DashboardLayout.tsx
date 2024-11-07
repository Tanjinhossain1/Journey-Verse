import * as React from "react";
import Link from "next/link";
import {
  Globe,
  Building2,
  Hotel,
  BedDouble,
  Home,
  UserPen,
  Blocks,
  Binoculars,
  HotelIcon,
  Torus,
  ChevronDown,
  LucideListOrdered,
  Activity,
  ActivitySquareIcon,
} from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const adminMenuItems: MenuType[] = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Countries", icon: Globe, href: "/countries" },
  { name: "Cities", icon: Building2, href: "/cities" },
  { name: "Hotels", icon: Hotel, href: "/hotels" },
  { name: "Rooms", icon: BedDouble, href: "/rooms" },
  { name: "Tours", icon: Binoculars, href: "/dashboard/tours" },
  { name: "Activities", icon: ActivitySquareIcon, href: "/dashboard/activity" },
  { name: "Blogs", icon: Blocks, href: "/blogs" },
  {
    name: "Orders Management",
    icon: LucideListOrdered,
    href: "",
    subItems: [
      { name: "Hotel Orders", href: "/dashboard/order_managment/hotels/orders", icon: HotelIcon },
      { name: "Tour Orders", href: "/dashboard/order_managment/tours/orders", icon: Torus },
      { name: "Activity Orders", href: "/dashboard/order_managment/activity/orders", icon: Activity },
    ],
  },
];
const userMenuItems: MenuType[] = [
  { name: "Home", icon: Home, href: "/" },
  { name: "My Profile", icon: UserPen, href: "/myProfile" },
  {
    name: "Orders",
    icon: Globe,
    href: "",
    subItems: [
      { name: "Hotel Orders", href: "/dashboard/hotels/orders", icon: HotelIcon },
      { name: "Tour Orders", href: "/dashboard/tours/orders", icon: Torus },
      { name: "Activity Orders", href: "/dashboard/activity/orders", icon: Torus },
    ],
  },
  { name: "Blogs", icon: Blocks, href: "/blogs" },
];

interface MenuItemsType {
  name: string;
  icon: React.ElementType;
  href: string;
}
interface MenuType extends MenuItemsType {
  subItems?: MenuItemsType[];
}
export default async function DashboardLayout({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/");
  const MenuItems: MenuType[] =
    session?.user?.image === "admin" ? adminMenuItems : userMenuItems;
  return (
    <SidebarProvider className="w-full dark:text-gray-300">
      <div className="flex h-screen overflow-hidden w-full">
        <Sidebar className="hidden lg:flex">
          <SidebarHeader>
            <h2 className="text-lg font-semibold px-6 py-4">Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-full py-6 pl-6 pr-6">
              <SidebarMenu>
                {MenuItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    {item?.subItems ? (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between">
                            <div className="flex items-center gap-2">
                              <item.icon className="w-4 h-4" />
                              {item.name}
                            </div>
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-6 pt-1 ">
                          <div className="flex flex-col gap-1">
                            {item?.subItems?.map((subItem) => (
                              <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="text-sm text-muted-foreground hover:text-primary flex gap-2 mt-2"
                              >
                              <subItem.icon className="w-4 h-4" />
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href!}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
                {/* {MenuItems.map((item) => (
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
                ))} */}
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
          <main className=" w-full h-full min-w-full ml-2  ">
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
