import React,{useState,useEffect} from 'react'
import api from '../../../../api/api'
import './EditContacts.css'

function EditContacts(){
    //useState declaration
    const [contacts,setContacts] = useState([])
    const [apiRequest,setApiRequest] = useState(false)
    const [newContact,setNewContact] = useState({
        url:"",
        desc:"",
        icon:""
    })
    //useEffect declaration
    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/contact')
            setContacts(response.data)
        return response}
        fetchData()
        setApiRequest(false)
        console.log("rendered contacts")
    },[apiRequest])
    //onchange handler
    function handleContactsChange(e){
        setContacts(contacts.map((contact)=>{
            if(contact._id==e.target.id)
        switch(e.target.name){
            case "url":return({...contact,url:e.target.value})
            case "desc":return({...contact,desc:e.target.value})
            case "icon":return({...contact,icon:e.target.value})
        }
        return contact
    }))
}
    function handleNewContactChange(e){
            switch(e.target.name){
                case "url":setNewContact({...newContact,url:e.target.value})
                break
                case "desc":setNewContact({...newContact,desc:e.target.value})
                break
                case "icon":setNewContact({...newContact,icon:e.target.value})
            }
    }
    //update handler
    function handleContactsUpdate(e){
        e.preventDefault()

        let contact = contacts.find((contact)=>contact._id==e.target.id)
        async function updateContact(){
            const response = await api.patch('/contact',contact,{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
        }
        updateContact()
        setApiRequest(true)
        console.log("contact updated")
    }
    //submit handler
    function handleNewContactSubmit(e){
        e.preventDefault()
        async function postContact(){
            const response = await api.post('/contact',newContact,{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
        }
        postContact()
        console.log("contact posted")
        setApiRequest(true)
        
    }
    //delete handler
    function handleContactsDelete(e){
        e.preventDefault()

        let contact = contacts.find((contact)=>contact._id==e.target.id)
        async function deleteContact(){
            const response = await api.delete('/contact',{data:{_id:contact._id},
            headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }})
        }
        const yn = window.confirm("Are you sure?")
        if(yn)
    {deleteContact()
        console.log("contact deleted")
        setApiRequest(true)}
    }
    return(
        <div className='edit_contacts'>
            <div className='edit_contacts_title'>
                <h1>Add new contact</h1>
            </div> 
            <div className='edit_contacts_title'>
                <form onSubmit={handleNewContactSubmit}>
                    <input name="url" value={newContact.url} onChange={handleNewContactChange}></input>
                    <input name="desc" value={newContact.desc} onChange={handleNewContactChange}></input>
                    <input name="icon" value={newContact.icon} onChange={handleNewContactChange}></input>
                    <button>Submit</button>
                </form>
                        <a href={`https:${newContact.url}`} key={newContact.id} target='_blank'><button className='edit_contact'>
                        <i className={newContact.icon}></i> {newContact.desc}
                    </button></a>

            <div className='edit_contacts_title'>
                <h1>Current contact</h1>
            </div>     
            <div className='edit_main_contacts'>
            {contacts.map((contact)=>{
                    let icon = contact.icon
                    if(!contact.icon){
                        icon = "fa fa-address-book"
                    }
                    return(
                        <form key={contact._id}>
                    <input id={contact._id} name="url" value={contact.url} onChange={handleContactsChange}></input>
                    <input id={contact._id} name="desc" value={contact.desc} onChange={handleContactsChange}></input>
                    <input id={contact._id} name="icon" value={contact.icon} onChange={handleContactsChange}></input>
                    <button onClick={handleContactsUpdate} id={contact._id}>Update</button>
                    <button onClick={handleContactsDelete} id={contact._id}>Delete</button>
                </form>
                    )
                })}
            </div>
                <h1>Display</h1>
            </div>    
            <div className='edit_main_contacts'>
                {
                contacts.map((contact)=>{
                    let icon = contact.icon
                    if(!contact.icon){
                        icon = "fa fa-address-book"
                    }
                    return(
                        <a href={contact.url} key={contact._id} target='_blank'><button className='edit_contact'>
                        <i className={icon}></i> {contact.desc}
                    </button></a>
                    )
                })}
            </div>
        </div>
    )
}

export default EditContacts