import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GameDetail from "./pages/GameDetail";
import CreateList from "./pages/createList";
import Lists from "./pages/Lists";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="games/:id" element={<GameDetail />} />
          <Route path="createList" element={<CreateList />} />
          <Route path="lists" element={<Lists />} />
          {/* Add pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
