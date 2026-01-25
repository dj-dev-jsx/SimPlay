import{j as e,H as a,L as n}from"./app-CUU1iLzl.js";import{S as l}from"./StudentLayout-DeScCdGG.js";import"./user-DyYaZDJY.js";import"./chevron-down-CnpUV9aT.js";import"./log-out-BDzL6a4i.js";function f({categories:s}){const r=t=>t.replace(/_/g," ").replace(/\b\w/g,i=>i.toUpperCase());return e.jsxs(l,{children:[e.jsx(a,{title:"Activity Categories"}),e.jsx("div",{className:"min-h-screen bg-[#cfe9c8] px-4 py-8 flex justify-center",children:e.jsxs("div",{className:"w-full max-w-3xl space-y-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-green-900 text-center",children:"Activity Categories"}),s.map(t=>e.jsx(n,{href:route("student.activities.byCategory",{category:t}),className:`\r
                block\r
                bg-white\r
                rounded-3xl\r
                shadow-lg\r
                hover:shadow-2xl\r
                transition\r
                overflow-hidden\r
              `,children:e.jsxs("div",{className:"flex items-center justify-between px-8 py-8 bg-[#3f5f1f] text-white hover:brightness-110 transition",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx("span",{className:"text-4xl",children:"📁"}),e.jsx("h2",{className:"text-2xl sm:text-3xl font-bold",children:r(t)})]}),e.jsx("span",{className:"text-2xl sm:text-3xl",children:"➜"})]})},t))]})})]})}export{f as default};
