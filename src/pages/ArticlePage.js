import React, { useEffect } from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { useState } from 'react';
import commentBox from 'commentbox.io';
import CustomBookmark from '../components/CustomBookmark';
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
  } from "react-share";
import ColorMap from '../components/ColorMapping';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';

// const CommentBox_ID = "5741876732755968-proj";
// const CommentBox_ID = "5178926779334656-proj";
const CommentBox_ID = "5680152080023552-proj";

const ArticlePage = (props) => {
    // const id = decodeURIComponent(props.match.params.id);
    const article = props.location.state.article;
    const id = article.id;
    console.log(id);
    const [dirty, setDirty] = useState(false);
    const [expanded, setExpanded] = useState(false);
    useEffect( () => {
        console.log(id);
        commentBox(CommentBox_ID,{
            createBoxUrl(boxId, pageLocation) {
                return id;
            }
            
        });

        if(dirty)
        {
            setDirty(false);
        }
    },[dirty,article,id])
    return (
        <Container>
            <Card className="my-card" >
                <Container fluid="xl">
                    <Row>
                        <Card.Body>
                            <Card.Title style={{fontStyle: "italic"}}>
                                {article.title}
                                
                            </Card.Title>
                        </Card.Body>
                    </Row>
                    <Row style={{padding: "0% 3%"}}>
                        <Col xs={6} md={9}>
                            <Card.Text style={{fontStyle: "italic"}}>
                                {article.publishedDate.slice(0,10)}
                            </Card.Text>
                        </Col>
                        <Col xs="auto">
                                <FacebookShareButton url={article.url} data-tip="Facebook" >
                                    <FacebookIcon round = {true} size={32}/>
                                </FacebookShareButton>
                                <TwitterShareButton url={article.url} data-tip="Twitter">
                                    <TwitterIcon round = {true} size={32}/>
                                </TwitterShareButton>
                                <EmailShareButton url={article.url} data-tip="Email">
                                    <EmailIcon round = {true} size={32}/>
                                </EmailShareButton>
                        </Col>
                                <CustomBookmark article = {article} setDirty={setDirty} colors="Crimson" /> 
                    </Row>
                    <Row>
                        <Col style={{paddingTop: "2%"}}>
                            <Card.Img src= {article.imageURL} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Body>
                                <Card.Text className={!expanded && "line-clamp"}>
                                    {article.description}
                                </Card.Text>
                                
                                {/* <Badge style = {{ backgroundColor: ColorMap(article.section)[0], color: ColorMap(article.section)[1]}} >
                                    {article.section.toUpperCase()}
                                </Badge>
                                {"  "}
                                <Badge style = {{ backgroundColor: ColorMap(article.source)[0], color: ColorMap(article.source)[1]}} >
                                    {article.source.toUpperCase()}
                                </Badge> */}
                            </Card.Body>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="clickable" onClick = { () => { expanded && window.scrollTo(0, 0); setExpanded(!expanded)} } style={{textAlign : "right" , paddingBottom: "5%"}}>
                                {
                                    expanded ? 
                                        <MdKeyboardArrowUp size={32} />
                                        : <MdKeyboardArrowDown size={32}/>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card>
            <div className="commentbox" />
            <ReactTooltip effect="solid" />
        </Container>
    )
}

export default ArticlePage;