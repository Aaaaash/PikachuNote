import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

const Detail = styled.div`
  width: 325px;
  background-color: #fff;
  border-right: 1px solid rgba(167, 182, 194, 0.3);
`;

class DirDetails extends PureComponent {
  render() {
    console.log(this.props);
    return <Detail>hello world</Detail>;
  }
}

const mapStateToProps = (state: any) => ({
  dirDetails: state.sidebar.dirDetails,
});

const mapDispatchToProps = (dispatch: any) => null;

function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, mergePropss);

export default compose(withConnect)(DirDetails);
