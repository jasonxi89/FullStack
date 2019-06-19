import { get } from "https";
import { metaProperty } from "@babel/types";


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