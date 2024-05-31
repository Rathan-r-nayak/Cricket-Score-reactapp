import { useState,useEffect } from "react";
import axios from 'axios';


const MainNews = ({newsResponse}) => {
    const [newsImg, setnewsImg] = useState('');

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

        fetchImage(newsResponse.story.imageId, setnewsImg);

        // Clean up function
        return () => {
        URL.revokeObjectURL(newsImg);
        };
    }, [newsResponse]);



    if (!newsResponse) {
        return null;
    }

    
    return(
        <>
            <div className="mainnewsItem">
                <p>{newsResponse.story.context}</p>
                <img className="mainNewsImg" src={newsImg} alt={newsResponse.story.coverImage.caption} title={newsResponse.story.coverImage.caption}/>
                <a href="#" className="newsHeadinglink" style={{fontSize:'24px',fontWeight:'bold'}}>{newsResponse.story.hline}</a>
                <p>{newsResponse.story.intro}</p>
                
            </div>
            <hr style={{ borderColor: '#f0f6fa7d' }} />
        </>
        
    )
}


export default MainNews;