import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";

function SignUp({ setAlertdata }) {
  const router = useRouter();

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [Email, setEmail] = useState(true);
  const [Pwd, setPwd] = useState(true);
  const [CnfPwd, setCnfPwd] = useState(true);

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

      case "confirm_password":
        const cnfpwdRegx = /[a-zA-Z0-9\!\@\#\$\%\&\-\_\\\/]{6,50}/g;
        const cnfpwdTest =
          cnfpwdRegx.test(userInput) && userInput === FormData.password;
        cnfpwdTest ? setCnfPwd(true) : setCnfPwd(false);
        cnfpwdTest && (dataValidation = true);
        break;
    }
    return dataValidation;
  };

  const userInput = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    if (checkUserInputData(e)) {
      setFormData((FormData) => {
        return { ...FormData, [e.target.name]: e.target.value };
      });
      console.log(FormData);
    }
  };

  const sendData = async () => {
    // e.preventDefault();
    if (
      Email &&
      Pwd &&
      CnfPwd &&
      FormData.email &&
      FormData.password &&
      FormData.confirm_password
    ) {
      setLoader(true);
      console.log("sending your message");
      createAccount();
    } else {
      console.log("error, request can not be send");
      setEmail(false);
      setPwd(false);
      setCnfPwd(false);
    }
  };

  const createAccount = async () => {
    const email = FormData.email;
    const password = FormData.password;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(data);
    console.log(error);

    if (error) alert("Error signing up:", error.message);
    else alert("Sign up successful!");
  };

  const formElementDiv = "w-full  flex flex-col space-y-1";
  const inputElement =
    "w-full border-none outline-none bg-gray-100 rounded-lg  text-sm py-2 px-5 placeholder:text-gray-300";
  const errormesage = "text-red-500 px-3 text-xs ";

  return (
    <>
      <div className="form w-full py-10 px-10 flex flex-col justify-center items-center space-y-5 bg-white rounded-3xl ">
        <p className="text-xl text-gray-600 font-bold ">Create Your Account</p>
        <p className="text-sm  ">Fill the form rest we will handel</p>
        <div className={`email ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className={inputElement}
            onChange={(e) => userInput(e)}
            type="email"
            name="email"
            id="email"
            placeholder="youremail@gmail.com"
          />
          {!Email && <p className={errormesage}>Invalid Email format</p>}
        </div>
        <div className={`pwd ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="pwd"
          >
            Password
          </label>
          <input
            className={inputElement}
            onChange={(e) => userInput(e)}
            type="password"
            name="password"
            id="pwd"
            placeholder="**********"
          />
          {!Pwd && (
            <p className={errormesage}>
              Password only contains a-z, A-Z, 0-9, !,@,#,$,%,&
            </p>
          )}
        </div>
        <div className={`cnfpwd ${formElementDiv} `}>
          <label
            className="px-3 text-sm font-medium  text-gray-500"
            htmlFor="cnfpwd"
          >
            Confirm Password
          </label>
          <input
            className={inputElement}
            onChange={(e) => userInput(e)}
            type="password"
            name="confirm_password"
            id="cnfpwd"
            placeholder="**********"
          />
          {!CnfPwd && <p className={errormesage}>Different from password</p>}
        </div>
        <div className="btn w-full px-16 pt-5 flex flex-col justify-center items-center space-y-4">
          {!Loader && (
            <button
              disabled={!(Email && Pwd && CnfPwd)}
              type="button"
              onClick={() => {
                sendData();
              }}
              className="bg-orange-400 shadow-lg shadow-orange-500/30 w-fit px-10 py-2 text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95"
            >
              Create +
            </button>
          )}

          <p className="text-gray-700 text-sm">
            Already have an account !
            <Link href="/signin">
              <span className=" text-orange-600 px-2 underline cursor-pointer">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
