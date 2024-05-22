import NavBar from "@/components/navbar/navbar";
import Profile from "@/components/navbar/profile";
import Header from "@/components/common/header";
import SearchInput from "@/components/navbar/search-input";
import { User } from "@/types/types";

import styles from "../app/styles.module.css";

type MainLayoutProps = {
  users: User[];
  header: string;
  dropdown?: React.ReactNode;
};

export default function MainLayout({
  users,
  header,
  dropdown,
  children,
}: React.PropsWithChildren<MainLayoutProps>): JSX.Element {
  return (
    <>
      <NavBar search={<SearchInput />}>
        <Profile users={users} />
      </NavBar>
      <main>
        <Header header={header}>{dropdown}</Header>
        <section className={styles.mainLayout}>{children}</section>
      </main>
    </>
  );
}
