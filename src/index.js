import { destruct as dst, gluer } from 'glue-redux';
import hooks from './hooks';

export const destruct = store => (model) => {
  const { reducers, referToState, hasModel } = dst(store)(model);
  const useGlue = hooks(store)({ hasModel, referToState });
  return {
    reducers,
    useGlue,
    referToState,
  };
};

export { gluer };
export default destruct;
