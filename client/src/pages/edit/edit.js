
import EditProjects from './components/EditProjects/EditProjects';
import EditContacts from './components/EditContacts/EditContacts';
import EditMainPicture from './components/EditMainPicture/EditMainPicture';
import EditSkills from './components/EditSkills/EditSkills';
import React, { useState ,useEffect} from 'react'
import api from '../../api/api'

function Edit(){
  const [editReturn,setEditReturn] = useState(<h1>Access Denied</h1>)
  const [auth,setAuth] = useState(false)
    async function authenticate(){
      const token = localStorage.getItem('token')
      const response = await api.get('/login',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
      if(response.data.msg=="Successful")
      return true
      else
      return false
    }
  useEffect(()=>{
    if(auth)
{    setEditReturn(        
    <>
      <EditMainPicture/>
      <EditSkills/>
      <EditProjects/>
      <EditContacts/>
        </>)}
  },[auth])
  authenticate().then((res)=>setAuth(res))

return(
  editReturn
)
}

export default Edit