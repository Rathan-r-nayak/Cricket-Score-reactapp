
import logo from '../assets/cricket_logo3.png';
import gif from '../assets/animation.gif';


const Header = () => {
    return (
        <header className="App-header">
            <a href="/">
                <img height="60" src={logo} alt="logo" />
            </a>
            <img height="80" src={gif} alt="CricMate"/>
        </header>
    )
}

export default Header;