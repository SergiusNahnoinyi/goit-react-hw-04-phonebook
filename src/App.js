import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import ContactsForm from './components/ContactsForm';
import Filter from './components/Filter';
import ContactsList from './components/ContactsList';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageContacts = JSON.parse(localStorage.getItem('Contacts'));

    if (localStorageContacts) {
      this.setState({ contacts: localStorageContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = formData => {
    const { contacts } = this.state;
    const similarContact = contacts.find(
      ({ name }) => formData.name.toLowerCase() === name.toLowerCase(),
    );

    if (similarContact) {
      return toast.error(`${similarContact.name} is already in your list`);
    } else
      this.setState(({ contacts }) => ({
        contacts: [...contacts, formData],
      }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFiltredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filtredContacts = this.getFiltredContacts();

    return (
      <section className="phonebook">
        <h1 className="title">Phonebook</h1>
        <ContactsForm formData={this.formSubmitHandler} />

        <h2 className="title">Contacts</h2>
        <Filter stateFilterValue={filter} inputValue={this.changeFilter} />
        <ContactsList
          contacts={filtredContacts}
          onDelete={this.deleteContact}
        />
        <ToastContainer />
      </section>
    );
  }
}
