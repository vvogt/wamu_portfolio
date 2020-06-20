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
         let image = index === 0 ? <img src={imageURL} alt={this.props.description} ref={this.imageRef} key={index}></img> : <img src={imageURL} alt={this.props.description} key={index}></img>
         
         //get original dimensions of the image
         let originalDimensions = image.props.src.split('_')[1].split('.')[0].split('x');
         originalDimensions[0] = parseInt(originalDimensions[0])
         originalDimensions[1] = parseInt(originalDimensions[1])

         //get image aspect ratio
         let aspectRatio = (originalDimensions[0]/originalDimensions[1]).toFixed(2);
         console.log(aspectRatio);
         
         return image;
      })
   }
   
   render() {
      return(
         <div className={
          `imageWithText ${this.props.images.length > 1 ? 'multipleImages' : ''} ${this.props.imageOrientation === 'vertical' && this.props.images.length < 2 ? 'halfWidth' : ''} ${this.props.imageOrientation}`
         }>
            <div className="text rellax" data-rellax-speed="0.8" data-rellax-percentage="-1">
               <h2>{insertBreak(this.props.title)}</h2>
               {this.props.description && <p>{this.props.description}</p>}
            </div>
            <div className={`images ${this.props.visible && 'visible'}`}>
               {this.renderImages()}
            </div>
         </div>
      )
   }
}

export default ImageWithText;

