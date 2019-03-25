import { destruct as dst, gluer } from 'glue-redux';
import bridge from './bridge';

export const destruct = store => (model) => {
  const { reducers, referToState, hasModel } = dst(store)(model);
  const { useGlue, connect } = bridge(store)({ hasModel, referToState });
  return {
    reducers,
    useGlue,
    connect,
    referToState,
  };
};

export { gluer };
export default destruct;
