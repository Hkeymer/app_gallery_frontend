import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import SearchForm from './SearchForm'
import { AiOutlineMenu , AiOutlineClose} from 'react-icons/ai'
import { SiPhotopea } from 'react-icons/si'
import { pathRoute } from '../App'


const Navbar = () => {
  
     const [isOpen, setIsOpen] = useState(false)
 

     useEffect(() => {

     const handlesclose = ()=> setIsOpen(false)

       if(isOpen){
        setTimeout(()=>{
          document.addEventListener('click',handlesclose
           )},300)
       }

     return () => document.removeEventListener('click',handlesclose)

     }, [isOpen])
     

  return (
    <nav className='navbar_container'>
      <NavLink to={pathRoute}
      className='navbar_container_logo' 
      ><SiPhotopea fontSize={45}/> <span>photo</span></NavLink>
      <SearchForm/>
      <i className='navbar_container_menu'
         onClick={()=>setIsOpen(true)}
      >{ !isOpen?
        <AiOutlineMenu fontSize={28}/>:
        <AiOutlineClose  fontSize={28} color='#fff' />
      }  
      </i>
      <div className={isOpen?'navbar_container_menu_div':'navbar_translate'}>

        <div className='navbar_container_menu_liner'></div>
        <NavLink  to={pathRoute}>Home</NavLink>
        <NavLink  to={pathRoute+'/collection'}>Collection</NavLink>
        <div className='navbar_container_menu_liner'></div>
        <NavLink to={pathRoute+'/upload'}>Upload</NavLink>

       </div>
       <div className='navbar_container_div'>
        <NavLink className='navbar_container_div_link' to={pathRoute}>Home</NavLink>
        <NavLink className='navbar_container_div_link' to={pathRoute+'/collection'}>Collection</NavLink>
        <NavLink className='navbar_container_div_Upload' to={pathRoute+'/upload'} >Upload</NavLink>
       </div>
    </nav>
  )
}

export default Navbar

