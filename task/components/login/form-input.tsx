import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { emailWatch, loginWatch, submitted } from "@/lib/formUtils";
import { UseForm } from "@/types/types";

export default function FormInput({
  form,
  type,
}: {
  form: UseForm;
  type: "Name" | "Email" | "Password";
}): JSX.Element {
  const lowerCase = type.toLowerCase() as "email" | "password" | "name";

  return (
    <FormField
      control={form.control}
      name={lowerCase}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1.5">
          <FormLabel htmlFor={lowerCase}>{type}</FormLabel>
          <FormControl>
            <Input
              required
              type={lowerCase === "name" ? "text" : lowerCase}
              placeholder={type}
              disabled={submitted(form)}
              aria-disabled={submitted(form)}
              className={
                lowerCase === "email"
                  ? emailWatch(form, lowerCase)
                  : loginWatch(form, lowerCase)
              }
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
