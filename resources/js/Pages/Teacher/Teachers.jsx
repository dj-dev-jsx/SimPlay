import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Users, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TeacherLayout from "@/Layouts/TeacherLayout";

export default function Teachers({ teachers }) {
  const [open, setOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
const [feedbackMessage, setFeedbackMessage] = useState("");


  const { data, setData, post, processing, reset, errors } = useForm({
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

const submit = (e) => {
  e.preventDefault();

  post(route("teachers.store_teacher"), {
    onSuccess: () => {
      reset();
      setOpen(false);
      setFeedbackMessage("Teacher added successfully!");
      setFeedbackOpen(true);
    },
  });
};


  return (
    <TeacherLayout>
      <Head title="Teachers" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Users className="h-7 w-7 text-green-700" />
            <div>
              <h1 className="text-2xl font-bold text-green-700">
                Teachers
              </h1>
              <p className="text-gray-600">
                Manage registered teachers
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="bg-green-600 hover:bg-green-700 flex gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Full Name</th>
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {teachers.map((t, i) => (
                <tr key={t.id} className="hover:bg-green-50">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-green-800">
                    {t.fullname}
                  </td>
                  <td className="px-6 py-4">{t.username}</td>
                  <td className="px-6 py-4">{t.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Teacher Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Teacher</DialogTitle>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-4">
              <input
                className="w-full border rounded-lg p-2"
                placeholder="First name"
                value={data.firstname}
                onChange={(e) => setData("firstname", e.target.value)}
              />
              {errors.firstname && (
                <p className="text-sm text-red-600">{errors.firstname}</p>
                )}

              <input
                className="w-full border rounded-lg p-2"
                placeholder="Middle name (optional)"
                value={data.middlename}
                onChange={(e) => setData("middlename", e.target.value)}
              />
              {errors.middlename && (
                <p className="text-sm text-red-600">{errors.middlename}</p>
                )}
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Last name"
                value={data.lastname}
                onChange={(e) => setData("lastname", e.target.value)}
              />
                {errors.lastname && (
                <p className="text-sm text-red-600">{errors.lastname}</p>
                )}
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData("username", e.target.value)}
              />
                {errors.username && (
                <p className="text-sm text-red-600">{errors.username}</p>
                )}
              <input
                type="email"
                className="w-full border rounded-lg p-2"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
                {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
                )}
              <input
                type="password"
                className="w-full border rounded-lg p-2"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
                {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
                )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-green-600"
                >
                  Save Teacher
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* Feedback Dialog */}
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="text-green-700">
                Success 🎉
            </DialogTitle>
            </DialogHeader>

            <p className="text-gray-700">
            {feedbackMessage}
            </p>

            <DialogFooter className="mt-4">
            <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setFeedbackOpen(false)}
            >
                OK
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

      </div>
    </TeacherLayout>
  );
}
