import Particles from "react-tsparticles"

export default function ParticlesBackground(){

  return(

    <Particles
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        particles:{
          number:{value: 60, density: { enable: true, area: 800 }},
          color: { value: ["#4D91FF", "#7BC1FF", "#A7D6FF", "#d4e6f1", "#000000"] },
          shape: { type: "circle" },
          size:{value: { min: 1, max: 3 }, random: true},
          links: {
            enable: true,
            distance: 150,
            color: "#8ab4f8",
            opacity: 0.2,
            width: 1
          },
          move:{
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
          },
          opacity:{value: { min: 0.1, max: 0.5 }, random: true}
        }
      }}
    />

  )
}