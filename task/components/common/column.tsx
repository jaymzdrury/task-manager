import { notFound } from "next/navigation";
import { cn, isNode } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

import styles from "../../app/styles.module.css";

type ColumnCardProps = {
  title: string;
  settings: React.ReactNode;
};

export default function Column({
  title,
  settings,
  children,
}: React.PropsWithChildren<ColumnCardProps>): JSX.Element {
  if (!isNode(settings)) return notFound();

  return (
    <article className={styles.columnContainer}>
      <header itemScope itemID={title} className={cn(styles.between, "pb-4")}>
        <h2 itemType="task status" className="text-2xl font-semibold">
          {title}
        </h2>
        {settings}
      </header>
      <ScrollArea className={styles.columnArea}>{children}</ScrollArea>
    </article>
  );
}
