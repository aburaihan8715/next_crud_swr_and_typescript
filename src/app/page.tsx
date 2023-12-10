"use client";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading, mutate: userMutate } = useSWR("http://localhost:4000/users", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main>
      <ul className="my-6 flex flex-col gap-4">
        {data?.map((item: User) => (
          <li key={item.id} className="border py-6 px-4 flex justify-between rounded">
            <div>
              <h2 className="text-2xl font-medium uppercase">{item.name}</h2>
              <p className="lowercase">{item.email}</p>
              <p className="capitalize">{item.age}years</p>
            </div>
            <div className="flex gap-2 items-start">
              <UserDeleteBtn id={item.id} userMutate={userMutate} />
              <Link href={`/updateUser/${item.id}`}>
                <button className="c-btn bg-green-600">update</button>
              </Link>

              <Link href={`/userDetails/${item.id}`}>
                <button className="c-btn bg-blue-600">details</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

// user delete button component
type UserDeleteBtnProps = {
  id: string;
  userMutate: () => void;
};
function UserDeleteBtn({ id, userMutate }: UserDeleteBtnProps) {
  const deleteHandler = async () => {
    const agree = confirm("Are you sure");
    if (agree) {
      try {
        const res = await axios.delete(`http://localhost:4000/users/${id}`);
        if (res.statusText !== "OK") throw new Error("No user with this id to delete!");
        alert("User deleted");
        userMutate();
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    }
  };
  return (
    <button onClick={deleteHandler} className="c-btn bg-red-600">
      delete
    </button>
  );
}
