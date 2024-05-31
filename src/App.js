import {BrowserRouter,Routes, Switch, Route } from 'react-router-dom';
import Base from './components/Base.js';
import MatchScoreDetails from './components/MatchScoreDetails.js';
import NoPage from './components/NoPage.js';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base />} />
                <Route path="/match/:matchId" element={<MatchScoreDetails />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;