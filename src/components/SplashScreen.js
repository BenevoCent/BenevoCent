import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const SplashScreen = (props) => {
  return (
    <div className="splashScreen">
      <CircularProgress size={100} thickness={25} />
      <img src="/Benevocent_all_grass_bigC.png" style={{width:"80vw"}} />
    </div>
  )
};

export default SplashScreen;
