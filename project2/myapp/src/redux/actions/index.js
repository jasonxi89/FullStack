import axios from "axios";


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


  const getManagerRequest = () => {
    return {
      type: "GET_MANAGER_REQUEST"
    };
  };
  
  const getManagerSuccess = (data) => {
    return {
      type: "GET_MANAGER_SUCCESS",
      data: data
    };
  };
  
  const getManagerFail = (err) => {
    return {
      type: "GET_MANAGER_FAIL",
      err: err
    };
  };

  export const getManagerList = (id) => {
    return(dispatch)=>{
      dispatch(getManagerRequest());
      if(!id){
        axios.get(`http://localhost:8888/api/users/validmanager/`)
        .then(res =>{
          dispatch(getManagerSuccess(res.data))
        })
        .catch(err=>{
          dispatch(getManagerFail(err));
        })
      }else{
        axios.get(`http://localhost:8888/api/users/validmanager/${id}`)
        .then(res =>{
          dispatch(getManagerSuccess(res.data))
        })
        .catch(err=>{
          dispatch(getManagerFail(err));
        })
    }
  }}
  
  export const createUser = (name,title,sex,sdate,ophone,cphone,sms,email,uploadedFileCloudinaryUrl,managerid,props) =>{
    return(dispatch) =>{
      dispatch(createUserRequest());
      axios.post("http://localhost:8888/api/users/",{
        name:name,
        title:title,
        sdate:sdate,
        sex:sex,
        ophone:ophone,
        cphone:cphone,
        sms:sms,
        email:email,
        uploadedFileCloudinaryUrl:uploadedFileCloudinaryUrl,
        managerid:managerid
      }).then(res=> {
        // window.alert("Successfully Created!")
        props.history.push('/users/');
        dispatch(createUserSuccess());
      }).catch(err => {
        props.history.push('/users/');
        dispatch(createUserFail(err));

      });

        
    }
  }

  export const getList = (page) => {
    return (dispatch) => {
      dispatch(getListRequest());
      axios.get(`http://localhost:8888/api/users/?page=${page?page:0}`)
        .then(res => {
          // console.log(res.data)
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
      axios.get(`http://localhost:8888/api/users/detail/${id}`)
        .then(res => {
          dispatch(getDetailSuccess(res.data));
        })
        .catch(err => {
          dispatch(getDetailFail(err));
        });
    };
  };
  

  export const delUser = (id,props) =>{
    return(dispatch) =>{
      dispatch(delRequest());
      axios.delete(`http://localhost:8888/api/users/${id}`)
        .then(res => {
          dispatch(delUserSuccess());
          // props.history.push('/users/');
          dispatch(getList())
        })
        .catch(err => {
          dispatch(delUserFail(err));
          // props.history.push('/users/');
          dispatch(getList())
        });
    }
  }

  export const updateUser = (id,name,title,sex,sdate,ophone,cphone,sms,email,uploadedFileCloudinaryUrl,managerid,props) =>{
    return(dispatch) =>{
      dispatch(createUserRequest());
      axios.put(`http://localhost:8888/api/users/${id}`,{
        name:name,
        title:title,
        sdate:sdate,
        sex:sex,
        ophone:ophone,
        cphone:cphone,
        sms:sms,
        email:email,
        uploadedFileCloudinaryUrl:uploadedFileCloudinaryUrl,
        managerid:managerid
      }).then(res=> {
        // window.alert("Successfully Updated")
        dispatch(createUserSuccess());
        props.history.push('/users/');
        // dispatch(getList())
      }).catch(err => {
        // window.alert("Wrong Password!Update Failed!")
        dispatch(createUserFail(err));
        props.history.push('/users/');
        // dispatch(getList());
      });
    }
  }



  //-----------------------------------------------------------

