import React from 'react';
import Home from './pages/Home.jsx'
import Error from './pages/Error.jsx'
import Layout from './components/partials/Layout.jsx'
import Artists from './pages/Artists.jsx'
import ArtistDetails from './pages/ArtistDetails.jsx'
import Albums from './pages/Albums.jsx'
import AlbumDetails from './pages/AlbumDetails.jsx'
import History from './pages/History.jsx'
import AlbumsFromArtist from './pages/AlbumsFromArtist.jsx'
import GenreDetails from './pages/GenreDetails.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Search from './pages/Search.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestButton from "./pages/Test.jsx";

function App() {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout>
        <Home />
      </Layout>,
    },
    {
      path: "/search",
      element: <Layout>
        <Search />
      </Layout>,
    },
    
    {
      path: "/history",
      element: <Layout>
        <History />
      </Layout>,
    },

    {
      path: "/get-all/artists",
      element: <Layout>
        <Artists /> {/* this is a child of layout*/}
      </Layout>,
    },

    {
      path: "/get-one/artist/:id",
      element: <Layout>
        <ArtistDetails />
      </Layout>,
    },

    {
      path: "/get-all/albums",
      element: <Layout>
        <Albums />
      </Layout>,
    },

    {
      path: "/get-one/album/:id",
      element: <Layout>
        <AlbumDetails />
      </Layout>,
    },

    {
      path: "/get-albums/artist/:id",
      element: <Layout>
        <AlbumsFromArtist />
      </Layout>,
    },
    {
      path: "/get-one/genre/:id",
      element: <Layout>
        <GenreDetails />
      </Layout>,
    },
    {
      path: "/test",
      element: <Layout>
        <TestButton />
      </Layout>,
    }, {
      path: "*",
      element: <Layout>
        <Error />
      </Layout>,
    }

  ]);

  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
  </QueryClientProvider>
}

export default App
