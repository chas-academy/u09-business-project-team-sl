import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface EditProps {
    
  listId?: string;
}

const Edit: React.FC<EditProps> = ({ listId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (listId) {
      navigate(`/editlist/${listId}`);
    } else {
      navigate("/editlist");
    }
  };

  return (
    <button
      aria-label="Edit list"
      onClick={handleClick}
      className="w-5 h-5 flex items-center justify-center cursor-pointer text-shade-50 hover:text-primary-muted transition-colors"
    >
      <Icon icon="ep:edit" width={20} height={20} />
    </button>
  );
};

export default Edit;
