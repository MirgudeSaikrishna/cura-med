import React,{useState,useEffect} from 'react'
const Seller_view=()=>{
    const [seller,setSeller]=useState('')
    useEffect(()=>{
            async function getdata(){
                const response=await fetch('http://localhost:1337/api/S_view',{
                    method:'GET',
                    headers:{
                        'x-access-token':localStorage.getItem('token'),
                    },
                })
                const data=await response.json()
                if(data.status==='ok'){
                    setSeller(data.seller)
                }else{
                    alert(data.error)
                }
            }
            getdata()
        },[])
    return(
        <div>
            <h1>Hi Seller</h1>
            <ul>
                <li key={seller.id}>{seller.shopName} {seller.address}</li>
            </ul>
            <input type="button"onClick={()=>{localStorage.removeItem('token');window.location.href='/login'}} value="logout"/>
        </div>
    )
}
export default Seller_view;