import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
// import styles from "@/styles/ThreeballDropping.module.css";
// import { AlertPropsType } from "@/components/TypeInterfaces/PropsInterfaces";

function SignIn({ setAlertdata }) {
  const router = useRouter();

  const [LoginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [Email, setEmail] = useState(true);
  const [Pwd, setPwd] = useState(true);

  const [Loader, setLoader] = useState(false);

  const checkUserInputData = (e) => {
    const userInput = e.target.value;
    let dataValidation = false;
    switch (e.target.name) {
      case "email":
        const emailRegx =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gi;
        const emailTest = emailRegx.test(userInput);
        emailTest ? setEmail(true) : setEmail(false);
        emailTest ? (e.target.value = e.target.value.toLowerCase()) : "";
        emailTest && (dataValidation = true);
        break;
      case "password":
        const pwdRegx = /[a-zA-Z0-9\!\@\#\$\%\&\-\_\\\/]{6,50}/g;
        const pwdTest = pwdRegx.test(userInput);
        pwdTest ? setPwd(true) : setPwd(false);
        pwdTest && (dataValidation = true);
        break;
    }
    return dataValidation;
  };

  const userInput = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    if (checkUserInputData(e)) {
      setLoginCredentials((LoginCredentials) => {
        return {
          ...LoginCredentials,
          [e.target.name]: e.target.value,
        };
      });
      console.log(FormData);
    }
  };

  const sendData = async () => {
    // e.preventDefault();
    if (Email && Pwd && LoginCredentials.email && LoginCredentials.password) {
      setLoader(true);
      console.log("sending your message");
      requestLogin();
    } else {
      console.log("error, request can not be send");
      setEmail(false);
      setPwd(false);
    }
  };

  const requestLogin = async () => {
    const { email, password } = LoginCredentials;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(error);
    console.log(data);

    if (error) alert("Error logging in:", error.message);
    else alert("Login successful!");

    if(data){
      router.push("/");
    }
  };

  return (
    <div className="form w-full py-10 px-20  flex flex-col justify-center items-center space-y-5 bg-white rounded-3xl ">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
        <p className="text-sm ">Sign in to access your account</p>
      </div>
      <form className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email Address
            </label>
            <input
              onChange={(e) => userInput(e)}
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border outline-none rounded-md "
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Link href="/auth/forgetpassword">
                <span className="text-xs hover:underline ">
                  Forgot password?
                </span>
              </Link>
            </div>
            <input
              onChange={(e) => userInput(e)}
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border outline-none rounded-md "
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-5">
          <div>
        
              <button
                onClick={() => {
                  sendData();
                }}
                type="button"
                className="bg-orange-400 shadow-lg shadow-orange-500/30 w-fit px-10 py-2
               text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95"
              >
                Sign in
              </button>
            
          </div>
          <p className="w-full px-6 text-sm text-center ">
            Don&#39;t have an account yet?
            <Link href="/signup">
              <span className="underline text-sm text-orange-500 cursor-pointer px-2">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
