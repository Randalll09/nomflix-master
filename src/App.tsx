import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { path: '', element: <Home /> },
      { path: '/tv', element: <Tv /> },
      { path: '/search', element: <Search /> },
      { path: '/movies/:id', element: <Home /> },
    ],
  },
]);

const queryCLient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryCLient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
