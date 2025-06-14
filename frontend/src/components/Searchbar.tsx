import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

type Props = {
  onSearch: (query: string) => void;
  onSuggest: (query: string) => void;
  suggestions: string[];
};

const Searchbar: React.FC<Props> = ({ onSearch, onSuggest, suggestions }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      onSuggest(query.trim());
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowDropdown(false);
  };

  return (
     <div className="relative w-[220px]">
    <div
      className="flex items-center px-[12px] py-[8px] h-[40px] w-[220px] min-w-[180px] rounded-[16px] bg-shade-600 gap-[4px]"
    >
      <input
        type="text"
        placeholder={!focused && !query ? "Search specific game..." : ""}
        className="bg-transparent outline-none text-white cursor-pointer placeholder-bg-shade-200 w-[calc(100%-24px)]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
      />
      <Icon
        icon="ic:outline-search"
        className="w-6 h-6 text-white shrink-0"
      />
    </div>

    {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-shade-600 text-white w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((sug, idx) => (
            <li
              key={idx}
              className="px-3 py-2 hover:bg-shade-500 cursor-pointer"
              onClick={() => handleSuggestionClick(sug)}
            >
              {sug}
            </li>
          ))}
        </ul>
    )}
    </div>
  );
};

export default Searchbar;
