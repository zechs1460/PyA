import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-bootstrap";
import Icon from "components/Icon";
import PageSection from "components/PageSection";

import { Formik, Form, Field, ErrorMessage } from 'formik'

const Contact = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null;
  }

  const { anchor, header, subheader, telephone, email, LFLabelMessage, LFmessagePlaceholder, LFSend } = frontmatter;

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }
  return (
    <PageSection className={className} id={anchor}>

      <Row className="justify-content-center">

        <Col lg={8} className="text-center">
          <h2 className="mt-0">{header}</h2>
          <hr className="divider my-4" />
          <p className="text-muted mb-5">{subheader}</p>
        </Col>

      </Row>

      <Row>

        <Col lg={4} className="ms-auto text-center">
          <Icon iconName="PhoneIcon" size="3x" className="text-muted mb-3" />
          <div className="d-block" href={`tel:${telephone}`}>
            {telephone}
          </div>
        </Col>

        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          onSubmit={
            (values, actions) => { fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode({ "form-name": "SSN-Lead-Form", ...values }) }).then(() => { alert('Success'); actions.resetForm() }).catch(() => { alert('Error'); }).finally(() => actions.setSubmitting(false)) }}
          validate={values => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const errors = {};
            if (!values.name) {
              errors.name = '*'
            }
            if (!values.email || !emailRegex.test(values.email)) {
              errors.email = '*'
            }
            if (!values.message) {
              errors.message = '*'
            }
            return errors;
          }}
        >
          <Form name="SSN-Lead-Form" className="vertical-menu" data-netlify={true}>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="name" className="vertical-menu h6">{LFLabelMessage}:</label>
            <Field className="vertical-menu" name="name" placeholder="Jane" />
            <ErrorMessage name="name" />

            <Field className="vertical-menu" name="email" placeholder="jane@acme.com" />
            <ErrorMessage name="email" />

            <Field className="vertical-menu" name="message" component="textarea" placeholder={LFmessagePlaceholder} />
            <ErrorMessage name="message" />

            <button className="vertical-menu" type="submit">{LFSend}</button>
          </Form>
        </Formik>

        <Col lg={4} className="me-auto text-center">
          <Icon iconName="EnvelopIcon" size="3x" className="text-muted mb-3" />
          <a className="d-block" href={`mailto:${email}`}>
            {email}
          </a>
        </Col>

      </Row>
    </PageSection>
  );
};

Contact.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
};

Contact.defaultProps = {
  className: null,
  frontmatter: null,
};

export default Contact;
