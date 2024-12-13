import { useState } from "react";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [categories, setCategories] = useState("all");
  const [read, setRead] = useState(false);
  const handleRead = () => {
    setRead(!read);
  };
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  return cartItems.length === 0 ? (
    <>
      <div className="bg-[hsl(11,48%,95%)] flex flex-col items-center justify-start gap-10 h-[90vh] pt-32">
        <p className="font-['Quicksand'] text-xl">Cart is empty !</p>
        <Link to="/">
          <button className="font-['Poppins'] rounded-md bg-[#89023E] py-2 px-4 text-center text-sm text-white hover:shadow-md hover:bg-[#FFD9DA] hover:text-[#89023E] hover:border-[#89023E]">
            Go Back
          </button>
        </Link>
      </div>
    </>
  ) : (
    <section className="bg-[hsl(11,48%,95%)] flex flex-col-reverse md:flex-row items-start justify-between w-full py-4">
      <div className="flex flex-col items-center w-full md:w-[75%]">
        <div className="font-['Quicksand'] mt-2">
          <select
            name={categories}
            onChange={(e) => setCategories(e.target.value)}
            defaultValue={categories}
            id="category-select"
            className="rounded-md bg-[#FFD9DA] hover:bg-[#ffccce] text-center outline-none py-2 md:py-1 px-2 md:px-0 text-sm"
          >
            <option value="all">Select all category</option>
            <option value="men's clothing">Men&lsquo;s Clothings</option>
            <option value="women's clothing">Women&lsquo;s Clothings</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <ul className="flex flex-wrap justify-center gap-4 mt-4">
          {cartItems
            .filter((product) =>
              categories === "all" ? true : product.category === categories
            )
            .map((product) => (
              <li
                key={product.id}
                className="relative flex flex-col justify-between bg-white shadow-sm border border-slate-200 rounded-lg w-full md:w-72"
              >
                <div className="relative h-56 m-2.5 overflow-hidden rounded-md py-2 px-6 flex items-center justify-center hover:cursor-pointer">
                  <img
                    src={product.image}
                    alt="card-image"
                    className="w-[55%] md:w-[85%] h-full"
                  />
                </div>
                <div className="p-4">
                  <h6 className="mb-2 text-xl font-['Righteous'] hover:cursor-pointer hover:text-blue-800">
                    {product.title}
                  </h6>
                  <p
                    className="text-zinc-600 leading-normal text-sm font-light font-['Inter']"
                    onClick={handleRead}
                  >
                    {read
                      ? product.description
                      : product.description.slice(0, 99) + "..."}
                  </p>
                  <Rating
                    rate={product.rating.rate}
                    count={product.rating.count}
                    id={product.id}
                  />
                </div>
                <div className="px-4 pb-4 pt-0 mt-2 flex justify-between font-['Inter'] items-center">
                  <p>₹ {product.price}</p>
                  <div className="space-x-4 bg-[#89023E] flex justify-center items-center p-2 rounded-xl w-28 text-white">
                    <button
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                    >
                      -
                    </button>
                    <span className="font-['Inter'] bg-white px-2 rounded-lg text-center w-10 text-black">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQuantity(product.id))}
                    >
                      +
                    </button>
                  </div>
                  <div
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="absolute top-[-1px] right-[-1px] cursor-pointer w-6 h-6 bg-[#89023E] text-white rounded-full flex justify-center items-center"
                  >
                    X
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-full md:w-[25%] md:ml-4 mt-4 md:mt-0">
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
          <div>
            <h3 className="font-['Poppins'] text-lg font-semibold mb-4">
              Cart Summary
            </h3>
            <div className="flex justify-between text-sm font-['Inter']">
              <p>Total Items:</p>
              <p>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </p>
            </div>
            <div className="flex justify-between text-sm font-['Inter'] mt-2">
              <p>Total Amount:</p>
              <div className="flex gap-2">
                <p className="line-through">
                  ₹
                  {cartItems
                    .reduce((total, item) => total + item.totalPrice, 0)
                    .toFixed(2)}
                </p>
                <p>
                  ₹
                  {(
                    cartItems.reduce(
                      (total, item) => total + item.totalPrice,
                      0
                    ) * 0.9
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-xs text-right font-mono">
              <span className="text-red-600 font-semibold">10%</span> discount
              added
            </p>
          </div>
          <button
            className="bg-[#89023E] text-white rounded-full flex justify-center items-center py-2"
            onClick={() => alert("Redirecting to payment page...")}
          >
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
