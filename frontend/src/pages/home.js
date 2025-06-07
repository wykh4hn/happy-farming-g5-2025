import React from "react";
import { MainNav } from "../components/nav"; 

{/*I add some parts of the css into this bc idk why all in css so lag and even effect on other pages */}
const Home = () => {
  const bgImage = `${process.env.PUBLIC_URL}/background.png`;

  const homeStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    
  };

  const introImageStyle = {
    width: "750px",
    height: "750px",
    alignItems: "bottom",
    marginTop: "100px",
    borderRadius: "100%",
    border: "10px solid #095a5d",
    boxShadow: "30px 8px 20px rgba(109, 98, 49, 0.4)",
    clipPath: "ellipse(100% 75% at center)"
  };

  const headerStyle = {
    fontFamily: '"Abril Fatface", sans-serif',
    position: "absolute",
    top: "55%",
    left: "56%",
    fontSize: "2.5em",
    transform: "translate(-50%, -50%)",
    textAlign: "left",
    color: "#044b4d",
    zIndex: 2,
    whiteSpace: "nowrap",
    backgroundColor: "#f8f4eb",
    borderRadius: "80px",
    paddingTop: "17px",
    paddingLeft: "50px",
  };

  const descriptionIntro = {
    position: "absolute",
    top: "80%",
    left: "72%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#095a5d",
    color: "white",
    padding: "12px 25px",
    borderRadius: "30px",
    fontWeight: "bold",
    fontFamily: "'Exo 2', sans-serif",
    fontSize: "1rem",
    boxShadow: "8px 8px 13px rgba(20, 35, 52, 0.67)",
    zIndex: 2,
  };

  {/*the main part */}

  return (
    <>
      <MainNav />
      <div id="home-container" style={homeStyle}>
        <div id="header" style={headerStyle}>
          <h1 style={{ fontFamily: '"Abril Fatface", sans-serif' }}>HAPPY FARMING</h1>
        </div>

        <div id="description-intro" style={descriptionIntro}>
          <p style={{ margin: 0 }}>Fresh, new, clean products always here for you</p>
        </div>

        <div className="image-wrapper">
          <img id="intro-image" style={introImageStyle} src={`${process.env.PUBLIC_URL}/intro.png`} alt="Intro tho" />
        </div>

      </div>
    </>
  );
};

export { Home };