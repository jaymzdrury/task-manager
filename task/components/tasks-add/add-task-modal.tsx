import Modal from "../common/modal";
import { Complete } from "@/types/types";

type AddTaskModal = {
  title: Complete;
};
export default function AddTaskModal({
  title,
  children,
}: React.PropsWithChildren<AddTaskModal>): JSX.Element {
  return (
    <Modal title="Add Task" description={`Added tasks appear in ${title}`}>
      {children}
    </Modal>
  );
}
