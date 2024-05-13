"use client"
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { generateJokewithOpenAi } from "@/utils/openai";
import { generateJokewithGemini } from "@/utils/gemini";

export default function Home() {
  const [Email, setEmail] = useState("")
  const [UserTopic, setUserTopic] = useState("")
  const [Joke, setJoke] = useState()
  useEffect(() => {
    // check local storage for user data
    const data = JSON.parse(localStorage.getItem("sb-fotcxlpibcxnzftqmdfw-auth-token"));
    if (data) {
      // if user is logged in, redirect to dashboard
      console.log(data)
      setEmail(data.user.email)
    }

  }, []);

  const generateJoke = async () => {
    // generate joke
    if (UserTopic === "") {
      alert("Please Enter a Topic")
      return
    }
    const joke = await generateJokewithGemini(UserTopic);

    alert(joke)
    setJoke([joke])

  }
  return (
    <>
      <Navbar email={Email} />

      <div className="bg-black font-bold w-full h-60 text-gray-400 flex justify-center items-center text-4xl">
        Joke Generator
      </div>

      <div className="w-full max-w-lg m-auto">

        <div className="flex flex-col justify-center items-center space-x-2 gap-10  p-10">
          <input
            onChange={(e) => {
              setUserTopic(e.target.value)
            }}
            type="text" className="border w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Your Desired Joke Topic" />
          <button onClick={() => {
            generateJoke()
          }} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Generate</button>
        </div>

      </div>

      <div className="alljokes">
        
              <div  className="flex flex-col justify-center items-center space-x-2 gap-10  p-10">
          <p className="text-2xl font-bold">{Joke}</p>
              </div>
         


      </div>

    </>)
}
