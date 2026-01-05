import{j as e,u as p,H as h,L as g}from"./app-BnqAK2iq.js";import{T as o,I as l}from"./TextInput-Cc1zq_Qe.js";import{I as x}from"./InputLabel-DqZkm7HR.js";import{P as f}from"./PrimaryButton-Dez5uoYV.js";import{G as b}from"./GuestLayout-DJ5eT2VI.js";import{c as j,U as w}from"./user-Nh4GgbeE.js";function v({className:t="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+t})}const N=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],y=j("lock",N);function P({status:t,canResetPassword:a}){const{data:n,setData:r,post:d,processing:i,errors:m,reset:c}=p({username:"",password:"",remember:!1}),u=s=>{s.preventDefault(),d(route("login"),{onFinish:()=>c("password")})};return e.jsxs(b,{children:[e.jsx(h,{title:"Log in"}),e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[#96b190] px-4",children:e.jsxs("div",{className:`
                        w-full
                        max-w-sm
                        sm:max-w-md
                        md:max-w-lg
                        bg-white
                        rounded-3xl
                        shadow-xl
                        p-6
                        sm:p-8
                        md:p-10
                    `,children:[e.jsx("div",{className:"text-center mb-6",children:e.jsx("div",{className:"flex justify-center mb-3",children:e.jsx("img",{src:"primath.png",alt:"School Logo",className:`
                                    h-20
                                    sm:h-24
                                    md:h-28
                                    w-auto
                                    object-contain
                                    animate-float
                                `})})}),t&&e.jsx("div",{className:"mb-4 text-center text-sm font-medium text-green-600",children:t}),e.jsxs("form",{onSubmit:u,className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx(x,{htmlFor:"username",value:"Username",className:"text-sm sm:text-base font-semibold"}),e.jsxs("div",{className:"relative mt-1",children:[e.jsx(w,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-green-600 h-5 w-5"}),e.jsx(o,{id:"username",type:"text",name:"username",value:n.username,className:`
                                        block w-full
                                        pl-10
                                        rounded-xl
                                        text-sm sm:text-base md:text-lg
                                    `,autoComplete:"username",isFocused:!0,onChange:s=>r("username",s.target.value)})]}),e.jsx(l,{message:m.username,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(x,{htmlFor:"password",value:"Password (optional)",className:"text-sm sm:text-base font-semibold"}),e.jsxs("div",{className:"relative mt-1",children:[e.jsx(y,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-green-600 h-5 w-5"}),e.jsx(o,{id:"password",type:"password",name:"password",value:n.password,className:`
                                        block w-full
                                        pl-10
                                        rounded-xl
                                        text-sm sm:text-base md:text-lg
                                    `,autoComplete:"current-password",onChange:s=>r("password",s.target.value)})]}),e.jsx(l,{message:m.password,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(v,{name:"remember",checked:n.remember,onChange:s=>r("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-xs sm:text-sm md:text-base text-gray-600",children:"Remember me"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-4",children:[a&&e.jsx(g,{href:route("password.request"),className:"text-xs sm:text-sm text-gray-600 underline hover:text-gray-900",children:"Forgot password?"}),e.jsx(f,{className:`
                                    w-full sm:w-auto
                                    bg-green-600
                                    hover:bg-green-700
                                    rounded-xl
                                    px-6 sm:px-8
                                    py-2 sm:py-3
                                    text-sm sm:text-base md:text-lg
                                `,disabled:i,children:"Log in"})]})]})]})})]})}export{P as default};
