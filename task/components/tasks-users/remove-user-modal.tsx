import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import Modal from "../common/modal";

type RemoveUserModalProps = {
  userName: string;
};

export default function RemoveUserModal({
  userName,
  children,
}: React.PropsWithChildren<RemoveUserModalProps>): JSX.Element {
  return (
    <Modal
      title="Remove user"
      description={`Remove ${userName} from this task?`}
    >
      <DialogFooter className="items-center">
        {children}
        <DialogClose className="hidden sm:block" asChild>
          <Button type="button" aria-label="cancel" variant="secondary">
            No
          </Button>
        </DialogClose>
      </DialogFooter>
    </Modal>
  );
}
