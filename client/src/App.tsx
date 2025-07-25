
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import  Sample from "./pages/Login"


function App() {
  return (
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/about" element={<Sample/>}/>
    <Route path="/orders" element={<HomePage/>}/>
    <Route path="/manageProducts" element={<HomePage/>}/>

    </Routes>
  )
}

export default App
