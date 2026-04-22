import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const BusinessMap = ({ businesses, center }) => {
  const [selectedBusiness, setSelectedBusiness] = React.useState(null);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
      >
        {businesses.map((business) => (
          <Marker
            key={business._id}
            position={{
              lat: business.location?.coordinates[1],
              lng: business.location?.coordinates[0]
            }}
            onClick={() => setSelectedBusiness(business)}
            icon={{
              url: '/marker.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        ))}

        {selectedBusiness && (
          <InfoWindow
            position={{
              lat: selectedBusiness.location?.coordinates[1],
              lng: selectedBusiness.location?.coordinates[0]
            }}
            onCloseClick={() => setSelectedBusiness(null)}
          >
            <div className="p-2">
              <h3 className="font-bold">{selectedBusiness.businessName}</h3>
              <p className="text-sm text-gray-600">{selectedBusiness.category}</p>
              <p className="text-sm">{selectedBusiness.address?.street}</p>
              <a
                href={`/business/${selectedBusiness._id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                View Details
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default BusinessMap;