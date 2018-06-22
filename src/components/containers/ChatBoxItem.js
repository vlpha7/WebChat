import ChatBoxItem from '../ui/ChatBoxItem';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapDispatchToProps = dispatch => {
  return {
    onUpdateReplyStatus(data) {
      dispatch(
        act.updateReplyStatus(data)
      );
    },
    onLoadReply(data) {
      dispatch(
          act.loadReply(data)
      );
    },
    onUpdateRoleChatting(role) {
      dispatch(
        act.updateRoleChatting(role)
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    isReply: state.isReply,
    socket: state.socket,
    dataRole: state.dataRole
  };
};
const Container = connect(mapStateToProps, mapDispatchToProps)(ChatBoxItem);

export default Container;
