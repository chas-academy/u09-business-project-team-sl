import { Icon } from "@iconify/react";

type deleteProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DeleteButton: React.FC<deleteProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-5 h-5 flex items-center justify-center cursor-pointer rounded transition-colors hover:text-[#C31010] text-shade-50"
    >
      <Icon icon="akar-icons:cross" />
    </button>
  );
};

export default DeleteButton;
