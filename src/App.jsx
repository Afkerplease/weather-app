import "./App.css";
import { useReducer, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setdata] = useState(null);
  console.log(data?.lat, data?.lng);
  const [location, setLocation] = useState();
  const [info, setinfo] = useState(null);

  const KEY = "c52247ad0766c0bfce75a403e1472ebc";

  const myUrl = ` https://api.openweathermap.org/data/2.5/weather?lang=fr&lat=${data?.lat}&lon=${data?.lng}&appid=${KEY}&units=metric `;

  const locationSearch = (e) => {
    if (e.key === "Enter") {
      axios
        .get(
          `https://api-adresse.data.gouv.fr/search/?q=${location}&type=municipality`
        )
        .then((res) =>
          setdata({
            lng: res.data.features[0].geometry.coordinates[0],
            lat: res.data.features[0].geometry.coordinates[1],
          })
        );
    }
  };
  useEffect(() => {
    if (!data) return;
    axios.get(myUrl).then((res) => {
      console.log(res.data);
      setinfo(res.data);
    });
  }, [data]);
  console.log(info);

  return (
    <div className="app">
      <div className="search">
        <input
          // value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={locationSearch}
          placeholder="Chercher en France..."
          type="text"
          name=""
          id=""
        />
      </div>
      {data && (
        <>
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{info?.name} </p>
              </div>
              <div>
                <h1 className="temp">
                  {" "}
                  {Math.round(info ? info?.main.temp : "")} <span>&#176;C</span>{" "}
                </h1>
              </div>
              <div className="description">
                <p>{info?.weather[0].description} </p>
              </div>
            </div>
            {/* <div className="imgdiv">
              <img
                src={`./public/icons/${info?.weather[0].icon}.png`}
                style={{ height: "150px", width: "150px" }}
                alt=""
              />
            </div> */}
            <div className="bottom">
              <div className="feels">
                <p>temp max</p>
                <p>
                  {Math.round(info?.main.temp_max)} <span>&#176;</span>
                </p>
              </div>
              <div className="humidity">
                <p>humidité</p>
                <p> {info?.main.humidity} </p>
              </div>
              <div className="wind">
                <p>vent</p>
                <p> {info?.wind.speed} mph</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
