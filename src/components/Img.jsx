function Img({ src, localSrc, alt, className }) {
    console.log("process.env ::: " + JSON.stringify(process.env));
    if (src || localSrc) {
        return (
            <img className={className} src={localSrc ? URL.createObjectURL(localSrc) : process.env.REACT_APP_IMAAGE_URL_ROOT + src}
                alt={alt}></img>
        );
    } else {
        return <img alt={"resim"}></img>
    }
}

export { Img };