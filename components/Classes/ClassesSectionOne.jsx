'use client';

import SectionTitle from "../Common/SectionTitle";
import { useState } from "react";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  AppointmentTooltip,
  Appointments,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2023-07-18';
const schedulerData = [
  { startDate: '2023-07-18 10:00:00', endDate: '2023-07-18 10:30:00', title: 'Yoga', id: '2' },
  { startDate: '2023-07-18 10:40:00', endDate: '2023-07-18 11:30:00', title: 'Zumba' },
  { startDate: '2023-07-18 11:40:00', endDate: '2023-07-18 12:00:00', title: 'Indoor Cycling' },
  { startDate: '2023-07-18 12:10:00', endDate: '2023-07-18 13:30:00', title: 'Pilates' },
  { startDate: '2023-07-18 13:40:00', endDate: '2023-07-18 15:00:00', title: 'Boxing' },
  { startDate: '2023-07-18 15:10:00', endDate: '2023-07-18 16:10:00', title: 'Abs' },
  { startDate: '2023-07-18 17:10:00', endDate: '2023-07-18 18:10:00', title: 'High-Intensity Interval Training' },
];

const ClassesSectionOne = () => {

  const [showDialog, setShowDialog] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  const handleAppointmentClick = (props) => {
    console.log(props)
    setAppointmentData(props.data);
    setShowDialog(true);
  };

  const onAppointmentClick = props => (
    <Appointments.AppointmentContent
      {...props}
      onClick={() => handleAppointmentClick(props)}
    />
  );

  return (
    <section id="classes" className="pt-[6rem] lg:pt-[10rem]">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="px-4 lg:w-2/1">
              <SectionTitle
                title="View Gym Classes"
                paragraph="View and book available classes in the timetable below"
                mb="44px"
              />

              <div
                className="wow fadeInUp mb-12 lg:max-w-[790px] lg:mb-0"
                data-wow-delay=".15s"
              >
              <Scheduler data={schedulerData} currentDate={currentDate}>
                <ViewState  />
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
                    <figure><img src="/images/classes/yoga.jpg" /></figure>
                    <div className="card-body">
                      <h2 className="card-title text-2xl">{appointmentData.title}</h2>
                      <p className="font-bold">{appointmentData.startDate}{appointmentData.endDate}</p>
                      <p>test</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Book Now</button>
                      </div>
                    </div>
                  </div>
                ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassesSectionOne;
