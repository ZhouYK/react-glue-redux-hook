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

  return (modelSchemas) => {
    let isUpdated = false;
    // 缓存map
    const cacheStateMap = useMemo(() => new Map(), [modelSchemas]);
    // 计算state
    const getInitState = useMemo(() => () => traverse((node) => {
      const result = referToState(node);
      cacheStateMap.set(node, result);
      return result;
    })(modelSchemas), [modelSchemas]);
    // 计算state
    const calcState = useMemo(() => () => traverse((node) => {
      const result = referToState(node);
      const cacheResult = cacheStateMap.get(node);
      if (!Object.is(cacheResult, result)) {
        // 需要更新数据
        isUpdated = true;
        // 将不同的写入
        cacheStateMap.set(node, result);
      }
      return result;
    })(modelSchemas), [modelSchemas]);
    // 初始state
    const initialState = useMemo(() => getInitState(), [modelSchemas]);
    const [state, stateUpdater] = useState(initialState);
    useEffect(() => {
      const subscribeFn = () => {
        const data = calcState();
        if (isUpdated) {
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
