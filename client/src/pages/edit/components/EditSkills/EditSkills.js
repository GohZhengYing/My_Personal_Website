import React,{useState,useEffect} from 'react'
import './EditSkills.css'
import api from '../../../../api/api'
import Filebase from 'react-file-base64'
import Resizer from 'react-image-file-resizer'

function EditSkills(){
    //useState declaration
    const [editSkills,setEditSkills] = useState([])
    const [newSkill,setNewSkill] = useState({
        title:"",
        photo:""
    })
    const [apiRequest,setApiRequest] = useState(false)
    //useEffect declaration
    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/skill')
            setEditSkills(response.data)
        }
        fetchData()
        console.log("rendered skills")
        setApiRequest(false)
    },[apiRequest])
    //onchange handler
    function handleNewSkillChange(e){
        setNewSkill({...newSkill,title:e.target.value})
    }
    function handleEditSkillImageChange(id,image){
        try {
            Resizer.imageFileResizer(
                image,
                100,
                1000,
                "PNG",
                100,
                0,
                (uri) => {
                    console.log(uri.length)
                    setEditSkills(editSkills.map((skill)=>{
                        if(skill._id==id){
                            console.log(skill.photo.length)
                            return{...skill,photo:uri}
                        }
                        return skill
                    }))
                },
                "base64"
              );
        } catch (error) {
            console.log(error)
        }
    }
    function handleEditSkillsChange(e){
        setEditSkills(editSkills.map((skill)=>{
            if(skill._id==e.target.id){
                return{...skill,title:e.target.value}
            }
            return skill
        }))
    }
    //submit handler
    function handleNewSkillSubmit(e){
        async function postData(){
            const response = await api.post('/skill',newSkill,{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
        }
        postData()
        console.log("skill posted")
        setApiRequest(true)
    }
    //update handler
    function handleEditSkillUpdate(e){
        const {_id,photo,title} = editSkills.find((skill)=>skill._id==e.target.id)
        async function updateData(){
            const response = await api.patch('/skill',{_id,photo,title},{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
        }
        updateData()
        console.log("skill updated")
        setApiRequest(true)
    }
    //delete handler
    function handleEditSkillDelete(e){
        async function updateData(){
            const response = await api.delete('/skill',{data:{_id:e.target.id},
            headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }})
        }
        const yn = window.confirm("Are you sure?")
        if(yn)
        {updateData()
        console.log("skill deleted")
        setApiRequest(true)}
    }
    function handleImageSubmit(e){
        try {
            Resizer.imageFileResizer(
                e.target.files[0],
                17,
                100,
                "PNG",
                100,
                0,
                (uri) => {
                    console.log(uri.length)
                    setNewSkill({...newSkill,photo:uri})
                },
                "base64"
              );
        } catch (error) {
            console.log(error)
        }
    }
    return(<div className='edit_skills'>
        <div className='edit_skills_title'>
                <h1>Add new skill</h1>
            </div>
                <div className='edit_skill'>
                <img src={newSkill.photo}></img>
                <h3>{newSkill.title}</h3>
                </div>
                <div className='edit_skill'>
                <input type="file" accept="image/png, image/jpeg" onChange={handleImageSubmit}></input>
                <h3><input value={newSkill.title} onChange={handleNewSkillChange}></input></h3>
                <button onClick={handleNewSkillSubmit}>Submit</button>
                </div>
                <div className='edit_skills_title'>
                <h1>Current skills</h1>
                </div>
                <div className='edit_skills_icons'>
                {editSkills.map((skill)=>{
                    return(<div className='edit_skill' key={skill._id}>
                    <img id={skill._id} src={skill.photo} className="edit_skills_icon"></img>
                    <Filebase
                    type="file"
                    multiple={false}
                    onDone={({file})=>{handleEditSkillImageChange(skill._id,file)}}
                    />
                    <h3><input name="edit_skills_title" id={skill._id} value={skill.title} onChange={handleEditSkillsChange}></input></h3>
                    <button id={skill._id} onClick={handleEditSkillUpdate}>Update</button>
                    <button id={skill._id} onClick={handleEditSkillDelete}>Delete</button>
                    </div>)
                })}
               </div>
            <div className='edit_skills_title'>
                <h1>Display</h1>
            </div>
            <div className='edit_skills_icons'>
                {editSkills.map((skill)=>{
                    return(
                        <div className='edit_skill' key={skill._id}>
                        <img src={skill.photo}></img>
                        <h3>{skill.title}</h3>
                        </div>
                    )
                })}

                </div>
        </div>
    )
}

export default EditSkills