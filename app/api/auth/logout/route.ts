import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.set("userId", "", {
    path: "/",
    maxAge: 0, // expire immediately
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
