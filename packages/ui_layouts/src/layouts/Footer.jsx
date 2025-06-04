import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Fragment>
            <footer className="footer mt-auto py-3 bg-white text-center">
                <Container>
                    <span className="text-muted"> Copyright © <span id="year">{new Date().getFullYear()}</span> 
                        <Link to="https://dgt.gov.in/" className="text-dark fw-semibold">Directorate General of Training (HQ) </Link>.  All rights reserved. Developed <span className="bi text-primary"></span> by 
                        <Link to="https://nimi.gov.in/">
                            <span className="fw-semibold text-primary text-decoration">National Instructional Media Institute.</span>
                        </Link> 
                    </span>
                </Container>
            </footer>
        </Fragment>
    )
}

export default Footer
