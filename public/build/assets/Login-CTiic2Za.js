import{j as e,u,H as p,L as h}from"./app-DpWdnyqr.js";import{T as l,I as o}from"./TextInput-DvXwxJc4.js";import{I as x}from"./InputLabel-CfXuXYiH.js";import{P as g}from"./PrimaryButton-BpONBUc6.js";import{G as f}from"./GuestLayout-B8R3xuyB.js";import{S as b}from"./smile-DzL7OqwL.js";import{c as j,U as w}from"./user-BwGJtngF.js";function N({className:t="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+t})}const v=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],y=j("lock",v);function S({status:t,canResetPassword:a}){const{data:r,setData:n,post:d,processing:c,errors:m}=u({username:"",password:"",remember:!1}),i=s=>{s.preventDefault(),d(route("login"),{onFinish:()=>reset("password")})};return e.jsxs(f,{children:[e.jsx(p,{title:"Log in"}),e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[#96b190] px-4",children:e.jsxs("div",{className:`
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
                `,children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("div",{className:"flex justify-center mb-2",children:e.jsx(b,{className:"h-10 w-10 sm:h-12 sm:w-12 text-orange-500"})}),e.jsx("h2",{className:`
                            text-2xl 
                            sm:text-3xl 
                            md:text-4xl 
                            font-extrabold 
                            text-green-700
                        `,children:"Welcome Back!"}),e.jsx("p",{className:"text-xs sm:text-sm md:text-base text-gray-600",children:"Let’s start learning 🎒"})]}),t&&e.jsx("div",{className:"mb-4 text-center text-sm font-medium text-green-600",children:t}),e.jsxs("form",{onSubmit:i,className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx(x,{htmlFor:"username",value:"Username",className:"text-sm sm:text-base font-semibold"}),e.jsxs("div",{className:"relative mt-1",children:[e.jsx(w,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-green-600 h-5 w-5"}),e.jsx(l,{id:"username",type:"text",name:"username",value:r.username,className:`
                                        block w-full 
                                        pl-10 
                                        rounded-xl 
                                        text-sm sm:text-base md:text-lg
                                    `,autoComplete:"username",isFocused:!0,onChange:s=>n("username",s.target.value)})]}),e.jsx(o,{message:m.username,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(x,{htmlFor:"password",value:"Password (optional)",className:"text-sm sm:text-base font-semibold"}),e.jsxs("div",{className:"relative mt-1",children:[e.jsx(y,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-green-600 h-5 w-5"}),e.jsx(l,{id:"password",type:"password",name:"password",value:r.password,className:`
                                        block w-full 
                                        pl-10 
                                        rounded-xl 
                                        text-sm sm:text-base md:text-lg
                                    `,autoComplete:"current-password",onChange:s=>n("password",s.target.value)})]}),e.jsx(o,{message:m.password,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(N,{name:"remember",checked:r.remember,onChange:s=>n("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-xs sm:text-sm md:text-base text-gray-600",children:"Remember me"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-4",children:[a&&e.jsx(h,{href:route("password.request"),className:"text-xs sm:text-sm text-gray-600 underline hover:text-gray-900",children:"Forgot password?"}),e.jsx(g,{className:`
                                    w-full sm:w-auto 
                                    bg-green-600 
                                    hover:bg-green-700 
                                    rounded-xl 
                                    px-6 sm:px-8 
                                    py-2 sm:py-3 
                                    text-sm sm:text-base md:text-lg
                                `,disabled:c,children:"Log in"})]})]})]})})]})}export{S as default};
