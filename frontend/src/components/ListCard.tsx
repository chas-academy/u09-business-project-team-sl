import type { FC } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

type ListCardProps = {
  id: string;
  title: string;
  description?: string;
};

const ListCard: FC<ListCardProps> = ({ id, title, description }) => {
  return (
    <Link
      to={`/lists/${id}`}
      className="block w-full cursor-pointer rounded-lg transition hover:outline-1 hover:outline-shade-400"
    >
      <div className="bg-shade-900 p-4 rounded-md flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-shade-50 line-clamp-1">
            {title}
          </h2>
          <div className="flex gap-1 text-shade-50">
            <Icon
              icon="ep:edit"
              className="cursor-pointer hover:text-shade-50 size-5"
              width={18}
            />{" "}
            {/* Change to component */}
            <Icon
              icon="akar-icons:cross"
              className="cursor-pointer hover:text-red-400 size-5"
              width={18}
            />{" "}
            {/* Change to component */}
          </div>
        </div>
        {description && (
          <p className="text-base text-shade-50 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default ListCard;
