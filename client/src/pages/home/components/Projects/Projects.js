import {React,useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import api from '../../../../api/api'
import './Projects.css'

function Projects(){
    const [projects,setProjects] = useState([])
    const [skills,setSkills] = useState([])
    
    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/project')
            const skillsFetch = await api.get('/skill')
            setSkills(skillsFetch.data)
            setProjects(response.data)
        return response}
        fetchData()
    },[])

    return(
        <div className='Projects'>
                <div className='project_title'>
                    <h1 >Projects</h1>
                </div>
            <div className='projectsWrap'>
                {projects.length!==0?projects.map((project)=>{
        return(<div className='project' key={project._id.toString()}>
            <div className='imageSection'>
                <div className='imageWrap'>
                <img src={project.photo}></img>
                </div>
            </div>
            <div className='descriptionSection'>
                    <h1>{project.title}</h1>
                    <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${project.desc}`}} />
                                </tr>
                            </tbody>
                        </table>
            </div>
            <div className='project_skills'>
                {project.skills.map((projectSkill)=>
                            { const skillFound = skills.map((skill)=>{
                                    if(projectSkill===skill.title)
                                    return(<div className='project_skill' key={skill._id}>
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
                    </div>
        </div>)
    }):<div className='progress'><CircularProgress /></div>}
            </div>
        </div>
    )
}

export default Projects