function Img({src, alt, className}) {
    console.log("process.env ::: " + JSON.stringify(process.env));
    return(
        <img   className={className} src={process.env.REACT_APP_IMAAGE_URL_ROOT +  src} alt={alt}></img>
    )
}

export {Img};