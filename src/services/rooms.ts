"use server";

import { db } from "@/lib/db";
import { Rooms } from "@/lib/schema";
import { and, ilike, notIlike } from "drizzle-orm";

export const getRooms = async () => {

    const RoomsRecord = await db.select().from(Rooms);

    return RoomsRecord;
}
export const getDetailsRooms = async (title: string) => {

    const RoomsRecord = await db.select().from(Rooms).where(ilike(Rooms.title, title));

    return RoomsRecord;
}
export const getDetailsRoomsWithHotel = async (title: string) => {

    const RoomsRecord = await db.select().from(Rooms).where(ilike(Rooms.hotel, title));

    return RoomsRecord;
}
export const getDetailsRoomsWithOutDetailed = async (title: string,hotelTitle:string) => {

    const RoomsRecord = await db.select().from(Rooms).where(and(ilike(Rooms.hotel, hotelTitle), notIlike(Rooms.title, title)))

    return RoomsRecord;
}