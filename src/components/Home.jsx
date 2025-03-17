import React from "react";
import "../css/style.css";

import { useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

import { faCar } from "@fortawesome/free-solid-svg-icons";
import categoryImg from "../assets/img/categories/category-1.jpg";
import categoryImg1 from "../assets/img/categories/category-2.jpg";
import categoryImg2 from "../assets/img/categories/category-3.jpg";

import categoryImg3 from "../assets/img/categories/category-4.jpg";
import categoryImg4 from "../assets/img/categories/category-5.jpg";
import product1 from "../assets/img/product/product-1.jpg";

import product2 from "../assets/img/product/product-2.jpg";

import product3 from "../assets/img/product/product-3.jpg";

import product4 from "../assets/img/product/product-4.jpg";

import product5 from "../assets/img/product/product-5.jpg";

import product6 from "../assets/img/product/product-6.jpg";

import product7 from "../assets/img/product/product-7.jpg";

import product8 from "../assets/img/product/product-8.jpg";

import banner1 from "../assets/img/banner/banner-1.jpg";

import banner2 from "../assets/img/banner/banner-2.jpg";

import banner3 from "../assets/img/banner/banner-3.jpg";


import trendimg1 from "../assets/img/trend/bs-1.jpg";

import trendimg2 from "../assets/img/trend/bs-2.jpg";

import trendimg3 from "../assets/img/trend/bs-3.jpg";

import trendimg4 from "../assets/img/trend/f-1.jpg";

import trendimg5 from "../assets/img/trend/f-2.jpg";

import trendimg6 from "../assets/img/trend/f-3.jpg";



import trendimg8 from"../assets/img/trend/ht-2.jpg";
import discountimg from "../assets/img/discount.jpg";
import CountdownTimer from "./CountDownTimer";
import Instagram from "./Instagram";




const Home = () => { 
     const targetDate = new Date("2025-03-01T00:00:00").getTime();
    const products = [
        { id: 1, name: "Buttons Tweed Blazer", price: 59, category: "women", img: product1 },
        { id: 2, name: "Flowy Striped Skirt", price: 49, category: "men", img: product2 },
        { id: 3, name: "Cotton T-Shirt", price: 59, category: "accessories", img: product3 },
        { id: 4, name: "Slim Striped Pocket Shirt", price: 59, category: "cosmetic", img: product4 },
        { id: 5, name: "Fit Micro Corduroy Shirt", price: 59, category: "kid", img: product5 },
        { id: 6, name: "Tropical Kimono", price: 49, category: "women", img: product6, sale: true },
        { id: 7, name: "Contrasting Sunglasses", price: 59, category: "accessories", img: product7 },
        { id: 8, name: "Water Resistant Backpack", price: 49, category: "cosmetic", img: product8, sale: true },
      ];
      const [filter, setFilter] = useState("all");

      const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);
    

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
      };
    return (
        <>
         

            <section className="categories mt-4">
            <div className="container-fluid">
                <div className="row">
                    {/* Large Category */}
                    <div className="col-lg-6 p-0">
                        <div className="position-relative">
                            <img src={categoryImg} alt="Women's Fashion" className="img-fluid w-100" />
                            <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                                <h1>Women’s Fashion</h1>
                                <p>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <a href="#" className="btn btn-danger">Shop Now</a>
                            </div>
                        </div>
                    </div>

                    {/* Small Categories */}
                    <div className="col-lg-6">
                        <div className="row">
                            {/* Men's Fashion */}
                            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                <div className="position-relative">
                                    <img src={categoryImg1} alt="Men’s Fashion" className="img-fluid w-100" />
                                    <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                                        <h4>Men’s Fashion</h4>
                                        <p>358 items</p>
                                        <a href="#" className="btn btn-danger btn-sm">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* Kid's Fashion */}
                            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                <div className="position-relative">
                                    <img src={categoryImg2} alt="Kid’s Fashion" className="img-fluid w-100" />
                                    <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                                        <h4>Kid’s Fashion</h4>
                                        <p>273 items</p>
                                        <a href="#" className="btn btn-danger btn-sm">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* Cosmetics */}
                            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                <div className="position-relative">
                                    <img src={categoryImg3} alt="Cosmetics" className="img-fluid w-100" />
                                    <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                                        <h4>Cosmetics</h4>
                                        <p>159 items</p>
                                        <a href="#" className="btn btn-danger btn-sm">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* Accessories */}
                            <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                <div className="position-relative">
                                    <img src={categoryImg4} alt="Accessories" className="img-fluid w-100" />
                                    <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                                        <h4>Accessories</h4>
                                        <p>792 items</p>
                                        <a href="#" className="btn btn-danger btn-sm">Shop Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </section>

        <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <h4>New Product</h4>
          </div>
          <div className="col-lg-8 col-md-8">
            <ul className="nav">
              <li className={`nav-item ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</li>
              <li className={`nav-item ${filter === "women" ? "active" : ""}`} onClick={() => setFilter("women")}>Women</li>
              <li className={`nav-item ${filter === "men" ? "active" : ""}`} onClick={() => setFilter("men")}>Men</li>
              <li className={`nav-item ${filter === "kid" ? "active" : ""}`} onClick={() => setFilter("kid")}>Kids</li>
              <li className={`nav-item ${filter === "accessories" ? "active" : ""}`} onClick={() => setFilter("accessories")}>Accessories</li>
              <li className={`nav-item ${filter === "cosmetic" ? "active" : ""}`} onClick={() => setFilter("cosmetic")}>Cosmetic</li>
            </ul>
          </div>
        </div>
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card my-2">
                <img src={product.img} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h6>{product.name}</h6>
                  <p>${product.price} {product.sale && <span className="text-danger"><del>${product.price + 10}</del></span>}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
<section className="relative w-full">
      <Slider {...settings}>
        {[banner1, banner2, banner3].map((banner, index) => (
          <div key={index} className="relative">
            {/* Background Image */}
            <img
              src={banner}
              alt="The Project Jacket"
              className="w-full h-full object-cover"
            />

            {/* Text Content - Responsive */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-xs sm:max-w-md md:max-w-lg">
                <span className="block text-sm sm:text-lg uppercase">
                  The Chloe Collection
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4">
                  The Project Jacket
                </h1>
                <a
                  href="#"
                  className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-md inline-block mt-2"
                >
                  Shop now
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
    
    <section className="trend spad">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="trend__content">
                    <div className="section-title">
                        <h4>Hot Trend</h4>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg1} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Chain bucket bag</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg8} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Pendant earrings</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg8} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Cotton T-Shirt</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="trend__content">
                    <div className="section-title">
                        <h4>Best seller</h4>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg1} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Cotton T-Shirt</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg2} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Zip-pockets pebbled tote <br />briefcase</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg3} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Round leather bag</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="trend__content">
                    <div className="section-title">
                        <h4>Feature</h4>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg4} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Bow wrap skirt</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg5} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Metallic earrings</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div className="trend__item">
                        <div className="trend__item__pic">
                            <img src={trendimg6} alt=""/>
                        </div>
                        <div className="trend__item__text">
                            <h6>Flap cross-body bag</h6>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section className="discount">
    <div className="container">
        <div className="row">
            <div className="col-lg-6 p-0">
                <div className="discount__pic">
                    <img src={discountimg} alt=""/>
                </div>
            </div>
            <div className="col-lg-6 p-0">
                <div className="discount__text">
                    <div className="discount__text__title">
                        <span>Discount</span>
                        <h2>Summer 2025</h2>
                        <h5><span>Sale</span> 50%</h5>
                    </div>
                    <CountdownTimer targetDate={targetDate}/>
                    <a href="#">Shop now</a>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="services spad">
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <FontAwesomeIcon icon={faCar}/>
                    <h6>Free Shipping</h6>
                    <p>For all oder over $99</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <FontAwesomeIcon icon={"money-bill"}/>
                    <h6>Money Back Guarantee</h6>
                    <p>If good have Problems</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <FontAwesomeIcon icon={"phone"}/>
                    <h6>Online Support 24/7</h6>
                    <p>Dedicated support</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <FontAwesomeIcon icon={"ear-deaf"}/>
                    <h6>Payment Secure</h6>
                    <p>100% secure payment</p>
                </div>
            </div>
        </div>
    </div>
</section>
{/* <Instagram/> */}

        </>
    );
};

export default Home;
