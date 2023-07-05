import React from 'react'
import ContenCards from './ContenCards'

const Collection = () => {
  return (
    <div>
    <ContenCards
     typeFetch={'/collection'}
    />
    </div>
  )
}

export default Collection