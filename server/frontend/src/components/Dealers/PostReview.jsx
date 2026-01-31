import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';


const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let review_url = root_url+`djangoapp/add_review`;
  let carmodels_url = root_url+`djangoapp/get_cars`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (json.status === 200) {
      window.location.href = window.location.origin+"/dealer/"+id;
  }

  }
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      setDealer(retobj.dealer)
    }
  }

  const get_cars = async ()=>{
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    get_dealer();
    get_cars();
  },[]);


  return (
    <div className="postreview_page">
      <Header/>
      
      {/* Hero Section */}
      <div className="postreview_hero">
        <div className="postreview_hero_content">
          <a href={`/dealer/${id}`} className="back_link">
            <span>←</span> Back to Dealer
          </a>
          <h1 className="postreview_title">Write a Review</h1>
          <p className="postreview_subtitle">Share your experience at <strong>{dealer.full_name}</strong></p>
        </div>
      </div>

      {/* Form Section */}
      <div className="postreview_form_container">
        <div className="postreview_form">
          
          {/* Review Textarea */}
          <div className="form_group">
            <label className="form_label">
              <span className="label_icon">💬</span>
              Your Review
            </label>
            <textarea 
              id='review' 
              className="form_textarea"
              placeholder="Tell us about your experience with this dealer. How was the service? Would you recommend them?"
              rows='6' 
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>

          {/* Car Selection Row */}
          <div className="form_row">
            {/* Car Model */}
            <div className="form_group">
              <label className="form_label">
                <span className="label_icon">🚗</span>
                Car Make & Model
              </label>
              <select 
                name="cars" 
                id="cars" 
                className="form_select"
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="" selected disabled hidden>Select your car</option>
                {carmodels.map((carmodel, index) => (
                  <option key={index} value={carmodel.CarMake+" "+carmodel.CarModel}>
                    {carmodel.CarMake} {carmodel.CarModel}
                  </option>
                ))}
              </select>        
            </div>

            {/* Car Year */}
            <div className="form_group">
              <label className="form_label">
                <span className="label_icon">📅</span>
                Car Year
              </label>
              <input 
                type="number" 
                className="form_input"
                placeholder="e.g., 2023"
                onChange={(e) => setYear(e.target.value)} 
                max={2024} 
                min={2015}
              />
            </div>
          </div>

          {/* Purchase Date */}
          <div className="form_group">
            <label className="form_label">
              <span className="label_icon">🛒</span>
              Purchase Date
            </label>
            <input 
              type="date" 
              className="form_input"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="form_actions">
            <button className='submit_review_btn' onClick={postreview}>
              <span>✨</span> Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostReview
