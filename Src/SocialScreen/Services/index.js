import axios from 'axios';
import Config from '../../Config';


export const getSocialList = () => {
    return axios({
        method: 'get',
        url: `${Config.api_path}socials/list`
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });        
}

export const postNewSocial = ({userId, avatarSource, text, video}) => {

    let data = new FormData();
    data.append('video', video);
    data.append('text', text);
    if(avatarSource)
        data.append('image', {
            uri: avatarSource.uri,
            type: 'image/jpeg',
            name: 'teste'
        }); //if you upload image
    
    return axios.post(
        `${Config.api_path}socials/create/${userId}`,
        data,
        { headers: {'Content-Type': 'multipart/form-data' }}
      ).then(res => res.data)
      .catch(err => {
          console.log(err);
          throw new Error('API error')
      });            
}

export const getDoLike = ({ userId, socialId }) => {
    return axios({
        method: 'get',
        url: `${Config.api_path}socials/like/${socialId}/${userId}`
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });   
}

export const getDoDisLike = ({ userId, socialId }) => {
    return axios({
        method: 'get',
        url: `${Config.api_path}socials/dislike/${socialId}/${userId}`
      }).then(res => res.data)
      .catch(err => {
          throw new Error('API error')
      });   
}

export const postNewComment = ({userId, socialId, text}) => {

    let data = new FormData();
    data.append('text', text);
    return axios.post(
        `${Config.api_path}socials/comment/${socialId}/${userId}`,
        data,
        { headers: {'Content-Type': 'multipart/form-data' }}
      ).then(res => res.data)
      .catch(err => {
          console.log(err);
          throw new Error('API error')
      });            
}