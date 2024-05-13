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
  const [AllJoks, setAllJoks] = useState([])
  useEffect(() => {
    // check local storage for user data
    const data = JSON.parse(localStorage.getItem("sb-fotcxlpibcxnzftqmdfw-auth-token"));
    if (data) {
      console.log(data)
      setEmail(data.user.email)
      fetchData()
    }

  }, []);

  useEffect(() => {
    if (Email !== "") {
      insertData()
      fetchData()
    }
  }, [Joke])
  useEffect(() => {
    if (Email !== "") {
      fetchData()
    }
  }, [Email])

  const generateJoke = async () => {
    // generate joke
    if (UserTopic === "") {
      alert("Please Enter a Topic")
      return
    }
    const joke = await generateJokewithGemini(UserTopic);

    alert(joke)
    setJoke(joke)

  }


  async function insertData() {
    let mail = Email;
    let joke_ = Joke;
    let topic_ = UserTopic;

    if (mail === "" || topic_ === "" || joke_ === "") { return }
    const { data, error } = await supabase
      .from('jokes')
      .insert([
        {
          email: mail,
          topic: topic_,
          joke: joke_
        },
      ]).select();

    if (error) {
      alert('Error inserting data:', error);
      console.log(error)
      return;
    }

    alert('Inserted data');
  }

  async function fetchData() {
    let mail = Email;
    if (mail === "") { return }

    const { data, error } = await supabase
      .from('jokes')
      .select()
      .eq('email', mail)

    if (error) {
      alert('Error fetching data:', error);
      console.log(error)
      return;
    }

    console.log(data)
    setAllJoks(data.reverse())

    alert('Fetched data');
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



      <div className="flex flex-col justify-center items-center space-x-2 gap-10  p-10">
        <p className="text-2xl font-bold">{Joke}</p>
      </div>

      <div className="mb-20">
        <p className="text-3xl font-extrabold py-10 capitalize text-center">Your Jokes History</p>
        <div className="container w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
            {AllJoks.map((joke, index) => {
              return (
                <div key={index} className="bg-gray-200 p-4 rounded-lg flex flex-col justify-start gap-5">
                  <p className="underline">{joke.topic}</p>
                  <p className="text-gray-700">{joke.joke}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>


    </>)
}
