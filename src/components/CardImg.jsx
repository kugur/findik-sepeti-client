import { Card } from "react-bootstrap";

function CardImage({ src, localSrc, alt, className }) {
    console.log("process.env ::: " + JSON.stringify(process.env));
    if (src || localSrc) {
      return (
        <Card.Img
          className={className}
          src={
            localSrc
              ? URL.createObjectURL(localSrc)
              : process.env.REACT_APP_IMAAGE_URL_ROOT + src
          }
          alt={alt}
        ></Card.Img>
      );
    } else {
      return <Card.Img alt={"resim"}></Card.Img>;
    }
  }
  
  export { CardImage };
  