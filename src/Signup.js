import React, { useState ,useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props)
 {
    const email=useRef()
    const name=useRef()
    const pass=useRef()
    const [userid,setId]=useState(11)
    const path=useNavigate()
    let obj=
    {
         
    }
    let localkeys=Object.keys(localStorage)
    for(let a=0;a<localkeys.length;a++)
    {
      if(localkeys[a].includes('@'))
      {
        obj[localkeys[a]]=JSON.parse(localStorage.getItem(localkeys[a]))
      }
      
    }
    const handleSubmit=(e)=>
    {

        if(email.current.value!="" && name.current.value!="" && pass.current.value!="")
        {
            if(email.current.value.includes('@'))
            {
                let keys=[];
                for(let a in obj)
                {
                    keys.push(a)
                }
                console.log("keys",keys);
                if(keys.includes(email.current.value))
                {
                    alert("This Email Already Exists..Enter a new email")
                }
                else
                {
                    let temp=userid
                    temp++
                    console.log("tempid",temp)
                    setId(temp)
                    let em=email.current.value
                    obj[em]={}
                    obj[em]["id"]=userid
                    obj[em]["name"]=name.current.value;
                    obj[em]["email"]=email.current.value;
                    obj[em]["pass"]=pass.current.value;
                    localStorage.setItem(em,JSON.stringify(obj[email.current.value]))
                    alert("Congratulations You have successfully registered")
                    console.log("obj",obj)
                }
            }
            else{alert("email is not valid.Please enter a valid email that includes @ ")}
            
        }
        else{alert("Please fill all fields")}
    e.preventDefault()
       
    }
  return (
    <div>
    <div className='container-fluid bg-dark py-3'>
   <form className='form-group'>
        <label>
           Name
       </label>
       <input className='form-control' type='text' placeholder='' ref={name}/>
       <label>
           Email
       </label>
       <input className='form-control' type='email' placeholder='abc@gmail.com' ref={email}/>
       <label>
           Password
       </label>
       <input className='form-control mb-3' type='password' placeholder='****' ref={pass}/>
       <button className='btn btn-primary' type='submit' onClick={handleSubmit}> Register </button>
       <button className='btn btn-primary ms-3' onClick={()=>{path("/Signin")}}>
       Already had an account..Sign in
   </button>
   </form>
</div>
</div>

  )
}
