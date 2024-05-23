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
    show && (
      <div className="bg-gray-50  shadow-lg p-2 h-28  w-1/2 z-50 absolute bottom-4 right-1/3 overflow-auto">
        <div className="flex gap-2 flex-wrap">
          <div className="">
            <Button
              onClick={() => setShow(!show)}
              variant="outline"
              className="absolute top-0 right-0 opacity-50 hover:opacity-100"
              size={"icon"}
            >
              <LuX size={24} />
            </Button>
          </div>

          {showingItems.map((item) => (
            <Badge className="text-sm" key={item.id}>
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}
