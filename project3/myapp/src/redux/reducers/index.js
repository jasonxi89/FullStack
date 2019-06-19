const initialState = {
    data: {
      designs:[],
      users:[],
      current_user:{
        liked_designs:[]
      }
    },
    err: null,
    isLoading: false
  };
  
  const reducer = (state = initialState, action) => {
    switch(action.type) {
      case "GET_DATA_REQUEST":
        return {
          ...state,
          isLoading: true
        };
      case "GET_DATA_SUCCESS":
        return {
          isLoading: false,
          data: action.data,
          err: null
        };
      case "GET_DATA_FAIL":
        return {
          ...state,
          isLoading: false,
          err: action.err
        };
      default:
        return state; 
    }
  };
  
  export default reducer;
  