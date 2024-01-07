'use client';

import SectionTitle from "../Common/SectionTitle";
import { useState, useEffect } from "react";
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { useSession } from "next-auth/react";
import Link from "next/link";

// hardcode current date
const currentDate = "2023-07-18";

const ClassesSection = () => {
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [classData, setClassData] = useState('')
  const { data: session } = useSession();

  // get the class data from the api endpoint
  useEffect(()=> {
    async function getClasses(){
      const classesEndpoint = "api/getclasses"
      const response = await fetch(classesEndpoint);
      const classData = await response.json();
      setClassData(classData)
      setLoading(false)
    }
    getClasses();
  }, []);

  const getCurrentTrainer = (event) => {
    // get the class id and trainer selected which are store in the select element
    setSelectedTrainer("");
    setSelectedTrainer(event.target.value);
  };

  async function bookClass(){

    setSubmitting(true)

    // send the userid to the bookclass endpoint
    await fetch('api/bookclass', {
      method: 'POST',
      body: JSON.stringify({userid: session.user.user_id, classid: selectedClass, trainer: selectedTrainer}),
    })
    setSubmitting(false);
    setMessage("Class successfully booked!");
  }
  
  const handleAppointmentClick = (props) => {
    // take the trainers & trainer ids from the db and change it from being comma separated to being an array
    const trainers = props.data.trainers.split(',').map((trainer) => trainer.trim());
    const trainer_id = props.data.trainer_id.split(',').map((trainer_id) => trainer_id.trim());

    const appointmentData = { ...props.data, trainers, trainer_id };

    setAppointmentData(appointmentData);

    // set the selected trainer to the first id if there is only one trainer for that class
    setSelectedTrainer(appointmentData.trainer_id[0]);
    // set the selected class
    setSelectedClass(appointmentData.class_schedule_id);
    setShowDialog(true);
    setMessage(null);
  };

  // get the onclick event from the react component and show that info in my custom card
  const onAppointmentClick = props => (
    <Appointments.AppointmentContent
      {...props}
      data-testid={`appointment-${props.data.startDate}`}
      onClick={() => handleAppointmentClick(props)}
    />
  );

  // format the dates from the MySQL format before displaying it on the custom card
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${time}`;
  };

  return (
    <section id="classes" className="pt-[6rem] lg:pt-[10rem]">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
              {isLoading ? (
                <div className="mx-auto h-screen">
                  <span className="loading loading-bars loading-lg"></span>
                </div>
              ) : (
                <>
                  <div className="px-4 lg:w-2/1">
                    <SectionTitle
                      title="View Gym Classes"
                      paragraph="View and book available classes in the timetable below"
                      mb="44px"
                    />
                    <div
                      className="wow fadeInUp mb-12 max-w-[350px] lg:max-w-[880px] lg:mb-0"
                      data-wow-delay=".15s"
                    >
                    <Scheduler data={classData}>
                      <ViewState currentDate={currentDate} />
                      <WeekView startDayHour={9} endDayHour={19} cellDuration={60} />
                      <Appointments appointmentContentComponent={onAppointmentClick} />
                    </Scheduler>
                    </div>
                  </div>
                  <div className="px-4 lg:w-2/1">
                    <div
                      className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                      data-wow-delay=".2s"
                    >
                    <div className="lg:mt-20 mx-auto max-w-full lg:mr-[4rem]">
                      {showDialog ? (
                        <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
                          <figure><img src={appointmentData.image}/></figure>
                          <div className="card-body">
                            <h2 className="card-title text-2xl">{appointmentData.title}</h2>
                            <p className="font-bold">{formatDate(appointmentData.startDate)} to {formatDate(appointmentData.endDate)}</p>
                            <p>{appointmentData.description}</p>
                            <div className="card-actions justify-start pt-4">
                              {/* if the user is not logged in show the error modal on click instead of the book modal */}
                              {session ? (
                                <button className="btn btn-primary" onClick={()=>window.book_modal.showModal()}>Book Now</button>
                              ) : (
                                <button className="btn btn-primary" onClick={()=>window.error_modal.showModal()}>Book Now</button>
                              )}
                              <dialog id="book_modal" className="modal">
                                <form method="dialog" className="modal-box">
                                  <h3 className="font-bold text-2xl">Book {appointmentData.title} Class</h3>
                                  {appointmentData.trainers.length > 1 ? (
                                    <>
                                      <p className="py-4 font-bold text-lg">Choose a trainer</p>                               
                                      <select id="trainers" onChange={getCurrentTrainer} className="mb-[3rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5">
                                        {appointmentData.trainers.map((trainer, index) => {
                                          return (
                                            <option value={appointmentData.trainer_id[index]}>{trainer}</option>
                                          );
                                        })}
                                      </select>
                                    </>
                                  ) : (
                                    <>
                                      <p className="py-4 font-bold text-lg">Trainer: {appointmentData.trainers[0]}</p>
                                    </>
                                  )}
                                  <div className="modal-action">
                                    {isSubmitting ? (
                                      <span className="loading loading-spinner loading-lg text-primary mr-auto"></span>
                                    ) : (
                                      <button className="btn btn-primary mr-auto" onClick={bookClass}>Book Class</button>
                                    )}
                                    <button className="btn">Close</button>
                                  </div>
                                  {message && <div className="text-primary font-bold pt-5">{message}</div>}
                                </form>
                              </dialog>
                              <dialog id="error_modal" className="modal">
                                <form method="dialog" className="modal-box">
                                  <h3 className="font-extrabold text-xl">You must be signed in to book a class</h3>
                                  <p className="py-4">Sign in to book a class</p>
                                  <div className="modal-action">
                                    <Link className="btn btn-primary mr-auto" href="/signin">Sign In</Link>
                                    <button className="btn">Close</button>
                                  </div>
                                </form>
                              </dialog>
                            </div>
                          </div>
                        </div>
                      ) : 
                        <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
                          <div className="card-body">
                            <h2 className="card-title text-2xl">Choose a class</h2>
                            <p>Select a class in the timetable to book and view its details</p>
                          </div>
                        </div>
                      }
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;