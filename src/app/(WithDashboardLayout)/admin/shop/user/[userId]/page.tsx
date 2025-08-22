import UserDetails from "@/components/modules/shop/user/UserDetails";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllUserWithOrders } from "@/services/user";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userDetails = await getAllUserWithOrders((await params).userId);
  const { user, order } = userDetails.data;

  return (
    <NMContainer className="text-white ">
      <UserDetails user={user} order={order}></UserDetails>
    </NMContainer>
  );
};

export default UserDetailsPage;
