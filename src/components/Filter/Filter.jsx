import PropTypes from 'prop-types';

import style from './Filter.module.css';

const Filter = ({ filter, onChange }) => (
  <label className={style.subTitle}>
    Find contacts by name
    <input
      className={style.input}
      type="text"
      name="filter"
      value={filter}
      onChange={onChange}
    />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
