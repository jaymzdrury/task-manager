"use client";
import React from "react";
import { editUser } from "@/actions/actions";
import { DEFAULT_STATE, ID, useGlobalState } from "@/hooks/useGlobalState";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";
import { idCheck, submitCountLimit } from "@/lib/formUtils";
import { Role, User } from "@/types/types";

export default function EditUserRole({
  userRole,
  user,
}: {
  userRole: Role;
  user: User;
}): JSX.Element {
  const [, idSet] = useGlobalState(ID);
  const form = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(async () => {
    try {
      idSet(user._id);
      const { success, error } = await editUser(user, { role: userRole });
      !success ? t(`⚠️ ${error}`) : t(`✅ ${user.name} moved to ${userRole}`);
      idSet(DEFAULT_STATE);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  }, []);

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <form itemScope itemID={user._id} onSubmit={form.handleSubmit(onSubmit)}>
      <Button
        type="submit"
        itemProp="edit user role"
        aria-label="submit"
        disabled={idCheck(user._id) || submitCountLimit(form)}
        aria-disabled={idCheck(user._id) || submitCountLimit(form)}
        variant="ghost"
      >
        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </Button>
    </form>
  );
}
