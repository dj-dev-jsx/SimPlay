import{j as e,H as n,L as l}from"./app-DpWdnyqr.js";import{S as m}from"./StudentLayout-CLOFbA8v.js";import"./user-BwGJtngF.js";import"./chevron-down-DT77CBpY.js";import"./log-out-BC1rDXJV.js";function o({class:r,activities:s}){return e.jsx(m,{children:e.jsxs("div",{className:"min-h-screen bg-[#cfe9c8] flex justify-center px-4 py-8",children:[e.jsx(n,{title:"My Activities"}),e.jsxs("div",{className:"w-full max-w-7xl",children:[" ",e.jsxs("div",{className:"bg-[#3f5f1f] rounded-3xl px-6 py-5 mb-6 shadow-lg",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-extrabold text-[#cfe9c8] text-center",children:r?.name}),e.jsx("p",{className:"text-center text-sm sm:text-base text-[#e6f3df] mt-1",children:"Your Activities"})]}),s.length===0?e.jsx("div",{className:"text-center text-gray-700 font-medium",children:"No activities available yet 🌱"}):e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:s.map(t=>e.jsxs("div",{className:`\r
                    bg-white\r
                    rounded-3xl\r
                    shadow-xl\r
                    p-4 sm:p-6 md:p-8\r
                    flex flex-col justify-between\r
                    min-h-[400px] sm:min-h-[450px] md:min-h-[500px]\r
                  `,children:[t.image_path&&e.jsx("img",{src:`/storage/${t.image_path}`,alt:t.title,className:`\r
                        rounded-xl\r
                        mb-4\r
                        h-56 sm:h-64 md:h-72\r
                        w-full\r
                        object-cover\r
                      `}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-2",children:t.title}),e.jsx("p",{className:"text-gray-700 text-sm sm:text-base line-clamp-4 sm:line-clamp-5",children:t.instructions})]}),e.jsx(l,{href:route("student.activity.show",t.id),className:`\r
                        mt-4\r
                        bg-[#3f5f1f]\r
                        hover:bg-[#2f4816]\r
                        text-white\r
                        text-center\r
                        py-2 sm:py-3\r
                        rounded-full\r
                        font-semibold\r
                        text-base sm:text-lg\r
                        shadow-md\r
                        transition\r
                    `,children:"Start Activity →"})]},t.id))})]})]})})}export{o as default};
