import { useState, useEffect, useMemo } from 'react';
import getType from './getType';

const hooks = store => ({ referToState, hasModel }) => {
  const callbackQueue = [];
  store.subscribe(() => {
    callbackQueue.forEach((fn) => {
      fn();
    });
  });
  const traverse = (handler) => {
    const traverseFn = (node) => {
      if (hasModel(node)) {
        return handler(node);
      }
      if (getType(node) === '[object Object]') {
        const result = {};
        Object.keys(node).forEach((key) => {
          result[key] = traverseFn(node[key]);
        });
        return result;
      }
      if (process.env.NODE_ENV === 'development') {
        // 未知节点的值会返回undefined
        console.warn(`the node "${node}" in schema has not be tracked in the store`);
      }
      return undefined;
    };
    return traverseFn;
  };

  // 计算state
  const getInitState = (modelSchemas, cacheStateMap) => traverse((node) => {
    const result = referToState(node);
    cacheStateMap.set(node, result);
    return result;
  })(modelSchemas);

  // 计算state
  // 这里会是一个遍历树操作，会对比每个节点(只针对modelSchemas的节点)
  const calcState = (modelSchemas, cacheStateMap, updated) => traverse((node) => {
    const result = referToState(node);
    const cacheResult = cacheStateMap.get(node);
    if (!Object.is(cacheResult, result)) {
      // 需要更新数据
      updated.flag = true;
      // 将不同的写入
      cacheStateMap.set(node, result);
    }
    return result;
  })(modelSchemas);

  return (modelSchemas) => {
    const initialGlobalState = useMemo(() => store.getState(), [modelSchemas]);
    const [globalState, globalStateUpdater] = useState(initialGlobalState);
    const [updated] = useState({
      flag: true,
    });
    // 每次渲染都会重置标记
    updated.flag = false;
    // 缓存map
    const [cacheStateMap] = useState(new Map());
    // 初始state
    const initialState = useMemo(() => getInitState(modelSchemas, cacheStateMap), [modelSchemas]);
    const [state, stateUpdater] = useState(initialState);
    useEffect(() => {
      const subscribeFn = () => {
        const currentState = store.getState();
        if (Object.is(globalState, currentState)) {
          return;
        }
        globalStateUpdater(currentState);
        const data = calcState(modelSchemas, cacheStateMap, updated);
        if (updated.flag) {
          stateUpdater(data);
        }
      };
      callbackQueue.push(subscribeFn);
      return () => {
        const num = callbackQueue.indexOf(subscribeFn);
        if (num !== -1) {
          callbackQueue.splice(num, 1);
        }
      };
    }, []);
    return [state];
  };
};

export default hooks;
