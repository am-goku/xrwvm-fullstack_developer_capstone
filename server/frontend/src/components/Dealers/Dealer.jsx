import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import Header from '../Header/Header';

const Dealer = () => {


  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
  let post_review = root_url+`postreview/${id}`;
  
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();

    console.log("get_dealer_objects: ", retobj)
    
    if(retobj.status === 200) {
      setDealer(retobj.dealer)
    }
  }

  const get_reviews = async ()=>{
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      if(retobj.reviews.length > 0){
        setReviews(retobj.reviews)
      } else {
        setUnreviewed(true);
      }
    }
  }

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
  },[]);  


return(
  <div className="dealer_page">
      <Header/>
      
      {/* Hero Section */}
      <div className="dealer_hero">
        <div className="dealer_hero_content">
          <div className="dealer_badge">
            <span className="badge_icon">🏢</span>
            <span>Authorized Dealer</span>
          </div>
          <h1 className="dealer_name">{dealer.full_name}</h1>
          <div className="dealer_location">
            <div className="location_item">
              <span className="location_icon">📍</span>
              <span>{dealer.address}</span>
            </div>
            <div className="location_item">
              <span className="location_icon">🏙️</span>
              <span>{dealer.city}, {dealer.state} {dealer.zip}</span>
            </div>
          </div>
          {sessionStorage.getItem("username") && (
            <a href={post_review} className="write_review_btn">
              <span>✍️</span> Write a Review
            </a>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews_section">
        <div className="reviews_header">
          <h2>Customer Reviews</h2>
          <span className="reviews_count">{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>
        </div>
        
        <div className="reviews_panel">
          {reviews.length === 0 && unreviewed === false ? (
            <div className="loading_state">
              <div className="loading_spinner"></div>
              <p>Loading Reviews...</p>
            </div>
          ) : unreviewed === true ? (
            <div className="empty_state">
              <span className="empty_icon">💬</span>
              <h3>No Reviews Yet</h3>
              <p>Be the first to share your experience with this dealer!</p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <div className='review_panel' key={index}>
                <div className="review_header">
                  <img src={senti_icon(review.sentiment)} className="emotion_icon" alt='Sentiment'/>
                  <div className="reviewer_info">
                    <span className="reviewer_name">{review.name}</span>
                    <span className="review_car">{review.car_make} {review.car_model} • {review.car_year}</span>
                  </div>
                </div>
                <div className='review_content'>{review.review}</div>
              </div>
            ))
          )}
        </div>
      </div>
  </div>
)
}

export default Dealer
