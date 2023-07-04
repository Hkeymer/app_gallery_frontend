import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import './styles/index.scss'
import Upload from "./components/Upload"
import ContenCategories from "./components/ContenCategories"
import { Provider } from 'react-redux'
import store from "./redux/store/store"
import Collection from "./components/Collection"
import ContenSearch from "./components/ContenSearch"


function App() {

  return (
    <Provider store={store}>
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/upload" element={<Upload/>}/>
      <Route path="/categoty/:name" element={<ContenCategories/>}/>
      <Route path="/collection" element={<Collection/>}/>
      <Route path="/search/images" element={<ContenSearch/>}/>
    </Routes>
    </Provider>
  )
}

export default App
