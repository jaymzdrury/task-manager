import NavBar from "@/components/navbar/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import styles from "../app/styles.module.css";

type ErrorLayoutProps = {
  header: string;
  title: string;
  message: string;
};

export default function ErrorLayout({
  header,
  title,
  message,
  children,
}: React.PropsWithChildren<ErrorLayoutProps>): JSX.Element {
  return (
    <>
      <NavBar>
        <Avatar>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </NavBar>
      <main className={cn(styles.center, "py-12")}>
        <span
          className={cn(
            styles.center,
            "absolute top-0 text-[300px] mt-[40px] text-muted font-bold"
          )}
        >
          {header}
        </span>
        <section
          className="space-y-2 py-12 z-10"
          role="alert"
          aria-relevant="all"
        >
          <h2 className="text-xl text-center">{title}</h2>
          <p className="text-xl text-center pb-4">{message}</p>
          {children}
        </section>
      </main>
    </>
  );
}
