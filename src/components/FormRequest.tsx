import { useState } from 'react';
import '../App.css'
import { frontendTechnologies } from '../utils/customer-techs';
import { createCustomer } from '../services/customer';

interface FooterProps{
    onBack:()=>void
}

const FormRequest:React.FC<FooterProps>=({onBack})=>{
   const [form, setForm] = useState({
  name: "",
  email: "",
  linkedinUrl: "",
  technologies: [] as string[],
  seniority: "Semi Senior",
  deliveryDay: "Viernes",
});
 const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const linkedinRegex =
  /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_%\-]+\/?$/i;

const validateForm = () => {
  if (form.name.trim().length < 2) {
    return "Ingresá un nombre válido.";
  }

  if (form.name.trim().length > 100) {
    return "El nombre no puede superar los 100 caracteres.";
  }

  if (!emailRegex.test(form.email.trim())) {
    return "Ingresá una dirección de email válida.";
  }

  if (form.email.trim().length > 254) {
    return "El email es demasiado largo.";
  }

  if (!linkedinRegex.test(form.linkedinUrl.trim())) {
    return "Ingresá un enlace válido a tu perfil de LinkedIn.";
  }

  if (form.technologies.length === 0) {
    return "Seleccioná al menos una tecnología.";
  }

  return "";
};
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleTechnologyChange = (technology: string) => {
  setForm((prev) => ({
    ...prev,
    technologies: prev.technologies.includes(technology)
      ? prev.technologies.filter((item) => item !== technology)
      : [...prev.technologies, technology],
  }));
};
const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const validationError = validateForm();

  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);

  try {
    await createCustomer({
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      linkedinUrl: form.linkedinUrl.trim(),
    });

    onBack();
  } catch (error: any) {
    console.error("Error al crear el cliente:", error);

    const status = error?.status;
    const message = String(error?.message ?? "").toLowerCase();

    if (
      status === 409 ||
      message.includes("already exists") ||
      message.includes("unique constraint") ||
      message.includes("duplicate") ||
      message.includes("email") && message.includes("exist")
    ) {
      setError("Este email ya está registrado. Probá con otro o verificá si ya te inscribiste.");
    } else if (status === 400) {
      setError("Los datos enviados no son válidos. Revisá el formulario.");
    } else if (status === 429) {
      setError("Hiciste demasiados intentos. Esperá un momento y volvé a probar.");
    } else if (status >= 500) {
      setError("El servidor está teniendo problemas. Esperá un momento e intentá nuevamente.");
    } else {
      setError("No se pudo registrar tu solicitud. Verificá los datos e intentá nuevamente.");
    }
  } finally {
    setLoading(false);
  }
};
     return (
    <section className="overlay"
      onClick={onBack}
>
      <div
        onClick={(e) => e.stopPropagation()} className="modalCard"
      >

        <h2 className="tz-form-title">¿Quierés ecibir vacantes acorde a tu perfil?</h2>
        <p className="tz-form-sub">
          Completa el formulario con los datos requeridos y personalmente te enviare vacantes reales que se ajusten a tu experiencia directamente a tu mail persona, una vez por semana y en caso de no encontrar vacantes tambien te avisare via mail que esa semana no hubo suerte.
        </p>

         <form onSubmit={handleCreate} className="form">
           <div className="formGroup">
          <label >Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input"
            placeholder="Nombre completo"
          />
        </div>

        <div className="formGroup">
          <label >Email</label>
         <input
          name="email"
          type="email"
          className="input"
          value={form.email}
          onChange={handleChange}
          required
          maxLength={254}
          autoComplete="email"
          placeholder="example@email.com"
        />
        </div>

        <div className="formGroup">
          <label >LinkedIn</label>
          <input
            name="linkedinUrl"
            type="url"
            className="input"
            value={form.linkedinUrl}
            onChange={handleChange}
            required            
            placeholder="https://www.linkedin.com/in/usuario/"
          />
        </div>

  <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
    {frontendTechnologies.map((technology) => (
      <label
        key={technology}
        className="checkboxLabel"
      >
        <input
          type="checkbox"
          
          checked={form.technologies.includes(technology)}
          onChange={() => handleTechnologyChange(technology)}
          className="checkboxInput"
        />
        {technology}
      </label>
    ))}
  </div>

        <div className="formGroup">
          <label >Seniority</label>
          <select
            name="seniority"
            value={form.seniority}
            onChange={handleChange}
            className="select"
          >
            <option>Junior</option>
            <option>Semi Senior</option>
            <option>Senior</option>
            <option>Tech Lead</option>
            <option>Arquitecto</option>
          </select>
        </div>

        <div className="formGroup">
          <label >Día de entrega</label>
          <select
            name="deliveryDay"
            value={form.deliveryDay}
            onChange={handleChange}
            className="select"
          >
            {[ "Miércoles", "Viernes"].map(
              (day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ),
            )}
          </select>
        </div>

          <div
            className='btn_form_container'
          >
            <button
              onClick={onBack}
              style={{backgroundColor:'#e5e7eb'}}
            >
              Volver a ver vacantes
            </button>

            <button 
              disabled={loading}
            type="submit" className="tz-btn-primary tz-submit">
              {loading ? <div className="loaderSpinner"  style={{width:13,height:13}}/> : "Enviar búsqueda"}              
            </button>
          </div>
          {loading ? <span>
            Al ser un servidor gratuito puede tomar mas de lo esperado
          </span>
        : null  
        }
        {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  );
}
export default FormRequest