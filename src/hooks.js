import {
  useState, useEffect, useMemo, useCallback,
} from 'react';

const hooks = (store, callbackQueue) => ({ referToState }) => ({ traverse }) => {
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
    const initialGlobalState = useMemo(() => store.getState(), []);
    const [globalState, globalStateUpdater] = useState(initialGlobalState);
    const [updated] = useState({
      flag: true,
    });
    // 每次渲染都会重置标记
    updated.flag = false;
    // 缓存map
    const [cacheStateMap] = useState(new Map());
    // 初始state
    const initialState = useMemo(() => getInitState(modelSchemas, cacheStateMap), [cacheStateMap, modelSchemas]);
    const [state, stateUpdater] = useState(initialState);
    // store更新的回调
    const subscribeFn = useCallback(() => {
      const currentState = store.getState();
      if (Object.is(globalState, currentState)) {
        return;
      }
      globalStateUpdater(currentState);
      const data = calcState(modelSchemas, cacheStateMap, updated);
      if (updated.flag) {
        stateUpdater(data);
      }
    }, []);
    if (!callbackQueue.includes(subscribeFn)) {
      callbackQueue.push(subscribeFn);
    }
    useEffect(() => () => {
      const num = callbackQueue.indexOf(subscribeFn);
      if (num !== -1) {
        callbackQueue.splice(num, 1);
      }
    }, []);
    return [state];
  };
};

export default hooks;
