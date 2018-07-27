import React, { Component } from 'react';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Navigation/Logo/Logo';
import './App.css';
import ImageLinkForm from'./Components/ImageLinkForm/ImageLinkForm';
import Rank from'./Components/Rank/Rank';
import FaceRecognition from'./Components/FaceRecognition/FaceRecognition'
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '20f3be9ce13f4de384f20e09dcd9344f'
});

class App extends Component {

        constructor(){
       super()
       this.state ={
      input: '',

      imageUrl: ''
     }

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
    app.models.predict(
     Clarifai.FACE_DETECT_MODEL,
     this.state.input ).then(
      function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />

        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
         
        <FaceRecognition imageUrl={this.state.imageUrl} />
        
        
      </div>
    );
  }
}

export default App;
