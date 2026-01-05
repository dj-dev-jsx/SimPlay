import { useState } from "react";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, BookCheckIcon } from "lucide-react";

export default function ListOfActivities({ classroom, activities: initialActivities }) {
  const [activities, setActivities] = useState(initialActivities || []);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [form, setForm] = useState({
    id: null,
    title: "",
    introduction: "",
    instructions: "",
    category: "",
    image: null,
  });

  /* ---------------- SAVE (ADD / EDIT) ---------------- */
  const handleSaveActivity = async () => {
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("introduction", form.introduction);
      data.append("instructions", form.instructions);
      data.append("category", form.category);

      if (form.image) {
        data.append("image", form.image);
      }

      let res;

      if (form.id) {
        // UPDATE
        res = await axios.post(
          route("teacher.update_activity", form.id),
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setActivities((prev) =>
          prev.map((a) => (a.id === res.data.activity.id ? res.data.activity : a))
        );

        setFeedbackMessage("Activity updated successfully!");
      } else {
        // CREATE
        res = await axios.post(
          route("teacher.store_activity", classroom.id),
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setActivities((prev) => [res.data.activity, ...prev]);
        setFeedbackMessage("Activity added successfully!");
      }

      setAddOpen(false);
      setEditOpen(false);
      setConfirmOpen(false);
      setFeedbackOpen(true);

      setForm({
        id: null,
        title: "",
        introduction: "",
        instructions: "",
        category: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save activity.");
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDeleteActivity = async () => {
    try {
      await axios.delete(route("teacher.delete_activity", form.id));
      setActivities((prev) => prev.filter((a) => a.id !== form.id));
      setDeleteOpen(false);
      setFeedbackMessage("Activity deleted successfully!");
      setFeedbackOpen(true);
    } catch (error) {
      console.error(error);
      alert("Failed to delete activity.");
    }
  };

  return (
    <TeacherLayout>
      <Head title={`${classroom.name} – Activities`} />

      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-700">
              {classroom.name} – Activities
            </h1>
            <p className="text-gray-600">Manage class activities</p>
          </div>

          <Button
            onClick={() => setAddOpen(true)}
            className="bg-green-600 hover:bg-green-700 flex gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Activity
          </Button>
        </div>

        {/* ACTIVITIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {activity.image_path && (
                <img
                  src={`/storage/${activity.image_path}`}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-green-800">
                  {activity.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {activity.introduction}
                </p>

                <span className="text-xs font-semibold text-green-600 uppercase">
                  {activity.category?.replace("_", " ")}
                </span>

                <div className="flex flex-wrap gap-2 mt-3">
                {/* Records button only if not reference */}
                {activity.category !== "reference" && (
                  <Button
                    asChild
                    className="w-full sm:flex-1 bg-purple-600 flex items-center justify-center gap-1"
                  >
                    <Link href={route("teacher.activity.records", activity.id)}>
                      <BookCheckIcon className="h-4 w-4" />
                      Records
                    </Link>
                  </Button>
                )}

                {/* Edit button */}
                <Button
                  onClick={() => {
                    setForm({
                      id: activity.id,
                      title: activity.title,
                      introduction: activity.introduction ?? "",
                      instructions: activity.instructions ?? "",
                      category: activity.category ?? "",
                      image: null,
                    });
                    setEditOpen(true);
                  }}
                  className="w-full sm:flex-1 bg-yellow-500 flex items-center justify-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>

                {/* Delete button */}
                <Button
                  onClick={() => {
                    setForm({ id: activity.id });
                    setDeleteOpen(true);
                  }}
                  className="w-full sm:flex-1 bg-red-600 flex items-center justify-center gap-1"
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </div>

              </div>
            </div>
          ))}
        </div>

        {/* ADD / EDIT MODAL */}
        <Dialog
          open={addOpen || editOpen}
          onOpenChange={() => {
            setAddOpen(false);
            setEditOpen(false);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {form.id ? "Edit Activity" : "Add Activity"}
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmOpen(true);
              }}
              className="space-y-4"
            >
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Activity Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <textarea
                className="w-full border rounded-lg p-2"
                placeholder="Introduction"
                rows={3}
                value={form.introduction}
                onChange={(e) =>
                  setForm({ ...form, introduction: e.target.value })
                }
              />

              <textarea
                className="w-full border rounded-lg p-2"
                placeholder="Instructions"
                rows={4}
                value={form.instructions}
                onChange={(e) =>
                  setForm({ ...form, instructions: e.target.value })
                }
              />

              <select
                className="w-full border rounded-lg p-2"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="pre_activity">Pre-Activity</option>
                <option value="concept_activity">Concept Activity</option>
                <option value="application">Application</option>
                <option value="reference">Reference</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />

              <Button type="submit" className="w-full bg-green-600">
                {form.id ? "Update Activity" : "Save Activity"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* CONFIRM SAVE */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to proceed?</p>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveActivity} className="bg-green-600">
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* CONFIRM DELETE */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Activity</DialogTitle>
            </DialogHeader>
            <p>This action cannot be undone.</p>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleDeleteActivity} className="bg-red-600">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* FEEDBACK */}
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Success</DialogTitle>
            </DialogHeader>
            <p>{feedbackMessage}</p>
            <DialogFooter className="flex justify-end">
              <Button onClick={() => setFeedbackOpen(false)} className="bg-green-600">
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  );
}
