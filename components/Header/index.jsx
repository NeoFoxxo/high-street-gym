"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const { data: session, status} = useSession()

  useEffect(() => {

    if (status === "authenticated") {
      setAuthenticated(true)
      if (session?.user.user_role === 1) {
        setAdmin(true)
      }
    }
    window.addEventListener("scroll", handleStickyNavbar);
  }, [status, session]);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-white h-20 ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50  py-4 px-6 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                      <li className="group relative">
                        <Link
                          href={"/"}
                          className={`flex py-2 text-base text-dark group-hover:opacity-70  lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                        >
                          Home
                        </Link>
                      </li>
                      <li className="group relative">
                        <Link
                          href={"/classes"}
                          className={`flex py-2 text-base text-dark group-hover:opacity-70 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                        >
                          Classes
                        </Link>
                      </li>
                      <li className="group relative">
                        <Link
                          href={"/blog"}
                          className={`flex py-2 text-base text-dark group-hover:opacity-70 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                        >
                          Blog
                        </Link>
                      </li>
                      {isAdmin ? (
                        <li className="group relative">
                          <Link
                            href={"/admin"}
                            className={`flex py-2 text-base text-dark group-hover:opacity-70 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                          >
                            Admin
                          </Link>
                        </li>
                      ) : null}
                  </ul>
                </nav>
              </div>
              {!isAuthenticated ? (
                <div className="flex items-center justify-end pr-16 lg:pr-0">
                  <Link
                  href="/signin"  
                  className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 md:block"
                  >
                  Sign In
                  </Link>
                  <Link
                  href="/signup"
                  className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                  >
                  Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-end pr-16 lg:pr-0">
                  <button
                  onClick={() => signOut()}
                  className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 md:block"
                  >
                  Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
