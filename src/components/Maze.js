  import React, { Component } from 'react';
  import hotkey from 'react-hotkey'
  import mushroom from '../resources/mushroom.png';
  import blank from '../resources/blank.png';
  import mario from '../resources/mario.png';
  import * as Utils from '../utils/Utils.js'
  import './Maze.css';

  hotkey.activate();


  class Maze extends Component {

    constructor(props) {
      super(props);
      this.state = { row: this.props.row,
                     column: this.props.column,
                     soldiers: Math.floor((this.props.row*this.props.column)/4),
                     maze: [],
                     px: 0,
                     py: 0,
                     moves: 0,
                     gameEnd: false
                   };

      this.initializeMaze = this.initializeMaze.bind(this);
      this.updateMaze = this.updateMaze.bind(this);
      this.handleControls = this.handleControls.bind(this);
      this.updateUI = this.updateUI.bind(this);
      this.resetGame = this.resetGame.bind(this); 
      this.processGame = this.processGame.bind(this); 

    }

    componentDidMount()
    {
      this.initializeMaze();
      hotkey.addHandler(this.handleControls);      
    }

    componentWillUnmount() {
      hotkey.removeHandler(this.handleControls);      
    }

    render() {
      
      var ui = this.updateUI();
      return (
        <div>
          {ui}
        </div>
      );
    }

    updateUI()
    {
      
      var table = this.updateMaze();
      var gameEnd = this.state.gameEnd;

      return <div className="Maze">

          <div className="Score">
            <p>{this.state.moves}</p>
          </div>

          <p>{gameEnd ? 'moves taken to save princess' : ''}</p>
          
          <table className="Maze-Table">
            {table}
          </table>

          {!gameEnd && 
            <div className="Controls-container">
              <button className="Controls" name="top" onClick={this.handleControls}>&uArr;</button>
              <div>
                <button className="Controls" name="left" onClick={this.handleControls}>&lArr;</button>
                <button className="Controls" name="right" onClick={this.handleControls}>&rArr;</button>
              </div>
              <button className="Controls" name="down" onClick={this.handleControls}>&dArr;</button>
            </div>
          }

          {gameEnd &&
            <div className="Controls-container">
              <button className="Controls" name="playAgain" onClick={this.resetGame}>Play Again</button>
            </div>
          }

      </div>;
    }

    updateMaze()
    {
      var table = [];

      var maze = this.state.maze.slice();
      for (var i = 0; i < this.state.row ; i++)
      {
        var tdata = [];
        var row = maze[i];
        if(row)
        {
          for (var j = 0; j < this.state.column ; j++)
          {
            var x = <img className="Icons" src={blank} alt="blank" />;

            if(row[j] === 1)
              x = <img className="Icons" src={mushroom} alt="mushroom" />;

            if(row[j] === 'P')
              x = <img className="Icons" src={mario} alt="mario" />;

            tdata.push(<td className="Maze-Table-Data">{x}</td>);
          }
          table.push(<tbody><tr>{tdata}</tr></tbody>);
        }
      }

      return table;
    }

    handleControls(event)
    {

      var action;
      if (event.key) {
        if(event.key === 'w')
          action = "top";
        if(event.key === 'a')
          action = "left";
        if(event.key === 's')
          action = "down";
        if(event.key === 'd')
          action = "right";
      };

      if(event.target)
      {
        action = event.target.name;
      }
      this.processGame(action);
    }

    processGame(action)
    {
      
      var gameEnd = this.state.gameEnd;
      if(!gameEnd)
      {
        var px = this.state.px;
        var py = this.state.py;
        var soldiers = this.state.soldiers;
        var maze = this.state.maze.slice();
        var rowSize = this.state.row;
        var columnSize =this.state.column;
        var moves = this.state.moves;        
        var changed = false;
        if(action === 'top')
        {
          if((px-1) >= 0 )
          {
            let row = maze[px];
            row[py] = 0;

            px = px - 1;
            row = maze[px];
            let val = row[py];

            if(val === 1)
            {
              soldiers = soldiers - 1;
              if(soldiers === 0)
              {
                gameEnd = true;
              }
            }
            row[py] = 'P';
            changed = true;
          }
        }

        if(action === 'down')
        {
          if((px+1) < rowSize)
          {
            let row = maze[px];
            row[py] = 0;

            px = px + 1;
            row = maze[px];
            let val = row[py];

            if(val === 1)
            {
              soldiers = soldiers - 1;
              if(soldiers === 0)
              {
                gameEnd = true;
              }
            }
            row[py] = 'P';
            changed = true;
          }
        }

        if(action === 'left')
        {
          if((py-1) >= 0)
          {
            let row = maze[px];
            row[py] = 0;

            py = py - 1;
            let val = row[py];

            if(val === 1)
            {
              soldiers = soldiers - 1;
              if(soldiers === 0)
              {
                gameEnd = true;
              }
            }
            row[py] = 'P';
            changed = true;
          }
        }

        if(action === 'right')
        {
          if((py+1) < columnSize)
          {
            let row = maze[px];
            row[py] = 0;

            py = py + 1;
            let val = row[py];

            if(val === 1)
            {
              soldiers = soldiers - 1;
              if(soldiers === 0)
              {
                gameEnd = true;
              }
            }
            row[py] = 'P';
            changed = true;
          }
        }

        if(changed)
        {
          
          moves = moves + 1;

          this.setState(prevState => ({
            maze : maze,
            soldiers: soldiers,
            px: px,
            py: py,
            moves: moves, 
            gameEnd : gameEnd
          }));
        }
      }
    }

    initializeMaze()
    {

      var soldiersRows = Utils.generateRowPositionOfSoldiers(this.state.soldiers, this.state.row);
      var soldiersColumns = Utils.generateRowPositionOfSoldiers(this.state.soldiers, this.state.column);
      var maze = this.state.maze.slice();
      var soldiers = 0;

      for(let i =0; i < this.state.row; i++ )
      {
        let row = [];
        for(let j =0; j < this.state.column; j++ )
        {
          row.push(0);
        }
        maze.push(row);
      }

      for(let i = 0; i < this.state.soldiers; i++ )
      {
        let row = maze[soldiersRows[i]];
        let val = row[soldiersColumns[i]]
        if(val === 0)
        {
          row[soldiersColumns[i]] = 1;
          soldiers = soldiers + 1;
        }
      }

      //Set The King Location
      let row = maze[0];
      let val = row[0];
      if(val === 1)
      {
        soldiers = soldiers - 1;
      }
      row[0] = 'P';


      this.setState({
                      soldiers: soldiers,
                      maze: maze,
                  });
    }

    resetGame(e)
    {
      this.props.resetGame();
    }
    
  }

  export default Maze;
