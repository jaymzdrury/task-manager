import dynamic from "next/dynamic";
const DrawerBodyLazy = dynamic(() =>
  import("../drawer/drawer").then((mod) => mod.default)
);
import { PackageCheck } from "lucide-react";
import LightMode from "./light-mode";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { cn } from "@/lib/utils";

import styles from "../../app/styles.module.css";

type NavBarProps = {
  loadingClass?: string;
  search?: React.ReactNode;
};

export default function NavBar({
  loadingClass,
  search,
  children,
}: React.PropsWithChildren<NavBarProps>): JSX.Element {
  return (
    <nav
      aria-label="navbar"
      className={cn(styles.between, "p-6 sticky top-0 z-10 bg-background")}
    >
      <Drawer direction="left">
        <DrawerTrigger
          aria-label="drawer menu"
          className="cursor-pointer"
          asChild
        >
          <PackageCheck className={loadingClass} />
        </DrawerTrigger>
        <DrawerBodyLazy />
      </Drawer>
      {search}
      <span itemScope className={cn(styles.start, "space-x-6")}>
        <LightMode loadingClass={loadingClass} />
        {children}
      </span>
    </nav>
  );
}
