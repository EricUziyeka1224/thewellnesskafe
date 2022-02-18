import axios from 'axios';
import Config from '../../Config';


export const postLogin = ({ email, password }) => {
    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    //bodyFormData.append('image', imageFile); //if you upload image
    return axios({
        method: 'post',
        url: `${Config.api_path}login`,
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });        
}