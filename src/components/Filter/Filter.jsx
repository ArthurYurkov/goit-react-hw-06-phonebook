import { useDispatch, useSelector } from 'react-redux';
import { filterContacts, getFilter } from 'redux/contactsSlice';
import s from './styles.module.css';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch('');

  const handleFilter = e => dispatch(filterContacts(e.target.value));
  return (
    <>
      <div className={s.filterContainer}>
        <label>
          <input
            type="text"
            name="filter"
            className={s.filterInput}
            value={filter}
            onChange={handleFilter}
            placeholder="Filter (name)"
          />
        </label>
      </div>
    </>
  );
}
