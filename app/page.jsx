import { Suspense } from "react";
import List from "../components/List/List";

function ListFallback() {
  return null;
}

export default function Page() {
  return (
    <Suspense fallback={<ListFallback />}>
      <List />
    </Suspense>
  );
}