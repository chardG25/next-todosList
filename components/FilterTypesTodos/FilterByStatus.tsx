"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const FilterByStatus = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="completed" className="text-xs">
            COMPLETED
          </SelectItem>
          <SelectItem value="pending" className="text-xs">
            PENDING
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
