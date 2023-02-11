import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';


const MapPage = () => {
    const apiKey = "AIzaSyAObMzoszg93PuKpMW5JpUjbN4H9JC0isY";
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
    });
    const [marker, setMarker] = useState({
        lat: 44,
        lng: -80
    });
    const router = useRouter();
    console.log(router);
    

    useEffect(() => {
        if (router?.asPath) {
            const latlng = router.asPath.split("=")
            const { lat, lng} = router.query;
            console.log({lat, lng});
            setMarker({
                lat: Number(lat),
                lng: Number(lng)
            })
            
            
        }
    }, [router]);


    if (!isLoaded) {
        return <p>Loading...</p>
    }

  return <Map marker={marker} />
}

export default MapPage;

function Map({marker}: any) {
    // const center = useMemo(() => ({lat: 44, lng: -80}), []);
    return (
        <GoogleMap
        zoom={10}
        center={marker}
        mapContainerClassName="map-container"
        >
            <MarkerF position={marker} />
        </GoogleMap>
    )
}