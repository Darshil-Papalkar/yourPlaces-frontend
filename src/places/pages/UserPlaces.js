import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const resposneData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL_EMBEDDED}/places/user/${userId}`);
                setLoadedPlaces(resposneData.places);
            }catch(err){}
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletePlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletePlaceId));
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="ceter">
                    <LoadingSpinner center />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </React.Fragment>
    );
        
};

export default UserPlaces;