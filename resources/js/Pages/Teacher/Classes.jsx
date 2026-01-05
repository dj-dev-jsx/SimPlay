import { useState } from "react";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { ChevronDown, Plus, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Head } from "@inertiajs/react";

export default function Classes({ initialClasses = [], students = [] }) {
  const [expanded, setExpanded] = useState(null);
  const [classes, setClasses] = useState(
    initialClasses?.map((cls) => ({
      id: cls.id,
      name: cls.name || "Unnamed Class",
      students: cls.students || [],
    })) || []
  );
  const [loading, setLoading] = useState(false);

  // Modals / Editing state
  const [currentClassModal, setCurrentClassModal] = useState(null); // "class" or classId for student modal
  const [editingClassId, setEditingClassId] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const { toast } = useToast();

  // Form states
  const [className, setClassName] = useState("");
  const [studentData, setStudentData] = useState({
    student_id: "",
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  

  const toggleAccordion = (index) =>
    setExpanded(expanded === index ? null : index);

  // ---------- CLASS CRUD ----------

  const handleSaveClass = async (e) => {
    e.preventDefault();
    if (!className) return;
    setLoading(true);

    try {
      let res;
      if (editingClassId) {
        // Edit class
        res = await axios.put(route("teacher.update_class", editingClassId), {
          name: className,
        });
        setClasses((prev) =>
          prev.map((cls) =>
            cls.id === editingClassId
              ? { ...cls, name: res.data.class.name }
              : cls
          )
        );
        toast({ title: "Class updated successfully!" });
      } else {
        // Add class
        res = await axios.post(route("teacher.add_class"), { name: className });
        const newClass = {
          id: res.data.class.id,
          name: res.data.class.name || "Unnamed Class",
          students: res.data.class.students || [],
        };
        setClasses((prev) => [...prev, newClass]);
        toast({ title: "Class added successfully!" });
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to save class";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
      setClassName("");
      setEditingClassId(null);
      setCurrentClassModal(null);
    }
  };

  const handleDeleteClass = async (clsId) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    setLoading(true);

    try {
      await axios.delete(route("teacher.delete_class", clsId));
      setClasses((prev) => prev.filter((cls) => cls.id !== clsId));
      toast({ title: "Class deleted successfully!" });
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete class";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // ---------- STUDENT CRUD ----------

  const handleSaveStudent = async (e, classId) => {
    e.preventDefault();
    if (!studentData.student_id && (!studentData.firstname || !studentData.lastname)) {
      toast({ title: "Error", description: "Provide student info", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      let res;
      if (editingStudentId) {
        // Edit student
        res = await axios.put(route("teacher.update_student", editingStudentId), studentData);
        setClasses((prev) =>
          prev.map((cls) =>
            cls.id === classId
              ? {
                  ...cls,
                  students: cls.students.map((st) =>
                    st.id === editingStudentId ? res.data.student : st
                  ),
                }
              : cls
          )
        );
        toast({ title: "Student updated successfully!" });
      } else {
        // Add student
        res = await axios.post(route("teacher.add_student", classId), studentData);
        setClasses((prev) =>
          prev.map((cls) =>
            cls.id === classId ? { ...cls, students: [...cls.students, res.data.student] } : cls
          )
        );
        toast({ title: "Student added successfully!" });
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to save student";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
      setStudentData({
        student_id: "",
        firstname: "",
        middlename: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      });
      setEditingStudentId(null);
      setCurrentClassModal(null);
    }
  };

  const handleDeleteStudent = async (studentId, classId) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    setLoading(true);

    try {
      await axios.delete(route("teacher.delete_student", studentId));
      setClasses((prev) =>
        prev.map((cls) =>
          cls.id === classId
            ? { ...cls, students: cls.students.filter((st) => st.id !== studentId) }
            : cls
        )
      );
      toast({ title: "Student deleted successfully!" });
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete student";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout>
      <Head title="Classes" />
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">My Classes</h1>

          {/* Add/Edit Class */}
          <Dialog open={currentClassModal === "class"}>
            <DialogTrigger asChild>
              <Button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                onClick={() => {
                  setCurrentClassModal("class");
                  setEditingClassId(null);
                  setClassName("");
                }}
              >
                <Plus className="h-4 w-4" /> Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingClassId ? "Edit Class" : "Add Class"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveClass} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Class Name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2"
                  required
                />
                <DialogFooter>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full" disabled={loading}>
                    {loading ? "Saving..." : "Save Class"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Classes List */}
        <div className="space-y-4">
          {classes.map((cls, index) => (
            <div key={cls.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Accordion Header */}
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center px-6 py-4 bg-green-100 hover:bg-green-200 cursor-pointer"
              >
                <div className="flex-1 text-left text-green-700 font-semibold text-lg sm:text-xl">
                  {cls.name} ({cls.students.length})
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingClassId(cls.id);
                      setClassName(cls.name);
                      setCurrentClassModal("class");
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(cls.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                  {/* Add Student Modal */}
                  <Dialog
                    open={currentClassModal === cls.id}
                    onOpenChange={(open) => setCurrentClassModal(open ? cls.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow ml-4"
                      >
                        <Plus className="h-3 w-3" /> Add Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {editingStudentId ? "Edit Student" : `Add Student to ${cls.name}`}
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => handleSaveStudent(e, cls.id)}
                        className="flex flex-col gap-4"
                      >
                        <select
                          className="w-full border border-gray-300 rounded-lg p-2"
                          value={studentData.student_id}
                          onChange={(e) =>
                            setStudentData({ ...studentData, student_id: e.target.value })
                          }
                        >
                          <option value="">Select Existing Student</option>
                          {students.map((student) => (
                            <option key={student.id} value={student.id}>
                              {student.firstname} {student.lastname} ({student.username})
                            </option>
                          ))}
                          
                        </select>

                        <div className="text-center text-gray-500 font-medium my-2">— OR —</div>

                        <input
                          type="text"
                          placeholder="First Name"
                          value={studentData.firstname}
                          onChange={(e) =>
                            setStudentData({ ...studentData, firstname: e.target.value })
                          }
                          required={!studentData.student_id}
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        <input
                          type="text"
                          placeholder="Middle Name (optional)"
                          value={studentData.middlename}
                          onChange={(e) =>
                            setStudentData({ ...studentData, middlename: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={studentData.lastname}
                          onChange={(e) =>
                            setStudentData({ ...studentData, lastname: e.target.value })
                          }
                          required={!studentData.student_id}
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        <input
                          type="text"
                          placeholder="Username (required)"
                          value={studentData.username}
                          onChange={(e) =>
                            setStudentData({ ...studentData, username: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        <input
                          type="email"
                          placeholder="Email (optional)"
                          value={studentData.email}
                          onChange={(e) =>
                            setStudentData({ ...studentData, email: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        <input
                          type="password"
                          placeholder="Password (optional)"
                          value={studentData.password}
                          onChange={(e) =>
                            setStudentData({ ...studentData, password: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />

                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 w-full"
                            disabled={loading}
                          >
                            {loading ? "Saving..." : editingStudentId ? "Update" : "Add Student"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <ChevronDown
                    className={`h-5 w-5 text-green-700 transform transition-transform duration-300 ${
                      expanded === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Accordion Content */}
              <div
                className={`px-6 pb-4 transition-max-height duration-500 overflow-hidden ${
                  expanded === index ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <div className="overflow-x-auto mt-2">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-green-700 font-semibold">Name</th>
                        <th className="px-4 py-2 text-left text-green-700 font-semibold">Username</th>
                        <th className="px-4 py-2 text-left text-green-700 font-semibold">Email</th>
                        <th className="px-4 py-2 text-left text-green-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(cls.students || []).map((student) => (
                        <tr key={student.id}>
                          <td className="px-4 py-2">{student.firstname} {student.middlename} {student.lastname}</td>
                          <td className="px-4 py-2">{student.username || "-"}</td>
                          <td className="px-4 py-2">{student.email || "-"}</td>
                          <td className="px-4 py-2 flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setEditingStudentId(student.id);
                                setStudentData(student);
                                setCurrentClassModal(cls.id);
                              }}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDeleteStudent(student.id, cls.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
}
