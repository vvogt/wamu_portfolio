import React from 'react';
import { insertBreak, setBgImage } from '../helpers';


class ImageWithText extends React.Component {
   constructor() {
      super();

      this.imageRef = React.createRef();
   }

   componentDidMount() {
      this.props.setRefs(this.imageRef.current);
   }

   renderImages = () => {
      return this.props.images.map((imageURL, index) => {
         //add ref only for the first image
         return  index === 0 ? <img src={imageURL} alt={this.props.description} ref={this.imageRef} key={index}></img> : <img src={imageURL} alt={this.props.description} key={index}></img>
      })
   }
   
   render() {
      //let imageHeight = this.props.imageOrientation === 'vertical' ? '600px' : '400px';

      return(
         <div className={`imageWithText ${this.props.images.length > 1 && 'multipleImages'}`}>
            <div className="text rellax" data-rellax-speed="0.8" data-rellax-percentage="-1">
               <h2>{insertBreak(this.props.title)}</h2>
               {this.props.description && <p>{this.props.description}</p>}
            </div>
            {/* <div className="image" style={setBgImage(this.props.image, 'scroll', this.props.imageOrientation)} ref={this.imageRef}>
            </div> */}
            <div className={`images ${this.props.visible && 'visible'}`}>
               {this.renderImages()}
            </div>
         </div>
      )

      
   }
}

export default ImageWithText;

