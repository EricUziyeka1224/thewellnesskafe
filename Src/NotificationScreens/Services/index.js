import axios from 'axios';
import Config from '../../Config';


export const getNotificationList = (userId) => {
    return axios({
        method: 'get',
        url: `${Config.api_path}notifications/list/${userId}`
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });        
}