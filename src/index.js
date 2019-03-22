import { destruct as dst, gluer } from 'glue-redux';
import hooks from './hooks';

export const destruct = store => (model) => {
  const { reducers, referToState, hasModel } = dst(store)(model);
  const connect = hooks(store)({ hasModel, referToState });
  return {
    reducers,
    connect,
    referToState,
  };
};

export { gluer };
export default destruct;
