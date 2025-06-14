import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Searchbar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
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
        onBlur={() => setFocused(false)}
      />
      <Icon
        icon="ic:outline-search"
        className="w-6 h-6 text-white shrink-0"
      />
    </div>
  );
};

export default Searchbar;
