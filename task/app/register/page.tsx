import { Metadata } from "next";
import NavBar from "@/components/navbar/navbar";
import FormCard from "../../components/login/form-card";
import FormRegister from "@/components/login/form-register";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Task Manager | Register",
  description: "This is the Task Manager Registration Page",
};

export default function Register(): JSX.Element {
  return (
    <>
      <NavBar />
      <FormCard title="Register" link="login">
        <FormRegister values={["Name", "Email", "Password"]} />
      </FormCard>
    </>
  );
}
