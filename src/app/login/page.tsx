import { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import LoginPage from "./_components/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (session?.user?.email) redirect("/");
  return (
    <Fragment>
      <Navbar />
      <LoginPage />
      <Footer />
    </Fragment>
  );
};

export default page;
