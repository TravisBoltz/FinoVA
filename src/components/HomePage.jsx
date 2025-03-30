import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  BarChart3,
  Users,
  Building2,
  Calendar,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Footer } from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            AI-Driven Financial Management for SMEs and Retailers
          </h1>
          <p
            className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Empowering businesses with intelligent financial solutions for
            sustainable growth
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link to={"/register"}>
              <Button
                size="lg"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold px-4 text-xl"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"></div>
      </div>
    </section>
  );
};

const TeamStatsSection = () => {
  const stats = [
    {
      value: "89%",
      label: "SMEs with improved financial decisions",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      value: "60%",
      label: "reduction in accounting errors",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      value: "75%",
      label: "businesses report better cash flow",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      value: "2025",
      label: "year founded",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      value: "1,200+",
      label: "SMEs to be served across Africa",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      value: "24/7",
      label: "AI-powered support",
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforming Financial Management
          </h2>
          <p className="max-w-3xl mx-auto dark:text-gray-300 text-sm">
            At Finova, we&apos;re addressing the financial management challenges
            faced by SMEs and retailers through innovative AI-driven solutions
            that increase transparency, enhance decision-making, and promote
            sustainable business growth.
          </p>
        </div>

        <div
          className="grid grid-cols-3 gap-0"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {stats.slice(0, 3).map((stat, index) => (
            <div
              key={index}
              className="border-r border-b border-gray-700 p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-3 gap-0"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {stats.slice(3, 6).map((stat, index) => (
            <div
              key={index}
              className="border-r  border-gray-700 p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  const features = [
    {
      title: "Automated Financial Statements",
      description:
        "Generate key financial statements including P&L and Statements of Financial Position. Input your data and let our AI system automatically process and generate real-time reports.",
      icon: <DollarSign className="w-10 h-10" />,
    },
    {
      title: "AI-Driven Investment Advisory",
      description:
        "Our intelligent advisory tool analyzes market trends, assesses risks, and offers personalized recommendations tailored to your business size, goals, and market conditions.",
      icon: <BarChart3 className="w-10 h-10" />,
    },
    {
      title: "Credit Scoring System",
      description:
        "Our AI evaluates your financial records to generate a credit score rating, determining loan eligibility based on financial health and transaction history.",
      icon: <TrendingUp className="w-10 h-10" />,
    },
    {
      title: "Financial Literacy Module",
      description:
        "Access educational resources on key financial topics, including record-keeping, budgeting, strategic savings, and investment with interactive lessons.",
      icon: <Users className="w-10 h-10" />,
    },
  ];

  return (
    <section className="py-20  ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Key Features
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Our AI-driven system empowers SMEs and retailers with accessible,
            automated, and intelligent financial solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full inline-flex mb-6">
                <div className="text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpendingInsightsSection = () => {
  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative" data-aos="fade-right">
              <div className="relative z-10">
                <img
                  src="/1.svg"
                  alt="Financial Impact"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full -z-10"></div>
            </div>

            {/* Content Column */}
            <div className="space-y-6" data-aos="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Impact and Benefits for Your Business
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-driven financial management system is a transformative
                solution tailored for SMEs and retailers, addressing key
                challenges related to financial reporting, investment
                decision-making, credit accessibility, and financial literacy.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    89%
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Businesses report increased financial transparency
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    3.5x
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Improvement in financial decision-making
                  </p>
                </div>
              </div>
              <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
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
      <TeamStatsSection />
      <FeatureSection />
      <SpendingInsightsSection />
      <Footer />
    </div>
  );
}
