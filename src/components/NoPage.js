import {BrowserRouter,Routes, Switch, Route, Link } from 'react-router-dom';
import logo from '../assets/cricket_logo3.png';

const NoPage = () => {
    return(
        <div className="not-found">
            <div className="not-fount-content">
                <a href="/">
                    <img src={logo} alt="logo" className="logo"/>
                </a>
                <h1>404 - Not Found</h1>
                <p>
                    Sorry! We can't seem to find the resource you're looking for.
                </p>
                <p>
                    Please check that the website address is spelled correctly, or return to the home page.
                </p>
                <Link to="/" className="home-link">Go to Home</Link>
            </div>
            
        </div>
    )
}

export default NoPage;