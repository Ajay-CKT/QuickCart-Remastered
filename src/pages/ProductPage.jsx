import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/features/ProductsSlice";
import Rating from "../components/Rating";
import { addToCart } from "../redux/features/cartSlice";
import { useLoaderData } from "react-router-dom";

const ProductPage = () => {
  const [categories, setCategories] = useState("all");
  const [read, setRead] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const handleRead = () => {
    setRead(!read);
  };
  const products = useLoaderData();

  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.items);

  useEffect(() => {
    console.log(products);
    dispatch(setProducts(products));
  }, [products, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedToCart((prevState) => ({ ...prevState, [product.id]: true }));
  };

  return (
    <section className="bg-[hsl(11,48%,95%)] flex flex-col items-center py-4">
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
      <ul className="flex flex-wrap justify-center md:gap-4">
        {productsList
          .filter((product) =>
            categories === "all" ? true : product.category === categories
          )
          .map((product) => (
            <li
              key={product.id}
              className="relative flex flex-col justify-between mt-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96"
            >
              <div className="relative h-56 m-2.5 overflow-hidden rounded-md py-2 px-6 flex items-center justify-center hover:cursor-pointer">
                <img
                  src={product.image}
                  alt="card-image"
                  className="w-[65%] h-full"
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
              <div className="px-4 pb-4 pt-0 mt-2 flex justify-between font-['Inter']">
                <p>₹ {product.price}</p>
                <button
                  className={`font-['Poppins'] rounded-md py-2 px-4 text-center text-sm text-white hover:shadow-md ${
                    addedToCart[product.id]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#89023E] hover:bg-[#FFD9DA] hover:text-[#89023E] hover:border-[#89023E]"
                  }`}
                  disabled={!!addedToCart[product.id]}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedToCart[product.id] ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ProductPage;
