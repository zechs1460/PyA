import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Row } from "react-bootstrap";
import SectionHeader from "components/SectionHeader";
import FormItem from "components/FormItem";
import PageSection from "components/PageSection";
import "./Form.scss";

const Form = ({ className, frontmatter }) => {
    if (!frontmatter) {
        return null;
    }

    const { anchor, header: rootHeader, subheader: rootSubHeader, portfolios } = frontmatter;

    return (
        <PageSection className={clsx("portfolio-section", className)} id={anchor}>
            <Row>
                <SectionHeader header={rootHeader} subheader={rootSubHeader} />
            </Row>
            <Row>
                {portfolios.map(
                    ({ header, imageFileName, subheader }) => (
                        <FormItem
                            key={header}
                            imageFileName={imageFileName}
                            header={header}
                            subheader={subheader}
                        />
                    ),
                )}
            </Row>
        </PageSection>
    );
};

Form.propTypes = {
    className: PropTypes.string,
    frontmatter: PropTypes.object,
};

Form.defaultProps = {
    className: null,
    frontmatter: null,
};

export default Form;
