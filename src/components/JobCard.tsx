import unicornioImg from "../assets/unicorn.png";
import ghostImg from "../assets/ghost.png"
import prayImg from "../assets/pray.png"
import rocketImg from "../assets/rocket.png"
import slaveImg from "../assets/slave.png"
interface JobCardProps {
  job: any;
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
  const editorial = Array.isArray(job.editorial) ? job.editorial : [];
  const tags = Array.isArray(job.tags) ? job.tags : [];

  return (
    <article className="tz-card">
      <div className="tz-card-top">
        <span className="tz-card-date">
          Publicado hace {job.daysAgo} días
        </span>

        {editorial.length > 0 && (
          <div className="tz-card-editorial">
            {editorial.map((key: string) => {
              const meta = EDITORIAL_META[key];

              if (!meta) return null;

              return (
                <span className="tz-editorial-badge" key={key}>
                  <img
                    style={{width:20,height:20}}
                    src={meta.emoji}
                    alt={meta.label}/>
                  <span>{meta.label}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="tz-card-content">
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