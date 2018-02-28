import React from 'react';
import { connect } from 'dva';
import Home from '../components/Home'

class HomeRoute extends React.Component{
    render(){
        return (
            <Home />
        )
    }
}
export default connect()(HomeRoute);
