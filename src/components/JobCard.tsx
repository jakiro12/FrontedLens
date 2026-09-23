import unicornioImg from "../assets/unicorn.png";
import ghostImg from "../assets/ghost.png"
import prayImg from "../assets/pray.png"
import rocketImg from "../assets/rocket.png"
import slaveImg from "../assets/slave.png"
import type { Job } from "../types/job";
interface JobCardProps {
  job: Job;
}

const EDITORIAL_META: Record<string, { emoji: string; label: string }> = {
  unicornio: {
    emoji: unicornioImg,
    label: "Futuro unicornio",
  },
  revisada: {
    emoji: prayImg,
    label: "Revisada a mano",
  },
  desconocida: {
    emoji: ghostImg,
    label: "Poco confiable",
  },
  empresa: {
    emoji: rocketImg,
    label: "Empresa confiable",
  },
  esclavo: {
    emoji: slaveImg,
    label: "Esclavo 24/7",
  },
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
 const editorial = Array.isArray(job.editorial)
          ? job.editorial
          : typeof job.editorial === 'string'
          ? [job.editorial]
          : [];
  const tags = Array.isArray(job.tags) ? job.tags : [];

function calculateDays(fechaISO: string): number {
  const [year, month, day] = fechaISO.substring(0, 10).split('-').map(Number);
  const hoy = new Date();

  const fechaInicio = new Date(year, month - 1, day).getTime();
  const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).getTime();

  return Math.round((fechaHoy - fechaInicio ) / 86400000);
}
function getDateBadgeClass(days: number): string {
    if (days < 7) return "#137333";
    if (days <= 14) return "#b06000";
    return "#c5221f";
  }
  const daysAgo = calculateDays(job.publishedAt);
  const badgeClass = getDateBadgeClass(daysAgo);
  return (
    <article className="tz-card">
      <div className="tz-card-top">
        <span className="tz-card-date" style={{color:badgeClass}}>
          Publicado hace {calculateDays(job.publishedAt)} día/s
        </span>

        {editorial.length > 0 && (
                <div className="tz-card-editorial">
                  {editorial.map((key: string) => {
                    const meta = EDITORIAL_META[key];

                    if (!meta) return null;

                    return (
                      <span className="tz-editorial-badge" key={key}>
                        <img
                          style={{ width: 25, height: 25 }}
                          src={meta.emoji}
                          alt={meta.label}
                        />
                        <span>{meta.label}</span>
                      </span>
                    );
                  })}
                </div>
              )}
      </div>

      <div className="tz-card-content">
        <span className="tz-company-name">
          {job.category}
        </span>
        <p className="tz-card-snippet">{job.snippet}</p>

        {tags.length > 0 && (
          <div className="tz-card-tags">
            {tags.map((tag: string, index: number) => (
              <span className="tz-tag" key={`${tag}-${index}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="tz-card-company">
        <span className="tz-company-label">Empresa</span>
        <span className="tz-company-name">
          {job.company || "Sin confirmar"}
        </span>

        {job.onFocus && (
          <span className="tz-direct-application">
            {job.onFocus}
          </span>
        )}
           {job.country && (
                <span className="tz-company-label">
                  {job.country}
                </span>
              )}
      </div>

      <div className="tz-card-actions">
        <a
          className="tz-btn-secondary"
          href={job.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          Ver publicación original
          <span aria-hidden="true">↗</span>
        </a>

        {job.applyUrl && (
          <a
            className="tz-btn-primary"
            href={job.applyUrl}
            target="_blank"
            rel="noreferrer"
          >
            Aplicar
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
};

export default JobCard;