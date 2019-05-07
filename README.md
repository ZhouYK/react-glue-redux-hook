<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg"></a>
[![build](https://img.shields.io/travis/com/ZhouYK/react-glue-redux-hook.svg)](https://travis-ci.com/ZhouYK/glue-redux)
[![codecov](https://codecov.io/gh/ZhouYK/react-glue-redux-hook/branch/master/graph/badge.svg)](https://codecov.io/gh/ZhouYK/react-glue-redux-hook)
[![NPM version](https://img.shields.io/npm/v/react-glue-redux-hook.svg?style=flat)](https://www.npmjs.com/package/glue-redux)
[![NPM downloads](http://img.shields.io/npm/dm/react-glue-redux-hook.svg?style=flat)](https://www.npmjs.com/package/glue-redux)
[![package size](https://img.shields.io/bundlephobia/minzip/react-glue-redux-hook.svg)]()
[![license](https://img.shields.io/github/license/ZhouYK/react-glue-redux-hook.svg)]()

# react-glue-redux-hook

glue-redux的连接库（包含HOC和hook两种方式）
> 像使用组件状态一样使用redux

## 安装
```bash
npm i react-glue-redux-hook -P
```

## 查看示例
```bash
git clone https://github.com/ZhouYK/react-glue-redux-hook.git
npm install
npm start

然后访问 http://localhost:8888
```
## API
### destruct(store)(models) | [代码](https://github.com/ZhouYK/react-glux/blob/master/example/configStore.js)

#### 入参

| 参数名 | 类型 | 用途 | 示例
| :----: | :----: | :----: | :----:
| store | object(redux的store) | 耦合数据模型 | -
| models | object | 数据模型 | { [index: string]: GluerReturn or any }
  
#### 返回
- { reducers, useGlue, connect }

| 属性名 | 类型 | 用途 | 示例 
| :----: | :----: | :----: | :----:
| reducers | object | reducer组成的对象 | { name: (state, action) => {}, ... } 
| useGlue | function | 自定义hook | useGlue(model)
| connect | function | HOC | connect(model)(Component)

#### 使用destruct
```js
  // store.js
  import {
    createStore, combineReducers,
  } from 'redux';
  import app from './models/app/model';
  import book from './models/book/model';
  import DevTool from './DevTool';
  import { destruct } from '../src';
  
  const modelSchemas = { app, book };
  const store = createStore(() => {}, {}, DevTool().instrument());
  const { reducers, useGlue, connect } = destruct(store)(modelSchemas);
  store.replaceReducer(combineReducers(reducers));
  
  export {
    store,
    useGlue,
    connect,
    modelSchemas,
  };

```
## 完整的使用栗子

* 先定义数据模型

```js
 // model.js
 import { gluer } from 'react-glue-redux-hook';
 
 const users = gluer((data, state) => [data, ...state], []);
 
 const app = {
   users,
 };
 export default app;

```

* 生成store

```js
  // store.js
  import {
    createStore, combineReducers,
  } from 'redux';
  import app from './models/app/model';
  import book from './models/book/model';
  import DevTool from './DevTool';
  import { destruct } from '../src';
  
  const modelSchemas = { app, book };
  const store = createStore(() => {}, {}, DevTool().instrument());
  const { reducers, useGlue, connect } = destruct(store)(modelSchemas);
  store.replaceReducer(combineReducers(reducers));
  
  export {
    store,
    useGlue,
    connect,
    modelSchemas,
  };

```

* 在组件中注入数据（hook模式）

```jsx
  import React from 'react';
  import pt from 'prop-types';
  import { useGlue, modelSchemas } from '../../store';
  
  const renderUsers = (users) => {
    if (Object.is(users.length, 0)) {
      return (
        <section>
          no users
        </section>
      );
    }
    const list = users.map((user, index) => (
      /* eslint-disable react/no-array-index-key */
      <section
        key={index}
      >
        <div className="row">
          <h4>
            user
            {' '}
            {index}
            :
          </h4>
          <p>
            name:
            {user.name}
          </p>
          <p>
            profession：
            {user.profession}
          </p>
          <p>
            pet:
            {user.pet}
          </p>
        </div>
      </section>
    ));
    return list;
  };
  
  const Index = (props) => {
    // 获取redux中的state
    const [modelState] = useGlue(modelSchemas.app);
    return (
      <section>
        <span>
          { props.test }
        </span>
        { renderUsers(modelState.users) }
      </section>
    );
  };
  
  Index.propTypes = {
    test: pt.string,
  };
  
  Index.defaultProps = {
    test: 'userList component',
  };
  
  export default Index;

```
* 在组件中注入数据（connect模式）

```jsx
  // UserList.jsx
  import React, { Component } from 'react';
  import pt from 'prop-types';
  import { connect } from './store';
  import model from './model';
  
  class UserList extends Component {
    static propTypes = {
      users: pt.array.isRequired,
    }
  
    renderUsers = () => {
     ...
    }
  
    render() {
      return (
        <section>
          { this.renderUsers() }
        </section>
      );
    }
  }
  
  export default connect(model)(UserList);// model的结构为{ users }，注入组件的属性则为this.props.users
```

## Author
[ZhouYK](https://github.com/ZhouYK)

## License
[MIT licensed](https://github.com/ZhouYK/react-glue-redux-hook/blob/master/LICENSE) 
