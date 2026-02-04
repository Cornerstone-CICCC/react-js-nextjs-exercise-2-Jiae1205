import Link from "next/link";

type UserDetail = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
};

async function getUser(id: string): Promise<UserDetail> {
  const res = await fetch(`https://dummyjson.com/users/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Detail (Page)</h1>
        <Link href="/users" className="text-blue-600 hover:underline">
          ← Back to Users
        </Link>
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <p className="text-xl font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </p>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-sm text-gray-500">Age</dt>
            <dd className="text-lg font-medium">{user.age}</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-sm text-gray-500">Gender</dt>
            <dd className="text-lg font-medium">{user.gender}</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 sm:col-span-2">
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="text-lg font-medium">{user.email}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
