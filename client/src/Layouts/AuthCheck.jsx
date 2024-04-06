import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import AlertList from "../Components/Alerts/AlertList";

import {
  checkAuthenticated,
  load_user,
  googleAuthenticate,
} from "../Actions/Auth";

const AuthCheck = (props, user) => {
  const location = useLocation();
  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;
    console.log("State: ", state);
    console.log("Code: ", code);
    if (state && code) {
      props.googleAuthenticate(state, code);
    }
    props.checkAuthenticated();
    props.load_user();
    // console.log(user);
  }, [location]);

  return (
    <>
      <AlertList />
      {props.children}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user, // Assuming 'user' is stored in the 'auth' part of your state
});

export default connect(mapStateToProps, {
  checkAuthenticated,
  load_user,
  googleAuthenticate,
})(AuthCheck);
