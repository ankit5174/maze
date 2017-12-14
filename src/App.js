import React, { Component } from 'react';
import logo from './resources/logo.svg';
import Maze from './components/Maze.js'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { row: 0,
                   column: 0,
                   gameOn: false,
                   error: false
                 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUI = this.updateUI.bind(this);
    this.resetGame = this.resetGame.bind(this); 

  }

  
  render() {
    var ui = this.updateUI();     
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MazeG</h1>
        </header>
        <div>
          {ui}
        </div>        
      </div>
    );
  }    

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {

    e.preventDefault();
    var row = this.state.row;
    var column = this.state.column;
    if(row > 4 && column > 4)
    {
      this.setState({gameOn: true});
    }
    else
    {
      this.setState({error: true});
    }
    
    return false;
  }

  updateUI()
  {

    var gameOn = this.state.gameOn;
    var error  = this.state.error;
    if(gameOn)
    {
      return <div className="Maze"><Maze resetGame={this.resetGame} row={this.state.row} column={this.state.column} /></div>
    }
    else
    {
           
       return <div className="App-intro">
                {error &&
                  <p>Rows & Columns Should be greater than 4</p>
                }
                <form onSubmit={this.handleSubmit}>
                <h5>Enter the maze rows</h5>
                  <input
                    name="row"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.row}
                  />
                  <h5>Enter the maze column</h5>
                  <input
                    name="column"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.column}
                  />
                  <p>
                    <button className="Controls">
                    Start Game
                    </button>
                  </p>
                </form> 
                
              </div>;        
    }        
  }

  resetGame(e)
  {
    this.setState(prevState => ({
            row: 0,
            column: 0,
            gameOn: false,
            error: false
          }));
  }

}

export default App;
