import {useState} from 'react'

const useModal = (initialValue=false) => {

    const [modal, setModal] = useState(initialValue)

    const openModal = ()=> setModal(true)
    const closeModal = ()=> setModal(false)
       



    return [modal,openModal,closeModal]
}

export default useModal