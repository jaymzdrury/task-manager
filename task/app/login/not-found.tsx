import ErrorLayout from "@/layouts/error-layout";
import NotFoundLink from "@/components/common/not-found-link";
import { paths } from "@/lib/utils";

export default function NotFound(): JSX.Element {
  return (
    <ErrorLayout
      header="404"
      title="So sorry"
      message="we couldn't find what you were looking for..."
    >
      <NotFoundLink href={paths.LOGIN}>Back to Login</NotFoundLink>
    </ErrorLayout>
  );
}
