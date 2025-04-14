import React,{useEffect,useState} from 'react';
const Uproduct=()=> {
    const [products,setProducts]=useState([]);
    const shopName=localStorage.getItem('shopName');
    const [currentPage,setCurrentPage]=useState(1);
    const [currentProducts,setCurrentProducts]=useState([]);
    const [productsPerPage]=useState(3);
    const [searchdata,setSearchdata]=useState('');
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
    function searchProducts(searchdata){
        searchdata=searchdata.toLowerCase();
        return function(product){
            return product.name.toLowerCase().includes(searchdata)||!searchdata;
        }
    }
    useEffect(()=>{
        const filteredProducts = products.filter(searchProducts(searchdata));
        const lastPostIndex=currentPage*productsPerPage;
        const firstPostIndex=lastPostIndex-productsPerPage;
        setCurrentProducts(filteredProducts.slice(firstPostIndex,lastPostIndex));
    },[currentPage,products, searchdata])
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(products.length/productsPerPage);i++){
        pageNumbers.push(i);
    }
    return (
        <div>
            <h1>Products</h1>
            <input type="text" value={searchdata} onChange={(e)=>setSearchdata(e.target.value)} placeholder="Search"/>
            <ul>
                {currentProducts.map((product,index)=>(
                    
                    <li key={product._id}>
                        {product.image && (
                        <img
                        src={`http://localhost:1337${product.image}`}
                        alt={product.name}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                        )}{product.name} {product.price} {product.description}</li>
                ))}
            </ul>
            <div>{ pageNumbers.map((number)=>(
                <button key={number} onClick={()=>setCurrentPage(number)}>{number}</button>))
            }</div>
            <input type="button" onClick={()=>{localStorage.removeItem('shopName');window.location.href='/User_view'}} value="Back"/>
        </div>
    );
}
export default Uproduct;