import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { STATIONS } from '../data/mockData';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapComponent = ({ onStationSelect, selectedStationId }) => {
    return (
        <div className="map-wrapper">
            <MapContainer
                center={[37.505, 127.04]}
                zoom={14}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {STATIONS.map((station) => (
                    <Marker
                        key={station.id}
                        position={[station.lat, station.lng]}
                        eventHandlers={{
                            click: () => {
                                onStationSelect(station);
                            },
                        }}
                    >
                        <Popup>
                            <strong>{station.name}</strong><br />
                            <span>{station.line}</span>
                        </Popup>
                    </Marker>
                ))}
                <MapUpdater selectedStationId={selectedStationId} />
            </MapContainer>
        </div>
    );
};

const MapUpdater = ({ selectedStationId }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedStationId) {
            const station = STATIONS.find(s => s.id === selectedStationId);
            if (station) {
                map.flyTo([station.lat, station.lng], 15);
            }
        }
    }, [selectedStationId, map]);

    return null;
};

export default MapComponent;
