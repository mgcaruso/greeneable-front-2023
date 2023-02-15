import React from "react";
import "../styles/products.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productsActions from "../redux/actions/productsActions";
import Product from "../components/Product";
import Checkbox from "@mui/material/Checkbox";
import { RiLeafFill } from "react-icons/ri";
import { RiLeafLine } from "react-icons/ri";

export default function Products() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);
  const [input, setInput] = useState("");
  const [buttonRadio, setbuttonRadio] = useState("");
  const [orderSort, setorderSort] = useState("");
  const [catProducts, setCatProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sustainableRank, setSustainableRank] = useState("");

  const [firstLeaf, setFirstLeaf] = useState(false);
  const [secondLeaf, setSecondLeaf] = useState(false);
  const [thirdLeaf, setThirdLeaf] = useState(false);
  const [fourthLeaf, setFourthLeaf] = useState(false);
  const [fifthLeaf, setFifthLeaf] = useState(false);
  const [noLeaf, setNoLeaf] = useState(true);

  // const [asdProducts, setAsdProducts] = useState();
  // console.log(cart);
  const categories = new Set(catProducts.map((cat) => cat.category));
  // console.log(orderSort);
  const arrayCategories = [...categories];
  console.log(sustainableRank);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsActions.getProducts()).then((res) =>
      setCatProducts(res.data.response)
    );
  }, []);

  useEffect(() => {
    dispatch(
      productsActions.filterProducts(
        input,
        buttonRadio,
        orderSort,
        sustainableRank
      )
    );
  }, [input, buttonRadio, orderSort, sustainableRank]);

  let products = useSelector((store) => store.productsReducer?.filterProducts);


  return (
    <div className="p-0 mr-0 flex flex-col items-center min-h-[100vh]">
      <div className="upper-box bgInputs gap-2 w-full flex flex-col sm:flex-row justify-center m-0 p-4 px-5 container-box bg-slate-100 sticky items-center sm:justify-around ">
        <div className="input-search">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="min-w-[18rem] block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by product..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <div className="order">
          <label className="mx-2" htmlFor="order"></label>
          <select
            onChange={(e) => setorderSort(e.target.value)}
            name="order"
            className="bg-white border-2 rounded-t-md p-2"
            id="order"
          >
            <option value={false}>Sort by</option>
            <option value="as-name">Ascending name</option>
            <option value="des-name">Descending name</option>
            <option value="high-price">Higher price</option>
            <option value="low-price">Lower price</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col pt-5">
          <div className="flex gap-2 sm:gap-5 w-full">
            <label
              htmlFor="leaf"
              className="flex translate-y-1 items-center cursor-pointer"
            >
              {noLeaf ? (
                <RiLeafFill style={{ color: "grey", fontSize: "35px" }} />
              ) : (
                <RiLeafLine style={{ color: "grey", fontSize: "35px" }} />
              )}
              <input
                className="hidden"
                name="leaf"
                type="radio"
                id="leaf"
                value=""
                onChange={(e) => {
                  setFirstLeaf(false);
                  setSecondLeaf(false);
                  setThirdLeaf(false);
                  setFourthLeaf(false);
                  setFifthLeaf(false);
                  setNoLeaf(e.target.checked);
                  setSustainableRank(e.target.value);
                }}
                // icon={<RiLeafLine style={{ color: "green", fontSize: "28px" }} />}
                // checkedIcon={
                //   <RiLeafFill style={{ color: "green", fontSize: "28px" }} />
                // }
              />
            </label>
            <label htmlFor="leaf1" className="translate-y-1 cursor-pointer">
              {firstLeaf ||
              secondLeaf ||
              thirdLeaf ||
              fourthLeaf ||
              fifthLeaf ? (
                <RiLeafFill style={{ color: "green", fontSize: "35px" }} />
              ) : (
                <RiLeafLine style={{ color: "green", fontSize: "35px" }} />
              )}
              <input
                className="hidden"
                name="leaf"
                type="radio"
                id="leaf1"
                value="leaf1"
                onChange={(e) => {
                  setNoLeaf(false);
                  setSecondLeaf(false);
                  setThirdLeaf(false);
                  setFourthLeaf(false);
                  setFifthLeaf(false);
                  setFirstLeaf(e.target.checked);
                  setSustainableRank(e.target.value);
                }}
              />
            </label>
            <label htmlFor="leaf2" className="translate-y-1 cursor-pointer">
              {secondLeaf || thirdLeaf || fourthLeaf || fifthLeaf ? (
                <RiLeafFill style={{ color: "green", fontSize: "35px" }} />
              ) : (
                <RiLeafLine style={{ color: "green", fontSize: "35px" }} />
              )}
              <input
                className="hidden"
                name="leaf"
                type="radio"
                id="leaf2"
                value="leaf2"
                onChange={(e) => {
                  setNoLeaf(false);
                  setThirdLeaf(false);
                  setFourthLeaf(false);
                  setFifthLeaf(false);
                  setSecondLeaf(e.target.checked);
                  setSustainableRank(e.target.value);
                }}
              />
            </label>
            <label htmlFor="leaf3" className="translate-y-1 cursor-pointer">
              {thirdLeaf || fourthLeaf || fifthLeaf ? (
                <RiLeafFill style={{ color: "green", fontSize: "35px" }} />
              ) : (
                <RiLeafLine style={{ color: "green", fontSize: "35px" }} />
              )}
              <input
                className="hidden"
                name="leaf"
                type="radio"
                id="leaf3"
                value="leaf3"
                onChange={(e) => {
                  setNoLeaf(false);
                  setFourthLeaf(false);
                  setFifthLeaf(false);
                  setThirdLeaf(e.target.checked);
                  setSustainableRank(e.target.value);
                }}
              />
            </label>
            <label htmlFor="leaf4" className="translate-y-1 cursor-pointer">
              {fourthLeaf || fifthLeaf ? (
                <RiLeafFill style={{ color: "green", fontSize: "35px" }} />
              ) : (
                <RiLeafLine style={{ color: "green", fontSize: "35px" }} />
              )}
              <input
                className="hidden"
                name="leaf"
                type="radio"
                id="leaf4"
                value="leaf4"
                onChange={(e) => {
                  setNoLeaf(false);
                  setFifthLeaf(false);
                  setFourthLeaf(e.target.checked);
                  setSustainableRank(e.target.value);
                }}
              />
            </label>
            <label htmlFor="leaf5" className="translate-y-1 cursor-pointer">
              {fifthLeaf ? (
                <RiLeafFill style={{ color: "green", fontSize: "35px" }} />
              ) : (
                <RiLeafLine style={{ color: "green", fontSize: "35px" }} />
              )}
              <input
                className="hidden"
                name="leaf"
                type="radio"
                id="leaf5"
                value="leaf5"
                onChange={(e) => {
                  setNoLeaf(false);
                  setFifthLeaf(e.target.checked);
                  setSustainableRank(e.target.value);
                }}
              />
            </label>
          </div>
          <div className=" rounded-b-lg">
            <p className="text-center p-1">Sort by sustentability</p>
          </div>
        </div>
      </div>

      <div className="bg-white my-5 gap-1 w-11/12 sm:w-[95%] justify-center px-5 sm:justify-center flex md:gap-5 lg:gap-15 flex-wrap">
        <label className="items-center flex gap-2">
          <input type="radio" name="asd" onClick={() => setbuttonRadio("")} />
          All categories
        </label>

        {arrayCategories.map((cat, i) => {
          return (
            <label key={i} className="flex gap-2 items-center">
              <input
                type="radio"
                name="asd"
                value={cat}
                onClick={(ev) => setbuttonRadio(ev.target.value)}
              />
              {cat}
            </label>
          );
        })}
      </div>
      <div className="productList">
        {products && products?.length > 0 ? (
          products?.map((product) => {
            return (
              <Product product={product} key={product._id} setCart={setCart} />
            );
          })
        ) : (
          <div className="notResult">
            <p>
              Sadly, we can't find any products to match your query. Try
              broadening your search!
            </p>
            <img
              src="https://i.ibb.co/pZLvF6D/planet.png"
              alt="planet"
              border="0"
              className="planet"
            />
          </div>
        )}
      </div>
    </div>
  );
}
