import { render, screen } from "@testing-library/react";
import SignupPage from "@/app/signup/page";
import userEvent from "@testing-library/user-event";
import { fetchMock } from "@/__mocks__/fetch";
import mockRouter from 'next-router-mock';
import { signIn } from 'next-auth/react';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('next-auth/react');

describe("Sign in functionality", () => {

  beforeEach(() => {
    render(<SignupPage/>)
    jest.clearAllMocks();
  })

  it("Should show username, email & password required errors if no text is provided", async () => {
    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);
    const usernameRequiredError = screen.getByText("Username Required");
    const emailRequiredError = screen.getByText("Email Required");
    const passwordRequiredError = screen.getByText("Password Required");

    expect(usernameRequiredError).toBeInTheDocument();
    expect(emailRequiredError).toBeInTheDocument();
    expect(passwordRequiredError).toBeInTheDocument();
  })

  it("Should redirect the user to the home page on success", async () => {
    mockRouter.push("/signup");
    await userEvent.type(screen.getByLabelText("Username"), "testuser")
    await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com")
    await userEvent.type(screen.getByLabelText("Password"), "password")
    
    const submitButton = screen.getByRole("button");

    fetchMock({ ok: true })

    signIn.mockResolvedValue({ success: true, error: null })

    await userEvent.click(submitButton);

    expect(mockRouter.asPath).toBe("/")
  })

  it("Should show error message if one occurs in the fetch request", async () => {
    
    await userEvent.type(screen.getByLabelText("Username"), "testuser")
    await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com")
    await userEvent.type(screen.getByLabelText("Password"), "password")
    
    const submitButton = screen.getByRole("button");
    
    fetchMock({ ok: false, error: new Error("test fetch error") })

    await userEvent.click(submitButton);
    const errorMessage = screen.getByText("An error occured");

    expect(errorMessage).toBeInTheDocument();
  })

  it("Should show error message if one occurs in the signin", async () => {
    
    await userEvent.type(screen.getByLabelText("Username"), "testuser");
    await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com")
    await userEvent.type(screen.getByLabelText("Password"), "password");

    fetchMock({ ok: true });

    const submitButton = screen.getByRole("button");

    signIn.mockResolvedValue({success: false, error: new Error("test error")});

    await userEvent.click(submitButton);
    const errorMessage = screen.getByText("An error occured when signing you in");

    expect(errorMessage).toBeInTheDocument();
  })
})