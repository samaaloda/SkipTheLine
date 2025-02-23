import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // Import time grid plugin

const Schedule = () => {
  // Sample ride data
  const rides = [
    { name: 'Leviathan', wait_time: 30 },
    { name: 'Behemoth', wait_time: 45 },
    { name: 'Yukon Striker', wait_time: 60 },
    { name: 'Flight Deck', wait_time: 20 },
    { name: 'Dragon Fyre', wait_time: 35 },
    { name: "The Fly", wait_time: 25 },
    { name: "Thunder Run", wait_time: 40 },
    { name: "Time Warp", wait_time: 15 },
    { name: "Wilde Beast", wait_time: 50 },
    { name: "Wilde Knight Mares", wait_time: 30 },
    { name: "WindSeeker", wait_time: 20 },
    { name: "Wonder Mountain's Guardian", wait_time: 55 },
    { name: "Woodstock Whirlybirds", wait_time: 25 },
    { name: "Psyclone", wait_time: 20 },
    { name: "Riptide", wait_time: 30 },
    { name: "Shockwave", wait_time: 40 },
    { name: "Skyhawk", wait_time: 25 },
    { name: "Sledge Hammer", wait_time: 30 },
    { name: "Soaring Timbers", wait_time: 45 },
    { name: "The Bat", wait_time: 35 },
    { name: "Backlot Stunt Coaster", wait_time: 25 },
    { name: "Drop Tower", wait_time: 30 },
    { name: "Ghoster Coaster", wait_time: 15 },
    { name: "Lumberjack", wait_time: 45 },
    { name: "Mighty Canadian Minebuster", wait_time: 50 }
  ];

  const [selectedRides, setSelectedRides] = useState([]);
  const [events, setEvents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Handle ride selection
  const handleRideSelection = (rideName) => {
    setSelectedRides((prev) =>
      prev.includes(rideName)
        ? prev.filter((r) => r !== rideName)
        : [...prev, rideName]
    );
  };

  const generateSchedule = () => {
    const baseTime = new Date('2025-02-23T10:00:00');
    const newEvents = selectedRides.map((rideName, index) => {
      const ride = rides.find((r) => r.name === rideName);
      const startTime = new Date(baseTime.getTime() + index * 1000 * 60 * 120); // Adding 2 hours per ride
      const endTime = new Date(startTime.getTime() + ride.wait_time * 60 * 1000);
      return {
        title: `${ride.name} Wait Time`,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      };
    });
    setEvents(newEvents);
    setShowCalendar(true);
  };

  return (
    <div
      style={{
        fontFamily: 'Verdana, sans-serif', // Updated font for a more modern look
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e9f5f1', // Soft background color
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
          zIndex: '10',
          marginBottom: '20px',
          overflowY: 'auto',
          maxHeight: '500px',
        }}
      >
        {!showCalendar ? (
          <div>
            <h2 style={{ textAlign: 'center', fontSize: '24px', color: '#2c3e50' }}>Select Your Rides</h2>
            {rides.map((ride) => (
              <div key={ride.name} style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  id={ride.name}
                  checked={selectedRides.includes(ride.name)}
                  onChange={() => handleRideSelection(ride.name)}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor={ride.name} style={{ fontSize: '16px', color: '#34495e' }}>
                  {ride.name} - {ride.wait_time} mins
                </label>
              </div>
            ))}
            <button
              onClick={generateSchedule}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3498db', // Updated button color
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '20px',
              }}
            >
              Generate Schedule
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}> {/* Adjusted margin for calendar */}
            <FullCalendar
  plugins={[timeGridPlugin]}
  initialView="timeGridDay"
  events={events}
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridDay',
  }}
  slotMinTime="10:00:00"
  slotMaxTime="23:00:00"
  slotDuration="00:15:00"
  eventColor="#4CAF50"
  eventTextColor="#fff"
  eventBorderColor="#388E3C"
  headerStyle={{
    backgroundColor: '#1976D2',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  }}
  buttonText={{
    prev: 'Previous',
    next: 'Next',
    today: 'Today',
  }}
  contentHeight="auto" // Adjust content height to prevent gap
  style={{ marginTop: 0 }} // Explicitly set margin-top to 0
/>

          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
