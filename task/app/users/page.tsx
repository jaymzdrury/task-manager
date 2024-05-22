import { Metadata } from "next";
import { groupBy } from "lodash";
import { getTasks, getUsers } from "@/actions/requests";
import MainLayout from "@/layouts/main-layout";
import UserSection from "@/components/users/user-section";

import { REVALIDATE } from "@/types/schemas";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Task Manager | Users",
  description: "This is the Task Manager Users Page",
};

export default async function Users(): Promise<JSX.Element> {
  const [tasks, users] = await Promise.all([getTasks(), getUsers()]);

  return (
    <MainLayout users={users} header="Users">
      <UserSection
        tasks={tasks}
        users={groupBy(users, "role")["user"]}
        title="user"
      />
      <UserSection
        tasks={tasks}
        users={groupBy(users, "role")["admin"]}
        title="admin"
      />
      <UserSection
        tasks={tasks}
        users={groupBy(users, "role")["auth"]}
        title="auth"
      />
    </MainLayout>
  );
}
