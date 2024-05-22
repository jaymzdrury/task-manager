import { SelectContent, SelectGroup, SelectItem } from "../ui/select";

export default function HeaderDropdownMenu({
  values,
}: {
  values: readonly ["This Week", "Previous"];
}): JSX.Element {
  return (
    <SelectContent>
      <SelectGroup>
        {values.map((value) => (
          <SelectItem className="py-4 text-center" key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  );
}
