import FormContainer from "@/components/login/form-container";
import NavBar from "@/components/navbar/navbar";

export default function LoginSkeleton(): JSX.Element {
  return (
    <>
      <NavBar />
      <FormContainer className="animate-pulse h-[364px]" />
    </>
  );
}
