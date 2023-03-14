import { React } from 'react'
import openSourceImage from "../../static/OpenSource.png";
import codeTogetherImage from "../../static/CodeTogetherImage.png";
import howToStartImage from "../../static/HowToStartImage.png";
import Slider from "./Slider";
import Team from "./Team";
import { LandingPageText } from '../../static/text';

//TODO 
// 1. change content & pictures 1

const Landing = () => {
  return (
    <section className="landing">
        <Slider
          imageSrc={codeTogetherImage}
          title={"About CodeTogether"}
          subtitle={LandingPageText.codeTogether}
        />
        <Slider
          imageSrc={openSourceImage}
          title={"What is Open Source?"}
          subtitle={LandingPageText.openSource}
          flipped={true}
        />
        <Slider
          imageSrc={howToStartImage}
          title={"OK, So how do I start?"}
          subtitle={LandingPageText.howToStart}
        />
        <Team />
    </section>
  )
}

export default Landing;
