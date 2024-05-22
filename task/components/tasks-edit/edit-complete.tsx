"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DEFAULT_STATE, ID, useGlobalState } from "@/hooks/useGlobalState";
import { editTask } from "@/actions/actions";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/toast";
import { idCheck, submitCountLimit } from "@/lib/formUtils";
import { errMsg } from "@/lib/utils";
import { Complete, Task } from "@/types/types";

export default function EditComplete({
  task,
  complete,
}: {
  task: Task;
  complete: Complete;
}): JSX.Element {
  const [, idSet] = useGlobalState(ID);
  const form = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(async () => {
    try {
      idSet(task._id);
      const { success, error } = await editTask(task, { complete });
      !success ? t(`⚠️ ${error}`) : t(`✅ Task moved to ${complete}`);
      idSet(DEFAULT_STATE);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  }, [task, complete]);

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <Form {...form}>
      <form itemScope itemID={task._id} onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          type="submit"
          itemProp="edit"
          aria-label="edit"
          disabled={idCheck(task._id) || submitCountLimit(form)}
          aria-disabled={idCheck(task._id) || submitCountLimit(form)}
          variant="ghost"
        >
          {complete}
        </Button>
      </form>
    </Form>
  );
}
