import SendForm from '../ui/SendForm';
import { connect } from 'react-redux';
import * as act from '../../actions';

const mapStateToProps = state => {
  return {
    form: state.form,
    isForm: state.isForm,
    roleChatting: state.roleChatting,
    dataRole: state.dataRole,
    roleId: state.roleId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateFormStatus(status) {
      dispatch(
        act.updateFormStatus(status)
      );
    },
    onLoadForm(data) {
      dispatch(
        act.loadForm(data)
      );
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(SendForm);

export default Container;
