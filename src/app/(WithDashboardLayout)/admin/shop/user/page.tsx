import ManageUsers from "@/components/modules/shop/user";
import { getAllUser } from "@/services/user";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const UserPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { page, ...query } = await searchParams;
  const { data: user, meta } = await getAllUser(page, "10", query);

  return (
    <div>
      <ManageUsers user={user} meta={meta}></ManageUsers>
    </div>
  );
};

export default UserPage;
