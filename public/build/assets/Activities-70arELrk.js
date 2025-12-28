import{j as e,H as l,L as m}from"./app-0DF_PI_u.js";import{S as x}from"./StudentLayout-Bp5wJYud.js";import"./user-Cm5WI2hM.js";import"./chevron-down-Bce3FB2N.js";import"./log-out-BEqe53Sh.js";function o({class:n,activities:s}){return e.jsx(x,{children:e.jsxs("div",{className:"min-h-screen bg-[#cfe9c8] flex justify-center px-4 py-8",children:[e.jsx(l,{title:"My Activities"}),e.jsxs("div",{className:"w-full max-w-7xl",children:[" ",e.jsxs("div",{className:"bg-[#3f5f1f] rounded-3xl px-6 py-5 mb-6 shadow-lg",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-extrabold text-[#cfe9c8] text-center",children:n?.name}),e.jsx("p",{className:"text-center text-sm sm:text-base text-[#e6f3df] mt-1",children:"Your Activities"})]}),s.length===0?e.jsx("div",{className:"text-center text-gray-700 font-medium",children:"No activities available yet 🌱"}):e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:s.map(t=>e.jsxs("div",{className:`
                    bg-white
                    rounded-3xl
                    shadow-xl
                    p-4 sm:p-6 md:p-8
                    flex flex-col justify-between
                    min-h-[400px] sm:min-h-[450px] md:min-h-[500px]
                  `,children:[t.image_path&&e.jsx("img",{src:`/storage/${t.image_path}`,alt:t.title,className:`
                        rounded-xl
                        mb-4
                        h-56 sm:h-64 md:h-72
                        w-full
                        object-cover
                      `}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-2",children:t.title}),e.jsx("p",{className:"text-gray-700 text-sm sm:text-base line-clamp-4 sm:line-clamp-5",children:t.instructions})]}),e.jsx(m,{href:route("student.activity.show",t.id),className:`
                        mt-4
                        bg-[#3f5f1f]
                        hover:bg-[#2f4816]
                        text-white
                        text-center
                        py-2 sm:py-3
                        rounded-full
                        font-semibold
                        text-base sm:text-lg
                        shadow-md
                        transition
                    `,children:"Start Activity →"})]},t.id))})]})]})})}export{o as default};
