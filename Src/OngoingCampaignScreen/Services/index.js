import axios from 'axios';
import Config from '../../Config';


export const getCampaignList = (userId) => {
    return axios({
        method: 'get',
        url: `${Config.api_path}campaings/thew/${userId}`
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });        
}