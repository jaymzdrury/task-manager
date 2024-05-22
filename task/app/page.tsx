import MainLayout from "@/layouts/main-layout";
import TaskSection from "@/components/tasks/task-section";
import HeaderDropdown from "@/components/common/header-dropdown";
import { getTasks, getUsers } from "../actions/requests";
import { groupBy } from "lodash";

import { REVALIDATE } from "@/types/schemas";

export const revalidate = REVALIDATE;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
  const search = searchParams.search ? String(searchParams.search) : undefined;
  const [tasks, users] = await Promise.all([getTasks(search), getUsers()]);

  return (
    <MainLayout users={users} header="Tasks" dropdown={<HeaderDropdown />}>
      <TaskSection
        users={users}
        title="ToDo"
        column={groupBy(tasks, "complete")["ToDo"]}
      />
      <TaskSection
        users={users}
        title="In Progress"
        column={groupBy(tasks, "complete")["In Progress"]}
      />
      <TaskSection
        users={users}
        title="Done"
        column={groupBy(tasks, "complete")["Done"]}
      />
    </MainLayout>
  );
}
