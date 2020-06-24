import React, { useState } from 'react'
import {Card, Badge, Image} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import ShareBox from './ShareBox';
import { withRouter } from 'react-router-dom';
import {MdShare} from 'react-icons/md';
import CustomBookmark from './CustomBookmark';
import ColorMap from './ColorMapping';

const SmallNewsCardList = (props) =>  {
    // const displayBookmarks = setDisplayBookmarks(props.location.pathname);
    const articles = props.articles;
    const domain = props.domain;
    const setDirty = props.setDirty;
    const bookmarks = props.bookmarks;
    const deleteIcon = props.deleteIcon;
    const showSource = props.showSource;
    const [shareInfo, setURL] = useState({"url" : "" , "title" : ""});
    const [showShareModal, setShowShareModal] = useState(false);
    const showState = (state) => setShowShareModal(state);
    const showShareModalWithURL = (event,url,title) => {
        event.stopPropagation();
        setURL({ "url" : url, "title" : title});
        showState(true);
    };
    
    // const setDisplayBookmarks = (path) => {
    //     const bookmark_regex = /\/bookmarks$/g;
    //     const match_bookmark = path.match(bookmark_regex);
    //     return match_bookmark != null;
    // }
    const RedirectToArticle = (article) => {

        props.history.push({
            pathname: `/article/${encodeURIComponent(article.id)}`,
            state: {"article" : article}
        });
    }
    console.log( props.history)
    return (
    <Row>
        <ShareBox show={showShareModal} info={shareInfo} handleClose={() => showState(false)}/>

    { articles.map( (article,key) => {
                return (
                    // <Card style={{ height: '18em' }}>
                    // <Row key={key}>
                        <Col xl={3} key={key}>
                                <Card className="clickable" onClick = {() => RedirectToArticle(article)} >
                                    <Container fluid="xl">
                                            <Row style={{padding: "5%"}}>
                                                <Card.Title style={{fontStyle: "italic"}}>
                                                    {article.title}
                                                    {/* {" "} */}

                                                    <span>
                                                        {" "}
                                                        <MdShare onClick={(event) => showShareModalWithURL(event,article.url,article.title) } data-tip="Share"/>
                                                        {" "}
                                                        {
                                                            (() => {
                                                                if(bookmarks === true)
                                                                    return(
                                                                            <CustomBookmark article = {article} setDirty={setDirty} deleteIcon = {deleteIcon}/>
                                                                    );
                                                            })()
                                                        }
                                                    </span>    
                                                </Card.Title>
                                            </Row>
                                            
                                            <Image className="my-card-Img" src= {article.imageURL} thumbnail />

                                            <Row style={{padding : "5% 1%"}}>
                                                <Col>
                                                    <Card.Text style={{fontSize: "0.9em", fontStyle : "italic"}}>
                                                        {article.publishedDate.slice(0,10)}
                                                    </Card.Text>
                                                </Col>
                                                <Col xs="auto">
                                                    <Badge style = {{ backgroundColor: ColorMap(article.section)[0], color: ColorMap(article.section)[1]}} >
                                                        {` ${ ((domain === "all") ? article.section : domain ).toUpperCase() }`}
                                                    </Badge>
                                                    {"  "}
                                                    { showSource &&
                                                        <Badge style = {{ backgroundColor: ColorMap(article.source)[0], color: ColorMap(article.source)[1]}} >
                                                            {article.source.toUpperCase()}
                                                        </Badge>
                                                    }
                                                </Col>
                                            </Row>
                                    </Container>
                                </Card>
                        </Col>
                    // </Row>
                );
            })}
        </Row>
    );

}
export default withRouter(SmallNewsCardList);