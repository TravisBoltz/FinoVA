import { useLocation } from "react-router-dom";
import { Instagram, Github, Linkedin, Phone, MapPin, Mail } from "lucide-react";

export const Footer = () => {
  const location = useLocation();

  // Hide footer if the current path is "/register"
  if (location.pathname === "/register") {
    return null;
  }

  const sections = [
    {
      title: "Connect",
      links: [
        { icon: <Github size={18} />, label: "Github", href: "#" },
        { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
        { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          icon: <Phone size={18} />,
          label: "0264339586",
          href: "tel:+233264339586",
        },
        {
          icon: <MapPin size={18} />,
          label: "Ghana",
          href: "#",
        },
        {
          icon: <Mail size={18} />,
          label: "support@finova.com",
          href: "mailto:info@finova.com",
        },
      ],
    },
  ];

  return (
    <footer className="dark:bg-gradient-to-br from-gray-900 to-gray-800 dark:text-gray-300 bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">FinoVa</h3>
            <p className="dark:text-gray-400">
              Elevating your cloud experience with cutting-edge solutions.
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 dark:text-gray-400 hover:text-white transition-colors justify-center md:justify-start"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
          <p>&copy; {new Date().getFullYear()} finova. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
