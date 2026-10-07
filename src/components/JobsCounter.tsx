

interface Props{
    counter:number|null;
}

const OpenRolesCounter:React.FC<Props>=({counter})=>{
    return(
        <section className="tz-tabs-wrap">
            Vacantes disponibles: {counter}
        </section>
    )
}
export default OpenRolesCounter