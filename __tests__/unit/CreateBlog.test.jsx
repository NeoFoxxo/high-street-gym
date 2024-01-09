import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import CreateBlog from "@/app/create-blog/page";
import userEvent from "@testing-library/user-event";
import { hasSession } from "@/__mocks__/authSession";

jest.mock("next-auth/react");

describe("Create blog post edge cases", () => {
  beforeEach(()=> {
    render(<CreateBlog />);
  })

  beforeAll(() => {
    useSession.mockReturnValue(hasSession);
  })

  it("Should display error if no title and article are provided", async () => {
    const createBlogButton = screen.getByRole('button', { name: /create blog post/i })
    await userEvent.click(createBlogButton);
    const titleError = screen.getByText(/title required/i)
    const articleError = screen.getByText(/article required/i);
    expect(titleError).toBeInTheDocument();
    expect(articleError).toBeInTheDocument();
  });

  it("Should display error if no article is provided", async () => {
    await userEvent.type(screen.getByPlaceholderText(/enter a post title/i), "test title");
    const createBlogButton = screen.getByRole('button', { name: /create blog post/i })
    await userEvent.click(createBlogButton);
    const articleError = screen.getByText(/article required/i);
    expect(articleError).toBeInTheDocument();
  });

  it("Should display error if no title is provided", async () => {
    await userEvent.type(screen.getByPlaceholderText(/write your article/i), "test article");
    const createBlogButton = screen.getByRole('button', { name: /create blog post/i })
    await userEvent.click(createBlogButton);
    const titleError = screen.getByText(/title required/i);
    expect(titleError).toBeInTheDocument();
  });
});