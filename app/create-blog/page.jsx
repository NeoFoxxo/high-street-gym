'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const blogPostSchema = Yup.object().shape({

  title: Yup.string()
  .required('Title Required')
  .min(3, 'Title is too short')
  .max(100, 'Title is too long'),

  article: Yup.string()
  .required('Article Required')
  .min(10, 'Article is too short'),
});

const CreateBlog = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { data: session, status } = useSession();
  const { push } = useRouter();

  // if the user is not authenticated redirect them to the signin page
  if (status != "authenticated") {
    push("/signin")
  }

  async function createPost(formData) {
    setErrorMsg(null)
    setLoading(true)

    const response = await fetch('/api/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userid: session.user.user_id, title: formData.title, article: formData.article})
    });

    // if error add error message
    if (!response.ok) {
      setLoading(false)
      setErrorMsg(response.statusText)
    }
    // if successful add success message
    else {
      console.log(response)
      setLoading(false)
      setSuccess(true)
    }
  }

  return (
    <section id="createpost" className="py-16 md:py-20 lg:py-28 mx-auto">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center pt-5">
          <div className="w-50 px-4 text-center">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              {isSuccess ? (
                <div className="mb-5 flex flex-col">
                  <div className="alert alert-success mb-5">
                    <span className="font-semibold text-lg mx-auto">Post successfully created!</span>
                  </div>
                  <a className="text-center btn btn-info w-40 mx-auto" href="/blog">View Posts</a>
                </div>
              ) : null}
              {errorMsg ? (
                <div className="alert alert-error mb-5">
                  <span className="font-semibold text-center">An error occured: "{errorMsg}"</span>
                </div>
              ) : null}
              <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                Create a Blog Post
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Participate in the High Street Gym community!
              </p>
              <Formik
                  initialValues={{ 
                    title: '', 
                    article: ''
                  }}
                  validationSchema={blogPostSchema}
                  onSubmit={(values, { resetForm }) => {
                    // call submit function and reset form
                    createPost(values);
                    resetForm({values: ''});
                  }}
                >
                {({ errors, touched }) => (
                <Form>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-md font-medium text-dark text-start"
                        >
                          Title
                        </label>
                        <Field
                          type="text"
                          name="title"
                          placeholder="Enter a post title"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-black placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none"
                        />
                        {errors.title && touched.title ? (
                          <div className="text-error text-start">{errors.title}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="article"
                          className="mb-3 block text-md font-medium text-dark text-start"
                        >
                          Your Article
                        </label>
                        <Field
                          name="article"
                          type="text"
                          as="textarea"
                          rows={5}
                          placeholder="Write your article"
                          className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-black placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none"
                        />
                        {errors.article && touched.article ? (
                          <div className="text-error text-start">{errors.article}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full px-4">
                        {isLoading ? (
                          <span class="loading loading-spinner loading-lg text-primary mx-auto"></span>
                        ) : (
                        <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp" type="submit">
                          Create Blog Post
                        </button>
                        )}
                    </div>
                  </div>
                </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBlog;
