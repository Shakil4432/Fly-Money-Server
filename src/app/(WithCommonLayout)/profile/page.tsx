import ProfileDashboard from "@/components/modules/shop/user/ProfileDashboard";
import { getUserProfile } from "@/services/user";
import React from "react";

const Profile = async () => {
  const { data } = await getUserProfile();
  return (
    <div>
      <ProfileDashboard userProfile={data}></ProfileDashboard>
    </div>
  );
};

export default Profile;
