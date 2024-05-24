"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import { Item } from "./Types";

export default function DisplayItems({
  showingItems,
}: {
  showingItems: Item[];
}) {
  const [show, setShow] = useState(true);
  return (
    <div className=" h-28  w-1/2 z-50 absolute bottom-4 right-1/3 ">
      <div className="absolute -top-14 right-0">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            setShow(!show);
          }}
        >
          <LuX size={24} />
        </Button>
      </div>
      {show && (
        <div className="bg-gray-50 h-full w-full  shadow-lg p-2 overflow-auto">
          <div className="flex gap-2 flex-wrap">
            {showingItems.map((item) => (
              <Badge className="text-sm" key={item.id}>
                {item.label}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
