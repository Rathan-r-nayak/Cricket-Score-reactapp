import '../App.css';
import { useState,useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import MatchInfo from './MatchInfo';
import LatestNews from './LatestNews';
import MainNews from './MainNews';
import Advertisement from './Advertisement';
import Schedule from './Schedules';

// const link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'https://fonts.googleapis.com/css2?family=Rubik+Marker+Hatch&family=Sixtyfour&display=swap';
// document.head.appendChild(link);

// if(document.getElementById('mode') === 'light'){
  
// }



function Base() {
  // const history = useHistory();

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
        headers: {
          'X-RapidAPI-Key': '52d4e6b809msh535bb1e17db3c0cp13188ejsn808e833d1573',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        setResponse(response);
        // console.log(response.data.typeMatches);

        (response.data.typeMatches).map((data, index) => {
          // console.log(data); // You can perform any action here
          return index; // Return statement without any value
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const [news, setNews] = useState([]);
  useEffect(() => {const fetchNewsData = async () => {
    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
      headers: {
          'X-Rapidapi-Key': '52d4e6b809msh535bb1e17db3c0cp13188ejsn808e833d1573',
          'X-Rapidapi-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };
    try{
      const resp = await axios.request(options);
      const stories = resp.data.storyList.filter(item => item.story);
      console.log(stories.length);
      setNews(stories);
      console.log(news);
      // console.log(stories);      
    }
    catch(error){
      console.error(error);
    }
  };
  fetchNewsData();
},[]);







  return (
    <div className='App'>
      {/* Header */}
      <Header/>

      {/* Match List */}
      <div className='score-box'>
        {
        response.data &&
          response.data.typeMatches.map((typeMatch, index) => {
            return typeMatch.seriesMatches.map((seriesMatch, index2) => {
              const seriesAdWrapper = seriesMatch.seriesAdWrapper;
              if (seriesAdWrapper && seriesAdWrapper.matches) {
                const matches = seriesAdWrapper.matches;
                return matches.map((match, index3) => {
                  return <MatchInfo key={index3} responseData={match} />
                })
              }
          });
        })
        }
      </div>



      {/* Match News and Schedule*/}
      <div className='news-box'>
        <div className='news-header'>
          <h2>NEWS</h2>
        </div>
      </div>


      <div className="newsSection">
        {/* latest news */}
        <div>
          <div className="news">
          <h3 style={{textAlign:'center',color:'#38444d',fontSize:'24px'}}>Latest News</h3>
          {
            news.map((item, index) => {
              // console.log(item);
              if (item.story != undefined) {
                return <LatestNews key={index} newsResponse={item} />;
              } else {
                // Handle the case where item.story is undefined
                return null; // or any other fallback
              }
            })
          }
          </div>
          <Schedule/>
        </div>

        {/* main news with heading and image*/}
        <div className="news" style={{style:"flex-shrink: 0"}}>
        {
            news.map((item, index) => {
              // console.log(item);
              if (item.story != undefined) {
                return <MainNews key={index} newsResponse={item} />;
              } else {
                // Handle the case where item.story is undefined
                return null; // or any other fallback
              }
            })
          }
        </div>


        <div className="news">
          <Advertisement/>
        </div>       
      </div>


      

    </div>
  );
}

export default Base;
