import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Packages from "./routes/packages";
import PackageDetails from "./routes/PackageDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/packages" />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
