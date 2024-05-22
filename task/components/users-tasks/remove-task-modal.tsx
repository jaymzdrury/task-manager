import Modal from "../common/modal";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

export default function RemoveTaskModal({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <Modal title="Remove Task" description="Remove this task">
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
