import { CalendarCheck, PackageCheck, SquareUser } from "lucide-react";
import DrawerLink from "./drawer-link";
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn, paths } from "@/lib/utils";

import styles from "../../app/styles.module.css";

const iconStyle = "mr-4";

export default function DrawerBody(): JSX.Element {
  return (
    <DrawerContent className="h-full w-48">
      <DrawerHeader className="mx-4">
        <DrawerClose>
          <DrawerTitle className={cn(styles.start, "space-x-4")}>
            <PackageCheck className="text-teal-600" />
            <p className="font-bold">Task Pro</p>
          </DrawerTitle>
        </DrawerClose>
      </DrawerHeader>
      <ul className="py-12">
        <DrawerLink href={paths.TASKS}>
          <CalendarCheck className={iconStyle} />
          Tasks
        </DrawerLink>
        <DrawerLink href={paths.USERS}>
          <SquareUser className={iconStyle} />
          Users
        </DrawerLink>
      </ul>
    </DrawerContent>
  );
}
