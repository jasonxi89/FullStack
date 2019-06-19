

import axios from "axios";


const getDataRequest = () => {
    return {
      type: "GET_DATA_REQUEST"
    };
  };
  
const getDataSuccess = (data) => {
return {
    type: "GET_DATA_SUCCESS",
    data: data
};
};

  
const getDataFail = (err) => {
  return {
    type: "GET_DATA_FAIL",
    err: err
  };
};

const updateLikeRequest = () => {
  return {
    type: "GET_UPDATELIKE_REQUEST"
  };
};

const updateLikeSuccess = () => {
return {
  type: "GET_UPDATELIKE_SUCCESS",
  };
};


const updateLikeFail = (err) => {
return {
  type: "GET_UPDATELIKE_FAIL",
  err: err
  };
};

export const likeClick = (id) =>{
  return(dispatch) =>{
    dispatch(updateLikeRequest())
    //put or post depends on the Rest API setting
    axios.put(`http://somewebsite/api/${id}`)
    .then(res=>{
      dispatch(updateLikeSuccess());
      dispatch(getData());
    })
    .catch(err=>{
      dispatch(updateLikeFail(err))})
  }
}


export const getData = () => {
    return (dispatch) => {
        dispatch(getDataRequest());
        fetch('./data.json')
        .then(res => res.json())
        .then(json => 
            dispatch(getDataSuccess(json)))
        .catch(err => {
            dispatch(getDataFail(err));
        })
      }
}