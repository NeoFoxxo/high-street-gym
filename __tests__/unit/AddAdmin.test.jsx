import { render, screen, waitFor } from "@testing-library/react";
import AddAdmin from "@/components/Admin/AddAdmin";
import userEvent from "@testing-library/user-event";
import { fetchMock } from "@/__mocks__/fetch";

describe("Add admin errors and edge cases", () => {

  beforeEach(() => {
    render(<AddAdmin />);
  })

  it("Should display an error message if one occurs", async () => {
    fetchMock({ ok: false, statusText: "test error" })
    const mockXMLDocument = new File(['test'], 'test.xml', { type: 'text/xml' })
    const fileInput = screen.getByLabelText(/admin document/i)
    await userEvent.upload(fileInput, mockXMLDocument);
    const submitButton = screen.getByRole("button", { name: /add new admin/i });
    await userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(/an error occured: "test error"/i)).toBeInTheDocument());
  })

  it("Should display a error message if no file is provided", async () => {
    const submitButton = screen.getByRole("button", { name: /add new admin/i });
    await waitFor(() => userEvent.click(submitButton));

    const noFileError = screen.getByText(/admin document required/i);
    expect(noFileError).toBeInTheDocument();
  })
})