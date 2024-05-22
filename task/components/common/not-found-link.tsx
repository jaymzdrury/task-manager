import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import styles from "../../app/styles.module.css";

type NotFoundLinkProps = {
  href: "/" | "/login" | "/register" | "/users";
};

export default function NotFoundLink({
  href,
  children,
}: React.PropsWithChildren<NotFoundLinkProps>): JSX.Element {
  const link = href === "/" ? "tasks" : href.replace("/", "");
  return (
    <div className={cn(styles.center, "pt-2 pb-12")}>
      <Link
        role="button"
        className={cn(
          styles.start,
          "bg-primary text-primary-foreground rounded-full p-4 font-bold"
        )}
        itemProp="link"
        itemID={href}
        href={href}
        aria-label={`Link to ${link}`}
      >
        {children}
        <ArrowRight
          aria-label={`Return to ${link}`}
          className="ml-1"
          size={20}
        />
      </Link>
    </div>
  );
}
