import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import GasEstimator from './components/GasEstimator';
import './map.css';

const Map = () => {
  const mapRef = useRef(null);
  const destinationInputRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [directions, setDirections] = useState(null);
  const [waypointDistances, setWaypointDistances] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

  const handlePlaceChanged = () => {
    const destinationInput = destinationInputRef.current;

    if (mapLoaded) {
      const destinationSearchBox = new window.google.maps.places.SearchBox(destinationInput);

      destinationSearchBox.addListener('places_changed', () => {
        const destinationPlaces = destinationSearchBox.getPlaces();

        if (destinationPlaces && destinationPlaces.length > 0) {
          const destination = destinationPlaces[0].geometry.location;

          mapRef.current.panTo(destination);
          mapRef.current.setZoom(12);

          setDirections(null);

          promptForStartingPoint(destination);
        }
      });
    } else {
      console.log('Google Maps API is not fully loaded yet.');
    }
  };

  const promptForStartingPoint = (destination) => {
    const startingPoint = prompt('Enter your starting point:');
  
    if (startingPoint) {
      const stopoversString = prompt('Enter stopovers (comma-separated):');
      const stopovers = stopoversString ? stopoversString.split(',') : [];
  
      const geocoder = new window.google.maps.Geocoder();
  
      geocoder.geocode({ address: startingPoint }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const origin = results[0].geometry.location;
          calculateDirections(origin, destination, stopovers);
        } else {
          console.error(`Geocoding failed: ${status}`);
        }
      });
    }
  };

  const calculateDirections = (origin, destination, stopovers) => {
    const directionsService = new window.google.maps.DirectionsService({
      apiKey: 'AIzaSyDy_Ttv3H6inWRBR8btYRSmFzFWPU4oDy4', // Replace with your Routes API key
    });

    const waypoints = stopovers.map(stopover => ({ location: stopover, stopover: true }));

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        waypoints: waypoints,
      },
      (response, status) => {
        if (status === 'OK') {
          setDirections(response);
          calculateCumulativeDistances(response);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  const calculateCumulativeDistances = (response) => {
    const legs = response.routes[0].legs;
    let distanceTotal = 0;
    const distances = [];

    // Starting point
    distances.push({ 
      location: response.request.origin.query, 
      distance: 0 
    });

    // Waypoints
    legs.forEach((leg, index) => {
      distanceTotal += leg.distance.value;
      distances.push({ 
        location: leg.end_address, 
        distance: distanceTotal / 1609.34 // Convert to miles
      });
    });

    setWaypointDistances(distances);
    setTotalDistance(distanceTotal / 1609.34); // Set total distance
  };

  const handleMapLoad = (map) => {
    setMapLoaded(true);
    mapRef.current = map;
  };

  return (
    <div>
    <GasEstimator totalDistance={totalDistance} />
    <LoadScript
      googleMapsApiKey="AIzaSyDdIrXwXBDILYUAqBONwIbBmwAAObOgmKA" // Replace with your Google Maps API key for map-related functionality
      libraries={['places', 'directions']}
    >
      <input
        id="destination-input"
        ref={destinationInputRef}
        type="text"
        placeholder="Enter destination"
        className="pac-input"
        onChange={handlePlaceChanged}
      />
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        center={{ lat: 37.7993, lng: -122.3977 }}
        zoom={8}
        onLoad={handleMapLoad}
        ref={mapRef}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'white', padding: '10px' }}>
          {waypointDistances.map((waypoint, index) => {
            if (index === 0) return null; // Skip the starting point
            return (
              <div key={index}>Waypoint {index}: {waypoint.location} - {waypoint.distance.toFixed(2)} miles</div>
            );
          })}
          <div><strong>Total Distance: {totalDistance.toFixed(2)} miles</strong></div>
        </div>
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default Map;