import React from "react";
import Link from "next/link";

const Topbar = () => {

  return (
    <div
      className={`h-[10%] w-full flex items-center py-4 z-50 bg-primary`}
    >
      <Link href="/" className="flex flex-col w-full items-center text-center justify-center align-middlet">
          <h1 className="text-white font-bold text-lg">Checkpoint: frontend</h1>
          <p className="text-white">Countries</p>
      </Link>
    </div>
  );
};

export default Topbar;
