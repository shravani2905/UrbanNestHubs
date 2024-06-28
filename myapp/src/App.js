import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./Components/RootLayout/RootLayout";
import Home from "./Components/Home/Home";
import Buy from "./Components/Buy/Buy";
import Sell from "./Components/Sell/Sell";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import View from "./Components/View/View";
import "./App.css";
function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "buy",
          element: <Buy />,
        },
        {
          path: "sell",
          element: <Sell/>,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "view",
          element: <View />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
