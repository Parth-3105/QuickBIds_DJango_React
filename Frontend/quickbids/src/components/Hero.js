import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Hero.css';  // Import the CSS file

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const quotes = [
    {
      text: "“Bidding is not just about winning, it's about the experience of competing.”",
      author: "Anonymous",
    },
    {
      text: "“In every bid, there is a strategy, a risk, and a reward.”",
      author: "Unknown",
    },
    {
      text: "“Bidding wars are battles of wit and willpower.”",
      author: "John Doe",
    },
    {
      text: "“The thrill of bidding is in the chase, not just the win.”",
      author: "Jane Smith",
    },
    {
      text: "“To bid is to believe in the value you perceive.”",
      author: "Michael Johnson",
    },
  ];

  return (
    <div className="hero-section">
      <div className="content">
        <div className="slider-container">
          <Slider {...settings}>
            {quotes.map((quote, index) => (
              <div key={index} className="slide">
                <h2 className="quote-text">{quote.text}</h2>
                <p className="author">- {quote.author}</p>
              </div>
            ))}
          </Slider>
        </div>
        <div className="image-container">
          <img
            src="https://i.pinimg.com/564x/de/ab/30/deab304c345ce76fc970a3c137a7b160.jpg"  // Replace with your actual image URL
            alt="Bidding Illustration"
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
