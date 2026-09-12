import './App.css'

import React, { useState} from "react";
import HeaderSection from './components/Header';
import FormRequest from './components/FormRequest';
import CategoryTabs from './components/CategoriesJobs';
import HeroSection from './components/HeroTitle';
import JobCard from './components/JobCard';



const JOBS = [
  {
    id: 1,
    category: "React",
    snippet:
      "Buscamos desarrollador/a Frontend para incorporarse a nuestro equipo de producto. Trabajamos con componentes reutilizables y un sistema de diseño propio.",
    tags: ["React", "TypeScript", "Next.js"],
    daysAgo: 2,
    company: "Acme",
    directApply: true,
    editorial: ["revisada"],
    note: "Buena oportunidad para perfiles con experiencia en React y TypeScript. La empresa permite aplicar directamente desde su página oficial.",
    applyUrl: "https://example.com/careers/acme-frontend",
    sourceUrl: "https://linkedin.com/jobs/view/000001",
  },
  {
    id: 2,
    category: "React",
    snippet:
      "Buscamos desarrollador/a Frontend para incorporarse a nuestro equipo de producto. Trabajamos con componentes reutilizables y un sistema de diseño propio.",
    tags: ["React", "TypeScript", "Next.js"],
    daysAgo: 2,
    company: "Acme",
    directApply: true,
    editorial: ["revisada"],
    note: "Buena oportunidad para perfiles con experiencia en React y TypeScript. La empresa permite aplicar directamente desde su página oficial.",
    applyUrl: "https://example.com/careers/acme-frontend",
    sourceUrl: "https://linkedin.com/jobs/view/000001",
  },
];



export default function App() {
  const [view, setView] = useState("home"); 
  const [showForm,setShowForm]=useState<boolean>(false)





  const goHome=()=> {
    setView("home");
    window.scrollTo?.({ top: 0 });
  }

  function goForm() {
    setView("form");
    window.scrollTo?.({ top: 0 });
  }

  return (
    <div className="tamiz-root">
      <HeaderSection onHome={goHome} onForm={goForm} />
          <HeroSection />
          <CategoryTabs    />
           <section className="tz-list" aria-label="Listado de ofertas">
      {JOBS.map((job) => (
        <JobCard key={job.id} job={job}  />
      ))}
    </section>
    </div>
  );
}






