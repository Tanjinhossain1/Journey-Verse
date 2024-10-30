import { getSession } from "next-auth/react";
import ChileNavbar from "./ChildNavbar";
import { getServerSession } from "next-auth";
// import { getServerSession } from "next-auth";

export default async function Navbar() {
  const  session  =  await getServerSession();
  const session2 = await getSession();
  console.log('first session  ',session2)
  return (
     <ChileNavbar user={session?.user} />
  );
}
