"use client";
import dynamic from "next/dynamic";
const HeaderDropdownMenuLazy = dynamic(() =>
  import("./header-dropdown-menu").then((mod) => mod.default)
);
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const values = ["This Week", "Previous"] as const;

export default function HeaderDropdown(): JSX.Element {
  const searchParams = useSearchParams();
  const pahtname = usePathname();
  const router = useRouter();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    value === values[0]
      ? params.set("search", "gte")
      : params.set("search", "lte");
    router.replace(`${pahtname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        aria-label="task filter dropdown"
        className="w-fit space-x-2 border-none text-md"
      >
        <SelectValue className="text-md" placeholder="Select Week" />
      </SelectTrigger>
      <HeaderDropdownMenuLazy values={values} />
    </Select>
  );
}
