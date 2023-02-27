import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import digitalArt_02 from "../../img/digitalArt1.png";
import digitalArt_03 from "../../img/digitalArt2.png";
import Slider from "./Slider";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
        <Slider
          imageSrc={digitalArt_02}
          title={"Be an explorer."}
          subtitle={
            "Our platform offers a wide variety of unique travel locations!"
          }
        />
        <Slider
          imageSrc={digitalArt_03}
          title={"Memories for a lifetime."}
          subtitle={"Your dream vacation is only a few clicks away."}
          flipped={true}
        />
        <Slider
          imageSrc={digitalArt_03}
          title={"Memories for a lifetime."}
          subtitle={"Your dream vacation is only a few clicks away."}
        />
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

// import Hero from "./components/Hero";

// import digitalArt_01 from "../../img/digitalArt2.png";

// import Navbar from "./components/Navbar";

  {/* <Hero imageSrc={digitalArt_01} /> */}

  // const navbarLinks = [
  //   { url: "#", title: "Home" },
  //   { url: "#", title: "Trips" },
  //   { url: "#", title: "Rewards" },
  // ];
  // <Navbar navbarLinks={navbarLinks} />

{/* <div className="dark-overlay">
<div className='landing-inner'>
  <section class="section" id="section--1">
    <div class="section__title">
      <h2 class="section__description">Features</h2>
    </div>

    <div class="features">
      <img
        src="{% static 'images/community.png' %}"
        data-src="images/community.png"
        alt="Community"
        class="features__img"
      />
      <div class="features__feature">
        <div class="features__icon"></div>
        <h5 class="features__header">100% True stories</h5>
        <p>
          Smarticle have been made for people all around the world to post daily
          stories about their real lives.
        </p>
      </div>

      <div class="features__feature">
        <div class="features__icon"></div>
        <h5 class="features__header">Watch your article grow</h5>
        <p>
          Smarticle introduces great features to help our clients grow and shine.
        </p>
      </div>
      <img
        src="{% static 'images/grow-community.png' %}"
        data-src="images/grow-community.png"
        alt="Growing Community"
        class="features__img"
      />

      <img
        src="{% static 'images/join-us.png' %}"
        data-src="images/join-us.png"
        alt="Join Us"
        class="features__img"
      />
      <div class="features__feature">
        <div class="features__icon"></div>
        <h5 class="features__header">Sign up for free</h5>
        <a class="btn" href="/signup">Join us &reg;</a>
      </div>
    </div>
  </section>
</div>
</div> */}


      {/* <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div> */}

        //         <p>HEADLINE</p>
        // </div>
        // {/* Section 1 */}
        // <div className='landing-inner'>
        //   <div className='landing-sub-container'>
        //     <p>section 1</p>
        //   </div>
        //   <div className='landing-sub-container'>
        //     <p>Image</p>
        //   </div>
        // </div>
        // {/* Section 2 */}
        // <div className='landing-inner'>
        //     <div className='landing-sub-container'>
        //       <img
        //       src="./img/digitalArt1.png"
        //       alt="digitalArt1"
        //       />
        //     </div>
        //     <div className='landing-sub-container'>
        //       <p>section 2</p>
        //   </div>
        // </div>
        // {/* Section 3 */}
        // <div className='landing-inner'>
        //   <div className='landing-sub-container'>
        //       <p>section 3</p>
        //     </div>
        //     <div className='landing-sub-container'>
        //       <p>Image</p>
        //     </div>