import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {
    return(
        <Link to="/"><button className="close-search" onClick={props.resetSeacrh}>Close</button></Link>
    )
}

export default HomePage;