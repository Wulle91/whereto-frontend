import { useRef, useEffect } from "react";
import "../styles/AutoComplete.module.css";
import styles from "../styles/SignInUpForum.module.css"
import Container from "react-bootstrap/Container";
import appStyles from "../App.module.css";
import Form from "react-bootstrap/Form";

const AutoComplete = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();

    const options = {
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log({ place });
        });
    }, []);

    return (

        <Container className={`${appStyles.Content} p-4 `}>
            <Form.Group>
                <Form.Label>Location:</Form.Label>
                <Form.Control
                    ref={inputRef}/>
            </Form.Group>
            

        </Container >

    );
};
export default AutoComplete;