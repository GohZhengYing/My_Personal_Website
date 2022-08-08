import Axios from 'axios'
//https://gohzhengying.herokuapp.com/
export default Axios.create(
    {
        baseURL:'http://localhost:5000/'
    }
)