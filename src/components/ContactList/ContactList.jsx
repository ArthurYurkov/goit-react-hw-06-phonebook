import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/contactSelectors';
import { deleteContacts } from 'redux/contactsSlice';
import s from './styles.module.css';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterList = () => {
    const normalValue = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalValue)
    );
  };

  const contactList = filterList();
  return (
    <>
      <div className={s.container}>
        {contactList.length > 0 ? (
          contactList.map(({ name, number, id }) => {
            return (
              <div key={id} className={s.contactList}>
                <div className={s.contactItem}>
                  <span>{name}</span>
                  <span>{number}</span>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteContacts(id))}
                    className={s.contactBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Nothing there</p>
        )}
      </div>
    </>
  );
}
