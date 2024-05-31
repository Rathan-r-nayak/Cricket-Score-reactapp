import React, { useEffect } from 'react';

const Advertisement = () => {
  useEffect(() => {
    // Trigger the ad rendering
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  

  return (
    <div>
      {/* Your other content */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-7813258797674220"
           data-ad-slot="6297425746"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
      
    </div>
  );
};


export default Advertisement;