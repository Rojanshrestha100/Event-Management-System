import { useEffect, useState } from "react";
import http from "../../../http";
import { Link } from "react-router-dom";
import './List.css'; // Ensure this CSS file is imported

const List = ({onSelectionChange}) => {
    const [photographers, setPhotographers] = useState([]);

    const handlePhotographerChange = (ev) => {
        onSelectionChange(ev.target.id);
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => http.get('/cuscms/photographers')
        .then(({ data }) => setPhotographers(data))
        .catch(err => { console.error(err); });

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Photographers</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {photographers.length ? (
                            <div className="row">
                                {photographers.map((photographer) => (
                                    <div className="col-md-4 mb-4" key={photographer.id}>
                                        <div className="card h-100 d-flex flex-column">
                                            <div className="image-container">
                                                {photographer.pimg.length ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/images/${photographer.pimg}`}
                                                        className="card-img-top"
                                                        alt={photographer.pcontactinfo}
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="card-title">{photographer.pcontactinfo}</h5>
                                                    <p className="card-text">{photographer.content}</p>
                                                </div>
                                                <div className="form-check mt-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`checkbox-${photographer._id}`}
                                                        onChange={handlePhotographerChange}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`checkbox-${photographer.id}`}
                                                    >
                                                        Select Photographer
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
