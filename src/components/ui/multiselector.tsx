"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { knownTechnologies } from "@/constants/technologies";

type MultiSelectorProps = {
  selected: string[];
  onChange?: (selected: string[]) => void;
};

export const MultiSelector = ({ selected, onChange }: MultiSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>(selected);

const handleSetValue = (val: string) => {
  let newValue: string[];

  if (value.includes(val)) {
    newValue = value.filter((item) => item !== val);
  } else {
    newValue = [...value, val];
  }

  setValue(newValue);
  onChange?.(newValue); // ⬅️ вызов onChange если он передан
};


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          <div className="flex gap-2 justify-start">
            {value?.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-background text-xs font-medium"
                  >
                    {knownTechnologies.find((tech) => tech === val)}
                  </div>
                ))
              : "Выбрать технологию..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0">
        <Command>
          <CommandInput placeholder="Найти технологию..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandList>
                {knownTechnologies.map((tech) => (
                  <CommandItem
                    key={tech}
                    value={tech}
                    onSelect={() => {
                      handleSetValue(tech);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(tech) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tech}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
