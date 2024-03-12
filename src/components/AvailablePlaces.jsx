import { useState, useEffect } from 'react'
import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from "../loc.js"
import {getPlaces} from '../http.jsx'

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces]= useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces(){
      setIsFetching(true);
      try
      {
        const places = await getPlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedList =  sortPlacesByDistance(places,
             position.coords.latitude,
             position.coords.longitude);
             setAvailablePlaces(sortedList);
             setIsFetching(false);
        })
      }
      catch(error)
      {
        setError({message: error.message || "Could not load the places, Please try again after sometime"});
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, [])

  if(error){
    return <Error title = "An Error Occurred" message = {error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isloading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
