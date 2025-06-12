import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GameDetail from "./pages/GameDetail";
import CreateList from "./pages/createList";
import Lists from "./pages/Lists";
import EditList from "./pages/EditList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="games/:id" element={<GameDetail />} />
          <Route path="createlist" element={<CreateList />} />
          <Route path="lists" element={<Lists />} />
          <Route path="/editlist" element={<EditList />} />
          {/* Add pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
