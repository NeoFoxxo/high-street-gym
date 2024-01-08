import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ClassesSection from "@/components/Classes/ClassesSection";
import { useSession } from "next-auth/react";
import { fetchMock } from "@/__mocks__/fetch";
import { act } from 'react-dom/test-utils';
import CreateBlogButton from "@/components/Blog/CreateBlogButton";

delete window.location;

jest.mock("next-auth/react");

const hasSession = {
  "data": {
      "user": {
          "email": "jason@gmail.com",
          "user_id": 1,
          "user_role": 1,
          "username": "JasonYoung",
          "iat": 1704426628,
          "exp": 1707018628,
          "jti": "be63e86d-5575-42fa-9430-d5a4078ece52"
      },
      "expires": "2024-02-04T03:50:28.346Z"
  },
  "status": "authenticated"
}

const noSession = { "data": null, "status": "unauthenticated"};

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