import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import EpisodeDetailPage from "./pages/EpisodeDetailPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <CharactersPage /> },
      { path: "character/:id", element: <CharacterDetailPage /> },
      { path: "episode/:id", element: <EpisodeDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
