import React from "react";
import PropTypes from "prop-types";

import { Formik, Form, Field, ErrorMessage } from 'formik'

import "./LeadForm.scss";

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const LeadForm = ({
  LFnameLabel,
  LFemailLabel,
  LFmessageLabel,
  LFsendLabel,
}) => {

  <Formik
    initialValues={{
      LFname: '',
      LFemail: '',
      LFmessage: '',
    }}
    onSubmit={
      (values, actions) => { fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode({ "form-name": "contact-demo", ...values }) }).then(() => { alert('Success'); actions.resetForm() }).catch(() => { alert('Error'); }).finally(() => actions.setSubmitting(false)) }}
    validate={values => {
      const LFemailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const errors = {};
      if (!values.LFname) {
        errors.LFname = 'Name Required'
      }
      if (!values.LFemail || !LFemailRegex.test(values.LFemail)) {
        errors.LFemail = 'Valid Email Required'
      }
      if (!values.LFmessage) {
        errors.LFmessage = 'Message Required'
      }
      return errors;
    }}
  >
    <Form name="contact-demo" className="vertical-menu" data-netlify={true}>
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="LFname" className="vertical-menu">{LFnameLabel}: </label>
      <Field className="vertical-menu" name="LFname" placeholder="Jane" />
      <ErrorMessage style={{ color: "red" }} name="LFname" />

      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="LFemail" className="vertical-menu">{LFemailLabel}: </label>
      <Field className="vertical-menu" name="LFemail" placeholder="jane@acme.com" />
      <ErrorMessage style={{ color: "red" }} name="LFemail" />

      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="LFmessage" className="vertical-menu">{LFmessageLabel}: </label>
      <Field className="vertical-menu" name="LFmessage" component="textarea" placeholder="What can we do for you? / ¿Qué podemos hacer por ti?" />
      <ErrorMessage style={{ color: "red" }} name="LFmessage" />

      <button className="vertical-menu" type="submit">{LFsendLabel}</button>
    </Form>
  </Formik>
}

LeadForm.propTypes = {
  LFnameLabel: PropTypes.string,
  LFemailLabel: PropTypes.string,
  LFmessageLabel: PropTypes.string,
  LFsendLabel: PropTypes.string,
};

LeadForm.defaultProps = {
  LFnameLabel: "",
  LFemailLabel: "",
  LFmessageLabel: "",
  LFsendLabel: "",
};

export default LeadForm;
