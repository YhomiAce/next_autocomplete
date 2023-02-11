import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
  getDetails
} from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { useState } from "react";

const AddressAutoComplete = () => {
    const apiKey = "AIzaSyAObMzoszg93PuKpMW5JpUjbN4H9JC0isY";
    const router = useRouter();
    const [marker, setMarker] = useState({
        lat: 0,
        lng: 0
    });
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: ['places']
    })
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'initMap',
    debounce: 300
  });

//   useGoogleMapsApi({ library: "places" });


  console.log({data, ready});
  

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value)
  }

  const handleSelect = async (suggestion: any) => {
    const { description, place_id} = suggestion;
    console.log({description});
    
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();
    getDetails({placeId: place_id}).then(res => {
        console.log({details: res});
        
    })
    
    
    // Get latitude and longitude via utility functions
    const results = await getGeocode({ address: description });
    const { lat, lng } = getLatLng(results[0]);
      const zipcode = getZipCode(results[0], false);
      console.log({zipcode});
      setMarker({
        lat,
        lng
      });
      
      console.log("📍 Coordinates: ", { lat, lng });

    const url = `/map?lat=${lat}&lng=${lng}`;
    router.push(url, undefined, {shallow: true})
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      console.log({suggestion});
      

      return (
        <li key={place_id} onClick={()=>handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });


  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
        style={{
            padding: "10px 20px",
            borderRadius: "20px",
            width: "400px",
        }}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  )
};

export default AddressAutoComplete;
