import { useState, useEffect} from 'react'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import getApi, { base_url } from '../functions/getApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const SearchForm = () => {

    const [isDisplay, setIsdisplay] = useState(false)
    const [text, setText] = useState('')
    const [data, setData] = useState([])
    const [historyData, setHistoryData] = useState([])
    const [searchdata, setSearchData] = useState({})


    const history = useNavigate()

    useEffect(() => {
      
      const get_data = async () =>{

          const data_categoty = await getApi('/categories')
          .then(data=>setData(data))

          const data_history = await getApi('/serach/history')
          .then(data=>setHistoryData(data))
  
       } 

      const handlesDisplay = () => setIsdisplay(false)

       if(isDisplay) document.addEventListener('click',handlesDisplay)

        get_data();

       
      return () => get_data() && document.removeEventListener('click',handlesDisplay)

    }, [isDisplay])
    

   const hadlesClick = e => {
    e.stopPropagation()
    setIsdisplay(true)
  }

   const hadlesChange = e => {

      const newText = e.target.value;

      setText(newText)
     
         getApi(`/serach/${newText}`)
         .then(data=>setSearchData((prev)=>({...prev,[newText]:{result:data}})))

   }

   const results = searchdata[text]?.result??[];
   
   const hadlesSubmit = e =>{
           e.preventDefault()
           setIsdisplay(false)
           const fil_data = historyData.filter(item=>item.name_search===text)

           if(text&&!fil_data[0]?.name_search){
            fetch(`${base_url}/serach/history/${text.toLocaleLowerCase()}`,{
               method:'POST'
            })
            history(`/search/images?query=${text}`);
            setIsdisplay(false)
         }
   }


const hadlesList = name =>{
         
           setIsdisplay(false)
           setText(name)

           const fil_data = historyData.filter(item=>item.name_search===name)

           if(!fil_data[0]?.name_search){
            fetch(`${base_url}/serach/history/${name}`,{
              method:'POST'
           })
           }
         history(`/search/images?query=${name}`)
}

const historyDelete = id => {
    fetch(`${base_url}/history/delete/${id}`,{method:'DELETE'})
}



  return (
    <form  
      onClick={hadlesClick}
      onSubmit={hadlesSubmit}
     className='searchForm_container'
     style={{border: isDisplay &&'1px solid #888'}}
     >
    <button
      style={ isDisplay ? {
          color: '#fff',
          width:0,
          padding:0,
          overflow:'hidden',
       }: undefined
    }
    >
    <BiSearch fontSize={19} color='#444'/>
    </button>
    <input  style={
     isDisplay ? {
        padding:'7px 30px'
     }:undefined
    }
     type="text"
     placeholder='Search photo'
     value={text}
     onChange={hadlesChange}
     onFocus={()=>setIsdisplay(true)}
     onBlur={()=>setTimeout(()=>setIsdisplay(false),300)}
     />
     <i style={{
      display:text?'flex':'none',
      marginRight:'15px',
     cursor:'pointer'}}
     onClick={()=>{
      setIsdisplay(false)
      setText('')
     } }
     >
      <AiOutlineClose fontSize={18} color='#333'/></i>
    <div className='searchForm_container_div'
     style={{display: isDisplay ? 'flex':'none'}}
     >
       
       {/*  D I V **** S E A R C H  */}
       <ul style={{display: text? 'flex':'none'}}>
       {results.map(item =><li
           onClick={()=>hadlesList(item.categotyNAME.toLocaleLowerCase())}
           key={item.categotyID}>
            {<p>{text.toLocaleLowerCase()}</p>}
          {item.categotyNAME.toLocaleLowerCase()}
          <BiSearch fontSize={18}/>
          </li>
       )}
       </ul>
       {/* D I V ****  H I S T O R Y */}
       <span>Search history</span>
       <div className='searchForm_container_div_history'>
       {historyData.map(item=><p to={`/search`}
        onClick={()=>hadlesList(item.name_search.toLocaleLowerCase())}
          key={item.id_search}>
         <BiSearch fontSize={16}/>
         {item.name_search} 
         <i onClick={(e)=>{
          e.stopPropagation()
          historyDelete(item.id_search)
         }
        }>
          <AiOutlineClose fontSize={14}/></i>
          </p>)}
       </div>
      
  {/* D I V **** C A T E G O R I E S */}
  <span>Collection</span>
  <div className='searchForm_container_div_categories' >
       {data.map(item=><p to={`/categoty/${item.categotyNAME}`}
          onClick={()=>hadlesList(item.categotyNAME.toLocaleLowerCase())}
        key={item.categotyID}>
        {item.categotyNAME}
        </p>)}
   </div>

    </div>
    </form>
  )
}

export default SearchForm