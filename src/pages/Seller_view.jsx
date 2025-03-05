import React,{useState,useEffect} from 'react'
const Seller_view=()=>{
    const [seller,setSeller]=useState('')
    const [products,setProducts]=useState([])
    async function deleteProduct(id){
        const  response=await fetch('http://localhost:1337/api/deleteProduct',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                id
            })
        })
        const data=await response.json()
        if(data.status==='ok'){
            alert('Product deleted')
            getdata()
        }
        else{
            alert(data.error)
        }
    }
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
            setProducts(data.products)
            localStorage.setItem('shopName',data.seller.shopName)
        }else{
            alert(data.error)
        }
    }

    useEffect(()=>{
        getdata()
    },[])
    return(
        <div>
            <h1>Hi Seller</h1>
            <ul>
                <li key={seller._id}>{seller.shopName} {seller.address}</li>
                
            </ul>
            <h2>Products</h2>
            <ul>
                {products.map(product=>(
                    <li key={product._id}>
                        {product.name} {product.price} {product.description}
                        <input type='button' onClick={()=>{deleteProduct(product._id)}} value='Delete Product'/>
                    </li>
                ))}
            </ul>
            <input type="button" onClick={()=>{window.location.href='/addProduct'}} value="Add Product"/>
            <input type="button"onClick={()=>{localStorage.removeItem('token');
                localStorage.removeItem('shopName');window.location.href='/login'}} value="logout"/>
        </div>
    )
}
export default Seller_view;