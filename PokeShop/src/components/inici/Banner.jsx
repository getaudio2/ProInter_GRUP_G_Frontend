import React from "react";
import "./Banner.css";
import bannerImage from "../../assets/banner.jpg"; 

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <h1>PokeShop</h1>
        <p>Explora nuestros productos y encuentra lo que necesitas</p>
      </div>
    </div>
  );
};

export default Banner;
