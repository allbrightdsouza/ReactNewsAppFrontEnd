import React, { useState } from 'react'
import {Card, Badge, Image} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
import ShareBox from './ShareBox';
import { withRouter } from 'react-router-dom';
import {MdShare} from 'react-icons/md';
import CustomBookmark from './CustomBookmark';
import ColorMap from './ColorMapping';
import ReactTooltip from 'react-tooltip';

const NewsCardList = (props) =>  {
    const articles = props.articles;
    const domain = props.domain;
    const setDirty = props.setDirty;
    const bookmarks = props.bookmarks;
    const deleteIcon = props.deleteIcon;
    const [shareInfo, setURL] = useState({"url" : "" , "title" : ""});
    const [showShareModal, setShowShareModal] = useState(false);
    const showState = (state) => setShowShareModal(state);
    const showShareModalWithURL = (event,url,title) => {
        event.stopPropagation();
        setURL({ "url" : url, "title" : title});
        showState(true);
    };
    
    const RedirectToArticle = (article) => {

        props.history.push({
            pathname: `/article/${encodeURIComponent(article.id)}`,
            state: {"article" : article}
        });
    }
    console.log( props.history)
    return (
    <>

    { articles.map( (article,key) => {
        return (
                    // <Card style={{ height: '18em' }}>
                    // <Row key={key}>
                    //     <Col xl>
                    <Card className="clickable" onClick = {() => RedirectToArticle(article)} >
                        {/* <Container> */}
                                    <Row>
                                        <Col lg={4}>
                                            <Card.Body>
                                                <Image sm className="my-card-Img" src= {article.imageURL} thumbnail />    
                                            </Card.Body>
                                            {/* <Card.Img className="my-card-Img" src= {article.imageURL} thumbnail /> */}
                                        </Col >
                                        <Col lg={8}>
                                            <Card.Body>
                                                <Card.Title style={{fontStyle: "italic"}}>
                                                    {article.title}
                                                    {" "}
                                                    <MdShare onClick={(event) => showShareModalWithURL(event,article.url,article.title) } data-tip="Share"/>
                                                    {
                                                        (() => {
                                                            if(bookmarks === true)
                                                            return(
                                                                <>
                                                                        {" "}
                                                                        <CustomBookmark article = {article} setDirty={setDirty} deleteIcon = {deleteIcon}/>
                                                                    </>
                                                                );
                                                            })()
                                                        }
                                                </Card.Title>
                                                <Card.Text className="line-clamp">
                                                    {article.description}
                                                </Card.Text>
                                            </Card.Body>
                                                {/* <Card.Text>
                                                    <Row>
                                                        <Col xs={9}>
                                                            {article.publishedDate.slice(0,10)}
                                                        </Col>
                                                        <Col xs="auto">
                                                            <Badge style = {{ backgroundColor: ColorMap(article.section)[0], color: ColorMap(article.section)[1]}} >
                                                                {` ${ ((domain === "all") ? article.section : domain ).toUpperCase() }`}
                                                            </Badge>
                                                            {" "}
                                                            <Badge style = {{ backgroundColor: ColorMap(article.source)[0], color: ColorMap(article.source)[1]}} >
                                                                {article.source.toUpperCase()}
                                                            </Badge>
                                                        </Col>
                                                    </Row>
                                                </Card.Text> */}
                                            <Row style={{padding : "5% 5%"}}>
                                                <Col>
                                                    <Card.Text style={{fontSize: "0.9em", fontStyle : "italic"}}>
                                                        {article.publishedDate.slice(0,10)}
                                                    </Card.Text>
                                                </Col>
                                                <Col xs="auto">
                                                    <Badge style = {{ backgroundColor: ColorMap(article.section)[0], color: ColorMap(article.section)[1]}} >
                                                        {` ${ ((domain === "all") ? article.section : domain ).toUpperCase() }`}
                                                    </Badge>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {/* </Container> */}
                                    <ReactTooltip effect="solid" />
                                </Card>
                        // </Col>
                        // </Row>
                        );
                    })}
        <ShareBox show={showShareModal} info={shareInfo} handleClose={() => showState(false)}/>
    </>
    );

}
export default withRouter(NewsCardList);