import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Explore from './Pages/Explore/Explore';
import Signin from './Pages/Signin/Signin';
import Navbar from './Component/Navbar/Navbar';
import Error from './Pages/Error/Error';

const Layout = () => {
  return (
    <div className='md:w-8/12 mx-auto'>
      <Navbar />
      <Outlet></Outlet>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signout",
        element: <Signin />
      }
    ]
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
