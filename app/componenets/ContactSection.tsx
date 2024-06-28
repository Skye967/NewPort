import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './css/ContactSection.module.css';

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);
    setError('');

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
    };

    emailjs.send(
      'service_okw9opy', // Replace with your EmailJS service ID
      'template_sfqz4eg', // Replace with your EmailJS template ID
      templateParams,
      'NlTawt15-UwfDa8sA' // Replace with your EmailJS user ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((err) => {
      console.error('FAILED...', err);
      setError('Failed to send message. Please try again later.');
    })
    .finally(() => {
      setSending(false);
    });
  };

  return (
    <section className={styles.contactSection}>
      <h1 className={styles.header}>Contact</h1>
      <h2 className={styles.subHeader}>Get in Touch</h2>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">Name:</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className={styles.label} htmlFor="email">Email:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.label} htmlFor="message">Message:</label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button className={styles.submitButton} type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {success && <p className={styles.success}>Message sent successfully!</p>}
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default ContactSection;
