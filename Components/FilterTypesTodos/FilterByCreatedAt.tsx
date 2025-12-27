"use client";

import * as React from "react";
import { ChevronDownIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

interface FilterByCreatedAtProps {
  value?: DateRange;
  onChange: (range?: DateRange) => void;
}

export const FilterByCreatedAt = ({
  value,
  onChange,
}: FilterByCreatedAtProps) => {
  const [open, setOpen] = React.useState(false);

  const label =
    value?.from && value?.to
      ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
      : "SELECT DATE";

  return (
    <div className="flex flex-col gap-3 relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-[140px] justify-between font-normal "
            title={
              value?.from && value?.to
                ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
                : undefined
            }
          >
            <span className="truncate">{label}</span>

            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 " align="end">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
      {value?.from && (
        <span
          className="h-5 w-5 border-neutral-200 border bg-neutral-600 flex items-center justify-center shrink-0 cursor-pointer opacity-60 
             hover:opacity-100 hover:shadow-[0px_0px_5px_#808080] rounded-lg absolute right-[-2] top-[-8]"
          onClick={(e) => {
            e.stopPropagation();
            onChange(undefined);
            setOpen(false);
          }}
        >
          <X className="size-4 text-white" />
        </span>
      )}
    </div>
  );
};
