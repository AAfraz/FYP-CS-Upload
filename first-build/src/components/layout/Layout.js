import Header from "./Header.js";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

import "./Layout.css";

function Layout(props) {
  return (
    <>
      {/*This is a "Fragment" which helps to return a single item*/}
      <Header />
      <Navbar />
      <div className="underlay">
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
