"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { debounce } from "lodash";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";
import { Search } from "lucide-react";

export default function SearchInput(): JSX.Element {
  const form = useForm({ defaultValues: { text: "" } });

  const searchParams = useSearchParams();
  const pahtname = usePathname();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(
    async (entry) => {
      try {
        const params = new URLSearchParams(searchParams);
        entry.text ? params.set("search", entry.text) : params.delete("search");
        router.replace(`${pahtname}?${params.toString()}`);
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [searchParams, pahtname, router]
  );

  const debouncedSubmit = debounce(onSubmit, 300);

  return (
    <span
      itemScope
      className="relative w-3/5 md:w-4/5 max-w-[1250px] 2xl:ml-20"
    >
      <Search
        aria-label="search icon"
        className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground"
      />
      <Input
        itemType="search input"
        {...form.register("text", {
          onChange: form.handleSubmit(debouncedSubmit),
        })}
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-10 text-md border-none"
        defaultValue={searchParams.get("search")?.toString()}
      />
    </span>
  );
}
