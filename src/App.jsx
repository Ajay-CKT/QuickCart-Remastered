import { createBrowserRouter, RouterProvider } from "react-router-dom";
import productsLoader from "./loaders/productsLoader";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { Provider } from "react-redux";
import store from "./redux/app/store";

const App = () => {
  const routes = [
    {
      path: "/",
      element: <HomePage />,

      children: [
        {
          path: "",
          element: <ProductPage />,
          loader: productsLoader,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
      ],

      hydrateFallbackElement: (
        <div className="flex justify-center items-center py-60">
          <div className=" w-48 h-48 border-4 border-[#89023E] border-t-transparent border-dotted rounded-full animate-spin"></div>
        </div>
      ),
    },
  ];
  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    },
  });
  return (
    <Provider store={store}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Provider>
  );
};

export default App;
