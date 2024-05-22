"use client";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";

export default function LightMode({
  loadingClass,
}: {
  loadingClass?: string;
}): JSX.Element {
  const { setTheme, theme } = useTheme();
  return (
    <Switch
      itemProp="light mode"
      className={loadingClass}
      disabled={!!loadingClass}
      aria-disabled={!!loadingClass}
      aria-label="toggle"
      onClick={
        loadingClass
          ? undefined
          : () => setTheme(theme === "light" ? "dark" : "light")
      }
    />
  );
}
