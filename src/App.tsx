import './App.css';
import { useState, useMemo } from 'react';
import HeaderSection from './components/Header';
import CategoryTabs from './components/CategoriesJobs';
import HeroSection from './components/HeroTitle';
import JobCard from './components/JobCard';
import { useJobs } from './hooks/useJobs';
import { CATEGORY_TAG_MAP, type Category } from './utils/categories';
import { CountryFilter } from './components/CountryFilter';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todas");
  const [selectedCountry, setSelectedCountry] = useState<string>("Todos");
  const { error, jobs, loading, refetch } = useJobs();

  const availableCountries = useMemo(() => {
  const countriesSet = new Set<string>();
  let hasUnknownCountry = false;

  jobs.forEach((job) => {
    if (job.country && job.country.trim() !== "") {
      countriesSet.add(job.country.trim());
    } else {
      hasUnknownCountry = true;
    }
  });

  const list = Array.from(countriesSet).sort();
  if (hasUnknownCountry) {
    list.push("Sin especificar");
  }

  return list;
}, [jobs]);
 const filteredJobs = useMemo(() => {
  return jobs.filter((job) => {
    let matchesCategory = true;
    if (selectedCategory !== "Todas") {
      const allowedTags = CATEGORY_TAG_MAP[selectedCategory] || [];
      const jobTags = Array.isArray(job.tags) ? job.tags.map((t) => t.toLowerCase()) : [];

      if (selectedCategory === "Web + Mobile") {
        const hasWeb = jobTags.some((tag) => CATEGORY_TAG_MAP.Web.includes(tag));
        const hasMobile = jobTags.some((tag) => CATEGORY_TAG_MAP.Mobile.includes(tag));
        matchesCategory = hasWeb && hasMobile;
      } else {
        matchesCategory = jobTags.some((tag) => allowedTags.includes(tag));
      }
    }

    let matchesCountry = true;
    if (selectedCountry !== "Todos") {
      if (selectedCountry === "Sin especificar") {
        matchesCountry = !job.country || job.country.trim() === "";
      } else {
        matchesCountry = job.country?.trim().toLowerCase() === selectedCountry.toLowerCase();
      }
    }

    return matchesCategory && matchesCountry;
  });
}, [jobs, selectedCategory, selectedCountry]);
  const renderJobsData = () => {
    if (loading) {
      return (
        <div className="loader">
          <div className="loaderSpinner" />
          <div className="loaderMessage">
            <strong>Cargando empleos...</strong>
            <span>
              El servidor en Render se está iniciando, esto puede tomar hasta 1 minuto.
            </span>
          </div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="jobsErrorContainer">
          <div className="jobsErrorIcon">!</div>
          <p className="jobsErrorMessage">
            <strong>Ocurrió un error</strong>
            {error}
          </p>
          <button className="jobsErrorRetryButton" onClick={refetch}>
            Reintentar
          </button>
        </div>
      );
    }
    if (jobs.length === 0) {
      return (
        <div className="jobsEmptyContainer">
          <div className="jobsEmptyIcon">💼</div>
          <p className="jobsEmptyMessage">
            <strong>No hay vacantes publicadas</strong>
            Por el momento no hay nuevas oportunidades disponibles.
          </p>
        </div>
      );
    }
    if (filteredJobs.length === 0) {
      return (
        <div className="jobsEmptyContainer">
          <div className="jobsEmptyIcon">🔍</div>
          <p className="jobsEmptyMessage">
            <strong>Sin resultados para "{selectedCategory}"</strong>
            Intenta seleccionar otra categoría.
          </p>
        </div>
      );
    }

    return filteredJobs.map((job) => <JobCard key={job.id} job={job} />);
  };

  const showCategoryTabs = !loading && !error && jobs.length > 0;

  return (
    <div className="tamiz-root">
      <HeaderSection />
      <HeroSection />
     {showCategoryTabs && (
        <div className="tz-filters-bar">
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <CountryFilter
            countries={availableCountries}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />
        </div>
      )}
      <section className="tz-list" aria-label="Listado de ofertas">
        {renderJobsData()}
      </section>
    </div>
  );
}