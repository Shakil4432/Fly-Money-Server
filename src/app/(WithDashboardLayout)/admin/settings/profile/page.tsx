import ProfileCard from "@/components/modules/shop/settings/profile";
import { getUserProfile } from "@/services/user";

const UserProfilePage = async () => {
  const { data } = await getUserProfile();

  return (
    <div>
      <ProfileCard userProfile={data}></ProfileCard>
    </div>
  );
};

export default UserProfilePage;
