"use client";

import { Circle, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FilterByStatusProps {
  value: string;
  onChange: (value: string) => void;
}

export const FilterByStatus = ({ onChange, value }: FilterByStatusProps) => {
  return (
    <div className="relative">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">ALL STATUS</SelectItem>
          <SelectItem value="completed">
            <Circle className="size-4 fill-green-400" />
            COMPLETED
          </SelectItem>
          <SelectItem value="pending">
            <Circle className="size-4 fill-amber-400" />
            PENDING
          </SelectItem>
        </SelectContent>
      </Select>

      {value !== "ALL" && (
        <span
          className="h-5 w-5 border-neutral-200 border bg-neutral-600 flex items-center justify-center shrink-0 cursor-pointer opacity-60 
             hover:opacity-100 hover:shadow-[0px_0px_5px_#808080] rounded-lg absolute right-[-2] top-[-8]"
          onClick={(e) => {
            onChange("ALL");
          }}
        >
          <X className="size-4 text-white" />
        </span>
      )}
    </div>
  );
};
