import { useState, type ChangeEvent, type FormEvent } from 'react';
import '../App.css'

interface FooterProps{
    onBack:()=>void
}

const FormRequest:React.FC<FooterProps>=({onBack})=>{
  const [form, setForm] = useState({
    nombre: "",
  });
      function update(field:string) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }
      const handleSubmit=(e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
        console.log('compeltado')
  }
 
     return (
    <section className="tz-form-section">
      <button className="tz-back" onClick={onBack}>
        ← Volver a ofertas
      </button>

      <h2 className="tz-form-title">¿Querés que busquemos por vos?</h2>
      <p className="tz-form-sub">
        Contanos qué tipo de oportunidades estás buscando y seleccionaremos
        manualmente las que consideremos más adecuadas para tu perfil.
      </p>

      <form className="tz-form" onSubmit={handleSubmit}>
        <label className="tz-field">
          <span>Nombre</span>
          <input
            type="text"
            value={form.nombre}
            onChange={update("nombre")}
            placeholder="¿Cómo te llamás?"
            required
          />
        </label>

      

        <button type="submit" className="tz-btn-primary tz-submit">
          Enviar búsqueda
        </button>
      </form>
    </section>
  );
}
export default FormRequest