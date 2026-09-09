import React, { useState } from "react";
import data from "./city";
import ShowCalender from "./ShowCalender";
import { Button, Select } from "@chakra-ui/react";
import styles from "./Stay.module.css";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectCity } from "../../Redux/StayReducer/action";

function Stay() {
  const [selectedCity, setSelectedCity] = useState("");
  const dispatch = useDispatch();
  return (
    <div className={styles.staySearch}>
      <div className={styles.stayOptions}>
        <div className={styles.cityField}>
          <label htmlFor="stay-city">Going to</label>
          <Select
            id="stay-city"
            value={selectedCity}
            placeholder="Select a city"
            onChange={(event) => {
              setSelectedCity(event.target.value);
              dispatch(selectCity(event.target.value));
            }}
          >
            {data.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles.calendarField}>
          <ShowCalender />
        </div>
      </div>
      <Button colorScheme="blue" size="lg" className={styles.SearchBtn1}>
        <Link to={{ pathname: "/stay" }}>Search</Link>
      </Button>
    </div>
  );
}

export default Stay;