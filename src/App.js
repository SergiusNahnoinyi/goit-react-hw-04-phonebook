import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import ContactsForm from './components/ContactsForm';
import Filter from './components/Filter';
import ContactsList from './components/ContactsList';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('Contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = formData => {
    const similarContact = contacts.find(
      ({ name }) => formData.name.toLowerCase() === name.toLowerCase(),
    );

    if (similarContact) {
      return toast.error(`${similarContact.name} is already in your list`);
    } else setContacts(contacts => [...contacts, formData]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <section className="phonebook">
      <h1 className="title">Phonebook</h1>
      <ContactsForm formData={formSubmitHandler} />

      <h2 className="title">Contacts</h2>
      <Filter stateFilterValue={filter} inputValue={changeFilter} />
      <ContactsList contacts={getFiltredContacts()} onDelete={deleteContact} />
      <ToastContainer />
    </section>
  );
}
