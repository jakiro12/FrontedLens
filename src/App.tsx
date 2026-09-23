import './App.css'

import HeaderSection from './components/Header';
import CategoryTabs from './components/CategoriesJobs';
import HeroSection from './components/HeroTitle';
import JobCard from './components/JobCard';
import { useJobs } from './hooks/useJobs';







export default function App() {

const { error,jobs,loading,refetch } = useJobs();


const renderJobsData=()=>{
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
  if (jobs.length===0) return <div className="jobsEmptyContainer">
      <div className="jobsEmptyIcon">
        💼
      </div>

      <p className="jobsEmptyMessage">
        <strong>No hay vacantes publicadas</strong>
        Por el momento no hay nuevas oportunidades disponibles.
      </p>
    </div>
  if(jobs.length > 0) return jobs.map((job) => (
    <JobCard key={job.id} job={job} />
  ))
 if (error) {
  return (
    <div className="jobsErrorContainer">
      <div className="jobsErrorIcon">
        !
      </div>

      <p className="jobsErrorMessage">
        <strong>Ocurrió un error</strong>
        {error}
      </p>

      <button
        className="jobsErrorRetryButton"
        onClick={refetch}
      >
        Reintentar
      </button>
    </div>
  );
}
}
  return (
    <div className="tamiz-root">
      <HeaderSection  />
          <HeroSection />
          <CategoryTabs    />
           <section className="tz-list" aria-label="Listado de ofertas">
      {renderJobsData()}
    </section>
    </div>
  );
}






