import { Fragment } from "react";
import RegisterPage from "./_components/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";

const Register = async () => {
  const session = await getServerSession();
  if (session?.user?.email) redirect("/");
  return (
    <Fragment>
      <Navbar />
      <RegisterPage />
      <Footer />
    </Fragment>
  );
};

export default Register;
