import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Form} from 'react-bootstrap';
import { withRouter, Link } from "react-router-dom";
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import AsyncSelect from 'react-select/async';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import ReactTooltip from 'react-tooltip';

const bing_key = '7a80ce509dd94c3392300cae6e0a4d16';
const bing_url = 'https://adsouza-newsapp.cognitiveservices.azure.com/bing/v7.0/suggestions';

// const bing_key = '41fe145456a64f6e8c84bb2b69264866';
// const bing_url = 'https://news-app-allbright-dsouza.cognitiveservices.azure.com/bing/v7.0/suggestions';

const guardian_src = "guardian";
const ny_src = "nytimes";

const getDefaultSrc = (path) => {
    const regex = /\/top\/(\w)+\//g;
    const match = path.match(regex);
    //const rest = paragraph.slice(paragraph.search("top")+4);
    let source  = [ny_src,guardian_src];
    if(match !== null)
    {
        const pathSrc = match[0].slice(5,-1);
        source[0] = pathSrc === guardian_src ? guardian_src : ny_src;
        source[1] = pathSrc === guardian_src ?  ny_src : guardian_src;
    }
    return source;
}

const CustomNavBar = (props) => {
    const path = props.location.pathname;
    const defaultSource  = getDefaultSrc(path);
    const [value, setValue] = useState(null);
    const [showToggle, setShowToggle] = useState(false);
    const [isBookmarkPage, setIsBookmarkPage] = useState(false);
    const [source,setSource] = useState(defaultSource[0]);
    const [nextSource,setNextSource] = useState(defaultSource[1]);
    const [options, setOptions] = useState([]);
    const [queryString, setQueryString] = useState("");
    var counter = 0;
    const clearValue = () => {
        setValue(null);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        const regex = /\/top\/(\w)+\//g;
        const match_top = path.match(regex);
        setShowToggle(match_top !== null);
        const bookmark_regex = /\/bookmarks$/g;
        const match_bookmark = path.match(bookmark_regex);
        setIsBookmarkPage(match_bookmark != null);
        const search_regex =  /\/search\/(\w)+$/g;
        if(!path.match(search_regex))
            clearValue();
    },[path,value]);
    const getQuery = (newValue) => {
        setQueryString(newValue);
        // setTimeout(() => {
        //     setQueryString(newValue);
        // }, 1000);
    }


    const handleSelection = (keyword) =>
    {
        setValue(keyword);
        console.log("This is keyword: ",keyword.value);
        props.history.push(`/search/${keyword.value}`);
    } 

    function delay(time) {
        var promise = new Promise(function(resolve, reject) {
        console.log("time start");
          setTimeout(function() {
            console.log("time end");
            resolve(true);
          },time);
        });
        return promise;
     }

    // const loadOptions = (inputValue, callback) => {
    // setTimeout(() => {
    //     callback(bingSuggest(inputValue));
    // }, 1000);
    //     return o
    // };

    function debounce(func, wait, immediate) {
        var timeout;
      
        return function executedFunction() {
          var context = this;
          var args = arguments;
              
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
      
          var callNow = immediate && !timeout;
          
          clearTimeout(timeout);
      
          timeout = setTimeout(later, wait);
          
          if (callNow) func.apply(context, args);
        };
      };
    
    const throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function() {
        const context = this
        const args = arguments
        if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now()
        } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
            if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
            }
        }, limit - (Date.now() - lastRan))
        }
    }
    }
    const bingSuggest = async (inputValue) => {
        const curCounter = counter;
        console.log("count",curCounter,inputValue);
        counter += 1;
        await delay(1000 *curCounter);
        // const value = queryString;
        const value = inputValue;
        console.log(inputValue);
        const url = bing_url + "?q=" + value;
        // if(queryString)
        // {
        //     return 
        // }
        if(false)
            return [
                {'value' : 'trump', 'label' : 'Trump'},
                {'value' : 'verizon', 'label' : 'Verizon'},
                {'value' : 'china', 'label' : 'China'},
                {'value' : 'india', 'label' : 'India'}
            ];
        const result = await fetch(url,{
            headers: {
                "Ocp-Apim-Subscription-Key": bing_key
            }
        });
    
        let queries = [];
        const data = await result.json();
        console.log(data);
        if(data._type === "Suggestions")
        {
            queries = data.suggestionGroups[0].searchSuggestions.map((res) => ({'value' : res.query, 'label': res.query[0].toUpperCase()+res.query.slice(1)}));
            // setOptions(queries);
            counter -= 1;
            if(counter < 1)
                counter = 1;
            console.log("Reduce coune", counter);
            console.log(queries);
        }
        else 
        {
            // bingSuggest();
        }
        return queries;
    }

    //const promiseOptions = inputValue =>
    const promiseOptions = inputValue => new Promise(resolve => {
      setTimeout(() => {
        const result = bingSuggest(inputValue);
        resolve(result);
      }, 1000);
    });

    const toggleSources = () => 
    {
        // console.log("cur source " + source + "nextsrc " + nextSource);
        if (source === guardian_src)
        {
            setSource(ny_src);
            setNextSource(guardian_src);
        }
        else 
        {
            setSource(guardian_src);
            setNextSource(ny_src);
        }
        console.log("New source " + source);
        
        // console.log("props " +history);
        // const srcRegex = /\/(\w)+\/$/g;
        console.log("Source : " + props.location.pathname);
        const regex = /\/(\w)+$/g;
        const domainName = props.location.pathname.match(regex)[0].slice(1);
        props.history.push(`/top/${nextSource}/${domainName}`);
    }
    
    return (
        <div id="main-nav-bar">
            <Navbar bg="primary" variant="dark" expand="lg">
                <AsyncSelect 
                    cacheOptions
                    loadOptions = {bingSuggest}
                    onChange={handleSelection}
                    noOptionsMessage={() => "No Match"}
                    placeholder={"Enter keyword..."}
                    // options={options}
                    value = {value}
                />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    {/* <Form inline>
                    </Form> */}
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={`/top/${source}/all`}>Home</Nav.Link>
                        <Nav.Link as={Link} to={`/top/${source}/world`}>World</Nav.Link>
                        <Nav.Link as={Link} to={`/top/${source}/politics`}>Politics</Nav.Link>
                        <Nav.Link as={Link} to={`/top/${source}/business`}>Business</Nav.Link>
                        <Nav.Link as={Link} to={`/top/${source}/technology`}>Technology</Nav.Link>
                        <Nav.Link as={Link} to={`/top/${source}/sports`}>Sports</Nav.Link>
                        {/* <Link to={`/${source}/sports`}>Sport</Link> */}
                    </Nav>
                    
                    <Nav>
                        <Nav.Link as={Link }to={`/bookmarks`} data-tip="Bookmark" data-place="bottom" st>
                            {isBookmarkPage ? 
                                <BookmarkFill style={{color : "white"}} size={20}/> :
                                <Bookmark style={{color : "white"}} size={20}/> 
                            }
                        </Nav.Link>
                    </Nav>
                    
                    {showToggle &&
                        <>
                            <Navbar.Text column sm="1" style={{color : "white"}}>
                                NY Times
                            </Navbar.Text>
                            
                            <Nav class="mx-2">

                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label=""
                                checked = {(() => {
                                    // console.log(source + " : Source " + ny_src + " : ny, state" + (source === ny_src) );
                                    if(source === guardian_src)
                                    {
                                        return  true ;
                                    }
                                    return false;
                                })()}
                                onChange = {() => toggleSources()}
                                />
                            </Nav>

                            <Navbar.Text column sm="1" style={{color : "white"}}>
                                Guardian
                            </Navbar.Text>
                        </>
                    }
                </NavbarCollapse>
            </Navbar>
            <ReactTooltip effect="solid" />
        </div>
    )
}

export default withRouter(CustomNavBar);