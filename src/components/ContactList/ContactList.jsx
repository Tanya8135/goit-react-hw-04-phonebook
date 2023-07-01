import PropTypes from 'prop-types';

import style from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(contact => (
      <li className={style.list} key={contact.id}>
        {contact.name} ({contact.number}){' '}
        {/* Оновлено: додано відображення номера */}
        <button
          className={style.btnDelete}
          type="button"
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
