import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../baseurl";
import { useDispatch } from "react-redux";
import { logout_user } from "../../Redux/Authantication/auth.action";
import "./Admin.Module.css";

export const AdminCatalog = ({ endpoint, title, fields }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});

  const load = () => axios.get(`${BASE_URL}/${endpoint}`).then((response) => setItems(response.data));
  useEffect(() => {
    load();
  }, [endpoint]);

  const save = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${BASE_URL}/${endpoint}`, form);
    setItems((current) => [...current, response.data]);
    setForm({});
  };

  const remove = async (id) => {
    await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="adminFlightMai">
      <div className="adminSideBr">
        <h1><Link to="/admin">Home</Link></h1>
        <h1><Link to="/admin/adminflight">Add Flight</Link></h1>
        <h1><Link to="/admin/adminstay">Add Stays</Link></h1>
        <h1><Link to="/admin/flights">All Flights</Link></h1>
        <h1><Link to="/admin/hotels">All Hotels</Link></h1>
        <h1><Link to="/admin/users">Users</Link></h1>
        <h1><Link to="/" onClick={() => dispatch(logout_user)}>Log out</Link></h1>
      </div>
      <div className="adminFlightBox">
        <div className="adminHead">
          <h2>Admin Panel for {title}</h2>
        </div>
        <div className="adminFlightInputs">
          <form onSubmit={save}>
            {fields.map((field) => (
              <div className="adminFlightInputBx" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  type={field.name === "image" ? "url" : "text"}
                  value={form[field.name] || ""}
                  onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                  required={field.required !== false}
                />
              </div>
            ))}
            <div className="adminFlightInputBx">
              <span></span>
              <button type="submit">Add {title}</button>
            </div>
          </form>
        </div>
        {items.length > 0 && (
          <div className="adminCatalogItems">
            {items.map((item) => (
              <div className="adminCatalogItem" key={item.id}>
                <span>{item.name || item.title}</span>
                <button type="button" onClick={() => remove(item.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
