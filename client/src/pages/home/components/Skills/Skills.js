import React,{useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import './Skills.css'
import api from '../../../../api/api'

function Skills(){
    const [skills,setSkills] = useState([])


    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/skill')
            setSkills(response.data)
        }
        fetchData()
    },[])
    return(
        <div className='skills'>
            <div className='skills_title'>
                <h1>Skills</h1>
                
            </div>
            <div className='icons'>
            {skills.length!==0?skills.map((skill)=>{
                    return(
                        <div className='skill' key={skill._id}>
                        <img src={skill.photo}></img>
                        <h3>{skill.title}</h3>
                        </div>
                    )
                }):<div className='progress'><CircularProgress /></div>}
            </div>
        </div>
    )
}

export default Skills