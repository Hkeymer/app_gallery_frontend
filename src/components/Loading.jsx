import {VscLoading} from 'react-icons/vsc'

const Loading = () => {
  return (
     <i 
     style={{ 
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'50px'
      }}
      >
     <VscLoading 
     className='loanding_spinn'
     fontSize={'4rem'}
     color='#22A699'
     />
    </i>
  )
}

export default Loading