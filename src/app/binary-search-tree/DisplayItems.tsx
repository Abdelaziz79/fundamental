"use client";
import { Badge } from "@/components/ui/badge";
import { Item } from "./Types";

export default function DisplayItems({
  showingItems,
  open,
}: {
  showingItems: Item[];
  open: boolean;
}) {
  return (
    open && (
      <div className="bg-gray-50   h-28  w-1/2 z-50 absolute bottom-4 right-1/3  shadow-lg p-2 overflow-auto">
        <div className="flex gap-2 flex-wrap">
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
