import React,{useState} from "react";
const Sregister=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    async function registerUser(event){
        event.preventDefault()
        const response=await fetch('http://localhost:1337/api/sregister',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                formdata:{
                    shopName:name,
                    email,
                    password,
                    phone,
                    address
                }
            })
        })
        const data=await response.json()
        if(data.status==='ok'){
            alert('Registration successful')
            window.location.href='/login'
        }else{
            alert(data.error)
        }
    }
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='Shop Name'/>
                <br/>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email'/>
                <br/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password'/>
                <br/>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='Phone'/>
                <br/>
                <input value={address} onChange={(e)=>setAddress(e.target.value)} type='text' placeholder='Address'/>
                <br/>
                <input type='submit' value='Register'/>
            </form>
            <input type="button" onClick={()=>{window.location.href='/login'}} value="Login"/>
            <input type="button" onClick={()=>{window.location.href='/'}} value="back"/>
        </div>
    )
}
export default Sregister;