import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <div className="navItem">
        <NavLink to={'/'} exact activeClassName="navSelected">Projects</NavLink>
      </div>
      <div className="navItem">
        <NavLink to={'/logout'} activeClassName="navSelected">Log Out</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
