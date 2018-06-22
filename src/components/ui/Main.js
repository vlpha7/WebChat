const { window } = global;
import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import * as api from '../../api';

class Main extends Component {
  constructor(props) {
    super(props);
    const { onLoadDataRole } = this.props;
    this.handleLogin = this.handleLogin.bind(this);
    this.loadRoles = this.loadRoles.bind(this);
    api.getDataRole()
      .then(data => {
        onLoadDataRole(data);
    });
    window.host = window.location.href;
  }
  handleLogin(roleLogin) {
      window.location.href = (window.location.href + 'role/' + roleLogin);
  }
  loadRoles(role) {
    return (
      <Chip style={{ margin: 4 }}
            backgroundColor={role.color}
            key={role.id}
            onClick={() => this.handleLogin(role.id)}>
        {role.name}
      </Chip>
    );
  }
  render() {
    const { dataRole } = this.props;
    return (
      <div>
        <span style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)' }}>
          {dataRole.map(this.loadRoles)}
        </span>
      </div>
    );
  }
}

export default Main;
