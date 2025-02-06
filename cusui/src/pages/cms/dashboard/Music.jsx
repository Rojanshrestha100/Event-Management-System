import { useEffect, useState } from "react";
import http from "../../../http";
import { Link } from "react-router-dom";
import './List.css'; // Ensure this CSS file is imported

const List = ({onSelectionChange}) => {
    const [musics, setMusics] = useState([]);

    const handleMusicChange = (ev) => {
        onSelectionChange(ev.target.id);
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => http.get('/cuscms/musics')
        .then(({ data }) => setMusics(data))
        .catch(err => { console.error(err); });

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Musics</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {musics.length ? (
                            <div className="row">
                                {musics.map((music) => (
                                    <div className="col-md-4 mb-4" key={music.id}>
                                        <div className="card h-100 d-flex flex-column">
                                            <div className="image-container">
                                                {music.mimg.length ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/images/${music.mimg}`}
                                                        className="card-img-top"
                                                        alt={music.mcontactinfo}
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <h5 className="card-title">{music.mcontactinfo}</h5>
                                                    <p className="card-text">{music.content}</p>
                                                </div>
                                                <div className="form-check mt-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`checkbox-${music._id}`}
                                                        onChange={handleMusicChange}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`checkbox-${music.id}`}
                                                    >
                                                        Select Music
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
