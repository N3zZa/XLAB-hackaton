import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type SelectContainerProps = {
  items: { value: string; label: string }[];
  onChange?: (prev: string) => void;
  value: string;
}; 

const SelectContainer = ({ items, onChange, value }: SelectContainerProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Выбрать опцию" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Опция</SelectLabel>
          {items.map((item, i) => (
            <SelectItem key={item.value + i} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectContainer;
