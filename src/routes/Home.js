import React from 'react';
import { connect } from 'dva';
import Home from '../components/Home'

function HomeRoute(props) {
  console.log(props);
  return <Home {...props} />;
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(HomeRoute);
