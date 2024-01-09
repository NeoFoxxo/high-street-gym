import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ClassesSection from "@/components/Classes/ClassesSection";
import { useSession } from "next-auth/react";
import { fetchMockJson } from "@/__mocks__/fetch";
import { act } from 'react-dom/test-utils';
import { hasSession, noSession } from "@/__mocks__/authSession";

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

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("Should show error message if the user books a class without being authenticated", async () => {
    HTMLDialogElement.prototype.showModal = jest.fn(function(){ this.open = true; }); // mock dialog showModal()

    fetchMockJson(mockClassData);

    useSession.mockReturnValue(noSession);

    await act(async () => 
      render(<ClassesSection/>)
    )

    const yogaAppointment = screen.getByTestId("appointment-2023-07-18T00:00:00.000Z");
    fireEvent.click(yogaAppointment);
    const bookButton = screen.getByRole("button", { name: "Book Now" })
    fireEvent.click(bookButton)
    const errorModal = screen.getByText("You must be signed in to book a class")

    expect(errorModal).toBeVisible();
  })

  it("Should show the book modal if the user books a class and is authenticated", async () => {
    HTMLDialogElement.prototype.showModal = jest.fn(function(){ this.open = true; }); // mock dialog showModal()
    
    useSession.mockReturnValue(hasSession)

    fetchMockJson(mockClassData)

    await act(async () => 
      render(<ClassesSection/>)
    )

    const yogaAppointment = screen.getByTestId("appointment-2023-07-18T00:00:00.000Z");
    fireEvent.click(yogaAppointment)
    const bookButton = screen.getByRole("button", { name: "Book Now" })
    fireEvent.click(bookButton)
    const bookModal = screen.getByText("Book Yoga Class")

    expect(bookModal).toBeVisible();
  })

  it("Should diplay a success message after booking a class", async () => {
    HTMLDialogElement.prototype.showModal = jest.fn(function(){ this.open = true; }); // mock dialog showModal()
    
    useSession.mockReturnValue(hasSession);

    fetchMockJson(mockClassData);

    await act(async () => 
      render(<ClassesSection/>)
    )

    const cyclingAppointment = screen.getByTestId("appointment-2023-07-18T01:40:00.000Z");
    fireEvent.click(cyclingAppointment)
    const bookButton = screen.getByRole("button", { name: "Book Now" })
    fireEvent.click(bookButton)
    const confirmBookButton = screen.getByRole("button", { name: "Book Class" })
    fetchMockJson({ userid: 5, classid: 3, trainer: 2 });
    await waitFor(() => fireEvent.click(confirmBookButton));
    
    expect(screen.getByText("Class successfully booked!")).toBeInTheDocument();
  })
})