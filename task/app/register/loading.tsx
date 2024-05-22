import FormContainer from "@/components/login/form-container";
import NavBar from "@/components/navbar/navbar";

export default function RegisterSkeleton(): JSX.Element {
  return (
    <>
      <NavBar />
      <FormContainer className="animate-pulse h-[450px]" />
    </>
  );
}
