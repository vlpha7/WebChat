import SendBox from '../ui/SendBox';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapStateToProps = (state) => {
  return {
    serverChatting: state.serverChatting,
    roleId: state.roleId,
    socket: state.socket,
    dataRole: state.dataRole,
    isReply: state.isReply,
    reply: state.reply,
    isForm: state.isForm,
    form: state.form,
    roleChatting: state.roleChatting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateReplyStatus(status) {
      dispatch(
        act.updateReplyStatus(status)
      );
    },
    onUpdateFormStatus(status) {
      dispatch(
        act.updateFormStatus(status)
      );
    },
    onLoadForm(data) {
      dispatch(
        act.loadForm(data)
      );
    },
    onUpdateRoleChatting(role) {
      dispatch(
        act.updateRoleChatting(role)
      );
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(SendBox);

export default Container;
