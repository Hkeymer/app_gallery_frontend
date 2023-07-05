import React, { useEffect, useState,Suspense,lazy } from 'react'
import getApi from '../functions/getApi'
import { useDispatch, useSelector } from 'react-redux'
import { updateComponentAction } from '../redux/actions/actions'
import Categories from './Categories'
import { useNavigate } from 'react-router-dom'
import { pathRoute } from '../App'
const Cards = lazy(()=>import('./Cards'))


const ContenCards = ({typeFetch,text_description,textSearch}) => {

    const [data, setData] = useState([])
    const [noData, setNoData] = useState(false)
    const dispatch = useDispatch()
    const history = useNavigate()
    

    const { update_component } = useSelector(r=>r.reducerImage);

    useEffect(() => {

      const get_data =  ()=>{
       if(typeFetch){

        getApi(typeFetch)
        .then(data=>{
          if(data.length>0){
            setData(data) 
            setNoData(false)
          }
          else{
            setNoData(true)
          }
         })

       } else{

        getApi()
        .then(data=>{
           if(data.length>0){
            setData(data) 
            setNoData(false)
          }
           else{
             setNoData(true)
           }
          }
          )

       }
         dispatch(updateComponentAction(false))
      }
      
       get_data();
         
      return ()=> get_data()
  
    }, [typeFetch,update_component,noData])
    


  return (
    <div>
      {!noData?<div>
      <Categories text={text_description}/>
      <div className='contencards_container' >{
         data.map(item=>
         <Suspense  key={item.id} 
         fallback={<div className='contencards_container_lazy_loanding' > 
         <span>Loanding...</span>
         </div>}>
           <Cards
          path={'https://appgalley.onrender.com/'+item?.path}
          collection={item.collection}
          id={item.id}
          item={item}
         /> 
         </Suspense>   
         )}</div>
      </div>
     :<div className='contencards_noData'>
          <h1>Could not find results for "<span>{textSearch}</span>" .</h1>
          <h1>Try to refine your search.</h1>
          <button onClick={()=>history(pathRoute)}>Go to homepage</button>
         </div>
     }
    </div>
  )
}

export default ContenCards