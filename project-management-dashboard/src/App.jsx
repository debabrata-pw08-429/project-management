import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import ProjectList from "./components/ProjectList";
// import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        {/* <PrivateRoute exact path="/" element={Dashboard} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/projects/:id" element={<ProjectList />} />
      </Routes>
    </div>
  );
}

export default App;
