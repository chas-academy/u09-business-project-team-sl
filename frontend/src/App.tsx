import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import CreateList from "./pages/createList";
import Register from "./pages/Register";
import GameDetail from "./pages/GameDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="createList" element={<CreateList />} />
          <Route path="register" element={<Register />} />
          <Route path="games/:id" element={<GameDetail />} />
          {/* Add pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
