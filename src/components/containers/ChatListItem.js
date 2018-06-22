import ChatListItem from '../ui/ChatListItem';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapStateToProps = state => {
  return {
    serverChatting: state.serverChatting,
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
    },
    onUpdateFormStatus(status) {
      dispatch(
        act.updateFormStatus(status)
      );
    },
    onUpdateReplyStatus(status) {
      dispatch(
        act.updateReplyStatus(status)
      );
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ChatListItem);

export default Container;
