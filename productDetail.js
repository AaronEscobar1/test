import ProductDetailCarousel from "../../components/productdetail/productDetailCarousel";
import LayoutCategories from "../../components/categorias/layoutCategories";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Button from '../../components/form/Button'
import { useRouter } from "next/router";

import styles from "../../styles/CarouselSmall.module.css";
import axios from "axios";
import AsyncSelect, { components } from "react-select/async";
import React, { useState } from "react";
import CART from "../../API/cart";
import Cookies from "js-cookie";
import PRODUCTS from "../../API/products";
import PRODS_CAT from "../../API/prodsByCat";
import CATEGORIES from "../../API/categories";
import Notification from '../../components/Notification'
import Loading from '../../components/Loading'


export default function ProductDetailPage({ products, product }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setValue] = useState("");
  const router = useRouter();

  const [aumentar, setCount] = useState(1);
  const [notification, set_notification] = useState([])
  const [loading_state, set_loading_state] = useState(false)

  const incrementCount = () => {
    setCount(aumentar + 1);
    console.log(aumentar);
  };

  const decrementCount = () => {
    aumentar >= 1 ? setCount(aumentar - 1) : console.log("no puede ser menor a 1 ");
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
    dropdownIndicator: () => ({
      // none of react-select's styles are passed to <Control />
    }),
  };

  const addToCart = (id) => {
    set_loading_state(true)
    let info = {
      data: { product: id, quantity: 1 },

      token: Cookies.get("accessToken"),
    };
    CART.add_product(info, function (response) {
      if (response == "added") {
        window.location.href = "/cart";
        Cookies.set('notify', true, {expires: new Date(new Date().getTime() + 5 * 1000)})
        set_loading_state(false)
      } else {
        set_loading_state(false)
        set_notification([{ status: 'warning', body: response, icon: 'error_outline' }])
      }
    });
  };

  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (value) => {
    console.log(value);
    router.push("/signup");
  };

  // handle selection
  const goToDetail = (id) => {
    router.push(`/products/productDetailGeneral?prodId=${id}`);
  };


  // load options using API call
  const loadOptions = async (inputValue) => {
    if (inputValue != "") {
      try {
        // Call the products by Category API
        const categories = await CATEGORIES.getCategoriesByName(inputValue).catch((error) => {
          throw new Error(error.message);
        });
        console.log("products", categories);
        return categories.data;
      } catch (error) {
        console.log(error);
      }
    }
    return [{ null: null }];
  };
  return (
    <LayoutCategories>
      {/* Navabar */}

      <div
        className="container-fluid"
        style={{ paddingTop: "80px", backgroundColor: "#1D9E96", width: "100%", height: "120px" }}
      >
        <div className="row">
          <div className="col-md-2 col-2 col-lg-2">
            <span
              className="material-icons p-2"
              style={{
                textAlign: "left",
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >

              <Link href={`/cart`} className="py-1">
                <a style={{ color: "white", fontSize: "18px", textDecoration: "none", textAlign: "left" }}>arrow_back </a>
              </Link>
            </span>
          </div>
          <div className="col-md-8 col-8 col-lg-8 text-center">
            <h3 style={{ color: "white" }}>Products Detail</h3>
          </div>
          <div className="col-md-2 col-2 col-lg-2"></div>
        </div>
      </div>

      {/* Search de Producto por categorias */}
      <div className="container-fluid" style={{ backgroundColor: "#5F5F5F", padding: "10px" }}>
        <div className="row">
          <div className="col-md-12 col-12 col-lg-12 align-items-center">
            <div>
              <AsyncSelect
                styles={customStyles}
                cacheOptions
                defaultOptions
                placeholder="Search category"
                value={selectedValue}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.name}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel de Produt Detail */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12 col-lg-4 text-center p-2 ">
              <ProductDetailCarousel products={products} />
            </div>

            <div className="d-lg-none text-start">
            <ProductDetailCarousel products={product} />
              <img src="/icons/heart-outlined.svg" height="20px" width="20px" />
            </div>
            <div className="col-md-12 col-12 col-lg-8 align-self-center">
              <div className="row">
                <div className="col-md-8 col-8 col-lg-8 text-start">
                  <ul style={{ listStyleType: "none", paddingTop: "10px" }}>
                    <li style={{ display: "inline-block" }}>
                      <span style={{ color: "#174481 ", fontSize: "15px" }}>PRICE</span>
                      <span style={{ fontSize: "20px" }}> ${product[0] && product[0].prices[0]}</span>
                    </li>
                    <li>
                      Product code: <span> {product[0] && product[0].sku}</span>{" "}
                    </li>
                    <li>
                      <span>Select color</span>
                    </li>
                    <li>
                      <ul style={{ listStyleType: "none" }}>
                        <li
                          style={{
                            content: "",
                            width: "15px",
                            height: "15px",
                            backgroundColor: "#02a2ca",
                            borderRadius: "50%",
                            border: "2px solid rgba(0, 0, 0, 0)",
                            transition: "0.3s all ease",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></li>
                        <li
                          style={{
                            content: "",
                            width: "15px",
                            height: "15px",
                            backgroundColor: "#000000",
                            borderRadius: "50%",
                            border: "2px solid rgba(0, 0, 0, 0)",
                            transition: "0.3s all ease",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></li>
                      </ul>{" "}
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 col-4 col-lg-4 text-center">
                  <span>Quantity</span>
                  <div className="btn-group btn-group-sm">
                    <a
                      onClick={decrementCount}
                      className="btn"
                      style={{ backgroundColor: "white" }}
                    >
                      <img
                        src="/icons/left-arrow.svg"
                        style={{ color: "#E78A0B", width: "20px", height: "20px" }}
                        className=""
                        alt=""
                      />
                    </a>
                    <span
                      className="btn btn-light "
                      style={{ fontsize: "18px", backgroundColor: "#babdbf" }}
                    >
                      {aumentar >= 1 ? aumentar : 1}
                    </span>
                    <a
                      onClick={incrementCount}
                      className="btn"
                      style={{ backgroundColor: "white" }}
                    >
                      <img
                        src="/icons/right-arrow.svg"
                        style={{ color: "#E78A0B", width: "22px", height: "20px" }}
                        className=""
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-md-6 col-lg-6 text-start"></div>
                <div className={`col-8 col-md-6 col-lg-6 btn text-end px-1 bottom-1`}>
                  <div
                    className="container text-center align-self-center"
                  >

                    <div className={styles.save}>
                      <Button onClick={() => addToCart(product[0] && product[0].id)}
                        style='default'
                        body=' Add to cart'
                        icon="shopping_cart"


                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr></hr>
      {/* Carousel de Produt Similar */}
      <section>
        <h3 style={{ fontSize: "20px", color: "#174481 " }}>SIMILAR PRODUCTS</h3>
      </section>

      <section style={{ marginBottom: "80px" }}>
        <div className="row">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 3,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable={false}
          >
            {products && products.map((product, index) => (
              <div
                key={product.id}
                className="card position-relative"
                style={{ borderRadius: "5px", width: "400px", padding: "5px", margin: "6px" }}
                onClick={() => goToDetail(product.id)}
              >
                <div className="row g-0">
                  <div
                    className="container"
                    style={{ padding: "1em", backgroundColor: "white", borderRadius: "2%" }}
                  >
                    <img
                      src={product.defaultImage}
                      alt=""
                      className="img-fluid "
                    // className={styles.image_productdes}
                    />
                  </div>
                </div>

                <div className="position-absolute top-3 end-3">
                  <h4 className={styles.item_price}>
                    ${product.prices && product.prices[0] != null ? product.prices[0] : 0}
                  </h4>
                </div>
                <div className="position-absolute bottom-0 start-50 translate-middle-y">
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>{product.name}</span>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      <Loading show={loading_state} />
      <Notification notification={notification}/>
    </LayoutCategories>
  );
}



ProductDetailPage.getInitialProps = async (ctx) => {
  try {

    const options = {
      method: 'GET',
      url: 'https://apisystem4exchange-dev.system4book.com/api/v1/orders',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzE4NDcxODEsImV4cCI6MTYzMTg1MDc4MSwicm9sZXMiOlsiUk9MRV9DVVNUT01FUiJdLCJlbWFpbCI6Imp1YW5Ac3lzdGVtNGJvb2suY29tIn0.V_-rCrfV3b4YFMTZcuDi6q124mTxajpbi0XJAuFGSAGF6YqjKEFXSnQLfnwYmL68a_Pt9pMsVh4Eo-0lMwmbhij-p654hILMg18YQmWpZ9xFN5NTODjHC73aJwkiwKkKcRKWmN8QHwisi4zp_fSgoZu0Iv-SJ056qkQfHp8CSQM-xljPtsqAEOPqo2ASF83siRocxcHTkjSzUGaHVaB6o4_4JiqL49q3DrYWza20UIR2qlcHoNDqUR8_tFkgUSEr0fZp-M3kADOOqsMHshdIK6emaecWkpWOI2fyMOeBfc2KRto7JZykTtD0We3IRNe6qEcgduSSzBHK0_syMQIczoqVsPPwoSjBpEWrranWrFzOsjjYaPB-_CA0avuL3AWme8wv7oOzZvpOV5YieRu4b4Nse74976HjVtd1GxC-wp6g3sav_e0lzs8vbNBkI6x_FzP1rdX9M9A2m9IlT5O5jxIkKbQsvAUF9m2JERTC_AE9uacAP2hBoVgbtwLiwNa47FbAzfOsFSAfgX1ADR8KJ0S8U1NOE4gtYlQsYPTnwuF-CYuAAQL3u1ZLDDO6m31vQLWeWoAI8C5ePClgBJgurQSZoBfXcsI1lE61Ps1FF5Cr2lODOFpBWnjVpBjxkCWErOyfmSzagrnJh049Ys6dJYlZbAMmN640iUxjDc8hd0Y'
      }
    };
    await axios.request(options).then(function (response) {
      console.log("dafadfa", response.data.data)
      return { orders: response.data.data };

    }).catch(function (error) {
      console.error(error);
    });


    const query = ctx.query;
    console.log("query ", query);
    const idProductDetail = parseInt(ctx.query.prodId);
    const idCategory = parseInt(ctx.query.catId);

    // Call the products by Category API
    const prods = await PRODS_CAT.getProductsByCat(idCategory).catch((error) => {
      throw new Error(error.message);
    });
    console.log("products", prods);

    const products = await PRODUCTS.get_products().catch((error) => console.log(error));
    const prodSelected = products.data.filter((item) => item.id === idProductDetail);

    return { products: prods.data, product: prodSelected };
  } catch (error) {
    console.log(error);
  }
};
