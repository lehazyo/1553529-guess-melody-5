import React from "react";
import PropTypes from "prop-types";
import Welcome from "../Welcome/Welcome";

const App = (props) => {
  const {errorsCount} = props;

  return (
    <Welcome errorsCount={errorsCount} />
  );
};


App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default App;
