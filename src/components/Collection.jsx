import React from 'react'
import ContenCards from './ContenCards'
import Categories from './Categories'

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