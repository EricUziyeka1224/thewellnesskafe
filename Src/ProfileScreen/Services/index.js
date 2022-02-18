import axios from 'axios';
import Config from '../../Config';

export const postUpdateProfile = ({ userId, image, name, email, phone, password, state, city }) => {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('name', name);
    data.append('phone', phone);
    data.append('state', state);
    data.append('city', city);
    if(image)
        data.append('image', {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'teste'
        }); //if you upload image
    
    return axios.post(
        `${Config.api_path}user/update/${userId}`,
        data,
        { headers: {'Content-Type': 'multipart/form-data' }}
      ).then(res => res.data)
      .catch(err => {
          console.log(err);
          throw new Error('API error')
      });        
}