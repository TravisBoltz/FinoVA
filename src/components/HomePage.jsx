import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import Header from "./Header";
const HeroSection = () => {
  return (
    <section className="relative flex overflow-hidden ">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
        <div
          data-aos="fade-right"
          className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-techno_main font-medium mb-6 group">
            <Star className="w-4 h-4 mr-2 animate-pulse" />
            Welcome to the Future
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-techno_main via-indigo-600 to-techno_tertiary">
            Experience the Power of the Cloud, Elevated.
          </h1>
          <p className="text-xl text-gray-500 mb-8 leading-relaxed">
            Introducing Technonimbus: Where cutting-edge technology meets
            seamless integration. Transform your digital landscape with our
            innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/register">
              <Button
                size="lg"
                className="group text-white bg-gradient-to-r from-techno_main to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Explore Our Solutions
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
                  →
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="md:w-1/3 relative w-full max-w-lg mx-auto md:max-w-none"
        >
          <div className="relative group cursor-pointer perspective-1000 aspect-[4/3] sm:aspect-[16/9] md:aspect-square">
            <div className="absolute inset-0 bg-gradient-to-r from-techno_main to-techno_tertiary rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
            <img
              src="/2.jpeg"
              alt="Abstract cloud with technology elements"
              className="relative rounded-xl shadow-xl transition-transform duration-300 group-hover:translate-y-2 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

//     {
//       title: "Lhydra",
//       description:
//         "Enterprise-level cloud migration tool with automated workflows",
//       category: "Enterprise",
//       progress: 85,
//       image: "lhydra.png",
//     },
//     {
//       title: "Data Analytics Platform",
//       description: "Real-time data analytics and visualization platform",
//       category: "Analytics",
//       progress: 92,
//       image: "https://placehold.co/600x400",
//     },
//     {
//       title: "Security Framework",
//       description: "Advanced security monitoring and threat detection system",
//       category: "Security",
//       progress: 78,
//       image: "https://placehold.co/600x400",
//     },
//   ];

//   return (
//     // <section className="py-16 md:py-24">
//     //   <div className="container mx-auto px-4 md:px-8">
//     //     <h2
//     //       data-aos="fade-up"
//     //       className="text-3xl md:text-4xl font-bold text-center mb-16"
//     //     >
//     //       Our Innovative Projects
//     //     </h2>
//     //     <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//     //       {projects.map((project, index) => (
//     //         <div
//     //           key={index}
//     //           data-aos="fade-up"
//     //           data-aos-delay={index * 100}
//     //           className="relative group"
//     //         >
//     //           <div className="absolute inset-0 bg-gradient-to-r from-techno_main to-techno_tertiary rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
//     //           <div className="relative  p-6 rounded-2xl shadow-xl">
//     //             <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
//     //               <img
//     //                 src={project.image}
//     //                 alt={project.title}
//     //                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
//     //               />
//     //               <div className="absolute top-4 right-4 /90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-techno_main">
//     //                 {project.category}
//     //               </div>
//     //             </div>
//     //             <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//     //             <p className="mb-4">{project.description}</p>
//     //             <div className="relative pt-1">
//     //               <div className="flex items-center justify-between mb-2">
//     //                 <span className="text-xs font-semibold inline-block text-techno_main">
//     //                   Progress
//     //                 </span>
//     //                 <span className="text-xs font-semibold inline-block text-techno_main">
//     //                   {project.progress}%
//     //                 </span>
//     //               </div>
//     //               <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
//     //                 <div
//     //                   style={{ width: `${project.progress}%` }}
//     //                   className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-techno_main"
//     //                 ></div>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   </div>
//     // </section>

//     // <div className="py-16 px-4">
//     //   <div className="max-w-6xl mx-auto">
//     //     <div className="grid md:grid-cols-2 gap-8 items-center">
//     //       <div className="relative" data-aos="fade-right">
//     //         <img
//     //           src={"/lhydra.png"}
//     //           alt="Church Society"
//     //           className="w-full rounded-lg shadow-xl"
//     //         />
//     //       </div>
//     //       <div className="space-y-6" data-aos="fade-left">
//     //         <h4 className="text-lg text-techno_main font-medium">FELLOWSHIP</h4>
//     //         <h2 className="text-2xl md:text-3xl font-bold">Societies</h2>
//     //         <p className="text-white-600 mb-16">
//     //           At St John the Evangelist Catholic Church, we believe in the power
//     //           of community and fellowship. Our diverse societies offer
//     //           parishioners the opportunity to grow in their faith while serving
//     //           others in meaningful ways. Whether you&apos;re looking to engage
//     //           more deeply with your faith, participate in service projects, or
//     //           simply connect with like-minded individuals, there&apos;s a place
//     //           for you here.
//     //         </p>
//     //         <div className="mt-8">
//     //           <a to="/societies">
//     //             <button className="bg-techno_main text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
//     //               JOIN A SOCIETY
//     //             </button>
//     //           </a>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };
const ProjectsSection = () => {
  const sections = [
    {
      title: "LHydra",
      subtitle: "A PhD Project by Francis Martinson",
      description:
        "This application is designed to assist with persona mapping and personalized recommendations. The system is built to provide tailored experiences based on user interactions and selected preferences. The web app includes modules for questionnaires, recommender systems, data analysis, and more, structured to support research and data analysis for persona development.",
      image: "/lhydra.svg",
      link: "https://lhydra.com",
    },
    {
      title: "Data Analytics",
      subtitle: "ANALYTICS",
      description: "Real-time data processing and visualization platforms",
      image: "https://placehold.co/600x400",
      link: "#",
    },
    {
      title: "Security Solutions",
      subtitle: "SECURITY",
      description: "Advanced cybersecurity monitoring systems",
      image: "https://placehold.co/600x400",
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center justify-between md:pt-[50px] mb-10`}
        >
          <div className="w-full md:w-6/12 px-4 md:px-6 mb-6 md:mb-0">
            <p className="text-sm uppercase sm:mt-10 md:mt-0 md:mb-2 dark:text-gray-300">
              {section.subtitle}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <p className="text-sm md:text-base dark:text-gray-300">
              {section.description}
            </p>
            <span>
              Access Project: <a href={section.link}>{section.title}</a>
            </span>
          </div>
          <img
            src={section.image}
            alt={section.title}
            className={`md:h-[20rem] w-full md:w-3/12 ${
              section.image.endsWith(".svg")
                ? "dark:invert dark:brightness-0"
                : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

const TeamSection = () => {
  const team = [
    {
      name: "Francis Martinson",
      role: "Enterprise AI & Cloud Transformation Officer",
      bio: "Visionary technologist pioneering cloud-native solutions and AI-driven innovation",
      image: "/FM.jpg",
    },
    {
      name: "Joshua Ntow Opare-Boateng",
      role: "Senior Developer",
      bio: "Expert in scalable backend architecture and enterprise system optimization",
      image: "/JOB.jpg",
    },
    {
      name: "Faridu Oubda Musah",
      role: "Full Stack Developer",
      bio: "Creative developer crafting intuitive solutions with exceptional user experiences",
      image: "/FOM.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 ">
      <div className="container mx-auto px-4 md:px-8">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* First team member */}
          <div
            data-aos="fade-up"
            className="group relative md:col-span-2 text-center"
          >
            <div className="w-48 h-48 mb-6 mx-auto">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={team[0].image}
                  alt={team[0].name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{team[0].name}</h3>
            <p className="text-techno_main font-medium mb-3">{team[0].role}</p>
            <p className="max-w-xs mx-auto">{team[0].bio}</p>
          </div>

          {/* Remaining team members */}
          {team.slice(1).map((member, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
              className="group relative text-center"
            >
              <div className="w-48 h-48 mb-6 mx-auto">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-techno_main font-medium mb-3">{member.role}</p>
              <p className="max-w-xs mx-auto">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="overflow-hidden">
      <Header />
      <HeroSection />
      <ProjectsSection />
      {/* <FeatureSection /> */}
      <TeamSection />
      <Footer />
    </div>
  );
}
