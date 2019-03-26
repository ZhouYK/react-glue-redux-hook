import React, { Component } from 'react';
import PropTypes from 'prop-types';
import service from '../models/app/service';
import List from './UserList/index';
import './style.less';

class App extends Component {
  static propTypes = {
    test: PropTypes.string,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    test: 'app component',
  }


  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this);
    this.state = {
      name: '',
      profession: '',
      pet: '',
    };
  }

  jump() {
    this.props.history.push('/hook');
  }

  shouldComponentUpdate() {
    return true;
  }

  handleOnChange = key => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  }

  handleAdd = (e) => {
    e.preventDefault();
    const { name, profession, pet } = this.state;
    let str;
    if (!name) {
      str = '请输入名字[name]';
    } else if (!profession) {
      str = '请输入职业[profession]';
    } else if (!pet) {
      str = '请输入喜欢的宠物[pet]';
    }
    if (str) {
      return window.alert(str);
    }
    const returnData = service.register({
      name,
      profession,
      pet,
    });
    return returnData;
  }

  render() {
    const {
      name, profession, pet,
    } = this.state;
    return (
      <div className="app">
        <ul>
          <li>
            <h3>
              当前为connect模式
            </h3>
          </li>
          <li>
            可以查看：
            <button type="button" onClick={this.jump}>
              最新的Hook模式
            </button>
          </li>
        </ul>
        <span>
          { this.props.test }
        </span>
        <section>
          <div className="row">
            <label htmlFor="name">
              姓名：
              <input value={name} onChange={this.handleOnChange('name')} type="text" id="name" placeholder="请输入姓名" />
            </label>
          </div>
          <div className="row">
            <label htmlFor="profession">
              职业：
              <input value={profession} onChange={this.handleOnChange('profession')} type="text" id="profession" placeholder="请输入职业" />
            </label>
          </div>
          <div className="row">
            <label htmlFor="pet">
              喜欢的宠物：
              <input value={pet} onChange={this.handleOnChange('pet')} type="text" id="pet" placeholder="请输入你喜欢的宠物" />
            </label>
          </div>
          <div className="row">
            <button type="button" onClick={this.handleAdd}>
              添加
            </button>
          </div>
        </section>
        <List test={this.props.test} />
      </div>
    );
  }
}

export default App;
