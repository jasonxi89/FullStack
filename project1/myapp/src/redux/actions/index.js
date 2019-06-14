import axios from "axios";
import { history } from '../../index';

const getListRequest = () => {
    return {
      type: "GET_LIST_REQUEST"
    };
  };
  
  const getListSuccess = (data) => {
    return {
      type: "GET_LIST_SUCCESS",
      data: data
    };
  };
  
  const getListFail = (err) => {
    return {
      type: "GET_LIST_FAIL",
      err: err
    };
  };
  
  const getDetailRequest = () => {
    return {
      type: "GET_DETAIL_REQUEST"
    };
  };
  
  const getDetailSuccess = (data) => {
    return {
      type: "GET_DETAIL_SUCCESS",
      data: data
    };
  };
  
  const getDetailFail = (err) => {
    return {
      type: "GET_DETAIL_FAIL",
      err: err
    };
  };

  const createUserRequest = () => {
    return {
      type:"CREATE_USER_REQUEST"
    };
  };
  const createUserSuccess = () => {
    return {
      type:"CREATE_USER_SUCCESS"
    };
  }
  const createUserFail = () => {
    return {
      type:"CREATE_USER_FAIL"
    };
  }

  const delUserSuccess = () =>{
    return {
      type:"DEL_USER_SUCCESS"
    };
  }
  const delUserFail = () =>{
    return {
      type:"DEL_USER_FAIL"
    };
  }
  const delRequest = () => {
    return {
      type:"DEL_USER_REQUEST"
    };
  }

  export const getMatchedData = (str)=>{
    return{
      type:"SEARCH_DATA",
      data:str
    }
  }
  
  export const createUser = (fname,lname,pwd,age,sex,props) =>{
    return(dispatch) =>{
      dispatch(createUserRequest());
      axios.post("http://localhost:8888/api/users/",{
        fname:fname,
        lname:lname,
        pwd:pwd,
        age:age,
        sex:sex
      }).then(res=> {
        // window.alert("Successfully Created!")
        createUserSuccess(res);
        // dispatch(getList())
      }).catch(err => {
        createUserFail(err)

      });
      // console.log(history)
      props.history.push('/users/');
    }
  }

  export const getList = () => {
    return (dispatch) => {
      dispatch(getListRequest());
      axios.get("http://localhost:8888/api/users/")
        .then(res => {
          dispatch(getListSuccess(res.data));
        })
        .catch(err => {
          dispatch(getListFail(err));
        });
    };
  };
  
  export const getDetail = (id) => {
    return (dispatch) => {
      dispatch(getDetailRequest());
      axios.get(`http://localhost:8888/api/users/${id}`)
        .then(res => {
          dispatch(getDetailSuccess(res.data));
        })
        .catch(err => {
          dispatch(getDetailFail(err));
        });
    };
  };
  

  export const delUser = (id) =>{
    return(dispatch) =>{
      dispatch(delRequest());
      axios.delete(`http://localhost:8888/api/users/${id}`)
        .then(res => {
          window.alert("Successfully Deleted!")
          dispatch(delUserSuccess(res));
          dispatch(getList())
        })
        .catch(err => {
          window.alert("Delete Failed!")
          dispatch(delUserFail(err));
          dispatch(getList())
        });
    }
  }

  export const updateDetail = (id,fname,lname,pwd,age,sex) =>{
    return(dispatch) =>{
      dispatch(createUserRequest());
      axios.put(`http://localhost:8888/api/users/${id}`,{
        fname:fname,
        lname:lname,
        pwd:pwd,
        age:age,
        sex:sex
      }).then(res=> {
        window.alert("Successfully Updated")
        createUserSuccess(res);
        dispatch(getList())
      }).catch(err => {
        window.alert("Wrong Password!Update Failed!")
        createUserFail(err)
        dispatch(getList());
      });
    }
  }