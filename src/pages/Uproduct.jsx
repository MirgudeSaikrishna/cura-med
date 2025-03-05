import React,{useEffect,useState} from 'react';
const Uproduct=()=> {
    const [products,setProducts]=useState([]);
    const shopName=localStorage.getItem('shopName');
    useEffect(()=>{
        async function getProducts(){
            const response=await fetch('http://localhost:1337/api/products',{
                method:'GET',
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'shop-name':shopName,
                },
            })
            const data=await response.json()
            if(data.status==='ok'){
                if(data.products.length==0){
                    alert('No products found')
                }
                setProducts(data.products)
            }else{
                alert(data.error)
            }
        }
        getProducts()
    },[shopName])
    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product,index)=>(
                    <li key={product._id}>{product.name} {product.price} {product.description}</li>
                ))}
            </ul>
            <input type="button" onClick={()=>{localStorage.removeItem('shopName');window.location.href='/User_view'}} value="Back"/>
        </div>
    );
}
export default Uproduct;