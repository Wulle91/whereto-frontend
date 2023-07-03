import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/arrow-upload-icon.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../comonents/Asset";
import { Image } from "react-bootstrap";
import AutoComplete from "../../api/autoComplete";
import { useHistory } from "react-router-dom";
import {axiosReq} from "../../api/axiosDefaults";

function PostCreateForm() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
        location_image: "",
        location_name: "",
        location_address: "",
    });
    const { title, location_name, content, image, location_image, location_address } = postData;
    console.log(postData)
    const imageInput = useRef(null);
    const history = useHistory();
    console.log(postData)
    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleLocationChange = (location, photo, address) => {
        setPostData({
          ...postData,
          location_name: location,
          location_image: photo,
          location_address: address  // Update the location state with the selected place name
        });
      };


    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('title', title)
        formData.append('name', location_name)
        formData.append('content', content)
        formData.append('image', imageInput.current.files[0])
        formData.append('image_url', location_image)
        formData.append('address', location_address)

        try {
            console.log(formData)
            const {data} = await axiosReq.post('/posts/', formData)
            history.push(`/posts/${data.id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401){
                setErrors(err.response?.data)
            }
        }
    }

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <AutoComplete
                    type="text"
                    name="location"
                    value={location_name}
                    onChange={handleLocationChange}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="content"
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                <figure>
                                    <Image className={appStyles.Image} src={image} rounded />
                                </figure>
                                <div>
                                    <Form.Label 
                                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                        htmlFor="image-upload">
                                            Change the image
                                    </Form.Label> 
                                </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}

                            <Form.File 
                                id="image-upload" 
                                accept="image/*" 
                                onChange={handleChangeImage}
                                ref={imageInput} />
                        </Form.Group>
                        <div className="d-md-none" >{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;