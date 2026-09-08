import React, { useEffect, useState } from "react";
import "./adminProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { DeleteHotel, fetchingHotels } from "../../Redux/AdminHotel/action";
import { logout_user } from "../../Redux/Authantication/auth.action";

export const AllHotels = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, data } = useSelector((store) => {
    return {
      isLoading: store.HotelReducer.isLoading,
      data: store.HotelReducer.data,
    };
  }, shallowEqual);
  // console.log(data);

  const handleDeleteHotel = (deleteId) => {
    dispatch(DeleteHotel(deleteId));
    // alert(deleteId);
    toast.success("Flight Removed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLoadMore = () => {
    if (data.length >= limit) {
      setLimit((prev) => prev + 5);
    }
  };

  console.log(limit);

  useEffect(() => {
    dispatch(fetchingHotels(limit));
  }, [limit]);

  const filteredHotels = data.filter((hotel) => {
  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return [hotel.name, hotel.place, hotel.location].some((value) =>
    value?.toLowerCase().includes(query)
  );
});

  return (
    <>
      <ToastContainer />
      <div className="adminProductMain">
        <div className="adminSideBr">
          <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"} onClick={() => dispatch(logout_user)}>Log out</Link></h1>

        </div>
        <div className="adminProductbox">
          <div className="filterProdcut">
            <input
              placeholder="Search Hotel"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchQuery(searchText);
                }
              }}
            />

            <button type="button" onClick={() => setSearchQuery(searchText)}>
              Search
            </button>
            {limit > data.length ? (
              ""
            ) : (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
          <div className="head"><h1>All Hotels</h1></div>

          {/*  */}
          {isLoading ? <h1>Please wait...</h1> : ""}
          {filteredHotels.map((ele, i) => (
            <div key={i} className="adminProductlist">
              <span>
                <img src={ele.image} alt="" />
              </span>
              <span>
                {/* {ele.name == "" ? "Default" : ""} */}
                {ele.name.length > 10
                  ? (ele.name = ele.name.substring(0, 10) + "...")
                  : ele.name}
              </span>
              <span>{ele.place}</span>
              <span>Rs.{ele.taxes}</span>
              <span>Rs.{ele.price}</span>
              <span>{ele.number}</span>
              <span>
                <button onClick={() => handleDeleteHotel(ele.id)}>
                  Delete <i className="fa fa-trash"></i>
                </button>
                <button>
                  Edit <i className="fa fa-pencil"></i>
                </button>
              </span>
            </div>
          ))}
          {/*  */}
        </div>
      </div>
    </>
  );
};
