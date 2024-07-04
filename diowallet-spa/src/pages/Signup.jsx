import Input from "../components/Input";
import Button from "../components/Button";
import LogoHeader from "../components/LogoHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { signupSchema } from "../schemas/SignupSchema";
import { signinSchema } from "../schemas/SigninSchema";
import { signup, signin } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Auth() {
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState("");

  const {
    register: registerSU,
    handleSubmit: handleSubmitSU,
    formState: { errors: errorSU },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const {
    register: registerSI,
    handleSubmit: handleSubmitSI,
    formState: { errors: errorSI },
  } = useForm({ resolver: zodResolver(signinSchema) });

  async function handleSignUp(data) {
    try {
      await signup(data);
      navigate("/");
    } catch (error) {
      setApiErrors(error.message);
    }
  }

  async function handleSignIn(data) {
    try {
      const token = await signin(data);
      Cookies.set("token", token.data, { expires: 1 });
      navigate("/");
    } catch (error) {
      setApiErrors(error.message);
      navigate("/auth");
    }
  }

  useEffect(() => {
    Cookies.remove("token");
  }, []);

  return (
    <div className="grid grid-cols-2 shadow-xl rounded p-8 shadow-xls bg-white container">
      {apiErrors && <ErrorInput text={apiErrors} />}
		    <div className="Flex flex-col form_content text-center justify-center">
		    <LogoHeader />
        <form
          onSubmit={handleSubmitSU(handleSignUp)}
          className="flex flex-col justify-center gap-2 w-[20rem] text-xl"
        > 
			    <p className="text-center font-bold">Create your account</p>
             <fieldset>
               <Input
                 type="text"
                 label="Name"
                 register={registerSU}
                 name="name"
               />
               {errorSU.name && <ErrorInput text={errorSU.name.message} />}
             </fieldset>
             <fieldset>
               <Input
                 type="email"
                 label="Email"
                 register={registerSU}
                 name="email"
               />
               {errorSU.email && <ErrorInput text={errorSU.email.message} />}
             </fieldset>
             <fieldset>
               <Input
                 type="password"
                 label="Password"
                 register={registerSU}
                 name="password"
               />
               {errorSU.password && <ErrorInput text={errorSU.password.message} />}
             </fieldset>
             <Button type="submit" text="Continue" className="register"/>
           </form>
		  </div>
		  <div className=" Flex flex-col form_content justify-between">

			<form
          onSubmit={handleSubmitSI(handleSignIn)}
          className="flex flex-col justify-between gap-5 form_content login_form "
        >
           <fieldset>
           <p className="text-center text-white">Already have an account? <br/> <span>Login</span> </p>
            <Input
              type="email"
              label="Email"
              register={registerSI}
              name="email"
            />
            {errorSI.email && <ErrorInput text={errorSI.email.message} />}
       
     
           </fieldset>
            <fieldset>
            <Input
              type="password"
              label="Password"
              register={registerSI}
              name="password"
            />
            {errorSI.password && <ErrorInput text={errorSI.password.message} />}
         
              </fieldset>
          <Button type="submit" text="Continue" className="login underline"/>
        </form>
			</div>
    </div>
  );
}
