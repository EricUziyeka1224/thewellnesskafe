import axios from 'axios';
import Config from '../Config';


export const getUnreadNotificationCount = (userId) => {
    return axios({
        method: 'get',
        url: `${Config.api_path}notifications/unreadCount/${userId}`
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });        
}

export const getPrivacyInfo = () => {
    return axios({
        method: 'get',
        url: `${Config.api_path}privacy/wellness`
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });        
}

export const postOnesignalId = ({ userId, deviceId }) => {      
    let bodyFormData = new FormData();
    bodyFormData.append("name", "asd");
    //bodyFormData.append('image', imageFile); //if you upload image
    return axios({
        method: 'post',
        url: `${Config.api_path}device/register/${userId}/${deviceId}`,
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(res => res.data)
    .catch(err => {
        throw new Error('API error')
    });  
}