import React, { useEffect } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import { BASE_URL } from "../../baseurl";

const getData = async (page, priceValue) => {
  let res = await axios.get(
    `${BASE_URL}/flight?_page=${page}&_per_page=5&price_gte=${
      priceValue - 2000
    }&price_lte=${priceValue}`
  );
  return res.data.data;
};

export default function FlightList({ page, priceValue }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getData(page, priceValue).then((res) => {
      setData(res);
    });
  }, [page, priceValue]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <FlightCard data={item} />
            </div>
          );
        })}
    </div>
  );
}