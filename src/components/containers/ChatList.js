import ChatList from '../ui/ChatList';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapStateToProps = (state) => {
  return {
    dataServer: state.dataServer,
    dataRole: state.dataRole,
    onlineServer: state.onlineServer,
    offlineServer: state.offlineServer,
    roleId: state.roleId,
    socket: state.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateServerChatting(data) {
      dispatch(
        act.updateServerChatting(data)
      );
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ChatList);

export default Container;
