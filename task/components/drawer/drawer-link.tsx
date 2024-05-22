"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type DrawerLinksProps = {
  href: "/" | "/users";
};

export default function DrawerLink({
  href,
  children,
}: React.PropsWithChildren<DrawerLinksProps>): JSX.Element {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <li>
      <Link
        href={href}
        itemScope
        itemID={href}
        aria-label={`Link to ${href.replace("/", "")}`}
        aria-current={active ? "page" : undefined}
      >
        <Button
          variant="ghost"
          itemProp="link"
          size="lg"
          className={cn(
            active ? "bg-muted font-bold" : "opacity-75",
            "w-full text-md justify-start mb-4"
          )}
        >
          {children}
        </Button>
      </Link>
    </li>
  );
}
