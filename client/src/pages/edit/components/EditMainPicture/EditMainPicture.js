import {React,useState,useEffect} from 'react'
import './EditMainPicture.css'
import FileBase from 'react-file-base64'
import Resizer from 'react-image-file-resizer'
import api from '../../../../api/api'

function EditMainPicture(){
    const [mainPicture,setMainPicture] = useState({
        personal:"",
        education:"",
        experience:"",
        photo:"",
        choosenPhoto:null
    })
    const [apiRequest,setApiRequest] = useState(false)
    //useEffect setup
    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/mainpicture')
            console.log(response.data[0])
            setMainPicture({...response.data[0],choosenPhoto:null})
        }
        fetchData()
        setApiRequest(false)
        console.log("rendered mainpicture")
    }
    ,[apiRequest])
    //onchange handlers
    function handleMainPictureChange(e){
        switch(e.target.name){
            case "personal":setMainPicture({...mainPicture,personal:e.target.value})
            return
            case "education":setMainPicture({...mainPicture,education:e.target.value})
            return
            case "experience":setMainPicture({...mainPicture,experience:e.target.value})
        }

    }
    //submit handler
    function handleMainPictureSubmit(e){
        let {_id,personal,education,experience,photo} = mainPicture
        if(mainPicture.choosenPhoto)
        {photo=mainPicture.choosenPhoto}
        async function updateData(){
            const response = await api.patch('/mainpicture',{_id,personal,education,experience,photo},{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
        }
        updateData()
        setApiRequest(true)
        console.log("updated")
    }
    function handleImageSubmit(e){
        try {
            Resizer.imageFileResizer(
                e.target.files[0],
                1000,
                800,
                "JPEG",
                80,
                0,
                (uri) => {
                    console.log(uri.length)
                    console.log(mainPicture.photo.length)
                  setMainPicture({...mainPicture,choosenPhoto:uri})
                },
                "base64"
              );
        } catch (error) {
            console.log(error)
        }
    }

    return(<div>

        <h1 className='edit_main_picture_title'>Current Setup</h1>
        <div className='edit_main_picture'>
            <div className='edit_inner_main_picture'>
                <div className='edit_description_wrap'>
                    personal
                    <textarea name="personal" value={mainPicture.personal} onChange={handleMainPictureChange} cols="60" rows="10"></textarea>
                    <br></br>
                    education
                    <textarea name="education" value={mainPicture.education} onChange={handleMainPictureChange} cols="60" rows="10"></textarea>
                    <br></br>
                    experience
                    <textarea name="experience" value={mainPicture.experience} onChange={handleMainPictureChange} cols="60" rows="10"></textarea>
                    <button onClick={handleMainPictureSubmit}>Submit</button>
                </div>
                <div className='edit_picture_wrap'>
                    <div style={{height:"350px"}}>
                        <img src={mainPicture.photo} alt=""></img>
                    </div>
                    <div style={{height:"350px"}}>
                        <img src={mainPicture.choosenPhoto} alt=""></img>
                    </div>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleImageSubmit}></input>
                </div>

            </div>
        </div>
        <h1 className='edit_main_picture_title'>Display</h1>
        <div className='edit_main_picture'>
            <div className='edit_inner_main_picture'>
                <div className='edit_description_wrap'>
                <div className='edit_personal_statement'>
                        <h1>Personal Statement</h1>
                        <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${mainPicture.personal}`}} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='edit_education'>
                        <h1>Education</h1>
                        <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${mainPicture.education}`}} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='edit_experience'>
                        <h1>Experience</h1>
                        <table>
                            <tbody>
                                <tr>
                                <td dangerouslySetInnerHTML={{__html: `${mainPicture.experience}`}} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='edit_picture_wrap_display'>
                    <img src={mainPicture.photo} alt="" className="edit_image"></img>
                </div>
            </div>
        </div>

    </div>
    )
}

export default EditMainPicture