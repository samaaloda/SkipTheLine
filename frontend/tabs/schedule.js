import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // Import time grid plugin

const Schedule = () => {
  const [events, setEvents] = useState([
    { title: 'Leviation Queue Time', start: '2025-02-23T10:00:00', end: '2025-02-23T12:00:00' }, 
    { title: 'Behemoth Queue Time', start: '2025-02-23T12:15:00', end: '2025-02-23T13:00:00' }, 
    { title: 'Yukon Striker Queue Time', start: '2025-02-23T13:15:00', end: '2025-02-23T15:00:00' },
    { title: 'Leviation Ride', start: '2025-02-24T12:00:00', end: '2025-02-23T12:15:00' }, 
    { title: 'Behemoth Ride', start: '2025-02-24T13:00:00', end: '2025-02-23T13:15:00' }, 
    { title: 'Yukon Striker Ride', start: '2025-02-24T16:00:00', end: '2025-02-23T16:15:00' },
  ]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <FullCalendar
        plugins={[timeGridPlugin]} // Initialize timeGridPlugin for the calendar
        initialView="timeGridDay" // Use time grid day view to display one day's schedule
        events={events} // Pass events to display
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridDay' }} // Customize header toolbar
        slotMinTime="10:00:00" 
        slotMaxTime="23:00:00"
        slotDuration="00:15:00"
        eventColor="#4CAF50" // Green for event backgrounds
        eventTextColor="#fff" // White text on events
        eventBorderColor="#388E3C" // Darker green border
        headerStyle={{
          backgroundColor: '#1976D2', // Blue background for header
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
        buttonText={{
          prev: 'Previous',
          next: 'Next',
          today: 'Today',
        }}
      />
    </div>
  );
};

export default Schedule;
