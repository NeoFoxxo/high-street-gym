import { render, screen } from "@testing-library/react";
import SigninPage from "@/app/signin/page";
import userEvent from "@testing-library/user-event";
import mockRouter from 'next-router-mock';
import { signIn } from 'next-auth/react';

jest.mock('next/navigation', () => require('next-router-mock'));

delete window.location;

jest.mock('next-auth/react');

describe("Sign in functionality", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup(); 
    jest.clearAllMocks();
  })

  it("Should show email & password required errors if no text is provided", async () => {
    render(<SigninPage/>)
    const submitButton = screen.getByRole("button");

    await user.click(submitButton);
    const emailRequiredError = screen.getByText("Email Required");
    const passwordRequiredError = screen.getByText("Password Required");

    expect(emailRequiredError).toBeInTheDocument();
    expect(passwordRequiredError).toBeInTheDocument();
  })

  it("Should redirect the user to the home page on success", async () => {
    mockRouter.push("/signin");

    render(<SigninPage/>)

    await user.type(screen.getByLabelText("Your Email"), "jason@gmail.com")
    await user.type(screen.getByLabelText("Your Password"), "password")
    
    const submitButton = screen.getByRole("button");

    signIn.mockResolvedValue({success: true, error: null})

    await user.click(submitButton);

    expect(mockRouter.asPath).toBe("/")
  })

  it("Should show error message if incorrect details are provided", async () => {
    mockRouter.push("/signin");

    render(<SigninPage/>)

    await user.type(screen.getByLabelText("Your Email"), "incorrect@gmail.com")
    await user.type(screen.getByLabelText("Your Password"), "incorrectpassword")
    
    const submitButton = screen.getByRole("button");

    signIn.mockResolvedValue({success: false, error: new Error("Incorrect credentials")})

    await user.click(submitButton);
    const invalidCredentialsError = screen.getByText("Invalid credentials");

    expect(invalidCredentialsError).toBeInTheDocument();
  })
})