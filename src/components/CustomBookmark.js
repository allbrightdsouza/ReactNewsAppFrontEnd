import React, { useState } from 'react';
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import {Toast} from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';

const article_key = "articles"

const checkIfExists = (element) =>
{
    const value = localStorage.getItem(article_key);
    if(value)
    {
        const articles = JSON.parse(value);
        console.log(typeof(articles));
        if(element.url in articles)
        {
            return true;
        }
    }
    return false;
}


const addToStorage = (article,setDirty,setShow) => {
    let articles = {}
    if(!localStorage.getItem(article_key))
    {
        localStorage.setItem(article_key,JSON.stringify(articles));
    } 

    articles = JSON.parse(localStorage.getItem(article_key));
    articles[article.url] = article;
    localStorage.setItem(article_key,JSON.stringify(articles));
    console.log("added to local storage");
    setShow(true);
    setDirty(true);
}

const removeFromStorage = (article,setDirty,setShow) => {
    let articles = JSON.parse(localStorage.getItem(article_key));
    delete articles[article.url];
    localStorage.setItem(article_key,JSON.stringify(articles));
    console.log("removed from local storage");
    setShow(true);
    setDirty(true);
}

const CustomBookmark = ({article,setDirty,deleteIcon,colors}) => {
    const [show,setShow] = useState(false);
    if(checkIfExists(article))
    {
        return (
            <>  
                {deleteIcon === true ? 
                    <MdDelete 
                        onClick = {(event) => { 
                            event.stopPropagation();
                            removeFromStorage(article,setDirty,setShow)
                        }} 
                        style={{ color : colors}}
                        size={20}
                        data-tip="Bookmark"
                    />
                    :
                    <div data-tip="Bookmark">
                            <BookmarkFill 
                                onClick = {(event) => { 
                                    event.stopPropagation();
                                    removeFromStorage(article,setDirty,setShow)
                                }} 
                                style={{ color : colors}}
                                size={20}
                            />
                    </div>
                }
                <Toast style= {{
                        position: 'absolute',
                        top: 5,
                        right: 5
                    }}
                    onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        {deleteIcon === true ? `Removing- ${article.title}` : `Adding - ${article.title}` }
                    </Toast.Header>
                </Toast>
                <ReactTooltip effect="solid" />
            </>
        );
    }

    return (
        <>
            <div data-tip="Bookmark">
                <Bookmark 
                    onClick = {(event) => {
                        event.stopPropagation();                
                        addToStorage(article,setDirty,setShow)
                    }} 
                    style={{ color : colors}}
                    size={20}

                />
            </div>
            <Toast style= {{
                    position: 'absolute',
                    top: 5,
                    right: 5
                }}
                onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    {`Removing - ${article.title}` }
                </Toast.Header>
            </Toast>
        </>
    );
}
export default CustomBookmark;