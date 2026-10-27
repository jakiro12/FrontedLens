import '../App.css'

interface Props{
  onpenForm:()=>void;
}

const HeaderSection:React.FC<Props>=({onpenForm})=> {
  return (
    <header className="tz-header">
        <button className="tz-logo" >
          ..Front/..End/..Lens
        </button>
          <button
          onClick={onpenForm}
          className="tz-nav-cta" >
          Sumarse
          </button>
    </header>
  );
}
export default HeaderSection