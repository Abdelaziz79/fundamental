"use client";
import { Item } from "@/app/binary-search-tree/Types";
import React, { useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
};

export default function Controller({
  children,
  showingItems,
}: {
  children: React.ReactNode;
  showingItems?: Item[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="z-50 absolute top-4 right-4">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => setOpen(!open)}
        >
          <LuSlidersHorizontal size={24} />
        </Button>
      </div>
      {open && (
        <div className="absolute top-4 left-4 bg-white text-black text-sm p-2 shadow w-72 z-50">
          {children}
        </div>
      )}
      {showingItems?.length
        ? open && (
            <div className="bg-gray-50   h-28  w-1/2 z-50 absolute bottom-4 right-1/3  shadow-lg p-2 overflow-auto">
              <div className="flex gap-2 flex-wrap">
                {showingItems?.map((item) => (
                  <Badge className="text-sm" key={item.id}>
                    {item.label}
                  </Badge>
                ))}
              </div>
            </div>
          )
        : null}
    </>
  );
}

export function ControlElement({ children }: Props) {
  return <div className="flex gap-2 my-2 items-center w-full ">{children}</div>;
}
