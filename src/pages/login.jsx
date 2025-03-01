import { useState } from 'react';
const Login=()=> {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [usertype,setUsertype]=useState('')
  async function loginUser(event) {
    event.preventDefault()
    const response=await fetch('http://localhost:1337/api/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        usertype,
        email,
        password
      }),
    })
    const data=await response.json()
    if(data.user){
      localStorage.setItem('token',data.user)
      alert('login successful')
      if(data.type==='seller'){
        window.location.href='/Seller_view'
      }
      else {
       window.location.href='/User_view'
      }
    }
    else{
      alert('Check credentials')
    }
  }
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={loginUser}>
        <label htmlFor='options' >User Type:</label>
        <select id="options" value={usertype} onChange={(e)=>setUsertype(e.target.value)}>
          <option value="">--select--</option>
          <option value="seller">Admin</option>
          <option value="User">User</option>
        </select>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email'/>
        <br/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password'/>
        <br/>
        <input type='submit' value="login"/>
      </form>
      <input type="button" onClick={()=>{window.location.href='/register'}} value="Register"/>
    </div>
  );
}

export default Login;
