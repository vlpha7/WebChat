import Main from '../ui/Main';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapDispatchToProps = dispatch => {
  return {
    onLoadDataRole(data) {
      dispatch(
        act.loadDataRole(data)
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    dataRole: state.dataRole
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Container;
