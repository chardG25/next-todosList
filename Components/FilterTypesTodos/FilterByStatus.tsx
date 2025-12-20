"use client";

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
    <div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">ALL STATUS</SelectItem>
          <SelectItem value="completed">COMPLETED</SelectItem>
          <SelectItem value="pending">PENDING</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
