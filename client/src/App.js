import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(props)  {
    super(props);
    this.state = { apiResponse: '' };
    this.state = { username: '' };
  }
    
  componentWillMount() {
    this.callAPI();
  } 

  callAPI(){
      fetch("http://localhost:9000/API/curriculum2_section")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  // mySubmitHandler = (event) => { 
  //   event.preventDefault();
  //   // alert("You are submitting " + this.state.username);
  //   fetch(`http://localhost:9000/API/mysqldb/add?insertdata=${this.state.username}`)
  //   .then(this.callAPI())
  // }

  insertData = _ => {
    fetch(`http://localhost:9000/API/mysqldb/add?insertdata=${this.state.username}`)
    .then(this.callAPI())
  }

  deleteData = _ => {
    fetch(`http://localhost:9000/API/mysqldb/delete?insertdata=${this.state.username}`)
    .then(this.callAPI())
  }

  clearData = _ => {
    fetch(`http://localhost:9000/API/mysqldb/truncate`)
    .then(this.callAPI())
  }

  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  render(){
    return (

      // <form onSubmit={this.mySubmitHandler} >
      //   <h1>DATA on form : {this.state.username}</h1>
      //   <input type='text' name ='inputtext' onChange={this.myChangeHandler} />
      //   <br></br>
      //   <input type='submit' value = 'insert' />
      //   <button onClick={this.insertdata}INSERT DATA></button>
        
      //   <p className="App-intro">
      //     {this.state.apiResponse}
      //   </p>
      // </form>

      <div className="FrontEnd">
        <div>
          <h1>DATA on form : {this.state.username}</h1>
          <input type ='text' name ='inputtext' onChange={this.myChangeHandler} />
          <br></br>
          <button onClick={this.insertData}>ADD DATA</button>
          <button onClick={this.deleteData}>REMOVE DATA</button>
          <button onClick={this.clearData}>CLEAR ALL DATA</button>
          <h1>DATABASE :</h1>
          <p>{this.state.apiResponse}</p>
        </div>
      </div>
    );
  }
}

export default App;
