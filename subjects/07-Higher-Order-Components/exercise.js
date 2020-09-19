////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make `withMouse` a "higher-order component" that sends the mouse position
//   to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function withMouse(Component) {

  return class HOC extends React.Component{
    state={
        x:0,
        y:0
    }
  
    onMouseMove=(e)=>{
      const {clientX,clientY}=e
      this.setState({x:clientX,y:clientY})
    }

    render(){
      return (
        <div onMouseMove={this.onMouseMove}>
          <Component  {...this.props} mouse={{x:this.state.x,y:this.state.y}}/>
        </div>
      );
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  };

  render() {
    const { mouse } = this.props;

    return (
      <div className="container">
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    );
  }
}

const AppWithMouse = withMouse(App);

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
