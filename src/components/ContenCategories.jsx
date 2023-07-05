import ContenCards from './ContenCards'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathRoute } from '../App';



const ContenCategories = () => {
 

  const history = useNavigate()

  const {id_category} = useSelector(r=>r.reducerImage)

  useEffect(() => {

    if(id_category===null) history(pathRoute)

  }, [])
  

  return (
    <div>
     <ContenCards 
     typeFetch={`/category/${id_category}`}
     />
    </div>
  )
}

export default ContenCategories