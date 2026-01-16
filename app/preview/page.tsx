"use client";
import Preview from "@/components/preview/Preview";
import { Suspense } from "react";

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Preview />
    </Suspense>
  );
}
