import React from "react";
import { Button } from "@mui/material";

interface Props {
  text: string;
  onClick: () => void;
}

const TesteComponent: React.FC<Props> = ({ text, onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {text}
    </Button>
  );
};

export default TesteComponent;
