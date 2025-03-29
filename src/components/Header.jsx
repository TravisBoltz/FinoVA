import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toogle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    // { label: "Solutions", path: "/#solutions" },
    // { label: "About Us", path: "/about-us" },
    { label: "Contact", path: "/contact" },
  ];
  if (location.pathname.includes("/register")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 transition-all duration-300 z-50 py-4 md:py-6 
    ${
      isScrolled
        ? "bg-white/10 dark:bg-gray-900/10 backdrop-blur-md shadow-lg"
        : "bg-transparent"
    }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" data-aos="fade-down" className="text-5xl font-bold">
          Fino<span className="text-techno_main">Va</span>
        </Link>

        <nav data-aos="fade-down" className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`relative group ${
                location.pathname === item.path ? "text-techno_main" : ""
              }`}
            >
              <span className="hover:text-techno_main transition-colors">
                {item.label}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-techno_main transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          ))}
          <ModeToggle />
        </nav>

        <Sheet className="">
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent>
            <ModeToggle />
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-lg hover:text-techno_main transition-colors ${
                    location.pathname === item.path ? "text-techno_main" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
