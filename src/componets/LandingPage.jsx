import React, { useState } from "react";
import image from "../assets/undraw_movie_night_re_9umk.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim().length >= 3) {
      navigate(`/movies?q=${query}`);
    }
  };

  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>America's most awarded online movie library</h1>
            <h2>
              FIND MOVIES ONLINE FOR FREE WITH{" "}
              <span className="pink">FILMAX</span>
            </h2>
          </div>
          <div className="search">
            <div className="search__container">
              <div className="search__row">
                <h1 className="search__title">Explore movies</h1>
                <div className="input__wrapper">
                  <input
                    id="searchInput"
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button id="search__btn" className="btn" onClick={handleSearch}>
                    <FontAwesomeIcon icon={"magnifying-glass"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <figure className="header__img--wrapper">
            <img src={image} alt="" />
          </figure>
        </div>
      </header>
    </section>
  );
};

export default LandingPage;
