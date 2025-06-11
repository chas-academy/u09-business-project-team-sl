import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/backButton";
import InputField from "../components/InputField";
import Button from "../components/Button";

const CreateList = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      navigate("/lists");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl flex flex-col gap-6 pt-12">

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <BackButton text="Previous page" />
          <h2 className="text-shade-50 text-2xl font-semibold">Create new list</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-shade-900 p-9 rounded-lg"
        >
          <InputField
            title="Title"
            placeholder="List title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <InputField
            variant="textarea"
            title="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create list"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateList;