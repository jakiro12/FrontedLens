import '../App.css'

interface HeaderProps{
    onHome:()=>void
    onForm:()=>void
}

const HeaderSection:React.FC<HeaderProps>=({ onHome, onForm })=> {
  return (
    <header className="tz-header">
        <button className="tz-logo" onClick={onHome}>
          ..Front/..End/..Lens
        </button>
          <button className="tz-nav-cta" onClick={onForm}>
            Selección personalizada
          </button>
    </header>
  );
}
export default HeaderSection