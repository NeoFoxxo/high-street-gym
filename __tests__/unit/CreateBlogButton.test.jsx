import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import CreateBlogButton from "@/components/Blog/CreateBlogButton";
import { hasSession, noSession } from "@/__mocks__/authSession";
delete window.location;

jest.mock("next-auth/react");

describe("Create blog button functionality", () => {
  it("Create blog post button should not be visible if not authenticated", async () => {
    useSession.mockReturnValue(noSession);

    render(<CreateBlogButton />);

    const createButton = screen.queryByRole("link", { name: "Create a Blog Post" });
    expect(createButton).toBeNull();
  });
  it("Create blog post button should be visible if authenticated", async () => {
    useSession.mockReturnValue(hasSession);

    render(<CreateBlogButton />);

    const createButton = screen.getByRole("link", { name: "Create a Blog Post" });
    expect(createButton).toBeInTheDocument();
  });
});