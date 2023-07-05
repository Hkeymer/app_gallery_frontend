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


export const pathRoute = "/photo"

function App() {

  return (
    <Provider store={store}>
    <Navbar/>
     <Routes>
      <Route path={pathRoute} element={<Home/>}/>
      <Route path={pathRoute+"/upload"} element={<Upload/>}/>
      <Route path={pathRoute+"/categoty/:name"} element={<ContenCategories/>}/>
      <Route path={pathRoute+"/collection"} element={<Collection/>}/>
      <Route path={pathRoute+"/search/images"} element={<ContenSearch/>}/>
    </Routes>
    </Provider>
  )
}

export default App
