import React,{ useState } from 'react';
import {useNavigate} from 'react-router-dom';
const Register=()=> {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  async function registerUser(event) {
    const formdata={
      name,
      email,
      password
    }
    event.preventDefault()
    const response=await fetch('http://localhost:1337/api/register',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({formdata}),
    })
    const data=await response.json()
    if(data.status==='ok'){
      navigate('/login');
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          type='text'
          placeholder='Name'
        />
        <br/>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email'/>
        <br/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password'/>
        <br/>
        <input type='submit' value="register"/>
      </form>
      <input type="button" onClick={()=>{navigate('/login')}} value="Login"/>
      <input type="button" onClick={()=>{window.location.href='/'}} value="back"/>
    </div>
  );
}

export default Register;
