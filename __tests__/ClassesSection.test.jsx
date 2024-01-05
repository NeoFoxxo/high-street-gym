import { render, screen, waitFor } from "@testing-library/react";
import ClassesSection from "@/components/Classes/ClassesSection";
import userEvent from "@testing-library/user-event";
import { useSession } from "next-auth/react";
import { fetchMock } from "@/__mocks__/fetch";
import { act } from 'react-dom/test-utils';

delete window.location;

jest.mock("next-auth/react");

const mockClassData = [
  {
      "startDate": "2023-07-18T00:00:00.000Z",
      "endDate": "2023-07-18T00:30:00.000Z",
      "title": "Yoga",
      "description": "Join us for our Yoga class.",
      "image": "/images/classes/yoga.jpg",
      "class_schedule_id": 1,
      "trainers": "Joe Sand,Rachel Black",
      "trainer_id": "2,3"
  },
  {
      "startDate": "2023-07-18T00:40:00.000Z",
      "endDate": "2023-07-18T01:30:00.000Z",
      "title": "Zumba",
      "description": "Join us for our Zumba class.",
      "image": "/images/classes/zumba.jpg",
      "class_schedule_id": 2,
      "trainers": "Lisa Brent",
      "trainer_id": "6"
  },
  {
      "startDate": "2023-07-18T01:40:00.000Z",
      "endDate": "2023-07-18T02:00:00.000Z",
      "title": "Indoor cycling",
      "description": "Join us for our Indoor Cycling class.",
      "image": "/images/classes/indoorcycling.jpg",
      "class_schedule_id": 3,
      "trainers": "Tess Orange",
      "trainer_id": "9"
  }
]

describe("Class timetable functionality", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup(); 
    jest.clearAllMocks();
  })

  it("Should show error message if the user books a class without being authenticated", async () => {
    HTMLDialogElement.prototype.showModal = jest.fn(function(){ this.open = true; }); // mock dialog showModal()

    fetchMock(mockClassData);

    useSession.mockReturnValue({ "data": null, "status": "unauthenticated"});

    await act(async () => 
      render(<ClassesSection/>)
    )

    const yogaAppointment = screen.getByTestId("appointment-2023-07-18T00:00:00.000Z");
    await waitFor(() => user.click(yogaAppointment));
    const bookButton = screen.getByRole("button", { name: "Book Now" })
    await waitFor(() => user.click(bookButton));
    const errorModal = screen.getByText("You must be signed in to book a class")

    expect(errorModal).toBeVisible();
  })

  it("Should show the book modal if the user books a class and is authenticated", async () => {
    HTMLDialogElement.prototype.showModal = jest.fn(function(){ this.open = true; }); // mock dialog showModal()
    
    useSession.mockReturnValue({
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
    })

    fetchMock(mockClassData)

    await act(async () => 
      render(<ClassesSection/>)
    )

    const yogaAppointment = screen.getByTestId("appointment-2023-07-18T00:00:00.000Z");
    await waitFor(() => user.click(yogaAppointment));
    const bookButton = screen.getByRole("button", { name: "Book Now" })
    await waitFor(() => user.click(bookButton));
    const bookModal = screen.getByText("Book Yoga Class")

    expect(bookModal).toBeVisible();
  })
})