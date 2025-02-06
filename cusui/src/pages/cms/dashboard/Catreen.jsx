import { useEffect, useState } from "react";
import http from "../../../http";
import { Link, useAsyncError } from "react-router-dom";
import './List.css'; // Ensure this CSS file is imported

const List = ({onSelectionChange}) => {
    const [catreens, setCatreens] = useState([]);

    const handleCateringChange = (ev) => {
        onSelectionChange(ev.target.id);
        console.log(ev.target.value)
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => http.get('/cuscms/catreens')
        .then(({ data }) => setCatreens(data))
        .catch(err => { console.error(err); });

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Catreens</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {catreens.length ? (
                            <div className="row">
                                {catreens.map((catreen) => (
                                    <div className="col-md-4 mb-4" key={catreen.id}>
                                        <div className="card h-100 d-flex flex-column">
                                            <div className="image-container">
                                                {catreen.cimg.length ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/images/${catreen.cimg}`}
                                                        className="card-img-top"
                                                        alt={catreen.ccontactinfo}
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="card-title">{catreen.ccontactinfo}</h5>
                                                    <p className="card-text">{catreen.content}</p>
                                                </div>
                                                <div className="form-check mt-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`checkbox-${catreen._id}`}
                                                        onChange={handleCateringChange}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`checkbox-${catreen.id}`}
                                                    >
                                                        Select Catreen
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
