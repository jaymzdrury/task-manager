import Link from "next/link";
import FormContainer from "./form-container";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import styles from "../../app/styles.module.css";

type FormCardProps = {
  title: string;
  link: string;
};

export default function FormCard({
  title,
  link,
  children,
}: React.PropsWithChildren<FormCardProps>): JSX.Element {
  return (
    <FormContainer>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Welcome to Task Manager</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className={styles.center}>
        <Link
          className="hover:underline text-xs"
          href={`/${link}`}
          itemProp="link"
          itemID={link}
          aria-label={`Link to ${link}`}
        >
          {link === "register" ? "Not Registered?" : "Already Have an Account?"}
        </Link>
      </CardFooter>
    </FormContainer>
  );
}
