import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const [hovered, setHovered] = useState("");
  const handleMouseEnter = (cart) => setHovered(cart);
  const handleMouseLeave = () => setHovered("");

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  return (
    <header className="flex justify-between items-center py-4 pl-2 pr-4 border-b border-[#89023e]">
      <Link to="/">
        <div className="flex items-center gap-4">
          <img src="/quickCart.png" alt="" className="size-12" />
          <h1 className="text-3xl font-['Righteous'] text-[#89023E]">
            QuickCart
          </h1>
        </div>
      </Link>
      <Link to="/cart">
        <div className="flex justify-around items-center">
          <div
            className="social-media-btns relative"
            onMouseEnter={() => handleMouseEnter("cart")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hovered === "cart" ? "/cart.gif" : "/cart.png"}
              alt="Facebook"
              className="size-8"
            />
            <div className="absolute right-[-5px] top-0 bg-[#89023E] size-6 flex items-center justify-center text-white font-['Righteous'] rounded-full">
              <span className="text-sm">{cartCount}</span>
            </div>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
