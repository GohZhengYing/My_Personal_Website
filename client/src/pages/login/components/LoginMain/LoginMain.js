import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../../../api/api'
import './LoginMain.css'

function LoginMain(){
    const [loginEntry,setLoginEntry] = useState({
        username:"",
        password:""
    })
    const [loginResponse,setLoginResponse] = useState("")

    let redirectsToEdit = useNavigate()

    useEffect(()=>{},[])
    //onchange handler
    function handleLoginEntryChange(e){
        setLoginResponse("")
        switch(e.target.name){
            case "username":setLoginEntry({...loginEntry,username:e.target.value})
            return
            case "password":setLoginEntry({...loginEntry,password:e.target.value})
        }
    }
    
    //login handler
    async function handleLogin(e){
        e.preventDefault()
        async function login(){
            const response = await api.post('/login',loginEntry)
            localStorage.setItem('token',response.data.token)
            if(response.data.loginSuccess)
            {console.log(response.data.msg)
            redirectsToEdit('/edit')}
            else{
                console.log(response.data.msg)
                setLoginResponse(response.data.msg)
            }
            
        }
        login()
        setLoginEntry({
            username:"",
            password:""
        })

    }
    
    return(<div>
                <div className='login_main_title'>
                    <h1>Login Page</h1>
                </div>
            <div className='login_main'>
                <div className='login_entry'>
                    <form>
                        <label>{loginResponse}</label>
                        <br></br>
                        <label name="username">Username</label>
                        <input name="username" value={loginEntry.username} onChange={handleLoginEntryChange}></input>
                        <br></br>
                        <label name="password">Password</label>
                        <input name="password" value={loginEntry.password} onChange={handleLoginEntryChange} type="password"></input>
                        <br></br>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginMain