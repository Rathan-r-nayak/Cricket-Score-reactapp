import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

import img from '../assets/cricket_logo.png'
import img2 from '../assets/cricket_logo2.png'

const MatchScoreDetails = () => {
    const { matchId } = useParams();
    const [scoreDetails,setScoreDetails] = useState({});
    const [scoreDetails1, setScoreDetails1] = useState({});
    const [scoreDetails2, setScoreDetails2] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("Loading match score details...");



    useEffect(() => {
        const fetchScoreData = async () => {
        setIsLoading(true);
          const options = {
            method: 'GET',
            url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/hscard`,
            headers: {
              'X-RapidAPI-Key': '52d4e6b809msh535bb1e17db3c0cp13188ejsn808e833d1573',
              'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
            },
          };
    
          try {
            const response = await axios.request(options);
            setScoreDetails(response);
            setScoreDetails1(response.data.scoreCard.find((m) => m.inningsId === 1));
            setScoreDetails2(response.data.scoreCard.find((m) => m.inningsId === 2));
            console.log(scoreDetails1);
            if(response.status === 200)
            {
                setIsLoading(false);
                clearTimeout(timeout);
            }
          } catch (error) {
            console.error(error);
        }
        };
    
        fetchScoreData();
      }, []);

      const timeout = setTimeout(() => {
        if (isLoading) {
          setLoadingMessage("Server down, please try again later.");
        }
      }, 10000); // 10 seconds

        const batsmen1 = scoreDetails1.batTeamDetails ? Object.values(scoreDetails1.batTeamDetails.batsmenData) : [];
        const batsmen2 = scoreDetails2.batTeamDetails ? Object.values(scoreDetails2.batTeamDetails.batsmenData) : [];

        const bowling1 = scoreDetails1.bowlTeamDetails ? Object.values(scoreDetails1.bowlTeamDetails.bowlersData) : [];
        const bowling2 = scoreDetails2.bowlTeamDetails ? Object.values(scoreDetails2.bowlTeamDetails.bowlersData) : [];

        const fow1 = scoreDetails1.wicketsData ? Object.values(scoreDetails1.wicketsData) : [];
        const fow2 = scoreDetails2.wicketsData ? Object.values(scoreDetails2.wicketsData) : [];
    // }
    // catch(e)
    // {
    //     const batsmen1 = [];
    //     const batsmen2 = [];

    //     const bowling1 = [];
    //     const bowling2 = [];

    //     const fow1 = [];
    //     const fow2 = [];

    // }
    












    return (
        <div className='MatchScoreDetails'>
            {/* <h1>Match Score Details</h1>
            <p>Match ID: {matchId}</p> */}

            {!isLoading ?(
            <div>
                <p className='resDesc'>{scoreDetails.data && scoreDetails.data.status}</p>
                {scoreDetails.data.matchHeader.playersOfTheMatch && scoreDetails.data.matchHeader.playersOfTheMatch.map((data,ind)=>{
                    return(
                        <p className='resDesc'>Player of the Match: {data.fullName}</p>
                    )
                }
            )}

                {/* 1st innings score Table */}
                <div className='scoreteam1_table'>
                    <div className='teambattingbowlingscore_table'>
                        <div className='head_team_score'><span className='captionSpan'>{scoreDetails1.batTeamDetails.batTeamName}</span><span className='captionSpan'>{scoreDetails1.scoreDetails.runs}-{scoreDetails1.scoreDetails.wickets} ({scoreDetails1.scoreDetails.overs} Ov)</span></div>
                        <div className='teamtable_head'>
                            <div className='width_divsmall'></div>
                            <div className='width_divlarge'>Batter</div>
                            <div className='width_divlarge'></div>
                            <div className='width_divsmall'>Run</div>
                            <div className='width_divsmall'>B</div>
                            <div className='width_divsmall'>4s</div>
                            <div className='width_divsmall'>6s</div>
                            <div className='width_divsmall'>SR</div>
                        </div>

                        {batsmen1 && batsmen1.map((scoreData,key)=>{
                            return(
                                <div className='battingbowling_head'>
                                    <div className='width_divsmall'><img width='25px' src={img}/></div>
                                    <div className='width_divlarge player_names'>{scoreData.batName} {scoreData.isCaptain && !scoreData.isKeeper && <span>(C)</span>} {scoreData.isKeeper &&!scoreData.isCaptain && <span>( WK )</span>}{scoreData.isCaptain && scoreData.isKeeper && <span>( C & WK )</span>}</div>
                                    <div className='width_divlarge'>{scoreData.outDesc}</div>
                                    <div className='width_divsmall'>{scoreData.runs}</div>
                                    <div className='width_divsmall'>{scoreData.balls}</div>
                                    <div className='width_divsmall'>{scoreData.fours}</div>
                                    <div className='width_divsmall'>{scoreData.sixes}</div>
                                    <div className='width_divsmall'>{scoreData.strikeRate}</div>
                                </div>
                            )
                        }
                        )                      
                        }
                    </div>

                    {/* Team final score */}
                    <div>
                        <div className='team_score'>
                            <div>Extras</div>
                            <div>{scoreDetails1.extrasData.total} (b {scoreDetails1.extrasData.byes}, lb {scoreDetails1.extrasData.legByes}, w {scoreDetails1.extrasData.wides}, nb {scoreDetails1.extrasData.noBalls}, p {scoreDetails1.extrasData.penalty})</div>
                        </div>
                        <div className='team_score'>
                            <div>Total</div>
                            <div>{scoreDetails1.scoreDetails.runs} ({scoreDetails1.scoreDetails.wickets} wkts, {scoreDetails1.scoreDetails.overs} Ov)</div>
                        </div>
                    </div>


                    {/* Fall of wickets  fow1*/}
                    <div className='fow_table'>
                        <div className='teamtable_head'>
                            <div className='width_divlarge'>Fall of Wickets</div>
                        </div>
                        <div className='fow_content'>
                            {fow1 && fow1.map((fowData,key)=>{
                                return(
                                    <span>{fowData.wktRuns}-{fowData.wktNbr} (<span className='player_names'>{fowData.batName}</span>, {fowData.wktOver}), </span>
                                );
                            })}
                        </div>          
                    </div>

                    {/* Bowling Table */}
                    <div className='teambattingbowlingscore_table'>
                        <div className='teamtable_head'>
                            <div className='width_divsmall'></div>
                            <div className='width_divlarge'>Bowler</div>
                            <div className='width_divsmall'>O</div>
                            <div className='width_divsmall'>M</div>
                            <div className='width_divsmall'>R</div>
                            <div className='width_divsmall'>W</div>
                            <div className='width_divsmall'>NB</div>
                            <div className='width_divsmall'>WD</div>
                            <div className='width_divsmall'>ECO</div>
                        </div>

                        {bowling1 && bowling1.map((scoreData,key)=>{
                            return(
                                <div className='battingbowling_head'>
                                    <div className='width_divsmall'><img width='25px' src={img2}/></div>
                                    <div className='width_divlarge player_names'>{scoreData.bowlName}{scoreData.isCaptain && <span>(C)</span>}</div>
                                    <div className='width_divsmall'>{scoreData.overs}</div>
                                    <div className='width_divsmall'>{scoreData.maidens}</div>
                                    <div className='width_divsmall'>{scoreData.runs}</div>
                                    <div className='width_divsmall'>{scoreData.wickets}</div>
                                    <div className='width_divsmall'>{scoreData.no_balls}</div>
                                    <div className='width_divsmall'>{scoreData.wides}</div>
                                    <div className='width_divsmall'>{scoreData.economy}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>




                {/* 2nd innings score Table */}
                <div className='scoreteam1_table'>
                    <div className='teambattingbowlingscore_table'>
                        <div className='head_team_score'><span className='captionSpan'>{scoreDetails2.batTeamDetails.batTeamName}</span><span className='captionSpan'>{scoreDetails2.scoreDetails.runs}-{scoreDetails2.scoreDetails.wickets} ({scoreDetails2.scoreDetails.overs} Ov)</span></div>
                        <div className='teamtable_head'>
                            <div className='width_divsmall'></div>
                            <div className='width_divlarge'>Batter</div>
                            <div className='width_divlarge'></div>
                            <div className='width_divsmall'>Run</div>
                            <div className='width_divsmall'>B</div>
                            <div className='width_divsmall'>4s</div>
                            <div className='width_divsmall'>6s</div>
                            <div className='width_divsmall'>SR</div>
                        </div>
                        {batsmen2 && batsmen2.map((scoreData,key)=>{
                            return(
                                <div className='battingbowling_head'>
                                    <div className='width_divsmall'><img width='25px' src={img}/></div>
                                    <div className='width_divlarge player_names'>{scoreData.batName} {scoreData.isCaptain && !scoreData.isKeeper && <span>(C)</span>} {scoreData.isKeeper &&!scoreData.isCaptain && <span>( WK )</span>}{scoreData.isCaptain && scoreData.isKeeper && <span>( C & WK )</span>}</div>
                                    <div className='width_divlarge'>{scoreData.outDesc}</div>
                                    <div className='width_divsmall'>{scoreData.runs}</div>
                                    <div className='width_divsmall'>{scoreData.balls}</div>
                                    <div className='width_divsmall'>{scoreData.fours}</div>
                                    <div className='width_divsmall'>{scoreData.sixes}</div>
                                    <div className='width_divsmall'>{scoreData.strikeRate}</div>
                                </div>
                            )
                        }
                        )                      
                        }
                    </div>

                    {/* 2nd innings final score */}
                    <div>
                        <div className='team_score'>
                            <div>Extras</div>
                            <div>{scoreDetails2.extrasData.total} (b {scoreDetails2.extrasData.byes}, lb {scoreDetails2.extrasData.legByes}, w {scoreDetails2.extrasData.wides}, nb {scoreDetails2.extrasData.noBalls}, p {scoreDetails2.extrasData.penalty})</div>
                        </div>
                        <div className='team_score'>
                            <div>Total</div>
                            <div>{scoreDetails2.scoreDetails.runs} ({scoreDetails2.scoreDetails.wickets} wkts, {scoreDetails2.scoreDetails.overs} Ov)</div>
                        </div>
                    </div>


                    {/* Fall of wickets */}
                    <div className='fow_table'>
                        <div className='teamtable_head'>
                            <div className='width_divlarge'>Fall of Wickets</div>
                        </div>
                        <div className='fow_content'>
                            {fow2 && fow2.map((fowData,key)=>{
                                return(
                                    <span>{fowData.wktRuns}-{fowData.wktNbr} (<span className='player_names'>{fowData.batName}</span>, {fowData.wktOver}), </span>
                                );
                            })}
                        </div>
                        
                    </div>

                    {/* Bowling Table */}
                    <div className='teambattingbowlingscore_table'>
                        <div className='teamtable_head'>
                            <div className='width_divsmall'></div>
                            <div className='width_divlarge'>Bowler</div>
                            <div className='width_divsmall'>O</div>
                            <div className='width_divsmall'>M</div>
                            <div className='width_divsmall'>R</div>
                            <div className='width_divsmall'>W</div>
                            <div className='width_divsmall'>NB</div>
                            <div className='width_divsmall'>WD</div>
                            <div className='width_divsmall'>ECO</div>
                        </div>
                        {bowling2 && bowling2.map((scoreData,key)=>{
                            return(
                                <div className='battingbowling_head'>
                                    <div className='width_divsmall'><img width='25px' src={img2}/></div>
                                    <div className='width_divlarge player_names'>{scoreData.bowlName}{scoreData.isCaptain && <span>(C)</span>}</div>
                                    <div className='width_divsmall'>{scoreData.overs}</div>
                                    <div className='width_divsmall'>{scoreData.maidens}</div>
                                    <div className='width_divsmall'>{scoreData.runs}</div>
                                    <div className='width_divsmall'>{scoreData.wickets}</div>
                                    <div className='width_divsmall'>{scoreData.no_balls}</div>
                                    <div className='width_divsmall'>{scoreData.wides}</div>
                                    <div className='width_divsmall'>{scoreData.economy}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>):(<p>{loadingMessage}</p>)}
        </div>
    )
}

export default MatchScoreDetails;