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
