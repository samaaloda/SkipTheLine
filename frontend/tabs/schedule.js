import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import data from '../data/rides.json';

const Schedule = () => {
  const rides = data;
  const [selectedRides, setSelectedRides] = useState([]);
  const [events, setEvents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleRideSelection = (rideName) => {
    setSelectedRides((prev) =>
      prev.includes(rideName) ? prev.filter((r) => r !== rideName) : [...prev, rideName]
    );
  };

  const generateSchedule = () => {
    const baseTime = new Date();
    const newEvents = selectedRides.map((rideName, index) => {
      const ride = rides.find((r) => r.name === rideName);
      const startTime = new Date(baseTime.getTime() + index * 1000 * 60 * 120);
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
        fontFamily: 'Verdana, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9f5f1',
        flexDirection: 'column',
        padding: '20px',
        width: '100vw',
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '400px',
          maxHeight: '80vh', // Set max height for scrolling
          overflow: 'hidden', // Prevent full page overflow
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!showCalendar ? (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h2 style={{ textAlign: 'center', fontSize: '24px', color: '#2c3e50' }}>Select Your Rides</h2>
            
            {/* SCROLLABLE RIDE LIST */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto', 
                maxHeight: '50vh', // Ensure it scrolls
                marginRight: '10px',
              }}
            >
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
            </div>

            {/* BUTTON (STAYS AT BOTTOM) */}
            <button
              onClick={generateSchedule}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              Generate Schedule
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '60vh', marginRight: '10px' }}>
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridDay"
              events={events}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridDay',
              }}
              slotMinTime="06:00:00"
              slotMaxTime="23:00:00"
              slotDuration="00:15:00"
              eventColor="#4CAF50"
              eventTextColor="#fff"
              eventBorderColor="#388E3C"
              contentHeight="auto"
            />

            <button
              onClick={() => setShowCalendar(false)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                marginTop: '20px',
              }}
            >
              Modify Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
