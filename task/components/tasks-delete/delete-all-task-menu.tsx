import dynamic from "next/dynamic";
const DeleteAllTaskModalLazy = dynamic(() =>
  import("./delete-all-task-modal").then((mod) => mod.default)
);
import DeleteAllTaskForm from "./delete-all-task-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Complete } from "@/types/types";
import { cn } from "@/lib/utils";

export default function DeleteAllTaskMenu({
  title,
  length,
}: {
  title: Complete;
  length: number;
}): JSX.Element {
  return (
    <Dialog>
      <DropdownMenuContent>
        <DialogTrigger
          aria-label="delete all"
          disabled={!length}
          aria-disabled={!length}
        >
          <DropdownMenuItem
            className={cn(
              !length ? "cursor-not-allowed" : "cursor-pointer",
              "w-28 justify-center"
            )}
          >
            {!length ? "No Tasks" : "Delete All"}
          </DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuContent>
      <DeleteAllTaskModalLazy title={title}>
        <DeleteAllTaskForm title={title} />
      </DeleteAllTaskModalLazy>
    </Dialog>
  );
}
