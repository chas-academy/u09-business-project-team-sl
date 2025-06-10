import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import CreateList from "./pages/createList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="createList" element={<CreateList />} />
          {/* Add pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
