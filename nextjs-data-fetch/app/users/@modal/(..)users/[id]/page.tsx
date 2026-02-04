// app/users/@modal/(..)users/[id]/page.tsx
import Link from "next/link";

type UserModal = {
  id: number;
  firstName: string;
  lastName: string;
};

async function getUser(id: string): Promise<UserModal> {
  const res = await fetch(
    `https://dummyjson.com/users/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch user for modal (${res.status}) ${text}`);
  }

  const data = await res.json();

  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
  };
}

export default async function UserModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900">User (Modal)</h2>

        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">ID</p>
          <p className="text-lg font-semibold text-gray-900">{user.id}</p>

          <p className="mt-3 text-sm text-gray-500">Name</p>
          <p className="text-lg font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {/* Requirement: Close/Back should redirect to /users */}
          <Link
            href="/users"
            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Close
          </Link>

          {/* Optional: Go to the full detail page */}
          <Link
            href={`/users/${user.id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Open Detail Page
          </Link>
        </div>
      </div>
    </div>
  );
}
