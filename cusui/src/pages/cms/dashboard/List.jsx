import { Link, useNavigate } from "react-router-dom";
import '../../../../index.css';
import Venue from "./Venue";
import Catreen from "./Catreen";
import Decorator from "./Decorators";
import Photographer from "./Phorographers";
import Music from "./Music";
import Menu from "./Menu";
import { useState } from "react";
import http from "../../../http";

const List = () => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState('');

    const [selectedMusic, setSelectedMusic] = useState([]);
    const [selectedVenues, setSelectedVenues] = useState([]);
    const [selectedCatering, setSelectedCatering] = useState([]);
    const [selectedDecorators, setSelectedDecorators] = useState([]);
    const [selectedPhotographer, setSelectedPhotographer] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState([]);

    const navigate = useNavigate();

  const handleMusicSelection = (selected) => {
    const id = selected.split("-")[1]; // id-fjdsfhsfj3243489 // ['id', 'fjfjdshfsdjf'] [1]
    setSelectedMusic(id);
  };

  const handleVenueSelection = (selected) => {
    const id = selected.split("-")[1];
    setSelectedVenues(id);
  };

  const handleCateringSelection = (selected) => {
    const id = selected.split("-")[1];
    setSelectedCatering(id);
  };

  const handleDecoratorsSelection = (selected) => {
    const id = selected.split("-")[1];
    setSelectedDecorators(id);
  };

  const handlePhotographerSelection = (selected) => {
    const id = selected.split("-")[1];
    setSelectedPhotographer(id);
  };

  const handleMenuSelection = (arr) => {
    setSelectedMenu([...arr]);
  };

  const handleDateChange = (ev) => {
    setDate(ev.target.value);
  }

  const handleSubmit = () => {
    // Gather all selected values and send them to the backend server
    const data = {
            venue: {
                id: selectedVenues,
                date: date
            },
            music: {
                id: selectedMusic,
                date: date
            },
            catering: {
                id: selectedCatering,
                date: date
            },
            decorators: {
                id: selectedDecorators,
                date: date
            },
            photographer: {
                id: selectedPhotographer,
                date: date
            },
            menu: {
                id: selectedMenu,
                date: date
            }
        }
    
        console.log(data);

        http.post('/cuscms/orders', data)
            .then(resp => {
                navigate('/cms/payment/Epay');
                console.log(resp.data);
            })
            .catch(err => {console.log("The error is ",err)})
  }
    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="mb-3">
                        <div id="venue">
                            <Venue onSelectionChange={handleVenueSelection} />
                        </div>
                        <div id="catreen">
                            <Catreen onSelectionChange={handleCateringSelection} />
                        </div>
                        <div id="decorator">
                            <Decorator onSelectionChange={handleDecoratorsSelection} />
                        </div>
                        <div id="photographer">
                            <Photographer onSelectionChange={handlePhotographerSelection} />
                        </div>
                        <div id="music">
                            <Music onSelectionChange={handleMusicSelection} />
                        </div>
                        <div id="menu">
                            <Menu onSelectionChange={handleMenuSelection} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="eventDate" className="form-label">Select Event Date</label>
                        <input
                            type="date"
                            id="eventDate"
                            name="eventDate"
                            className="form-control"
                            onChange={handleDateChange}
                            min={today} // Set the minimum date to today's date
                            required
                        />
                    </div>

                    <div className="mb-3">
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    padding: '0.75rem 1.5rem',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    display: 'inline-block',
                                    textDecoration: 'none',
                                }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
