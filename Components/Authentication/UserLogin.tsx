"use client";

import { LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { usePageRouter } from "@/SERVER/router";
import { toast } from "react-toastify";

export const UserLogin = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handlePageRouter = usePageRouter();

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userName, password: userPassword }),
    })
      .then((res) => res.json().then((data) => ({ res, data })))
      .then(({ res, data }) => {
        if (!res.ok) {
          toast.error(
            <div className="text-red-400 flex w-[150px] h-[50px] items-center">
              {data.error}
            </div>
          );
          setUserName("");
          setUserPassword("");
          return;
        }
        toast.success(
          <div className="text-green-200 flex w-[150px] h-[50px] items-center">
            {`Welcome! ${data.user.username}`}
          </div>
        );
        console.log(data.user.username);
        setUserName("");
        setUserPassword("");
        handlePageRouter(`home`);
      });
  };

  return (
    <div className="bg-neutral-900  h-96 w-[450px] justify-center items-center flex flex-col rounded-4xl pt-2 font-mono border-2 border-white ">
      <p className="h-16 w-[380px] flex items-center justify-start text-2xl font-bold  text-white tracking-wider ">
        SIGN IN
      </p>
      <form
        className="flex flex-col h-full w-full items-center justify-start gap-2 p-2"
        onSubmit={handleSignIn}
      >
        <label className="h-8 w-[380px] flex items-end text-sm tracking-wider text-white gap-1">
          <User className="w-5 h-5 " />
          User Name
        </label>
        <input
          className="h-10 w-[380px]  rounded-md text-sm focus:ring-0 hover:shadow-[0px_0px_5px_#fff] outline-0 p-2 text-neutral-900 bg-white font-medium"
          type="input"
          placeholder="Enter your User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="h-8 w-[380px] items-end flex text-sm tracking-wider text-white mt-2 gap-1">
          <LockKeyhole className="w-5 h-5 " />
          Password
        </label>
        <input
          className="h-10 w-[380px]  rounded-md text-sm focus:ring-0 hover:shadow-[0px_0px_5px_#fff] outline-0 p-2  text-neutral-900 bg-white font-medium"
          type="password"
          placeholder="Enter your password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button className="tracking-wider h-10 w-[380px] mt-2 rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm ">
          Login
        </button>
      </form>
      <p
        onClick={() => handlePageRouter("signup")}
        className="text-white h-10 w-[380px] justify-end flex  mb-2 cursor-pointer"
      >
        Create an account
      </p>
    </div>
  );
};
