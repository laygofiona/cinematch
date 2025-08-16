import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <h1 className="text-red-700">CineMatch</h1>
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
