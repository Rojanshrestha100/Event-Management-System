import { useEffect, useState } from "react";
import http from "../../../http";
import { Link } from "react-router-dom";
import './List.css'; // Ensure this CSS file is imported

const List = ({onSelectionChange}) => {
    const [venues, setVenues] = useState([]);

    const handleVenueChange = (ev) => {
        onSelectionChange(ev.target.id);
        console.log(ev.target.value)
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => http.get('/cuscms/venues')
        .then(({ data }) => setVenues(data))
        .catch(err => { console.error(err); });

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Venues</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {venues.length ? (
                            <div className="row">
                                {venues.map((venue) => (
                                    <div className="col-md-4 mb-4" key={venue.id}>
                                        <div className="card h-100 d-flex flex-column">
                                            <div className="image-container">
                                                {venue.vimg.length ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/images/${venue.vimg}`}
                                                        className="card-img-top"
                                                        alt={venue.vname}
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="card-title">{venue.vname}</h5>
                                                    <p className="card-text">{venue.content}</p>
                                                </div>
                                                <div className="form-check mt-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`checkbox-${venue._id}`}
                                                        onChange={handleVenueChange}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`checkbox-${venue.id}`}
                                                    >
                                                        Select Venue
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h4 className="text-muted fst-italic">No data added.</h4>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
