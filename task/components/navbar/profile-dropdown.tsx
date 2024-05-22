import { logout } from "@/actions/actions";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { User } from "@/types/types";

type ProfileDropdownProps = {
  currentUser: User;
};

export default function ProfileDropdown({
  currentUser,
  children,
}: React.PropsWithChildren<ProfileDropdownProps>): JSX.Element {
  return (
    <DropdownMenuContent className="w-56 mr-6">
      <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
      {children}
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <form itemScope action={logout}>
          <button type="submit" aria-label="logout" itemProp="logout">
            Logout
          </button>
        </form>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
