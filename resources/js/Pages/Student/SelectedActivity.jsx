import StudentLayout from "@/Layouts/StudentLayout";
import { Head, Link } from "@inertiajs/react";

export default function SelectedActivity({
  activity,
  nextActivityId,
  previousActivityId,
  isCompleted,
}) {
  return (
    <StudentLayout>
      <Head title={activity.title} />

      <div className="min-h-screen bg-[#cfe9c8] flex justify-center px-4 py-10 relative overflow-hidden">

        {/* Floating leaf emojis */}
        <div className="absolute top-10 left-5 text-4xl opacity-30 rotate-12 animate-bounce-slow">🍃</div>
        <div className="absolute top-32 right-10 text-5xl opacity-25 -rotate-6 animate-bounce-slower">🍂</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-20 rotate-45 animate-bounce-slow">🍃</div>
        <div className="absolute bottom-10 right-32 text-4xl opacity-30 -rotate-12 animate-bounce-slower">🍂</div>
        <div className="absolute top-1/2 left-1/2 text-6xl opacity-10 rotate-6 animate-bounce-slowest">🍃</div>

        <div className="relative w-full max-w-5xl bg-[#dff0d8] rounded-3xl shadow-xl p-6 sm:p-10 border border-[#b6d7a8]">

          {/* Back Button */}
          <Link
            href={route("student.activities")}
            className="absolute top-6 left-6 bg-white border border-[#3f5f1f] text-[#3f5f1f] font-semibold px-4 py-2 rounded-full shadow hover:bg-[#eef6ea] transition"
          >
            ← Back to Activities
          </Link>

          {/* Completed Badge */}
          {isCompleted && (
            <div className="absolute top-6 right-6 bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
              ✔ Completed
            </div>
          )}

          {/* Header */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#3f5f1f] rounded-full px-10 py-4 shadow-md">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#cfe9c8] tracking-wide uppercase">
                {activity.category.replace("_", " ")}
              </h1>
            </div>
          </div>

          {/* Intro Section */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <img
              src="/images/kids.png"
              alt="Kids"
              className="w-32 sm:w-40 flex-shrink-0"
            />
            <p className="text-[#2f4816] text-base sm:text-lg leading-relaxed">
              {activity.introduction}
            </p>
          </div>

          {/* Activity Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-8 shadow-inner border border-[#b6d7a8]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#3f5f1f]">
              {activity.title}
            </h2>
            {activity.instructions && (
              <p className="mt-2 text-[#2f4816] text-base sm:text-lg">
                {activity.instructions}
              </p>
            )}
          </div>

          {/* Worksheet Image */}
          {activity.image_path && (
            <div className="flex justify-center mb-10">
              <img
                src={`/storage/${activity.image_path}`}
                alt={activity.title}
                className="w-full max-w-4xl rounded-xl shadow-lg border border-[#b6d7a8] hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#b6d7a8]">

            {/* Previous */}
            {previousActivityId ? (
              <Link
                href={route("student.activity.show", previousActivityId)}
                className="bg-white border-2 border-[#3f5f1f] text-[#3f5f1f] font-bold text-lg px-8 py-3 rounded-full shadow hover:bg-[#eef6ea] transition"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}

            {/* Next / Completed */}
            {isCompleted ? (
              <button
                disabled
                className="bg-green-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow cursor-not-allowed"
              >
                Activity Completed ✅
              </button>
            ) : nextActivityId ? (
              <Link
                href={route("student.activity.show", nextActivityId)}
                className="bg-[#3f5f1f] hover:bg-[#2f4816] text-white font-bold text-lg px-10 py-4 rounded-full shadow-md transition"
              >
                Next →
              </Link>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white font-bold text-lg px-10 py-4 rounded-full shadow cursor-not-allowed"
              >
                No More Activities
              </button>
            )}
          </div>

        </div>
      </div>
    </StudentLayout>
  );
}
