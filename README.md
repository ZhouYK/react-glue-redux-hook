# react-glue-redux-hook

glue-redux的连接库（hook版本）
> 像使用组件状态一样使用redux

## 安装
```bash
npm i react-glue-redux-hoos -P
```

## 查看示例
```bash
git clone https://github.com/ZhouYK/react-glue-redux-hook.git
npm install
npm start

然后访问 http://localhost:8888
```

## Api
* destruct

## destruct(store)(model) | [代码](https://github.com/ZhouYK/react-glux/blob/master/example/configStore.js)

### 入参
- store(必传)
  > redux的生成的store对象
- model(必传)
  > 自定义的数据对象，必须是plain object
  
### 返回
- { reducers, useGlue }
  > 包含reducers和connect属性的对象
  
   - reducers
      > redux中的reducer函数的对象集合，可直接用于combineReducers
   - useGlue
      > react hook，通过它来获取最新的redux的state

### 如何使用
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
### useGlue(model: glue)
> function component可使用
* model
> 必须是对象，从state拿到的数据将以该对象的展开结构注入组件

### connect(model: glue)(Component: ReactComponent)
> 所有component都可以使用
* model
> 必须是对象，从state拿到的数据将以该对象的展开结构注入组件

* Component
> react组件

### 如何使用

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
