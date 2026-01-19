
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
    FaMdb
} from "react-icons/fa";
import { SiRedux, SiJquery } from "react-icons/si";

export const resumeData = {
    personalInfo: {
        name: "Raxit Rangadiya",
        role: "Front-End Developer",
        location: "Halvad, Morbi",
        email: "raxitrangadiya8531@gmail.com",
        phone: "+91 94088 50307",
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
        { name: "HTML", icon: FaHtml5 },
        { name: "React", icon: FaReact },
        { name: "Bootstrap", icon: FaBootstrap },
        { name: "CSS", icon: FaCss3Alt },
        { name: "Redux", icon: SiRedux },
        { name: "JavaScript", icon: FaJs },
        { name: "jQuery", icon: SiJquery },
        { name: "MDB Bootstrap", icon: FaMdb },
        { name: "GitHub", icon: FaGithub }
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
            title: "E-commerce",
            technologies: ["React", "Redux"],
            description: "A functioning shopping site with product and user management.",
            features: [
                "Shopping Cart",
                "Customer Service Center",
                "Custom Design",
                "Effective Admin Panel",
                "Order Tracking",
                "Customer Management",
                "Order Stored in Database"
            ],
            status: "Under Development",
            icon: Code
        }
    ],
    education: [
        {
            degree: "BSc Chemistry",
            institution: "C U Shah Science College, Gujarat University",
            location: "Ahmedabad",
            year: "2022",
            grade: "51%",
            icon: GraduationCap
        },
        {
            degree: "12th Grade (High School)",
            institution: "Gujarat Board, Vivekanand Vidyalaya",
            location: "Halvad",
            year: "2018",
            grade: "51%",
            icon: GraduationCap
        },
        {
            degree: "10th Grade (High School)",
            institution: "Gujarat Board, Sadbhavna Vidyalaya",
            location: "Halvad",
            year: "2016",
            grade: "68%",
            icon: GraduationCap
        }
    ]
};
