"use client";
import { LockKeyhole, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePageRouter } from "@/SERVER/router";

export const UserSignup = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handlePageRouter = usePageRouter();

  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        password: userPassword,
      }),
    })
      .then((res) => res.json().then((data) => ({ res, data })))
      .then(({ res, data }) => {
        if (!res.ok) {
          alert(data.error);
          setUserName("");
          setUserPassword("");
          return;
        }
        alert("user created");
        setUserName("");
        setUserPassword("");
      });
  };

  return (
    <div className="bg-neutral-900  h-96 w-[450px] justify-center items-center flex flex-col rounded-4xl pt-2 font-mono border-4 border-white ">
      <p className="h-16 w-[380px] flex items-center justify-start text-2xl font-bold  text-white tracking-wider ">
        SIGN UP
      </p>
      <form
        className="flex flex-col h-full w-full items-center justify-start gap-2 p-2"
        onSubmit={handleAddUser}
      >
        <label className="h-8 w-[380px] flex items-end text-sm tracking-wider text-white gap-1">
          <User className="w-5 h-5 " />
          User Name
        </label>
        <input
          className="h-10 w-[380px]  rounded-md text-sm focus:ring-0 hover:shadow-[0px_0px_10px_#fff] outline-0 p-2 text-neutral-900 bg-white font-medium"
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
          className="h-10 w-[380px]  rounded-md text-sm focus:ring-0 hover:shadow-[0px_0px_10px_#fff] outline-0 p-2  text-neutral-900 bg-white font-medium"
          type="password"
          placeholder="Enter your password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button
          type="submit"
          className="tracking-wider h-10 w-[380px] mt-2 rounded-md border-2 font-bold focus:ring-0 focus:bg-blue-800 focus:text-white outline-0 border-blue-800 text-blue-500 hover:text-white hover:bg-blue-800 text-sm "
        >
          Create account
        </button>
      </form>
      <p
        onClick={() => handlePageRouter("login")}
        className="text-white h-10 w-[380px] justify-end flex  mb-2 cursor-pointer"
      >
        Back to Sign In
      </p>
    </div>
  );
};
