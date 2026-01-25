import{j as e,H as f,L as s}from"./app-CUU1iLzl.js";import{S as m}from"./StudentLayout-DeScCdGG.js";import"./user-DyYaZDJY.js";import"./chevron-down-CnpUV9aT.js";import"./log-out-BDzL6a4i.js";function g({activity:t,nextActivityId:l,previousActivityId:a,isCompleted:r}){const i=async()=>{if(t.image_path)try{const c=await(await fetch(`/${t.image_path}`)).blob(),d=window.URL.createObjectURL(c),o=document.createElement("a"),x=t.title.toLowerCase().replace(/\s+/g,"_")+".jpg";o.href=d,o.download=x,document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(d)}catch(n){console.error("Image download failed:",n)}};return e.jsxs(m,{children:[e.jsx(f,{title:t.title}),e.jsxs("div",{className:"min-h-screen bg-[#cfe9c8] flex justify-center px-4 py-10 relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-10 left-5 text-4xl opacity-30 rotate-12 animate-bounce-slow",children:"🍃"}),e.jsx("div",{className:"absolute top-32 right-10 text-5xl opacity-25 -rotate-6 animate-bounce-slower",children:"🍂"}),e.jsx("div",{className:"absolute bottom-20 left-20 text-3xl opacity-20 rotate-45 animate-bounce-slow",children:"🍃"}),e.jsx("div",{className:"absolute bottom-10 right-32 text-4xl opacity-30 -rotate-12 animate-bounce-slower",children:"🍂"}),e.jsx("div",{className:"absolute top-1/2 left-1/2 text-6xl opacity-10 rotate-6 animate-bounce-slowest",children:"🍃"}),e.jsxs("div",{className:"relative w-full max-w-5xl bg-[#dff0d8] rounded-3xl shadow-xl p-6 sm:p-10 border border-[#b6d7a8]",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between items-center mb-8 gap-4",children:[e.jsx(s,{href:route("student.activities.byCategory",t.category),className:`bg-white border border-[#3f5f1f] text-[#3f5f1f] font-semibold px-4 py-2 rounded-full shadow hover:bg-[#eef6ea] transition
                 sm:absolute sm:top-6 sm:left-6`,children:"← Back to Activities"}),r&&e.jsx("div",{className:"bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse sm:absolute sm:top-6 sm:right-6",children:"✔ Completed"}),e.jsx("div",{className:"bg-[#3f5f1f] rounded-full px-10 py-4 shadow-md mt-10",children:e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-[#cfe9c8] tracking-wide uppercase text-center",children:t.category.replace("_"," ")})})]}),e.jsx("div",{className:"bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-8 shadow-inner border border-[#b6d7a8]",children:e.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-[#3f5f1f]",children:t.title})}),t.image_path&&e.jsxs("div",{className:"flex flex-col items-center mb-10 gap-4",children:[e.jsx("img",{src:`/${t.image_path}`,alt:t.title,className:`
        w-full
        max-w-4xl
        rounded-xl
        shadow-lg
        border border-[#b6d7a8]
        hover:scale-105
        transition-transform
        duration-300
      `}),e.jsx("button",{onClick:i,className:`
        bg-[#3f5f1f]
        hover:bg-[#2f4816]
        text-white
        font-semibold
        px-6
        py-3
        rounded-full
        shadow-md
        transition
        flex
        items-center
        gap-2
      `,children:"⬇ Download Activity"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#b6d7a8]",children:[a?e.jsx(s,{href:route("student.activity.show",a),className:"bg-white border-2 border-[#3f5f1f] text-[#3f5f1f] font-bold text-lg px-8 py-3 rounded-full shadow hover:bg-[#eef6ea] transition",children:"← Previous"}):e.jsx("span",{}),r?e.jsx("button",{disabled:!0,className:"bg-green-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow cursor-not-allowed",children:"Activity Completed ✅"}):l?e.jsx(s,{href:route("student.activity.show",l),className:"bg-[#3f5f1f] hover:bg-[#2f4816] text-white font-bold text-lg px-10 py-4 rounded-full shadow-md transition",children:"Next →"}):e.jsx("button",{disabled:!0,className:"bg-gray-400 text-white font-bold text-lg px-10 py-4 rounded-full shadow cursor-not-allowed",children:"No More Activities"})]})]})]})]})}export{g as default};
