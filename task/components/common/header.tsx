import { cn } from "@/lib/utils";
import styles from "../../app/styles.module.css";

type HeaderProps = {
  header: string;
  loadingClass?: string;
};

export default function Header({
  header,
  loadingClass,
  children,
}: React.PropsWithChildren<HeaderProps>): JSX.Element {
  return (
    <header
      className={cn(
        styles.between,
        loadingClass,
        "w-full max-w-[1225px] px-6 py-6 xl:px-0 mx-auto"
      )}
    >
      <h1 className="text-4xl font-semibold">{header}</h1>
      {children}
    </header>
  );
}
