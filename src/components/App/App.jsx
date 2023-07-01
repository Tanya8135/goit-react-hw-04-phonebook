import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevProps.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleAddContact = contact => {
    const { contacts } = this.state;
    const { name, number } = contact;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existsContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existsContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    const filterValue = e.target.value;
    this.setState({ filter: filterValue });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={style['phone-book']}>
        <h1 className={style.name}>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2 className={style.name}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />

        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
