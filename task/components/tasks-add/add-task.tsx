"use client";
import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const AddTaskModalLazy = dynamic(() =>
  import("./add-task-modal").then((mod) => mod.default)
);
import AddTaskForm from "./add-task-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Complete } from "@/types/types";
import { isNode } from "@/lib/utils";

type AddTaskProps = {
  title: Complete;
  icon: React.ReactNode;
};

export default function AddTask({
  title,
  icon,
  children,
}: React.PropsWithChildren<AddTaskProps>): JSX.Element {
  if (!isNode(icon)) return notFound();
  const [open, openSet] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger aria-label="add task">{icon}</DialogTrigger>
      <AddTaskModalLazy title={title}>
        <AddTaskForm openSet={openSet} complete={title}>
          {children}
        </AddTaskForm>
      </AddTaskModalLazy>
    </Dialog>
  );
}
