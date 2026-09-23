import './App.css';
import { useState, useMemo } from 'react';
import HeaderSection from './components/Header';
import CategoryTabs from './components/CategoriesJobs';
import HeroSection from './components/HeroTitle';
import JobCard from './components/JobCard';
import { useJobs } from './hooks/useJobs';
import { CATEGORY_TAG_MAP, type Category } from './utils/categories';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todas");
  const { error, jobs, loading, refetch } = useJobs();

  const filteredJobs = useMemo(() => {
    if (selectedCategory === "Todas") return jobs;

    const allowedTags = CATEGORY_TAG_MAP[selectedCategory] || [];

    return jobs.filter((job) => {
      const jobTags = Array.isArray(job.tags) ? job.tags : [];
      const normalizedJobTags = jobTags.map((t) => t.toLowerCase());

      if (selectedCategory === "Web + Mobile") {
        const hasWeb = normalizedJobTags.some((tag) =>
          CATEGORY_TAG_MAP.Web.includes(tag)
        );
        const hasMobile = normalizedJobTags.some((tag) =>
          CATEGORY_TAG_MAP.Mobile.includes(tag)
        );
        return hasWeb && hasMobile;
      }

      return normalizedJobTags.some((tag) => allowedTags.includes(tag));
    });
  }, [jobs, selectedCategory]);

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
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
      <section className="tz-list" aria-label="Listado de ofertas">
        {renderJobsData()}
      </section>
    </div>
  );
}