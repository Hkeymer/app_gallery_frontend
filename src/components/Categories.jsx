import { useEffect, useState } from 'react'
import getApi from '../functions/getApi'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import { setIdCategoryAction } from '../redux/actions/actions'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import Loading from './Loading'



const Categories = ({text,isNoDisplay}) => {
     
    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
       
      const get = ()=> getApi('/categories')
        .then(data=>{
          setData(data)
          setIsloading(false)
           })

        get()
        
      return ()=> get();
        
    }, [])




   const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 7.5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
   };



   if(isloading) return <Loading/>;


  return (
    <div className='categories_container'>
      <div className='categories_container_div'
         style={{display:isNoDisplay&&'none'}}
        >
      <i className='categories_container_prevous' >
        <GrFormPrevious  fontSize={20}/>
      </i>
       <Slider
       className='categories_container_slider'
        {...settings}
       >
      {data.map(item=>
       <NavLink 
       className={({ isActive}) => isActive ? "isActive" : "link"}
       key={item.categotyID}
       onClick={()=>dispatch(setIdCategoryAction(item.categotyID))} 
       to={`/categoty/${item.categotyNAME}`}>
       {item.categotyNAME}
      </NavLink>
      )}
     </Slider>
      <i  className='categories_container_next'>
        <GrFormNext  fontSize={20} />
      </i>
      </div>
      <div className='categories_container_div_button'>
        <h1>{text}</h1>
      </div>
    </div>
  )
}

export default Categories