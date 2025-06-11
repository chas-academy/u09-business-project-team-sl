import { apiFetch } from "../api/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListCard from "../components/ListCard";
import Button from "../components/Button";

const Lists: React.FC = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await apiFetch("/lists", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Could not fetch lists");

        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLists();
  }, []);

  return (
    <section className="mx-auto max-w-4xl flex flex-col gap-6 pt-12">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-shade-50">My lists</h2>
        <Button
          onClick={() => navigate("/createlist")}
        >
          Create new list
        </Button>
      </div>

      <div className="flex flex-col gap-5">
        {lists.map((list: any) => (
          <ListCard
            key={list._id}
            id={list._id}
            title={list.title}
            description={list.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Lists;
