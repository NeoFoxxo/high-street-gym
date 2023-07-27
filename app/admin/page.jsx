'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import UpdateClasses from '@/components/Admin/UpdateClasses';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AddTrainer from "@/components/Admin/AddTrainer";

const Admin = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  return (
    <>
      <Breadcrumb
        pageName="Admin"
        description="Add a new Trainer and update the High Street Gym class schedule"
      />
      <section id="admin" className="pt-[15px] pb-[80px]">
        <UpdateClasses />
        <AddTrainer />
      </section>
    </>
  );
};

export default Admin;
