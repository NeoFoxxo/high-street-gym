'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import UpdateClasses from '@/components/Admin/UpdateClasses';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AddAdmin from "@/components/Admin/AddAdmin";

const Admin = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  // if the user does not have the admin role redirect them to the home page
  if (session?.user.user_role === 0) {
    push("/")
  }

  return (
    <>
      <Breadcrumb
        pageName="Admin"
        description="Add a new Trainer and update the High Street Gym class schedule"
      />
      <section id="admin" className="pt-[15px] pb-[80px]">
        <UpdateClasses />
        <AddAdmin />
      </section>
    </>
  );
};

export default Admin;
