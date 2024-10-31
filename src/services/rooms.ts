"use server";

import { db } from "@/lib/db";
import { Rooms } from "@/lib/schema";
import { ilike } from "drizzle-orm";

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