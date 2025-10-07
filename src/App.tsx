import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <header className="border-b bg-white sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold">
              Rick & Morty Explorer
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
