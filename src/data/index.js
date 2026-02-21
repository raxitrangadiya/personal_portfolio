
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Code,
    Briefcase,
    GraduationCap,
} from 'lucide-react';
import {
    FaHtml5,
    FaReact,
    FaBootstrap,
    FaCss3Alt,
    FaJs,
    FaGithub,
    FaMdb,
    FaSass,
    FaNodeJs,
    FaDocker,
    FaLinux
} from "react-icons/fa";
import { SiRedux, SiJquery, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiWebpack, SiPostman, SiChartdotjs, SiIfixit } from "react-icons/si";

export const resumeData = {
    personalInfo: {
        name: "Raxit Rangadiya",
        role: "Front-End Developer",
        location: "Halvad, Morbi",
        email: "raxitrangadiya8531@gmail.com",
        // phone: "+91 94088 50307",
        social: {
            github: "https://github.com/raxitrangadiya",
            linkedin: "https://www.linkedin.com/in/raxitrangadiya/"
        },
        icons: {
            Github,
            Linkedin,
            Mail,
            MapPin,
            Phone
        }
    },
    objective: "The objective is to efficiently utilize and improve skills and knowledge for the progress of an organization, seeking professional growth while being resourceful, innovative, flexible, and analytical.",
    skills: [
        { name: "HTML5", icon: FaHtml5 },
        { name: "CSS3", icon: FaCss3Alt },
        { name: "JavaScript", icon: FaJs },
        { name: "React", icon: FaReact },
        { name: "Redux", icon: SiRedux },
        { name: "Bootstrap", icon: FaBootstrap },
        { name: "Sass", icon: FaSass },
        { name: "jQuery", icon: SiJquery },

        // Backend
        { name: "Node.js", icon: FaNodeJs },
        { name: "Express.js", icon: SiExpress },

        // Database
        { name: "MongoDB", icon: SiMongodb },
        { name: "MySQL", icon: SiMysql },
        { name: "PostgreSQL", icon: SiPostgresql },

        // DevOps & Tools
        { name: "Docker", icon: FaDocker },
        { name: "Linux", icon: FaLinux },
        { name: "GitHub", icon: FaGithub },
        { name: "Webpack", icon: SiWebpack },
        { name: "Postman", icon: SiPostman },

        // Others
        { name: "Chart.js", icon: SiChartdotjs },
        { name: "IFTTT", icon: SiIfixit }
    ],
    experience: [
        {
            role: "Front End Developer",
            company: "Brighthill infratech PVT LTD",
            duration: "January 15, 2024 - Present",
            description: "Front End Web Development",
            icon: Briefcase
        },
        {
            role: "Front End Web Development Training",
            company: "TOPS technology",
            duration: "December 23, 2022 - November 16, 2023",
            description: "Front End Web Development Training",
            icon: Briefcase
        }
    ],
    projects: [
        {
            title: "AI Analytics Dashboard",
            technologies: ["React", "Python", "TensorFlow", "D3.js"],
            description: "A comprehensive dashboard for visualizing real-time AI performance metrics and predictive analytics.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
            features: [
                "Real-time Data Visualization",
                "Predictive Modeling",
                "Customizable Widgets",
                "Exportable Reports"
            ],
            status: "Completed",
            icon: Code
        },
        {
            title: "Crypto Finance Tracker",
            technologies: ["Next.js", "TypeScript", "Tailwind", "CoinGecko API"],
            description: "A minimal finance tracker for monitoring cryptocurrency portfolios with live price updates.",
            image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop",
            features: [
                "Live Market Data",
                "Portfolio Management",
                "Price Alerts",
                "Dark Mode UI"
            ],
            status: "Completed",
            icon: Code
        },
        {
            title: "Smart Home Controller",
            technologies: ["React Native", "Node.js", "IoT", "MQTT"],
            description: "Mobile application for managing smart home devices including lights, locks, and thermostats.",
            image: "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=1000&auto=format&fit=crop",
            features: [
                "Device Automation",
                "Voice Control Integration",
                "Energy Usage Monitoring",
                "Remote Access"
            ],
            status: "In Progress",
            icon: Code
        },
        {
            title: "Social Media Platform",
            technologies: ["MERN Stack", "Socket.io", "AWS S3"],
            description: "A full-featured social networking platform connecting developers and designers.",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
            features: [
                "Real-time Messaging",
                "Post Sharing & Likes",
                "User Profiles",
                "Notification System"
            ],
            status: "Completed",
            icon: Code
        },
        {
            title: "E-Commerce API Service",
            technologies: ["Node.js", "Express", "PostgreSQL", "Redis"],
            description: "Robust backend service handling inventory, orders, and payments for high-scale e-commerce apps.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
            features: [
                "RESTful API Design",
                "Payment Gateway Integration",
                "inventory Management",
                "Role-based Authentication"
            ],
            status: "Completed",
            icon: Code
        }
    ],
    education: [
        // {
        //     degree: "BSc Chemistry",
        //     institution: "C U Shah Science College, Gujarat University",
        //     location: "Ahmedabad",
        //     year: "2022",
        //     grade: "51%",
        //     icon: GraduationCap
        // },
        // {
        //     degree: "12th Grade (High School)",
        //     institution: "Gujarat Board, Vivekanand Vidyalaya",
        //     location: "Halvad",
        //     year: "2018",
        //     grade: "51%",
        //     icon: GraduationCap
        // },
        // {
        //     degree: "10th Grade (High School)",
        //     institution: "Gujarat Board, Sadbhavna Vidyalaya",
        //     location: "Halvad",
        //     year: "2016",
        //     grade: "68%",
        //     icon: GraduationCap
        // }
    ]
};
