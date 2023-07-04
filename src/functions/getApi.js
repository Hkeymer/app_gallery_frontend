export const base_url = 'https://appgalley.onrender.com/api'
// export const base_url = 'http://localhost:8000/api'

 const getApi = async (type) => {

    const get_api = type?type:'/images';

    return await fetch(base_url + get_api)
    .then(res=>res.json());

}


export default getApi;
