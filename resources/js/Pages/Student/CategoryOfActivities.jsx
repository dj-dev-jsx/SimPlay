import StudentLayout from "@/Layouts/StudentLayout";
import { Head, Link } from "@inertiajs/react";

export default function CategoryOfActivities({ categories }) {
  const formatCategory = (category) => {
    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <StudentLayout>
      <Head title="Activity Categories" />

      <div className="min-h-screen bg-[#cfe9c8] px-4 py-8 flex justify-center">
        <div className="w-full max-w-3xl space-y-6">

          <h1 className="text-3xl font-bold text-green-900 text-center">
            Activity Categories
          </h1>

          {/* Folder Cards */}
          {categories.map((category) => (
            <Link
              key={category}
              href={route("student.activities.byCategory", { category })}
              className="
                block
                bg-white
                rounded-3xl
                shadow-lg
                hover:shadow-2xl
                transition
                overflow-hidden
              "
            >
              <div className="flex items-center justify-between px-8 py-8 bg-[#3f5f1f] text-white hover:brightness-110 transition">
                <div className="flex items-center gap-6">
                  <span className="text-4xl">📁</span>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {formatCategory(category)}
                  </h2>
                </div>
                <span className="text-2xl sm:text-3xl">➜</span>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </StudentLayout>
  );
}
