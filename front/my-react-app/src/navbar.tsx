import { NavLink } from "react-router-dom";
import { NavCon } from "./components/navstyle";

const Navbar = () => {
  return (
    <div>
      <NavCon>
        <NavLink
          to={"/"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <p>All</p>
        </NavLink>
        <NavLink
          to={"/fruits"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <p>Fruits</p>
        </NavLink>
        <NavLink
          to={"/vegans"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <p>Vegans</p>
        </NavLink>
        <NavLink
          to={"/drinks"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <p>Drinks</p>
        </NavLink>
        <NavLink
          to={"/foods"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <p>Foods</p>
        </NavLink>
      </NavCon>
    </div>
  );
};

export default Navbar;
