// map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => (
  <LoadScript
    googleMapsApiKey="AIzaSyClytxU9F6_kNdH-qomR2RUWYSH5_rXHJM"
  >
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={{ lat: 34.106478001319, lng: -117.59248180374368 }}
      zoom={8}
    >
      <Marker position={{ lat: 34.106478001319, lng: -117.59248180374368 }} />
    </GoogleMap>
  </LoadScript>
);

export default Map;
