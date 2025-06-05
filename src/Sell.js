import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Sell.css';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogout = () => {
      setIsLoggedIn(false);
    };

  return (
    <nav>
      <div className="navbar">
        <div className="logo"><Link to="/">Indian Farmer Portal</Link></div>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Crops</Link></li>
          <li><Link to="/">Marketplace</Link></li>
          <li><Link to="/sell">Sell</Link></li>
          <li><Link to="/">Contact</Link></li>
          <li><a href='#'>
          
                {isLoggedIn ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to="/login"><button>Login</button></Link>
                )}  
  
            </a></li>
        </ul>
      </div>
    </nav>
  );
};

const Sell = () => {
  const [Othercrop, setOthercrop] = useState(false);

  const [cropData, setcropData] = useState({
    sellerName: "",
    contactInfo: "",
    variety: "",
    cropType: "",
    quantity: "",
    pricePerUnit: "",
    totalPrice: "",
    negotiable: false,
    deliveryCost: "",
    paymenttype: "",
    certified: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setcropData({
        ...cropData,
        [name]: checked,
      });
    } else if (type === "radio") {
      if (checked) {
        setcropData({
          ...cropData,
          [name]: value,
        });
      }
    } else {
      setcropData({
        ...cropData,
        [name]: value,
      });
    }

    if (name === "cropType" && value === "Other") {
      setOthercrop(true);
    } else {
      setOthercrop(false);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const{sellerName,
  contactInfo,
  variety,
  cropType,
  quantity ,
  pricePerUnit,
  totalPrice ,
  negotiable ,
  deliveryCost ,
  paymenttype,
  certified} = cropData
  
  if (!sellerName || !contactInfo || !variety ||
      !cropType || !quantity || !pricePerUnit || !totalPrice ||
      !negotiable || !deliveryCost || !paymenttype || !certified) {
    console.log("All fields are required to Submit.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:8081/product', { ...cropData });
    console.log('Product added successfully');
    console.log(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error);
      return;
    }
    console.error("Error registering user:", error);
  }
};


return (
  <div className="sell-body">
    <Navbar />
    <h2>Crop Sale Information Form</h2>
    <div className="Information">
      <form action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Seller Information</legend>
          <div className="input-box">
            <label htmlFor="sellerName">Name:</label>
            <input
              className="txt"
              type="text"
              id="sellerName"
              name="sellerName"
              value={cropData.sellerName}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="input-box">
            <label htmlFor="contactInfo">Contact Information:</label>
            <input
              className="txt"
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={cropData.contactInfo}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>
          <div className="input-box">
            <label htmlFor="farmName">Farm/Company Name (if applicable):</label>
            <input
              className="txt"
              type="text"
              id="farmName"
              name="farmName"
              placeholder="Enter farm name"
            />
          </div>
          <div className="input-box">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              onChange={handleChange}
              placeholder="Text here"
            ></textarea>
          </div>
        </fieldset>

        <fieldset>
          <legend>Crop Details</legend>
          <div className="input-box">
            <label htmlFor="cropType">Crop Type:</label>
            <select
              id="cropType"
              name="cropType"
              value={cropData.cropType}
              onChange={handleChange}
              required
            >
              <option value="">Select Crop Type</option>
              <option value="Cereals">Cereals</option>
              <option value="Pulses">Pulses</option>
              <option value="Oilseeds">Oilseeds</option>
              <option value="Fiber Crops">Fiber Crops</option>
              <option value="Beverage Crops">Beverage Crops</option>
              <option value="Sugar Crops">Sugar Crops</option>
              <option value="Cash Crops">Cash Crops</option>
              <option value="Commercial Crops">Commercial Crops</option>
              <option value="Other">Other</option>
            </select>
            {Othercrop === true ? (
              <input
                className="txt"
                id="otherCropType"
                name="cropType"
                value={cropData.cropType}
                onChange={handleChange}
                placeholder="Enter crop type"
                type="text"
              />
            ) : (
              <p></p>
            )}
          </div>
          <div className="input-box">
            <label htmlFor="variety">Variety:</label>
            <input
              className="txt"
              type="text"
              id="variety"
              name="variety"
              value={cropData.variety}
              onChange={handleChange}
              placeholder="Enter variety type"
            />
          </div>
          <div className="input-box">
            <label htmlFor="quantity">Quantity Available:</label>
            <input
              className="txt"
              type="text"
              id="quantity"
              name="quantity"
              value={cropData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </div>
          <div className="input-box">
            <label htmlFor="quality">Quality Description:</label>
            <textarea
              id="quality"
              name="quality"
              rows="3"
              placeholder="Text here"
            ></textarea>
          </div>
          <div className="input-box">
            <label htmlFor="harvestDate">Harvest Date:</label>
            <input
              className="txt"
              type="date"
              id="harvestDate"
              name="harvestDate"
              value={cropData.harvestDate}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="storageConditions">Storage Conditions:</label>
            <textarea
              id="storageConditions"
              name="storageConditions"
              rows="3"
              placeholder="Text here"
            ></textarea>
          </div>
        </fieldset>

        <fieldset>
          <legend>Pricing and Delivery</legend>
          <div className="input-box">
            <label htmlFor="pricePerUnit">Price per Unit:</label>
            <input
              className="txt"
              type="text"
              id="pricePerUnit"
              name="pricePerUnit"
              value={cropData.pricePerUnit}
              onChange={handleChange}
              placeholder="Enter price per unit"
            />
          </div>
          <div className="input-box">
            <label htmlFor="totalPrice">Total Price:</label>
            <input
              className="txt"
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={cropData.totalPrice}
              onChange={handleChange}
              placeholder="Enter total price"
            />
          </div>
          <div className="input-box">
            <label htmlFor="negotiable">Negotiable?</label>
            <input
              type="checkbox"
              id="negotiable"
              name="negotiable"
              checked={cropData.negotiable}
              onChange={handleChange}
            />
          </div>
          <div className="head">
            <label>Delivery Options:</label><br />
          </div>
          <div className="input-box">
            <label htmlFor="sellerTransport">Seller arranged transportation</label><br />
            <input
              type="checkbox"
              id="sellerTransport"
              name="deliveryOptions"
              value="seller_transport"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="buyerPickup">Buyer responsible for pickup</label>
            <input
              type="checkbox"
              id="buyerPickup"
              name="deliveryOptions"
              value="buyer_pickup"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="deliveryCost">Delivery Costs:</label>
            <input
              className="txt"
              type="text"
              id="deliveryCost"
              name="deliveryCost"
              value={cropData.deliveryCost}
              onChange={handleChange}
              placeholder="Enter delivery cost"
            />
          </div>
          <div className="input-box">
            <label htmlFor="paymentType">Payment Terms:</label>
            <input
              className="txt"
              type="text"
              id="paymentType"
              name="paymenttype"
              value={cropData.paymenttype}
              onChange={handleChange}
              placeholder="Enter payment terms"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Legal Compliance</legend>
          <div className="head">
            <label htmlFor="certified">Are the crops certified?</label>
          </div>
          <div className="input-box">
            <label htmlFor="certified_yes">Yes</label>
            <input
              type="radio"
              id="certified_yes"
              name="certified"
              value="Yes"
              checked={cropData.certified === "Yes"}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="certified_no">No</label>
            <input
              type="radio"
              id="certified_no"
              name="certified"
              value="No"
              checked={cropData.certified === "No"}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="certifications">Certifications (if any):</label>
            <input
              type="file"
              id="certifications"
              name="certifications"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="legalRequirements">Legal Requirements:</label>
            <textarea
              id="legalRequirements"
              name="legalRequirements"
              rows="3"
              placeholder="Text here"
            ></textarea>
          </div>
        </fieldset>
        <div className="submit-item">
          <button name="submit-item" >Submit Item</button>
        </div>
      </form>
    </div>
  </div>
);
};

export default Sell;
