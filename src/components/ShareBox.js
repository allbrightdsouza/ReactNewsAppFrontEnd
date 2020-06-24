import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
  } from "react-share";

const ShareBox = ({show,info,handleClose}) => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{info.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{textAlign: "center"}}>
                    <Container>
                        <Row>
                            <p>Share via</p>
                        </Row>
                        <Row>
                            <Col>
                                <FacebookShareButton url={info.url}>
                                    <FacebookIcon round = {true} />
                                </FacebookShareButton>
                            </Col>
                            <Col>
                                <TwitterShareButton url={info.url}>
                                    <TwitterIcon round = {true} />
                                </TwitterShareButton>
                            </Col>
                            <Col>
                                <EmailShareButton url={info.url}>
                                    <EmailIcon round = {true} />
                                </EmailShareButton>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    // }
    // return(<></>);
}


export default ShareBox;