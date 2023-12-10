"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserDetails = ({ params }: { params: { id: string } }) => {
  const { data: user = {}, error, isLoading } = useSWR(`http://localhost:4000/users/${params.id}`, fetcher);
  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="shadow-md shadow-white mt-10 text-center p-5 rounded space-y-2">
      <button onClick={() => router.push("/")} className="bg-green-600 py-1 px-2 rounded cursor-pointer">
        go back
      </button>
      <h2 className="text-2xl font-medium uppercase">{user.name}</h2>
      <p className="lowercase">{user.email}</p>
      <p className="capitalize">{user.age} years</p>
    </div>
  );
};

export default UserDetails;
