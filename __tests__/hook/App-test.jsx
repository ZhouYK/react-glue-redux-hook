import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import { useGlue, modelSchemas } from '../../example/store';

afterEach(cleanup);

describe('useGlue hook test', () => {
  test('should get app model initial state', () => {
    const { result } = renderHook(() => useGlue(modelSchemas.app));
    expect(result.current[0]).toEqual({
      users: [],
    });
  });
  test('should update app model state', () => {
    const { result } = renderHook(() => useGlue(modelSchemas.app));
    expect(result.current[0]).toEqual({
      users: [],
    });
    const person = {
      name: '小明',
      profession: 'rd',
      pet: '老虎',
    };
    act(() => modelSchemas.app.users(person));
    expect(result.current[0]).toEqual({
      users: [person],
    });
  });
});
