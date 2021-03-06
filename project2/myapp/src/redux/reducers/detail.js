const initState = {
    data: {},
    isLoading: false,
    error: null,
    manager:{},
    isManagerLoading:false,

};

const reducer = (state=initState, action) => {
  switch(action.type) {
    case "GET_MANAGER_REQUEST":
      return {
        ...state,
        isManagerLoading: true
      }
    case "GET_MANAGER_SUCCESS":
      return{
        ...state,
        isManagerLoading: false,
        manager:action.data
      }
    case "GET_DETAIL_REQUEST":
      return {
        ...state,
        isLoading: true
      }

    case "GET_DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data
      };

    case "GET_DETAIL_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case "CREATE_USER_FAIL":
      return{
        ...state,
        isLoading: false
      };
    case "CREATE_USER_SUCCESS":
        return{
          ...state,
          isLoading: false
        };
    case "DEL_USER_FAIL":
      return{
        ...state,
        isLoading: false
      };
    case "DEL_USER_SUCCESS":
        return{
          ...state,
          isLoading: false
        };
    case "DEL_USER_REQUEST":
        return{
          ...state,
          isLoading: true
        };
    case "CREATE_USER_REQUEST":
        return{
          ...state,
          isLoading: true
        };    
    default:
      return state;
  }
};


export default reducer;