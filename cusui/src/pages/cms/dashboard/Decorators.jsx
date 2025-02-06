import { useEffect, useState } from "react";
import http from "../../../http";
import { Link } from "react-router-dom";
import './List.css'; // Ensure this CSS file is imported

const List = ({onSelectionChange}) => {
    const [decorators, setDecorators] = useState([]);

    const handleDecoratorsChange = (ev) => {
        onSelectionChange(ev.target.id);
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => http.get('/cuscms/decorators')
        .then(({ data }) => setDecorators(data))
        .catch(err => { console.error(err); });

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Decorators</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {decorators.length ? (
                            <div className="row">
                                {decorators.map((decorator) => (
                                    <div className="col-md-4 mb-4" key={decorator.id}>
                                        <div className="card h-100 d-flex flex-column">
                                            <div className="image-container">
                                                {decorator.dimg.length ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/images/${decorator.dimg}`}
                                                        className="card-img-top"
                                                        alt={decorator.dcontactinfo}
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="card-title">{decorator.dcontactinfo}</h5>
                                                    <p className="card-text">{decorator.content}</p>
                                                </div>
                                                <div className="form-check mt-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`checkbox-${decorator._id}`}
                                                        onChange={handleDecoratorsChange}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`checkbox-${decorator._id}`}
                                                    >
                                                        Select Decorator
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
