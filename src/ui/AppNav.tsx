"use client";

import Link from "next/link";

export default function AppNav() {
  return (
    <>
      <header>
        <nav className="bg-slate-600 px-4 py-2 flex justify-between items-center rounded">
          <Link href={"/"} className="text-white">
            <div>
              NE<span className="text-2xl text-red-700">X</span>T CRUD
            </div>
            <div className="text-xs">tanstack typescript</div>
          </Link>
          <Link href={"/addUser"}>
            <button className="c-btn bg-green-600">Add user</button>
          </Link>
        </nav>
      </header>
    </>
  );
}
