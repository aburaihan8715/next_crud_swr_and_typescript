"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UpdateUser = ({ params }: { params: { id: string } }) => {
  const { data: user = {}, error, isLoading, mutate: userMutate } = useSWR(`http://localhost:4000/users/${params.id}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="border max-w-xl mx-auto p-4 mt-10 rounded">
      <h1 className="text-center text-3xl font-medium uppercase">update user</h1>
      <UpdateUserForm user={user} userMutate={userMutate} />
    </div>
  );
};

export default UpdateUser;

// update user form component
type UpdateUserFormProps = {
  user: User;
  userMutate: () => void;
};

const UpdateUserForm = ({ user, userMutate }: UpdateUserFormProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !age) return alert("Name, email and age are required!");

    const updatedUser = {
      name,
      email,
      age,
    };

    try {
      const res = await axios.put(`http://localhost:4000/users/${user.id}`, updatedUser);
      if (res.statusText !== "OK") throw new Error("No user with this id to update!");
      userMutate();
      alert("User updated");
      router.push("/");
    } catch (error) {
      console.error("Error editing data", error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-3">
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black w-full p-3 border rounded"
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
          className="text-black w-full p-3 border rounded"
          type="email"
          placeholder="Enter email"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Age</label>
        <input
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="text-black w-full p-3 border rounded appearance-none"
          type="number"
          placeholder="Enter age"
        />
      </div>

      <div>
        <button className="c-btn bg-green-600 w-full p-3" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};
