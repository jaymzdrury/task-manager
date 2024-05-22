import NavBar from "@/components/navbar/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/common/header";
import { cn } from "@/lib/utils";

import styles from "../app/styles.module.css";

function SkeletonCard(): JSX.Element {
  return (
    <>
      <NavBar loadingClass={styles.loadingClass}>
        <Avatar>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </NavBar>
      <Header loadingClass={styles.loadingClass} header="Loading..." />
      <main className={styles.mainLayout}>
        <article className={cn(styles.columnContainer, "animate-pulse")}>
          <div className={styles.columnArea} />
        </article>
        <article className={cn(styles.columnContainer, "animate-pulse")}>
          <div className={styles.columnArea} />
        </article>
        <article className={cn(styles.columnContainer, "animate-pulse")}>
          <div className={styles.columnArea} />
        </article>
      </main>
    </>
  );
}

export default SkeletonCard;
