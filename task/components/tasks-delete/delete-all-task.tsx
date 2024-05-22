import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";

export default function DeleteAllTask({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="task settings">
        <EllipsisIcon />
      </DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
}
