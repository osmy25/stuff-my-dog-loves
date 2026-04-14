import { Suspense } from "react";
import List from "../components/List/List";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <List />
    </Suspense>
  );
}