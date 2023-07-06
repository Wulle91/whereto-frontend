import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../comonents/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../comonents/Avatar";

const PopularLocations = ({ mobile }) => {
    const [locationData, setLocationData] = useState({
        pageLocation: { results: [] },
        popularLocations: { results: [] },
    });
    const { popularLocations } = locationData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/locations/?ordering=-followers_count"
                );
                setLocationData((prevState) => ({
                    ...prevState,
                    popularLocations: data,
                }));
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [currentUser]);

    return (
        <Container className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"
            }`}>
            {popularLocations.results.length ? (
                <>
                    <p>Most interesting places.</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularLocations.results.slice(0, 4).map((location) => (
                                <p key={location.id}><Link className="align-self-center" to={`/locations/${location.id}`}>
                                                        <Avatar src={location.image_url} height={45} />
                                                    </Link>{location.name}</p>
                            ))}
                        </div>

                    ) : (
                        popularLocations.results.map((location) => (
                            <p key={location.id}><Link className="align-self-center" to={`/locations/${location.id}`}>
                                                    <Avatar src={location.image_url} height={45} />
                                                </Link>{location.name}</p>
                        ))
                    )}

                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularLocations