import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../assets/img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center my-12 gap-3 bg-rowBg scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-300 min-w-[300px] h-[225px] md:w-340 md:min-w-[340px]: backdrop-blur-lg bg-cardOverlay rounded-lg my-12 p-2 hover:drop-shadow-xl flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between ">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item?.imageURL}
                  alt="image1"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => setItems([...cartItems, item])}
                className="w-8 h-8 rounded-full bg-red-600 justify-center cursor-pointer flex items-center hover:shadow-md"
              >
                <MdShoppingBasket className="text-white " />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold md:text-lg text-base ">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item?.calories}</p>
              <div className="flex items-center gap-8">
                <p className=" text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$ </span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="notfound" />
          <p className="text-xl text-headingColor font-semibold my-2 ">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
