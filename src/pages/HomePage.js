import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import NewsCardList from '../components/NewsCardList';
import Loading from '../components/Loading';

const default_source = "guardian";
const default_domain = "all";
const HomePage = ({match}) => {
    const source = match.params.source === "" ? default_source : match.params.source;
    const domain = match.params.domain === "" ? default_domain: match.params.domain;

    const [loading, setLoading] = useState(true);
    const [articles,setArticles] = useState([]);

    useEffect( () => {
        const fetchData = async () => 
        {
            setLoading(true);
            console.log(source);
            try {
                const result = await fetch(`/api/section?source=${source}&domain=${domain}`);
                const body = await result.json();
                console.log(body.elements);
                setArticles(body.elements);
            }
            catch (e)
            {
                console.log("Couldnt fetch");
                setArticles([]);
            }
            setLoading(false);
        }

        fetchData();
    }, [source,domain]);

    return ( 
            loading? 
            <Loading /> 
            : 
            <Container fluid>
                <NewsCardList articles = {articles} domain = {domain} />
            </Container>
    )
}

export default HomePage;