import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import { base_url } from '../functions/getApi'
import { useDispatch } from 'react-redux';
import { updateComponentAction } from '../redux/actions/actions';
import useModal from '../functions/useModal';
import Modal from './Modal';
import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Cards = ({id,path,collection , item}) => {

   const dispatch = useDispatch()


   const [ modal, openModal, closeModal ] = useModal()
   const ref_img_modal = useRef();

   const update_collection = ()=> {
      fetch(`${base_url}/update/collection/${id}/${!collection}`,{
      method:'PUT' })
      dispatch(updateComponentAction(true))
   }

    useEffect(() => {

       const handlesModal = (e)=>e.target !== ref_img_modal.current&&closeModal()

      if(modal) document.addEventListener('click',handlesModal);
    
      return () => document.removeEventListener('click',handlesModal);

    }, [modal])
    
    
    const hanclesClick = e => e.stopPropagation();
    

  return (
    <div className='cards_container'
    >  
     <img className='cards_container_img'
     ref={ref_img_modal}
     src={path}
     onClick={()=>console.log(id)}
     />
     <button className='cards_container_btn_fovo'
      onClick={()=>update_collection()}
        >
        {
        !collection?
        <MdOutlineFavoriteBorder color='#fff'/>:
        <MdOutlineFavorite color='#FF9EAA'/>
        }
     </button>
    
    <Modal  
     open={modal}
     closeModal={closeModal}
     >
      <div onClick={hanclesClick}>
      <img className='cards_container_modal_img' src={path} />
      <button className='modal_container_btn'
      onClick={closeModal} >
     <AiOutlineClose/>
    </button>
      </div>
    </Modal>
    </div>
  )
}

export default Cards