import { NavLink, useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <h1 style={{ marginRight: "2rem" }}>CineMatch</h1>
        {/* Active className gets applied automatically in v7 */}
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/sign up">Sign Up</NavLink>
      </nav>
    </>
  );
};

export default NavBar;
