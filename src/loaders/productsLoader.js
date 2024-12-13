import axios from "axios";

const productsLoader = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default productsLoader;
