import{j as e,H as l,L as n}from"./app-CUU1iLzl.js";import{S as i}from"./StudentLayout-DeScCdGG.js";import"./user-DyYaZDJY.js";import"./chevron-down-CnpUV9aT.js";import"./log-out-BDzL6a4i.js";function o({class:a,activities:s}){return e.jsxs(i,{children:[e.jsx(l,{title:"My Activities"}),e.jsx("div",{className:"min-h-screen bg-[#cfe9c8] px-4 py-8",children:e.jsxs("div",{className:"w-full max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx(n,{href:route("student.activities.categories"),className:`
                inline-flex items-center
                gap-2
                bg-white
                border border-[#3f5f1f]
                text-[#3f5f1f]
                font-semibold
                px-4 py-2
                rounded-full
                shadow
                hover:bg-[#eef6ea]
                transition
              `,children:"← Back to Categories"}),e.jsx("span",{className:"hidden sm:block text-sm text-green-900 font-medium",children:"Select an activity to begin"})]}),e.jsx("div",{className:"bg-[#3f5f1f] rounded-3xl px-6 py-5 mb-8 shadow-lg",children:e.jsx("h1",{className:"text-2xl sm:text-3xl font-extrabold text-[#cfe9c8] text-center",children:"Your Activities"})}),s.length===0?e.jsx("div",{className:"text-center text-gray-700 font-medium",children:"No activities available yet 🌱"}):e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:s.map(t=>e.jsxs("div",{className:`
                    bg-white
                    rounded-3xl
                    shadow-xl
                    p-4 sm:p-6 md:p-8
                    flex flex-col
                    min-h-[420px]
                  `,children:[t.image_path&&e.jsx("img",{src:`/${t.image_path}`,alt:t.title,className:`
                        rounded-xl
                        mb-4
                        h-56 sm:h-64
                        w-full
                        object-cover
                      `}),e.jsx("div",{className:"flex-1",children:e.jsx("h2",{className:"text-lg sm:text-xl font-bold text-green-900 mb-2",children:t.title})}),e.jsx(n,{href:route("student.activity.show",t.id),className:`
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
                    `,children:t.category==="reference"?"View Reference":"Start Activity"})]},t.id))})]})})]})}export{o as default};
