import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import SmallNewsCardList from '../components/SmallNewsCardList';

const SearchPage = (props) => {
    const keyword = props.match.params.keyword;

    const [articlesList,setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchData = async () => 
        {
            setLoading(true);
            try {
                const result = await fetch(`/api/search?keyword=${keyword}`);
                const body = await result.json();
                console.log(body);
                const articles = body.map((sourceList) => sourceList.elements);
                let articles1  = articles[0];
                articles1 = articles1.concat(articles[1]);
                setArticles(articles1);
            }
            catch (e)
            {
                console.log("Couldnt fetch");
                setArticles([]);
            }
            setLoading(false);
        }

        fetchData();
    }, [keyword]);
    console.log(keyword);
    return(
        loading? 
            <Loading /> 
            : 
            <Container fluid>
                <h1>
                    Results
                </h1>
                <SmallNewsCardList articles = {articlesList} domain = "all" />
            </Container>
    )
}

export default SearchPage;