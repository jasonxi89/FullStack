import React, { useState,useEffect } from 'react';
import axios from 'axios'


//hook version
function App(info){
    
    // const [id] = this.props;
    const [data, setData] = useState("loading");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:8888/api/users/dr/${info.id}`);
            setData(result.data);
        };
    
        fetchData();
      }, []);
    
  return (
        <td onClick={info.onClick}>
          {data}
        </td>
  );
}


// old version
// class App extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//             number:"Loading"
//         }
//     }
//     componentDidMount(){
//         axios.get(`http://localhost:8888/api/users/dr/${this.props.id}`).then(res=>
//         this.setState({number:res.data}))
//     }
//     render(){
//     return(
//         <td>
//             {this.state.number}
//         </td>
//     )}
// }

export default App;


