import React, { Component } from 'react';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Navigation/Logo/Logo';
import './App.css';
import ImageLinkForm from'./Components/ImageLinkForm/ImageLinkForm';
import Signing from'./Components/Signing/Signing';
import Registration from'./Components/Registration/Registration';
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

      imageUrl: '',
      box:'',
      route:'signing',
      isSignedIn: false
      
     }

  }

  calculateFaceLocation =(data) =>{

    const clarifaiFace =data.outputs[0].data.regions[0].region_info.bounding_box

    const image = document.getElementById('inputimage');

    const width = Number(image.width);

    const height = Number(image.height);

    
    return{

      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol:width - (clarifaiFace.right_col* width),
      bottomRow:height - (clarifaiFace.bottom_row * height),
    }

  }

  displayFaceBox =(box)=> {

    this.setState({box:box});
    
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{

    this.setState({imageUrl:this.state.input})
    app.models
    .predict(
     Clarifai.FACE_DETECT_MODEL,
     this.state.input )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
   
    .catch (err => console.log(err));

    
    
  }

  onRouteChange =(route) => {
    if (route==='signing'){

      this.setState({isSignedIn:false});

    }else if (route==='home') {

      this.setState({isSignedIn:true});
    }

    this.setState({route:route});
  }

  isSignedIn =()=> {

   this.state({signed:true}) 

  }
 
  render() {
    return (

      <div className="App">
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

           
         
          { this.state.route ==='home'  ?

            <div>
                      
              <Logo  />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />          
           </div>
          :(

            this.state.route ==='signing'  ?
            
            <Signing onRouteChange={this.onRouteChange} />
            :

            <Registration onRouteChange={this.onRouteChange}/>

           )
        }
      </div>
    );
  }

}

export default App;
