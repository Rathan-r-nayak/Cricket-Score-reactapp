

const LatestNews = ({ newsResponse }) => {
    if (!newsResponse) {
        return null;
    }

    const timestamp = newsResponse.story.pubTime; // Example timestamp
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (+1 because it's zero-based) and pad with leading zero if necessary
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);

    // console.log(newsResponse);
    return (
        <header>
            <div className="latestNewsItems" style={{height:'fit-content'}}>
                <a href="#" className="newsHeadinglink">{newsResponse.story.hline}</a>
                {/* <p style={{color:'#38444d'}}>{newsResponse.story.pubTime}</p> */}
            </div>
            <hr style={{ borderColor: '#f0f6fa7d' }} />
        </header>
    );
}


export default LatestNews;