import { useState,useEffect } from "react";
import axios from 'axios';

const Schedule = () =>{

    const [matchesSchedule,setMatchesState] = useState({});

    useEffect(() => {
        const fetchScheduleData = async () => {
          const options = {
            method: 'GET',
            url: 'https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international',
            headers: {
              'X-RapidAPI-Key': '52d4e6b809msh535bb1e17db3c0cp13188ejsn808e833d1573',
              'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
          };
    
          try {
            const response = await axios.request(options);
            console.log(response.data);
            setMatchesState(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchScheduleData();
      }, []);


      return(
        <div className="matchSchedule">
            <h3 style={{textAlign:'center',color:'#38444d',fontSize:'24px'}}>Schedules</h3>
            {matchesSchedule.matchScheduleMap && matchesSchedule.matchScheduleMap.map((item,index) => {
              const scheduleAdWrapper = item.scheduleAdWrapper;
                return (
                    <div className="scheduleItem" key={index}>
                        {scheduleAdWrapper && scheduleAdWrapper.matchScheduleList.map((seriesItem,index2) => {
                          
                            return seriesItem.matchInfo.map((seriesInfo,index3) => {
                                return(
                                  <div className="scheduleContent">
                                    <div className="scheduleTeamInfo">
                                      <span>{seriesInfo.matchDesc}</span>
                                      <span>{scheduleAdWrapper.date}</span>
                                    </div>
                                    <p>{seriesInfo.team1.teamName} vs {seriesInfo.team2.teamName}</p>
                                    
                                          
                                  </div>
                                );
                            });
                            })
                        }
                      
                    </div>
                  );
        }
        )}
        </div>
      );
}


export default Schedule;