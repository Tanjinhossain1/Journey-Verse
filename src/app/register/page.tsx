import { Fragment } from "react";
import RegisterPage from "./_components/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession();
  if (session?.user?.email) redirect("/");
  return (
    <Fragment>
      <RegisterPage />
    </Fragment>
  );
};

export default Register;
