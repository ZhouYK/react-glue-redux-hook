import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import service from '../models/app/service';
import List from './UserList';
import './style.less';

const changeFactory = updater => e => updater(e.target.value);

const handleAdd = (name, profession, pet) => (e) => {
  e.preventDefault();
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
};

const App = (props) => {
  const [name, nameUpdater] = useState('');
  const handleName = useMemo(() => changeFactory(nameUpdater), [nameUpdater]);
  const [profession, professionUpdater] = useState('');
  const handleProfession = useMemo(() => changeFactory(professionUpdater), [professionUpdater]);
  const [pet, petUpdater] = useState('');
  const handlePet = useMemo(() => changeFactory(petUpdater), [petUpdater]);
  return (
    <div className="app">
      <Link to="/test">
        跳转测试
      </Link>
      <span>
        { props.test }
      </span>
      <section>
        <div className="row">
          <label htmlFor="name">
            姓名：
            <input value={name} onChange={handleName} type="text" id="name" placeholder="请输入姓名" />
          </label>
        </div>
        <div className="row">
          <label htmlFor="profession">
            职业：
            <input value={profession} onChange={handleProfession} type="text" id="profession" placeholder="请输入职业" />
          </label>
        </div>
        <div className="row">
          <label htmlFor="pet">
            喜欢的宠物：
            <input value={pet} onChange={handlePet} type="text" id="pet" placeholder="请输入你喜欢的宠物" />
          </label>
        </div>
        <div className="row">
          <button type="button" onClick={handleAdd(name, profession, pet)}>
            添加
          </button>
        </div>
      </section>
      <List test={props.test} />
    </div>
  );
};
App.propTypes = {
  test: PropTypes.string,
};
App.defaultProps = {
  test: 'app component',
};
export default App;
