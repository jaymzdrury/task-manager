"use client";
import React from "react";
import ErrorLayout from "@/layouts/error-layout";
import ErrorButton from "@/components/common/error-button";
import { t } from "@/lib/toast";

export default function Error({
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
    <ErrorLayout header="400" title="Oops!" message="An error occurred...">
      <ErrorButton reset={reset} />
    </ErrorLayout>
  );
}
