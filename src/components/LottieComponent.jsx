import Lottie from "lottie-react";

import AnimationBin from "../../public/assets/AnimationBin.json"

export const LottieComponent = () => {
  const style = {
    height: 400
  }
  return (
    <Lottie animationData={AnimationBin} style={style}/>   
    
  )
}