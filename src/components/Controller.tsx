"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LuSlidersHorizontal } from "react-icons/lu";

type Props = {
  children: React.ReactNode;
};

export default function Controller({ children }: Props) {
  const [open, setOpen] = useState(true);
  return (
    <div className="z-50 absolute top-4 right-4">
      <Button size={"icon"} variant={"outline"} onClick={() => setOpen(!open)}>
        <LuSlidersHorizontal size={24} />
      </Button>
      {open && (
        <div className="absolute top-4 left-4 bg-white text-black text-sm p-2 shadow w-72 z-50">
          {children}
        </div>
      )}
    </div>
  );
}
