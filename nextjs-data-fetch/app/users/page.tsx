// app/users/page.tsx
import Link from "next/link";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users", {
    // 과제라면 캐시로 인한 혼동 방지용 (선택)
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  const data = await res.json();
  return data.users;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      <p className="mt-2 text-gray-600">
        Click a first name to open a modal (Intercepting + Parallel Routes).
      </p>

      <ul className="mt-6 divide-y rounded-xl bg-white shadow">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between p-4">
            {/* 여기 링크가 /users에서 클릭될 때 인터셉트되어 모달로 뜸 */}
            <Link
              href={`/users/${u.id}`}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {u.firstName}
            </Link>

            <span className="text-sm text-gray-500">
              {u.lastName} (id: {u.id})
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
