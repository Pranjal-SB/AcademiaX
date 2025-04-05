import React from "react";
import Button from "./Button";
import AppLayout from "./AppLayout";
import { cookies } from "next/headers";

async function fetchdata() {
  const token = (await cookies()).get("token")?.value;
  const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getdata`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: `token=${token}`,
    },
    credentials: "include",
  });
  const version = (await cookies()).get("version")?.value || "v1.2.0";

  return { data: await data.json(), status: data.status, version };
}

export default async function Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, status, version } = await fetchdata();

  if (status === 500) {
    return (
      <div className="w-screen h-screen flex justify-center items-center  overflow-hidden">
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-lg">Internal Server Error</p>
          <Button status="500" />
        </div>
      </div>
    );
  }
  if (status === 401) {
    return (
      <div className="w-screen h-screen flex justify-center items-center  overflow-hidden">
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-lg">Unauthorized</p>
          <Button status="401" />
        </div>
      </div>
    );
  }

  if (status === 402 || status === 403) {
    return (
      <div className="w-screen h-screen flex justify-center items-center  overflow-hidden">
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-lg">You have been logged out</p>
          <Button status="403" />
        </div>
      </div>
    );
  }

  return (
    <AppLayout data={data} version={version}>
      {children}
    </AppLayout>
  );
}
