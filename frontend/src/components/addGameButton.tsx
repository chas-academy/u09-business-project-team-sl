import React from "react";
import { Icon } from "@iconify/react"; 

type AddGameButtonProps = {
  isAdded?: boolean;
};

const AddGameButton: React.FC<AddGameButtonProps> = ({ isAdded = false }) => {
  return (
    <button
      className={`flex items-center justify-center gap-1 
        px-3 py-1 rounded-2xl
        text-shade-50 text-base transition-colors cursor-pointer
        ${
          isAdded
            ? "bg-shade-500"
            : "bg-shade-500 hover:bg-shade-600"
        }`}
    >
      {isAdded ? (
        <>
          <span>Added</span>
          <Icon icon="ic:round-check" className="size-4" />
        </>
      ) : (
        <>
          <Icon icon="mynaui:plus-solid" className="size-4" />
          <span>Add game</span>
        </>
      )}
    </button>
  );
};

export default AddGameButton;
