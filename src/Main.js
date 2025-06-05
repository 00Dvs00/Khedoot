import React, {useState , useEffect} from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogout = () => {
      setIsLoggedIn(false);
    };

  const Navbar = () => {
    return (
      <nav>
        <div className="navbar">
          <div className="logo"><a href="#home">Indian Farmer Portal</a></div>
          <ul className="menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#crops">Crops</a></li>
            <li><a href="#marketplace">Marketplace</a></li>
            <li><a href="#sell">Sell</a></li>
            <li><a href="#contact">Contact</a></li>
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
  
  const Home = () => {
    return (
      <section className="home" id="home">
        <div className="home-content">
          <div className="text">
            <div className="text-one">Welcome to the Indian Farmer Portal</div>
            <div className="text-two">Empowering Farmers Across India</div>
            <div className="text-three">Find the Best Crops. Sell Your Harvest. Connect with Buyers.</div>
          </div>
        </div>
      </section>
    );
  };


  const Crops = () => {
    return (
      <section className="crops" id="crops">
        <div className="content">
          <div className="title"><span>Discover Various Crops</span></div>
        <div className='box-container crop-options'>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-mike-468229-1192053.jpg"} alt=''/>
            <h3>Cereals</h3>
            <Link to="/crop-search?crop=Cereals"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img  src={"./Khedoot/categoryImg/dal-pulse-745535_l.jpg"} alt=''/> 
            <h3>Pulses</h3>
            <Link to="/crop-search?crop=Pulses"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/PO17Oilseeds.jpg"} alt=''/>
            <h3>Oilseeds</h3>
            <Link to="/crop-search?crop=Oilseeds"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-vie-studio-6168150.jpg"} alt=''/>
            <h3>Fiber Crops</h3>
            <Link to="/crop-search?crop=Fiber+Crops"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-pixabay-326082.jpg"} alt=''/>
            <h3>Beverage Crops</h3>
            <Link to="/crop-search?crop=Beverage+Crops"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-shantanu-pal-938952-2802527.jpg"} alt=''/>
            <h3>Spices</h3>
            <Link to="/crop-search?crop=Spices"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-suzyhazelwood-2523650.jpg"} alt=''/>
            <h3>Sugar Crops</h3>
            <Link to="/crop-search?crop=Sugar+Crops"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-janetrangdoan-1132047.jpg"} alt=''/>
            <h3>Fruits</h3>
            <Link to="/crop-search?crop=Fruits"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-nc-farm-bureau-mark-2255935.jpg"} alt=''/>
            <h3>Vegetables</h3>
            <Link to="/crop-search?crop=Vegetables"><button className='btn' type='button'>Shop now</button></Link>
          </div>

          <div className="button">
            <img src={"./Khedoot/categoryImg/pexels-pixabay-273838.jpg"} alt=''/>
            <h3>Cash Crops</h3>
            <Link to="/crop-search?crop=Cash+Crops"><button className='btn' type='button'>Shop now</button></Link>
          </div>
        </div>
        </div>
      </section>
    );
  };  

  const Marketplace = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
      axios.get('http://localhost:8081/getdata')
      .then(products => setProducts(products.data))
      .catch(error => console.log(error))
    }, [])
  
    const limitedProducts = products.slice(0, 8);
  
    return (
      <div className='market-section'>
        <section className="marketplace" id="marketplace">
          <div className="content">
            <div className="title"><span>Explore Marketplace</span></div>
            <div className="products">
                {limitedProducts.map(product => (
                  <div className="product" key={product._id}>
                    <img src={`${product.image}`} alt={product.sellerName} />
                    <div className="prod-name">{product.variety}</div>
                    <div className="prod-price">{product.pricePerUnit}</div>
                    <button className='buy'>BUY</button>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <div className="show-more">
          <Link to="/crop-search"><a>Show More</a></Link>
        </div>
      </div>
      
    );
  };
  
  
  const Sell = () => {
  
    return (
      <section className="sell" id="sell">
        <div className="content">
          <div className="title"><span>Sell Your Harvest</span></div>
          <div className="sell-info">
            <p>Are you a farmer looking to sell your harvest? Join our platform and connect with buyers across India. Whether you have fruits, vegetables, grains, or spices, there's a buyer waiting for your produce.</p>
            <div className="button">
              {isLoggedIn ? (
                <Link className='sell-button' to="/sell">Start Selling Now</Link>
              ) : (
                <Link to="/login"><button className='sell-button'>Start Selling Now</button></Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  const Contact = () => {
    return (
      <section className="contact" id="contact">
        <div className="content">
          <div className="title"><span>Contact Us</span></div>
          <div className="contact-info">
            <p>If you have any questions or feedback, feel free to reach out to us. We're here to support you on your farming journey.</p>
            <div className="contact-button">
              <button>Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  const Footer = () => {
    return (
      <footer>
        <div className="text">
          <span>Indian Farmer Portal &copy; 2024 All Rights Reserved</span>
        </div>
      </footer>
    );
  };

  return (
    <div className='main'>
      <>
        <Navbar />
        <Home />
        <Crops />
        <Marketplace />
        <Sell />
        <Contact />
        <Footer />
      </>
    </div>
  );
};

export default Main;
