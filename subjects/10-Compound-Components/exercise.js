////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the <App> so it can use it to render something
// - Implement keyboard controls on the <RadioGroup>
//   - Hint: Use tabIndex="0" on the <RadioOption>s so the keyboard will work
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string,
  };

  state = {
    selectedOption: this.props.defaultValue,
  };

  onSelectionChange = (selectedOption) =>
    this.setState({ selectedOption });

  render() {
    const { children } = this.props;
    const { selectedOption } = this.state;
    const proppedChildren = React.Children.map(children, (child) => {
      const { value } = child.props;
      return React.cloneElement(child, {
        _selectedOption: selectedOption,
        _onChange: this.onSelectionChange,
      });
    });
    return <div>{proppedChildren}</div>;
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  };

  render() {
    const { children, _onChange, _selectedOption, value } = this.props;
    return (
      <div>
        <RadioIcon
          isSelected={value === _selectedOption}
          onClick={() => _onChange(value)}
        />{" "}
        {children}
      </div>
    );
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={{
          borderColor: "#ccc",
          borderWidth: 3,
          borderStyle: this.props.isSelected ? "inset" : "outset",
          height: 16,
          width: 16,
          display: "inline-block",
          cursor: "pointer",
          background: this.props.isSelected
            ? "rgba(0, 0, 0, 0.05)"
            : "",
        }}
      />
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>

        <RadioGroup defaultValue="fm">
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
