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

  const { anchor, header, subheader, telephone, email, LFLabelMessage, LFMessagePlaceholder, LFSend } = frontmatter;

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
              errors.LFname = '*'
            }
            if (!values.LFemail || !LFemailRegex.test(values.LFemail)) {
              errors.LFemail = '*'
            }
            if (!values.LFmessage) {
              errors.LFmessage = '*'
            }
            return errors;
          }}
        >
          <Form name="contact-demo" className="vertical-menu" data-netlify={true}>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="LFname" className="vertical-menu h6">{LFLabelMessage}:</label>
            <Field className="vertical-menu" name="LFname" placeholder="Jane" />
            <ErrorMessage name="LFname" />

            <Field className="vertical-menu" name="LFemail" placeholder="jane@acme.com" />
            <ErrorMessage name="LFemail" />

            <Field className="vertical-menu" name="LFmessage" component="textarea" placeholder={LFMessagePlaceholder} />
            <ErrorMessage name="LFmessage" />

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
