import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import "./Contact.scss";

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const Contact = () => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
    }}
    onSubmit={
      (values, actions) => { fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode({ "form-name": "contact-demo", ...values }) }).then(() => { alert('Success'); actions.resetForm() }).catch(() => { alert('Error'); }).finally(() => actions.setSubmitting(false)) }}
    validate={values => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const errors = {};
      if (!values.name) {
        errors.name = 'Name Required'
      }
      if (!values.email || !emailRegex.test(values.email)) {
        errors.email = 'Valid Email Required'
      }
      if (!values.message) {
        errors.message = 'Message Required'
      }
      return errors;
    }}
  >
    <Form name="contact-demo" className="vertical-menu" data-netlify={true}>
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name" className="vertical-menu">Name: </label>
      <Field className="vertical-menu" name="name" placeholder="Jane" />
      <ErrorMessage style={{ color: "red" }} name="name" />

      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="email" className="vertical-menu">Email: </label>
      <Field className="vertical-menu" name="email" placeholder="jane@acme.com" />
      <ErrorMessage style={{ color: "red" }} name="email" />

      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="message" className="vertical-menu">Message: </label>
      <Field className="vertical-menu" name="message" component="textarea" placeholder="What can we do for you? / ¿Qué podemos hacer por ti?" />
      <ErrorMessage style={{ color: "red" }} name="message" />

      <button className="vertical-menu" type="submit">Send</button>
    </Form>
  </Formik>
)

export default Contact;
