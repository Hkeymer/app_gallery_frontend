import { useEffect, useRef, useState } from 'react'
import getApi, { base_url } from '../functions/getApi';
import { ImUpload3 } from 'react-icons/im'
import { BsImages } from 'react-icons/bs'
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'



const Upload = () => {

//  create state;
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(false);
  const [view, setView] = useState('');
  const [title, setTitle] = useState('');
  const [exten, setExten] = useState(null);
  const [categories, setCategories] = useState([])
  const [optionValue, setOptionValue] = useState('')

 
  const selectedFile = e => {

        const file = e.target.files[0];

        // capturando la extension;
        const extension = file.name.split('.')[1];
        setExten(extension);

        if(file.type.substring(0,5)==='image'){
          setImage(file)
        }
         else{
           setFile(null)
         }

  }
   
  const hadlesSaveFile = () => {

      // ***** Formateando el archivo ***** //
        const formdata = new FormData()
        
        if(title){
          formdata.append('image',image,`${title}.${exten}`)
        } else{
           formdata.append('image',image)
        }
        if(optionValue) {
          formdata.append('id',optionValue.toString())
        }

        // post file;
        fetch(`${base_url}/images/post`,{
          method:'POST',
          body:formdata
        })
         
        setDisplay(false)
        
      // limpiando inputs;
        document.getElementById('file').value = '';
        document.getElementById('selectId').value = ''
        setFile(null);
        setTitle('');
  }


  useEffect(() => {
    

    window.scroll({top:0})


    if(image) {
      // reneder image;
    const render = new FileReader();

    render.onloadend = ()=> {
      setView(render.result.toString())
    }

    render.readAsDataURL(image)

  // get categories;
    getApi('/categories')
    .then(data=>setCategories(data))
     
  // displey box;
    setDisplay(true)
  
  }
    //  else{
    //      setView('')   
    //      document.getElementById('selectId').value = ''
    //  } 
      
  return ()=>  {
    setView('')
  }

  }, [image])
   
  
  
  return (
    <div className='upload_container' >
       <div className='upload_container_div'style={{background:display&&'#1111'}} >

      <section 
         className ={
          !display?
          'upload_container_boxPrimary':
          'noDisplay'
         }
        >
      <BsImages color='#aaa' fontSize={'5rem'}/>
       <button>  
       Upload image
      <input 
      accept='image/*'
      type='file'
      id='file'
      onChange={selectedFile}
      />
      </button>
      <span>or drag a file</span>
      </section>
      
      <section 
       className = {
         display?
        'upload_container_boxSecundary':
        'noDisplay'
       } >
        <img className='upload_container_boxSecundary_img' src={view}/>
        <form className='upload_container_boxSecundary_form'>
        <label >Titulo 
        <span>(opional)</span>
        </label>
        <input 
        onChange={e=>{
          setTitle(e.target.value)
        }}
        placeholder='Escribe un titulo'
        type="text"
        value={title}
         />

        <label >Category <span>(opional)</span></label>
        <div className='caja'>
        <select defaultValue=''
        id='selectId'
        onChange={e=>setOptionValue(e.target.value)}
        >
          <option style={{color:'#aaaa'}}
            value=''>Select an option</option>
        {
          categories.map(item=>(
          <option 
          key={item.categotyID}
          value={item.categotyID}
          >
           {item.categotyNAME}
          </option>
          ))
        }
        </select>
        <i>
        <BiChevronDown 
         fontSize={18}
         color='#444'
        /></i>
        </div>
      
        </form> 
      
      </section>  
      <section className={display?'upload_container_setionSumit':'noDisplay'} >
         <button  
        type='button'
        onClick={hadlesSaveFile} >
         Save image
        </button>
      </section>
    </div>  
    <button  className={display?'upload_container_btnDelte':'noDisplay'}
    onClick={()=>{
      setDisplay(false)
      document.getElementById('selectId').value = ''
        }
      } >
        <AiFillDelete />
       </button>
    </div>

  )
}

export default Upload