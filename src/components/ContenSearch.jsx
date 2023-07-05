import React from 'react'
import { useLocation } from 'react-router-dom'
import ContenCards from './ContenCards';

const useQuery = () => new URLSearchParams(useLocation().search);

const ContenSearch = () => {

    const search = useQuery().get('query')


  return (
    <div>
      <ContenCards
       typeFetch={`/search/images/${search}`} 
       textSearch={search}
       />
   </div>
  )
}

export default ContenSearch