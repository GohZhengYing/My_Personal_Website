import {React,useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import api from '../../../../api/api'
import './Contacts.css'

function Contacts(){
    const [contacts,setContacts] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/contact')
            setContacts(response.data)
        return response}
        fetchData()
    },[])
    return(
        <div className='contacts'>
            <div className='contacts_title'>
                <h1>My Contacts</h1>
            </div>    
            {!(contacts.length===0)?
                <div className='main_contacts'>
                {
                contacts.map((contact)=>{
                    let icon = contact.icon
                    if(!contact.icon){
                        icon = "fa fa-address-book"
                    }
                    return(
                        <a href={contact.url!=="#"? contact.url:null} key={contact._id} id={contact._id} target='_blank'>
                            <button className='contact' id={contact._id} key={contact._id}>
                                <i className={icon} id={contact._id} key={contact._id}></i> {contact.desc}
                            </button>
                        </a>
                    )
                })


            }
            </div>
            :<div className='progress'><CircularProgress /></div>}
        </div>
    )
}

export default Contacts