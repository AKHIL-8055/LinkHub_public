import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import MyGroups from "./Components/mygroups";
import Groups from "./Components/Groups";
import AddGroup from "./Components/AddGroup";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import TermsAndPrivacy from "./Components/TermsAndPrivacy";
import About from "./Components/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/mygroups" element={<MyGroups />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Login />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/addgroup" element={<AddGroup />} />
        <Route path="/TermsAndPrivacy" element={<TermsAndPrivacy />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
