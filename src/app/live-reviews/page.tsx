import React, { Fragment } from 'react'
import ChatPage from './_components/Messages'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { ChatUser } from '@/types/user';
import Navbar from '@/components/Common/Navbar';

export default async function page() {
    
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/");
  return (
    <Fragment>
        <Navbar />
        <br />
        <br />
        <br />
        <ChatPage user={session?.user as ChatUser} />
    </Fragment>
  )
}
