import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const TeamMember = ({ member, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer p-4 mb-2 rounded-lg transition-all ${
      isActive
        ? "bg-blue-100 border-l-4 border-techno_main"
        : "hover:bg-gray-100"
    }`}
  >
    <div className="flex gap-2">
      <img
        src={member.image}
        alt={member.name}
        className="h-6 w-6 rounded-full mb-4"
      />
      <h3 className="font-semibold text-gray-600">{member.name}</h3>
    </div>
    <p className="text-sm text-gray-600">{member.role}</p>
  </div>
);

const TeamMemberDetails = ({ member }) => (
  <Card className=" h-full">
    <CardContent className="p-8">
      <div className="flex flex-col items-center p-10 mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="h-48 w-48 rounded-full"
        />
        <h2 className="text-2xl font-bold ">{member.name}</h2>
        <p className="text-lg  mb-4">{member.role}</p>
      </div>
      <p className="text-gray-600 leading-relaxed">{member.description[0]}</p>
      <p className="text-gray-600 leading-relaxed">{member.description[1]}</p>
      <p className="text-gray-600 leading-relaxed">{member.description[2]}</p>
    </CardContent>
  </Card>
);

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Francis Martinson",
      role: "Enterprise AI & Cloud Transformation Officer",
      image: "/FM.jpg",
      description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
      ],
    },

    {
      name: "Joshua Opare Ntow-Boateng",
      role: "Software Developer",
      image: "/JOB.jpg",

      description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
      ],
    },
    {
      name: "Faridu Oubda Musah",
      role: "Full Stack Developer",
      image: "/FOM.jpg",

      description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius purus congue inceptos ultricies nostra. Auctor sagittis tristique commodo, nam ullamcorper. Lectus congue leo velit a velit dui. Eleifend cursus auctor arcu aenean dictum diam. Nisl fermentum curae nibh iaculis, vitae condimentum rutrum integer pellentesque. Gravida posuere ipsum maximus tristique natoque tincidunt aliquam. Facilisi id mauris pharetra auctor scelerisque elementum. Tempor lectus erat parturient convallis gravida felis. Consequat pharetra nascetur ligula condimentum. Dui laoreet facilisi lectus pellentesque lacus interdum.",
      ],
    },
  ];

  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-techno_main to- techno_secondary py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold  text-center mb-6">
            Shaping the Future of Technology
          </h1>
          <p className="text-xl  text-center max-w-3xl mx-auto">
            We&apos;re a dynamic startup combining cutting-edge software
            development with advanced machine learning to create revolutionary
            solutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold  mb-6">Our Vision</h2>
          <p className="text-lg ">
            We&apos;re on a mission to revolutionize the technology landscape,
            aiming to reach a billion-dollar valuation in the next 5 years
            through innovative solutions and exceptional talent.
          </p>
        </div>

        {/* Team Section with Sidebar Layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Sidebar */}
          <div className="md:w-1/3  p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold  mb-6">Our Team</h2>
            <div className="space-y-2">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  member={member}
                  isActive={selectedMember.name === member.name}
                  onClick={() => setSelectedMember(member)}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3">
            <TeamMemberDetails member={selectedMember} />
          </div>
        </div>

        {/* Values Section */}
        <div className="p-8 rounded-lg">
          <h2 className="text-3xl font-bold  text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold  mb-4">Innovation</h3>
              <p className="">
                Pushing boundaries in software and ML integration
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold  mb-4">Excellence</h3>
              <p className="">
                Delivering exceptional quality in every project
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold  mb-4">Growth</h3>
              <p className="">Continuously evolving and scaling our impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
