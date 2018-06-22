import React, { Component } from 'react';
import rawData from '../../rawData.json';

let color;

class SendForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.loadInputForm = this.loadInputForm.bind(this);
    this.getColor = this.getColor.bind(this);
    this.getColor();
  }
  getColor() {
    const { dataRole, roleChatting, roleId } = this.props;
    let tmp = roleChatting;
    if (tmp === -1) tmp = roleId;
    dataRole.forEach(item => {
      if (item.id === tmp) {
        color = item.color;
      }
    });
  }
  chooseDefaultData() {
    const { form, onLoadForm } = this.props;
    // TODO: put to utils
    form.msg_items.forEach((item, key) => {
      if (item.type === 'TEXT_VALUE') form.msg_items[key].data = form.msg_items[key].data;
      else if (item.type === 'TEXT_INPUT') form.msg_items[key].data = '';
      else if (item.type === 'INTEGER_NUMBER') form.msg_items[key].data = '';
      else if (item.type === 'REAL_NUMBER') form.msg_items[key].data = '';
      else if (item.type === 'MULTIPLE_CHOICE') form.msg_items[key].data = '';
      else if (item.type === 'SELECTION_CHOICE_1') form.msg_items[key].data = '';
      else if (item.type === 'SELECTION_CHOICE_2') form.msg_items[key].data = item.data.split('|')[0];
    });
    onLoadForm(form);
  }
  componentDidMount() {
    this.chooseDefaultData();
  }
  handleChange(event, dataType, key, choice) {
    const { onLoadForm, form } = this.props;
    const { msg_items } = form;
    const msg_item = msg_items[key];
    let value = event.target.value;
    if (dataType === 'radio') {
      value = choice;
    }
    else if (dataType === 'checkbox') {
      if (event.target.checked) {
        if (msg_item.data === '') {
          msg_item.data = choice;
        } else {
          const arrayData = msg_item.data.split('|');
          let shouldAdd = true;
          arrayData.forEach(item => {
            if (item === choice) shouldAdd = false;
          });
          if (shouldAdd) msg_item.data += '|' + choice;
        }
      } else if (msg_item.data !== '') {
          const arrayData = msg_item.data.split('|');
          msg_item.data = '';
          arrayData.forEach((item) => {
            if (item !== choice) {
              if (msg_item.data === '') msg_item.data += item;
              else msg_item.data += '|' + item;
            }
          });
        }
      onLoadForm(form);
      return;
    }
    msg_item.data = value;
    onLoadForm(form);
  }
  loadInputRadio(dataType, key, choice) {
      return (
        <label>{choice}
          <input type={dataType} name={key}
                 onChange={(event) => this.handleChange(event, dataType, key, choice)}/>
        </label>
      );
  }
  loadInputCheckbox(dataType, choice, key) {
      return (
        <label>{choice}
          <input type={dataType} name={key}
                 onChange={(event) => this.handleChange(event, dataType, key, choice)}/>
        </label>
      );
  }
  loadInputForm(data, key) {
    const dataType = data.type;
    if (dataType === 'TEXT_VALUE') {
      return (
        <tr style={{ backgroundColor:color, border: '1px solid grey' }} key={Math.random()}>
          <td>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <p>{data.data}</p>
          </td>
        </tr>
      );
    } else if (dataType === 'TEXT_INPUT') {
      return (
        <tr style={{ backgroundColor:color, border: '1px solid grey' }} key={Math.random()}>
          <td>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <input type="text" onChange={(event) => this.handleChange(event, dataType, key)}/>
          </td>
        </tr>
      );
    } else if (dataType === 'INTEGER_NUMBER') {
      return (
        <tr style={{ backgroundColor:color, border: '1px solid grey' }} key={Math.random()}>
          <td>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <input type="number" onChange={(event) => this.handleChange(event, dataType, key)}/>
          </td>
        </tr>
      );
    } else if (dataType === 'REAL_NUMBER') {
      return (
        <tr style={{ backgroundColor:color, border: '1px solid grey' }} key={Math.random()}>
          <td>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <input type="number" onChange={(event) => this.handleChange(event, dataType, key)}/>
          </td>
        </tr>
      );
    } else if (dataType === 'MULTIPLE_CHOICE') {
      // checkbox
      const choices = data.data.split('|');
      return (
        <tr style={{ backgroundColor:color, border: '1px solid grey' }} key={Math.random()}>
          <td>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            {choices.map(choice => this.loadInputCheckbox('checkbox', choice, key))}
          </td>
        </tr>
      );
    } else if (dataType === 'SELECTION_CHOICE_1') {
      // Radio input
      const choices = data.data.split('|');
      return (
        <tr style={{ backgroundColor:color, border: '1px solid grey' }} key={Math.random()}>
          <td>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            {choices.map(choice => this.loadInputRadio('radio', key, choice))}
          </td>
        </tr>
      );
    } else if (dataType === 'SELECTION_CHOICE_2') {
      const choices = data.data.split('|');
      return (
        <tr style={{ backgroundColor:color, border: '1px solid grey' }} key={Math.random()}>
          <td>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <select onChange={(event) => this.handleChange(event, dataType, key)}>
              {choices.map(choice => (<option>{choice}</option>))}
            </select>
          </td>
        </tr>
      );
    }
  }
  render() {
    this.getColor();
    return (
      <table style = {{}}>
        <tbody>
          {rawData.msg_items.map(this.loadInputForm)}
        </tbody>
      </table>
    );
  }
}

export default SendForm;
