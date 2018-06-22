import ChatBox from '../ui/ChatBox';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapStateToProps = (state) => {
  return {
    roleId: state.roleId,
    serverChatting: state.serverChatting,
    socket: state.socket,
    dataFromReceive: state.dataFromReceive,
    dataFromSend: state.dataFromSend,
    filter: state.filter,
    limitMessage: state.limitMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateLimitMessage(limit) {
      dispatch(
        act.updateLimitMessage(limit)
      );
    }
  };
};
const Container = connect(mapStateToProps, mapDispatchToProps)(ChatBox);

export default Container;
