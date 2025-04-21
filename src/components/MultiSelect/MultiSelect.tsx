import { useState, useEffect, useRef } from "react";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect = ({ options, selected, onChange }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="relative w-full max-w-[400px]" ref={wrapperRef}>
      <div
        className="flex flex-wrap gap-1 p-2 border border-gray-300 rounded cursor-pointer bg-white min-h-[38px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          selected.map((option) => (
            <span
              key={option}
              className="flex items-center px-2 py-1 bg-gray-200 rounded text-sm"
            >
              {option}
              <button
                type="button"
                className="ml-1 border-none bg-transparent cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option);
                }}
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">Выберите технологии...</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute w-full max-h-48 overflow-y-auto border border-gray-300 rounded bg-white mt-1 shadow-lg z-[1000]">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2 cursor-pointer"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
