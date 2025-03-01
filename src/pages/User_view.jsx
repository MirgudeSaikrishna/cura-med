import React,{useState,useEffect} from 'react'
const User_view=()=>{
    const [sellers,setSellers]=useState([])
    useEffect(()=>{
        async function getdata(){
            const response=await fetch('http://localhost:1337/api/U_view',{
                method:'GET',
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                },
            })
            const data=await response.json()
            if(data.status==='ok'){
                setSellers(data.sellers)
            }else{
                alert(data.error)
            }
        }
        getdata()
    },[])
    return(
        <div>
            <h1>Sellers</h1>
            <ul>
                {sellers.map(seller=><li key={seller.id}>{seller.shopName} {seller.email} {seller.phone} {seller.address}</li>)}
                <input type="button"onClick={()=>{localStorage.removeItem('token');window.location.href='/login'}} value="logout"/>
            </ul>
        </div>
    )
}
export default User_view;