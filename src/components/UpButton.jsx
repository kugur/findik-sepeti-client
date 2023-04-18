import { IconButton } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

export default function UpButton({ componentRef }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (componentRef && componentRef.current) {
      componentRef.current.firstChild.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  return (
    <IconButton onClick={handleClick} className="upButton">
      <ArrowUpward className="arrow" />
    </IconButton>
  );
}
