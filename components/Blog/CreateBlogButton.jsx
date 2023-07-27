"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

// this component shows the create blog button if the user is authenticated and does not display it if they aren't authenticated
const CreateBlogButton = () => {

    const { status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="mb-10 mt-0 md:-mt-[5rem] text-center">
                <Link href={"/create-blog"} className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">Create a Blog Post</Link>
            </div>
        )
    }

    return (
        null
    )
}

export default CreateBlogButton;