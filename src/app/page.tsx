"use client";

import Counter from "@/features/Counter/Counter";
import { store } from "@/shared/config/store";
import Link from "next/link";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}
