import axios from 'axios';
import Config from '../../Config';


export const postRegister = ({ name, email, phone, password }) => {
    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('phone', phone);
    bodyFormData.append('password', password);
    //bodyFormData.append('image', imageFile); //if you upload image
    console.log("heree----------------------------------------------------------------")
    return axios({
        method: 'post',
        url: `${Config.api_path}register`,
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });        
}