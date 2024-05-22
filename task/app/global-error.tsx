"use client";
import React from "react";
import ErrorLayout from "@/layouts/error-layout";
import ErrorButton from "@/components/common/error-button";
import { t } from "@/lib/toast";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  React.useEffect(() => {
    t(`⚠️ ${error.message}`);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorLayout header="500" title="Oops!" message="An error occurred...">
          <ErrorButton reset={reset} />
        </ErrorLayout>
      </body>
    </html>
  );
}
