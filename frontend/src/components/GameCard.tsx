import type { FC } from "react";
import { Icon } from "@iconify/react";
import AddGameButton from "./addGameButton";
import { Link } from "react-router-dom";

type GameCardProps = {
  variant: "game" | "list";
  rawgId: number;
  title: string;
  platforms: string[];
  image: string;
  onDelete?: () => void;
};

export const GameCard: FC<GameCardProps> = ({
  variant,
  rawgId,
  title,
  platforms,
  image,
  onDelete,
}) => {
  const cardContent = (
    <div
      className="min-h-[250px] max-w-sm rounded-md overflow-hidden border border-transparent 
                 transition duration-200 flex flex-col w-full outline-1 outline-shade-500
                hover:outline-2 hover:outline-shade-200"
    >
      <div
        className="w-full h-[150px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex flex-col justify-between gap-6 bg-shade-900 p-3 flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-white">{title}</h2>
            <p className="text-xs text-shade-200">{platforms.join(", ")}</p>
          </div>
          {variant === "list" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="text-white hover:text-red-400 transition"
            >
              <Icon icon="akar-icons:cross" width="16" height="16" className="cursor-pointer" />
            </button>
          )}
        </div>
        {variant === "game" && (
          <div className="flex justify-between items-center">
            <div onClick={(e) => e.stopPropagation()} className="cursor-pointer">
              <AddGameButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return variant === "game" ? (
    <Link to={`/games/${rawgId}`} className="block w-full cursor-pointer">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};
