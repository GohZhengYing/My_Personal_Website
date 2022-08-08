import React,{useState,useEffect} from 'react'
import api from '../../../../api/api'
import './EditProjects.css'
import FileBase from 'react-file-base64'
import Resizer from 'react-image-file-resizer'

function EditProjects(){
    //uesState declaration
    const [projects,setProjects] = useState([])
    const [newProject,setNewProject] = useState({
        title:"",
        desc:"",
        photo:""
    })
    const [apiRequest,setApiRequest] = useState(false)
    const [skills,setSkills] = useState([])

    //useEffect declaration
    useEffect(()=>{
        async function fetchData(){
            let response = await api.get('/project')
            let skillfetch = await api.get('/skill')
            setSkills(skillfetch.data)
            setProjects(response.data.map((project)=>{return{...project,choosenImage:null}}))
        return response}
        fetchData()
        setApiRequest(false)
        console.log("rendered projects")
    },[apiRequest])
    //onChange handlers
    function handleProjectsChange(e){
        setProjects(projects.map((project)=>{
            if(project._id.toString()==e.target.id)
            switch(e.target.name){
                case "title":return({...project,title:e.target.value})
                case "desc":return({...project,desc:e.target.value})
                case "photo":return({...project,choosenImage:e.target.value})
            }
            return project
        }))
    }
    function handleProjectsChoosenImage(id,image){
        setProjects(projects.map((project)=>{
            if(project._id.toString()==id)

                return({...project,choosenImage:image})
            
            return project
        }))
    }
    function handleNewProjectChange(e){

        switch(e.target.name){
            case "title":setNewProject({...newProject,title:e.target.value})
            break
            case "desc":setNewProject({...newProject,desc:e.target.value})
            break
            case "photo":setNewProject({...newProject,photo:e.target.value})
        }
        
    }
    //update handler
    function handleProjectsUpdate(e){
        e.preventDefault()
        const project = projects.find((project)=>project._id==e.target[0].id)
        const title = project.title
        const desc = project.desc
        const photo = project.choosenImage || project.photo
        let skillsUpdate = []
        for(let i=0;i<e.target.length;i++){
            if(i>4){
                if(e.target[i].checked)
                skillsUpdate.push(e.target[i].value)
            }
        }
        async function updateData(){
            const response = await api.patch('/project',{_id:e.target.id,title,desc,photo,skills:skillsUpdate},{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
        }
        updateData()
        console.log("project updated")

        setApiRequest(true)
    }
    //Sumbit handlers
    function handleNewProjectSubmit(e){
        e.preventDefault()
        const title = e.target[0].value
        const desc = e.target[1].value
        const photo = newProject.photo
        let skillsSubmit = []
        for(let i=0;i<e.target.length;i++){
            if(i>3){
                if(e.target[i].checked)
                skillsSubmit.push(e.target[i].value)
            }
        }
        async function postData(){
                const response = await api.post('/project',{key:e.target.id,title,desc,photo,skills:skillsSubmit},{
                    headers:{
                      Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                  })
                console.log("project posted")
        }
        postData()
        setApiRequest(true)

    }
    //delete handler
    function handleProjectsDelete(e){
        e.preventDefault()
        const yn = window.confirm("Are you sure?")
        console.log(e.target.id)
        if(yn)
        {async function deleteData(){
            const response = await api.delete('/project',{ data:{_id:e.target.id},
                headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }}
              )
        }
        deleteData()
        console.log("deleted")
        setApiRequest(true)}
    }
    function handleImageSubmit(e){
        try {
            Resizer.imageFileResizer(
                e.target.files[0],
                300,
                1000,
                "JPEG",
                80,
                0,
                (uri) => {
                    console.log(uri.length)
                    setNewProject({...newProject,photo:uri})
                },
                "base64"
              );
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className='edit_projects'>
                <div className='edit_project_title'>
                    <h1 >Add new Project</h1>
                </div>
                <div className='edit_project' >
            <div className='edit_image_section'>
                <div className='edit_image_wrap'>
                <img src={newProject.photo}/>
                </div>
            </div>
            
            <div className='edit_description_section'>
            <form onSubmit={handleNewProjectSubmit}>
                    <input name="title" type='text' value={newProject.title} onChange={handleNewProjectChange}></input>
                    <textarea name="desc" value={newProject.desc} cols="100" rows="8" onChange={handleNewProjectChange}></textarea>
                    <div>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleImageSubmit}></input>

                    </div>
                    <button>Submit</button>
                    <div className='edit_project_select'>
                        {skills.map((skill)=>{
                            return(
                                <span key={skill._id}><input type='checkbox' name={skill.title} value={skill.title}></input>{skill.title}</span>
                            )
                        })}
                    </div>
            </form>
            </div>
        </div>
        <div className='edit_project_title'>
                    <h1 >Current Projects</h1>
                </div>
                {projects.map((project)=>{
        return(<div className='edit_project' key={project._id}>
            <div className='edit_image_section'>
                <div className='edit_image_wrap'>
                <img src={project.photo}></img>
                <img src={project.choosenImage}/>
                </div>
            </div>
            
            <div className='edit_description_section'>
            <form id={project._id} onSubmit={handleProjectsUpdate}>

                    <input name="title" id={project._id} placeholder={project.title} type='text' value={project.title} onChange={handleProjectsChange}></input>
                    <textarea name="desc" id={project._id} placeholder={project.desc} value={project.desc} cols="100" rows="8" onChange={handleProjectsChange}></textarea>
                    <div>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone={({base64})=>{handleProjectsChoosenImage(project._id.toString(),base64)}}
                        />
                    </div>
                    <button id={project._id.toString()}>Update</button>
                    <button onClick={handleProjectsDelete} id={project._id.toString()}>Delete</button>
                    <div className='edit_project_select'>
                        {skills.map((skill)=>{
                            return(
                                <span key={skill._id}><input type='checkbox' name={skill.title} value={skill.title}></input>{skill.title}</span>
                            )
                        })}
                    </div>
            </form>
            </div>
        </div>)
    })}
            <div className='edit_project_title'>
            <h1>Display</h1>
            </div>
            <div className='edit_projects_wrap_display'>
            {projects.map((project)=>{
        return(<div className='edit_project_display' key={project._id.toString()}>
                    {project.skills.map((projectSkill)=>
                            { const skillFound = skills.map((skill)=>{
                                    if(projectSkill===skill.title)
                                    return(<div className='edit_skill_display' key={skill._id}>
                                            <img src={skill.photo}></img>
                                            <h3>{skill.title}</h3>
                                            </div>)
                                    else
                                    return null
                                }
                            )
                            return skillFound
                            }
                        )
                    }

            <div className='edit_image_section_display'>
                <div className='edit_image_wrap_display'>
                <img src={project.photo}></img>
                </div>
            </div>
            <div className='edit_description_section_display'>
                    <h1>{project.title}</h1>
                    <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${project.desc}`}} />
                                </tr>
                            </tbody>
                        </table>
            </div>
        </div>)
    })}
            </div>
        </div>
    )
}

export default EditProjects