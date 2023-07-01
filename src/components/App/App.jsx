import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList';

import style from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const handleAddContact = contact => {
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

    setContacts(prevContacts => [
      ...prevContacts,
      { ...contact, id: nanoid() },
    ]);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = e => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={style['phone-book']}>
      <h1 className={style.name}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2 className={style.name}>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />

      <ContactList
        contacts={filterContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
