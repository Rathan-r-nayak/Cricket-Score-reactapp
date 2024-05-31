import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function MatchInfo({responseData }) {
  // const history = useHistory();
  const navigate = useNavigate();


  // const [matchesState, setMatchesState] = useState(null);
  // const imageUrl = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${responseData.matchInfo.team1.imageId}/i.jpg`;
  // console.log(responseData.matchInfo.team1.imageId);

  const [team1ImageSrc, setTeam1ImageSrc] = useState('');
  const [team2ImageSrc, setTeam2ImageSrc] = useState('');
  

  useEffect(() => {
    const fetchImage = async (imageId, setImageSrc) => {
      try {
        const response = await fetch(`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg`, {
          headers: {
            'X-Rapidapi-Key': '52d4e6b809msh535bb1e17db3c0cp13188ejsn808e833d1573',
            'X-Rapidapi-Host': 'cricbuzz-cricket.p.rapidapi.com'
          }
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage(responseData.matchInfo.team1.imageId, setTeam1ImageSrc);
    fetchImage(responseData.matchInfo.team2.imageId, setTeam2ImageSrc);

    // Clean up function
    return () => {
      URL.revokeObjectURL(team1ImageSrc);
      URL.revokeObjectURL(team2ImageSrc);
    };
  }, [responseData]);

  // console.log(responseData);
  const scroreBoxClick = () =>{
    navigate(`/match/${responseData.matchInfo.matchId}`);
    console.log(responseData.matchInfo.matchId);
    // history.push('/match');
  }

  
  return (
        <div className='score-card' onClick={scroreBoxClick}>

          {/* series details */}
          {/* {responseData.matchInfo.seriesName} */}
          <div className='seriesDetails'>
            <span className="seriesName">{responseData.matchInfo.seriesName}</span>
            <span className="matchFormat">{responseData.matchInfo.matchFormat}</span>
          </div>

          {/* Teams and scores */}
          <div className="teams">
            <div className="teamName">
              <span className="spanTeam"><img width="25" height="16" alt={`logo`} src={team1ImageSrc}/> {responseData.matchInfo.team1.teamName}</span>
              <span className="spanTeam"><img width="25" height="16" alt={`logo`} src={team2ImageSrc}/> {responseData.matchInfo.team2.teamName}</span>
            </div>
            <div className="teamScore">
              {responseData.matchScore && responseData.matchScore.team1Score && responseData.matchScore.team1Score.inngs1 ? (
                    <span className="spanTeam">{responseData.matchScore.team1Score.inngs1.runs}-{responseData.matchScore.team1Score.inngs1.wickets} ({responseData.matchScore.team1Score.inngs1.overs})</span>
              ):(
                <span className="spanTeam">-</span>
              )}
              {responseData.matchScore && responseData.matchScore.team2Score && responseData.matchScore.team2Score.inngs1 ? (
                <span className="spanTeam">{responseData.matchScore.team2Score.inngs1.runs}-{responseData.matchScore.team2Score.inngs1.wickets} ({responseData.matchScore.team2Score.inngs1.overs})</span>
              ):(
                <span className="spanTeam">-</span>
              )}
            </div>
          </div> 

          <div className="matchStatus">{responseData.matchInfo.status}</div>
          
          <div className="footerScore"></div>

        </div>
  );
}


export default MatchInfo;