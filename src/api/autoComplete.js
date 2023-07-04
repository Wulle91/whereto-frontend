import React, { useRef, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import appStyles from "../App.module.css";
import Form from "react-bootstrap/Form";


const AutoComplete = ({ onChange }) => {

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const [selectedPlace, setSelectedPlace] = useState(null);
    const options = {

     fields: ["address_components", "geometry", "icon", "name", "photos"],
     types: ["establishment"]
    };
    const address_types = ['street_number', 'route', 'locality', 'country', 'postal_code']
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options
        );
    
        autoCompleteRef.current.addListener("place_changed", () => {
          const selectedPlace = autoCompleteRef.current.getPlace();
          setSelectedPlace(selectedPlace); 
        });
      }, [options]);
    
    useEffect(() => {
        if (selectedPlace) {
            const name = selectedPlace.name;
            const photo = selectedPlace.photos[1].getUrl();
            const full_address = address_types.map( type => {
                return selectedPlace.address_components.map( address => {
                    const my_type = address.types.some(key => key === type)
                    if(my_type){
                        return address.long_name
                    }
                }).filter(value => value)
            })
            console.log("Selected Place:", full_address.flat().join(' '));
            onChange(name, photo, full_address.flat().join(' '));
        }
      }, [selectedPlace]);
    

  return (
    <Container className={`${appStyles.Content} p-4`}>
      <Form.Group>
        <Form.Label>Location:</Form.Label>
        <Form.Control
          ref={inputRef}
        />
      </Form.Group>
    </Container>
  );
};

export default AutoComplete;
