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
   
   render() {
      //let imageHeight = this.props.imageOrientation === 'vertical' ? '600px' : '400px';

      return(
         <div className="imageWithText">
            <div className="text rellax" data-rellax-speed="0.8">
               <h2>{insertBreak(this.props.title)}</h2>
               <p>{this.props.description}</p>
            </div>
            <div className="image" style={setBgImage(this.props.image, 'scroll', this.props.imageOrientation)} ref={this.imageRef}>
            </div>
         </div>
      )

      
   }
}

export default ImageWithText;

