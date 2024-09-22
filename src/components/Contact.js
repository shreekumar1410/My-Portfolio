import React from 'react';
import './Styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Me</h2>
      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
