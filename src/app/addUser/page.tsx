"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

// 1. create fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 2. create function for posting data
export const postData = async (data: any) => {
  const response = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Error posting data");

  return response.json();
};

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  // 3. call useSWR
  const { mutate } = useSWR("http://localhost:4000/users", fetcher);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !age) return alert("Name, email and age are required!");

    const newUser = {
      id: uuidv4(),
      name,
      email,
      age,
    };

    try {
      // Post data
      await postData(newUser);
      // Trigger revalidation
      mutate();
      router.push("/");
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <div className="border max-w-xl mx-auto p-4 mt-10 rounded">
      <h1 className="text-center text-3xl font-medium uppercase">add user</h1>
      <form onSubmit={submitHandler} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded text-black"
            type="text"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded text-black"
            type="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Age</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded appearance-none text-black"
            type="number"
            placeholder="Enter age"
            required
          />
        </div>

        <div>
          <button className="c-btn bg-green-600 w-full p-3" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
