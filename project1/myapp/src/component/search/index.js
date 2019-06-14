import React from 'react'


class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {input:""}
    }
    
    handleChange = e =>{
        this.setState({input:e.target.value})
        this.props.changeFilter(e.target.value)
    }
    
    render(){
        return(
            <React.Fragment>
                <h2>Users</h2>
                <label className='search'>Search:</label><div className="input-container"><input type='text' className="search-input" placeholder="Please Type Here"value={this.state.input} onChange = {this.handleChange}/></div>
            </React.Fragment>
        )
    }
}

export default Search;