import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  text: string;
};

const BackButton: React.FC<BackButtonProps> = ({ text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={handleClick}
      className="group inline-flex items-center w-fit cursor-pointer"
    >
      <Icon
        icon="ci:chevron-left"
        width={16}
        height={16}
        className="text-shade-200 group-hover:text-primary transition-colors"
      />
      <span className="text-xs leading-none text-shade-200 group-hover:text-primary transition-colors">
        {text}
      </span>
    </div>
  );
};

export default BackButton;
