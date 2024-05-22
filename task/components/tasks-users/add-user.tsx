import Avatar from "./avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Plus } from "lucide-react";

type AddUserProps = {
  disabled: boolean;
};

function AddUser({
  disabled,
  children,
}: React.PropsWithChildren<AddUserProps>): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        aria-disabled={disabled}
        aria-label="add user dropdown"
        asChild
      >
        <Avatar
          style={`-ml-1 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <Plus />
        </Avatar>
      </DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
}

export default AddUser;
