import { React } from 'react'
import digitalArt_02 from "../../img/digitalArt1.png";
import digitalArt_03 from "../../img/digitalArt2.png";
import Slider from "./Slider";
import Team from "./Team";

//TODO 
// 1. change content & pictures 1

const Landing = () => {
  return (
    <section className="landing">
        <Slider
          imageSrc={digitalArt_02}
          title={"Be an explorer."}
          subtitle={
            "Our platform offers a wide variety of unique travel locations!"
          }
        />
        <Slider
          imageSrc={digitalArt_03}
          title={"Memories for a lifetime."}
          subtitle={"Your dream vacation is only a few clicks away."}
          flipped={true}
        />
        <Slider
          imageSrc={digitalArt_03}
          title={"Memories for a lifetime."}
          subtitle={"Your dream vacation is only a few clicks away."}
        />
        <Team />
    </section>
  )
}

export default Landing;
