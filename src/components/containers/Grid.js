import Grid from '../ui/Grid';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapDispatchToProps = dispatch => {
  return {
    onLoadDataFromReceive(data) {
      dispatch(
        act.loadDataFromReceive(data)
      );
    },
    onLoadDataFromSend(data) {
      dispatch(
        act.loadDataFromSend(data)
      );
    },
    onLoadDataServer(data) {
      dispatch(
        act.loadDataServer(data)
      );
    },
    onLoadDataRole(data) {
      dispatch(
        act.loadDataRole(data)
      );
    },
    onAddOnlineServer(data) {
      dispatch(
        act.addOnlineServer(data)
      );
    },
    onAddOfflineServer(data) {
      dispatch(
        act.addOfflineServer(data)
      );
    },
    onDeleteOnlineServer(data) {
      dispatch(
        act.deleteOnlineServer(data)
      );
    },
    onDeleteOfflineServer(data) {
      dispatch(
        act.deleteOfflineServer(data)
      );
    },
    onAddSocket(socket) {
      dispatch(
        act.addSocket(socket)
      );
    },
    onUpdateServerChatting(data) {
      dispatch(
        act.updateServerChatting(data)
      );
    },
    onUpdateFilter(role) {
      dispatch(
        act.updateFilter(role)
      );
    }
  };
};

const mapStateToProps = (state) => {
  return {
    dataServer: state.dataServer,
    dataRole: state.dataRole,
    dataFromSend: state.dataFromSend,
    dataFromReceive: state.dataFromReceive,
    onlineServer: state.onlineServer,
    offlineServer: state.offlineServer,
    roleId: state.roleId,
    serverChatting: state.serverChatting
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Grid);

export default Container;
