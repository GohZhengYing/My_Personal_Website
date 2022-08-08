import {React,useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import api from '../../../../api/api'
import './MainPicture.css'

function MainPicture(){
    const [mainPicture,setMainPicture] = useState({
        personal:"",
        education:"",
        experience:"",
        photo:"",
    })

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/mainpicture')
            setMainPicture(response.data[0])
        }
        fetchData()
        
    },[])

    return(
        <div className='mainPicture'>
            <div className='innerMainPicture'>
                <div className='descriptionWrap'>
                    <div className='personal_statement'>
                        <h1>Personal Statement</h1>
                        {mainPicture.photo!==""?
                        <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${mainPicture.personal}`}} />
                                </tr>
                            </tbody>
                        </table>
                        :<div className='progress'><CircularProgress /></div>}
                    </div>
                    <div className='education'>
                        <h1>Education</h1>
                        {mainPicture.photo!==""?
                        <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${mainPicture.education}`}} />
                                </tr>
                            </tbody>
                        </table>
                        :<div className='progress'><CircularProgress /></div>}
                    </div>
                    <div className='experience'>
                        <h1>Experience</h1>
                        {mainPicture.photo!==""?
                        <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${mainPicture.experience}`}} />
                                </tr>
                            </tbody>
                        </table>
                        :<div className='progress'><CircularProgress /></div>}
                    </div>
                </div>
                <div className='pictureWrap'>
                {mainPicture.photo!==""?
                    <img src={mainPicture.photo} alt="" className="mainPictureImage"></img>
                    :<div className='progress'><CircularProgress /></div>}
                    </div>
            </div>
        </div>
    )
}

export default MainPicture