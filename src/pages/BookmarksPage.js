import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import SmallNewsCardList from '../components/SmallNewsCardList';
import Loading from '../components/Loading';

const article_key = "articles";
const BookmarksPage = () => {
    const [articles, setArticles] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        setLoading(true);
        var list = [];
        let articles = {}
        if(!localStorage.getItem(article_key))
        {
            localStorage.setItem(article_key,JSON.stringify(articles));
        } 
        const json = JSON.parse(localStorage.getItem(article_key));
        Object.keys(json).forEach( (key) => {
            list.push(json[key]);
        } );
        setArticles(list);
        setTimeout(()=> setLoading(false),500);
        
        if(dirty)
        {
            setDirty(false);
        }
    }, [dirty]);

    return (
        loading? 
            <Loading /> 
            : 
            <Container fluid>
                <h1>
                    Favourites
                </h1>
                <SmallNewsCardList articles = {articles} domain = "all" setDirty = {setDirty} bookmarks = {true} deleteIcon = {true} showSource = {true}/>
                {articles.length < 1 && 
                    <h2>
                        You have no saved articles.
                    </h2>
                }
            </Container>
    )
}

export default BookmarksPage;