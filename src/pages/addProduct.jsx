import React,{useEffect,useState} from 'react';
const Sproduct=()=>{
    const [name,setname]=useState('');
    const [price,setprice]=useState('');
    const [description,setdescription]=useState('');
    const shopName=localStorage.getItem('shopName')
    async function addProduct(event){
        event.preventDefault()
        const response=await fetch('http://localhost:1337/api/addproduct',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                name,
                price,
                description,
                seller:shopName
            })
        })
        const data=await response.json()
        if(data.status==='ok'){
            alert('Product added')
            window.location.href = '/Seller_view';
        }else{
            alert(data.error)
        }
    }
    return(
        <div>
            <form onSubmit={addProduct}>
                <input type='text' placeholder='Product Name' onChange={(e)=>setname(e.target.value)} required/><br/>
                <input type='number' placeholder='Price' onChange={(e)=>setprice(e.target.value)} required/><br/>
                <textarea placeholder='Description' onChange={(e)=>setdescription(e.target.value)} required/><br/>
                <button type='submit'>Add Product</button>
            </form>
        </div>
    )
}
export default Sproduct;