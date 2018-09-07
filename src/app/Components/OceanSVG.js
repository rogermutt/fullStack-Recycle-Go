import React from "react";
import FishSVG from "./FishSVG";

const SunRays = [
  (<rect x="248.163" y="23.715" width="15.673" height="52.245"/>),
  (<rect x="352.908" y="86.407" transform="matrix(0.7071 -0.7071 0.7071 0.7071 44.2984 295.4331)" width="51.722" height="15.673"/>),
  (<rect x="130.613" y="68.39" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -26.0947 125.5039)" width="15.673" height="51.722"/>),
  (<rect x="407.51" y="188.291" width="47.02" height="15.674"/> ),
  (<rect x="57.469" y="188.291" width="47.02" height="15.674"/> )
];

export default props => (

<div className="row">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 512 512" xmlSpace="preserve">   
    <g>
      <g>
        <path d="M388.995,230.082C384.93,158.511,325.687,99.47,256,99.47s-128.93,59.041-132.995,130.612H0v15.673h512v-15.673H388.995z
          M138.718,230.082c1.906-28.682,14.165-56.765,34.304-78.063c22.485-23.779,51.954-36.876,82.978-36.876
          s60.494,13.096,82.978,36.876c20.139,21.299,32.398,49.382,34.304,78.063H138.718z"/>
      </g>
    </g>

    { SunRays.map( (singleRay,idx) => <g key={idx}> {singleRay} </g>  ) }
  
      <FishSVG x="40px" y="350px"/>
      <FishSVG x="260px" y="260px"/>
      <FishSVG x="180px" y="400px"/>
      <FishSVG x="100px" y="260px"/>
      <FishSVG x="1850px" y="350px"/>
      <FishSVG x="410px" y="400px"/>
      <FishSVG x="365px" y="320px"/>
      
    </svg>
</div>
);