import React,{useEffect,useState} from "react";
const Nearest=()=>{
    const [sellers,setSellers]=useState([]);
    const [mounted,setMounted]=useState(false);
    const [loading,setLoading]=useState(true);
    const [distance,setDistance]=useState(5);
    async function getdata(){
        try{
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const response=await fetch(`http://localhost:1337/api/nearest?latitude=${latitude}&longitude=${longitude}&distance=${distance}`,{
                    method:'GET',
                    headers:{
                        'x-access-token':localStorage.getItem('token'),
                    },
                });
                const data=await response.json();
                setLoading(false);
                if(data.status==='ok'){
                    setSellers(data.sellers);
                }else{
                    alert(data.error);
                }
            });
        } catch (error){
            console.error('Error fetching data:',error);
        }
    }
    useEffect(()=>{
        setMounted(true);
        getdata();
    },[]);

    return(
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-teal-200 p-6 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-green-300 opacity-30 animate-pulse"></div>
                <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-teal-300 opacity-30 animate-bounce"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-blue-300 opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-emerald-300 opacity-30 animate-ping"></div>
            </div>
            <div className={`max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-80
            ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
            transition-all duration-700 ease-out relative z-10`}>
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500">
                            Nearest Healthcare Providers
                        </h1>
                    </div>
                </div>
                <input type="number" placeholder="distance in km" className="border border-gray-300 rounded-lg p-2 mb-4 w-full" onChange={(e)=>setDistance(e.target.value)}/>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300" onClick={()=>getdata()}>Search</button>
                {loading && <div className="text-center text-lg text-gray-700">Loading...</div>}
                {!loading && sellers.length === 0 && <div className="text-center text-lg text-gray-700">No sellers found nearby</div>}
                {!loading && sellers.length > 0 &&(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sellers.map((seller) => (
                        <div key={seller._id} className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800">{seller.shopName}</h2>
                            <p className="text-gray-600">{seller.location.coordinates}</p>
                            <button onClick={()=>window.location.href=`/Uproduct/${seller.shopName}`}
                            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300">View Products</button>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}
export default Nearest;