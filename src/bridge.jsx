import hooks from './hooks';
import classic from './classic';
import getType from './getType';

const bridge = store => ({ referToState, hasModel }) => {
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
  return {
    useGlue: hooks(store, callbackQueue)({ referToState, hasModel })({ traverse }),
    connect: classic(store, callbackQueue)({ referToState, hasModel })({ traverse }),
  };
};

export default bridge;
