import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Movies = () => {
  const queryParam = useQuery();
  const initialQuery = queryParam.get("q") || "love";
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchMovies(initialQuery);
  }, []);

  useEffect(() => {
    if (filter) {
      applyFilter(filter);
    }
  }, [filter]);

  const fetchMovies = async (searchQuery = "") => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=2ae35b05&s=${searchQuery}`
      );
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMovies(query);
  };

  const applyFilter = (type) => {
    let sortedMovies = [...movies];
    if (type === "A_TO_Z") {
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (type === "Z_TO_A") {
      sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (type === "YEAR") {
      sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }
    setMovies(sortedMovies);
  };

  return (
    <>
      <div className="search">
        <div className="search__container--movie">
          <div className="search__row--movie">
            <h1 className="search__title">Explore movies</h1>
            <div className="input__wrapper">
              <input
                className="searchInput"
                type="text"
                placeholder="Search Movie by Title"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button id="search__btn" className="btn" onClick={handleSearch}>
                <FontAwesomeIcon icon={"magnifying-glass"} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <main id="movie__main">
        <div className="container">
          <div className="row">
            <div className="movie__header">
              <h2 className="section__title movie__header--title">
                {query ? (
                  <>
                    Search Results for "<span className="pink">{query}</span>"
                  </>
                ) : (
                  <>
                    All <span className="pink">Movies</span>
                  </>
                )}
              </h2>
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">Sort By</option>
                <option value="A_TO_Z">A to Z</option>
                <option value="Z_TO_A">Z to A</option>
                <option value="YEAR">Year</option>
              </select>
            </div>
          </div>
        </div>
      </main>
      <div className="all_movies">
        {loading
          ? new Array(8).fill(0).map((_, index) => (
              <div className="movie movie--loading" key={index}>
                <div className="movie-card">
                  <div className="movie-card__container">
                    <div className="movie__img--wrapper skeleton skeleton-img"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              </div>
            ))
          : movies.map((movie, index) => (
              <div className="movie-card" key={movie.imdbID}>
                <Link
                  to={`/movies/${movie.imdbID}`}
                  className="movie-card__link"
                >
                  <div className="movie-card__container">
                    <div className="movie__img--wrapper">
                      <img
                        className="movie__img"
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                    </div>
                    <h3 className="movie__title">{movie.Title}</h3>
                    <p className="movie__year">
                      <b>Year:</b> {movie.Year}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </>
  );
};

export default Movies;
