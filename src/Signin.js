import React,{useState ,useRef ,} from 'react'
import { useNavigate ,createSearchParams} from 'react-router-dom'

const obj={
    marginTop:"10%"
}
export default function Signin() 
{
    const [n,setn]=useState("")
    const email=useRef()
    const pass=useRef()
    const path=useNavigate()
    const handleSubmit=(e)=>
    {
        if(email.current.value!="" && pass.current.value!="" )
        {
            const keys=Object.keys(localStorage)
            if(keys.includes(email.current.value))
            {
                let password=JSON.parse(localStorage.getItem(email.current.value))
                if(password["pass"]===pass.current.value)
                {
                   setn(password["name"])
                   path({
                    pathname:'/posts',
                    search:createSearchParams({username:password["name"]}).toString(),
                    search:createSearchParams({userid:password["id"]}).toString()
                    
                   })
                }
                else
                {
                    alert("Wrong password")
                }
            }
            else
            {
                alert(" email not found")
        
            }
        }
        else{alert("Please fill All fields")}
        
        e.preventDefault();
    }
  return (
    <div>
        <div className='container-fluid bg-dark py-3'>
            <form className='form-group'>
                <label>
                    Email
                </label>
                <input className='form-control' type='email' placeholder='abc@gmail.com' ref={email}/>
                <label>
                    Password
                </label>
                <input className='form-control mb-3' type='password' placeholder='****' ref={pass}/>
                <button className='btn btn-primary'  onClick={handleSubmit}> Login </button>

                <button className='btn btn-primary ms-3' onClick={()=>{path("/Signup")}}>
                Signup
                </button>
            </form>
        </div>
    </div>
   
  )
}
