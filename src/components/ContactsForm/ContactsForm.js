import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './Form.module.css';

export default class ContactsForm extends Component {
  static propTypes = {
    formData: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { formData } = this.props;
    const id = nanoid();

    e.preventDefault();
    formData({ ...this.state, id });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className="label" htmlFor={this.nameInputId}>
          Name
        </label>
        <input
          className={s.input}
          type="text"
          name="name"
          id={this.nameInputId}
          value={name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className="label" htmlFor={this.numberInputId}>
          Number
        </label>
        <input
          className={s.input}
          type="tel"
          name="number"
          id={this.numberInputId}
          value={number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
