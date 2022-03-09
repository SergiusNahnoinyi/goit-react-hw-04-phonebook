import PropTypes from 'prop-types';
import s from './Contacts.module.css';

export default function ContactsList({ contacts, onDelete }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={s.item}>
          {contact.name}: {contact.number}
          <button onClick={() => onDelete(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
