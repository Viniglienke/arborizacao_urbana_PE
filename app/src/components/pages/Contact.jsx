import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Entre em Contato Conosco</h1>
        <p>Entre em contato para obter mais informações sobre nosso sistema.</p>
      </header>
      <section>
        <h2>Informações de Contato</h2>
        <p>Telefone: (49) 3664-0244</p>
        <p>Email: contato@biourb.com</p>
        <p>Endereço: Av. Araucária, 1234 - Maravilha, Santa Catarina</p>
      </section>
      <section>
        <h2>Formulário de Contato</h2>
        <form>
          <div className="input-field">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-field">
            <label htmlFor="message">Mensagem:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit">Enviar Mensagem</button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
