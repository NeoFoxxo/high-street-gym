'use client';

import { useState } from 'react';
import Link from "next/link";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const signInSchema = Yup.object().shape({

  email: Yup.string().email('Invalid email')
  .required('Email Required'),

  password: Yup.string()
  .required('Password Required'),
});

const SigninPage = () => {

  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { push } = useRouter();

  async function onSubmit(formData) {
    setLoading(true);

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false
    });
    // if there is an error stop loading and show error message
    if (result.error != null){
      setLoading(false)
      setErrorMsg("Invalid credentials")
    }
    // if there is no error redirect to the home page
    else {
      push("/")
    }
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl pb-5 font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <Formik
                  initialValues={{ 
                    email: '', 
                    password: '' 
                  }}
                  validationSchema={signInSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your Email"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                        {errors.email && touched.email ? (
                          <div className="text-error">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="mb-8">
                        <label
                          htmlFor="password"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter your Password"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                        {errors.password && touched.password ? (
                          <div className="text-error">{errors.password}</div>
                        ) : null}
                      </div>
                      <div className="mb-6 flex items-center justify-center">
                        {isLoading ? (
                          <span class="loading loading-spinner loading-lg text-primary mx-auto"></span>
                        ) : (
                        <button className="w-full rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signIn" type="submit">
                          Sign in
                        </button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
                {errorMsg && <div className="text-error">{errorMsg}</div>}
                <p className="text-center text-base font-medium text-body-color">
                  Don't have an account?<br></br>
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
