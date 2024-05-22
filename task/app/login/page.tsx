import { Metadata } from "next";
import NavBar from "@/components/navbar/navbar";
import FormCard from "@/components/login/form-card";
import FormLogin from "@/components/login/form-login";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Task Manager | Login",
  description: "This is the Task Manager Login Page",
};

export default function Login(): JSX.Element {
  return (
    <>
      <NavBar />
      <FormCard title="Login" link="register">
        <FormLogin values={["Email", "Password"]} />
      </FormCard>
    </>
  );
}
