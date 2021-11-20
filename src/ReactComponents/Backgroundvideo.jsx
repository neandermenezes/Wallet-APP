import React from 'react';
import videoBackground from '../img/loginvideo.mp4';

class BackgroundVideo extends React.Component {
  render() {
    return (
      <div className="bg-video">
        <video autoPlay muted loop className="bg-video__content">
          <source src={ videoBackground } type="video/mp4" />
          Your browser is not supported! Use google chrome.
        </video>
      </div>
    );
  }
}

export default BackgroundVideo;
