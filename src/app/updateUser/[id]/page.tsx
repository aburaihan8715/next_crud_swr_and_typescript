"use client";

import { useState } from "react";

const UpdateUser = () => {
  return (
    <div className="border max-w-xl mx-auto p-4 mt-10 rounded">
      <h1 className="text-center text-3xl font-medium uppercase">update user</h1>
      <UpdateUserForm />
    </div>
  );
};

export default UpdateUser;

// update user form component
// type UpdateUserFormProps = {
//   user: User;
// };

const UpdateUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !age) return alert("Name, email and age are required!");

    const updatedUser = {
      name,
      email,
      age,
    };
  };

  return (
    <form onSubmit={submitHandler} className="space-y-3">
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <input className="text-black w-full p-3 border rounded" type="text" placeholder="Enter name" required />
      </div>

      <div className="flex flex-col gap-1">
        <label>Email</label>
        <input className="text-black w-full p-3 border rounded" type="email" placeholder="Enter email" required />
      </div>

      <div className="flex flex-col gap-1">
        <label>Age</label>
        <input className="text-black w-full p-3 border rounded appearance-none" type="number" placeholder="Enter age" />
      </div>

      <div>
        <button className="c-btn bg-green-600 w-full p-3" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};
