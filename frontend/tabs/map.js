import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDpQtvJrbcVz7OewnCt9cIRXcIaT0XyLls&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      new window.google.maps.Map(document.getElementById('map'), {
        center: { lat:43.84285266267574, lng:-79.539692559626 }, //43.84285266267574, -79.539692559626
        zoom: 30, 
      });
    };
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
};

export default Map;
