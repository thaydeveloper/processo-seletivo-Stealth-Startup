import React from "react";
import styled from "styled-components";

interface StyledSelectButtonProps {
  selected: boolean;
}

const StyledSelectButton = styled.span<StyledSelectButtonProps>(
  ({ theme, selected }) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "23%",
    textAlign: "center",
  })
);

interface SelectButtonProps {
  selected: boolean;
  onClick: () => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  children,
  selected,
  onClick,
}) => {
  return (
    <StyledSelectButton selected={selected} onClick={onClick}>
      {children}
    </StyledSelectButton>
  );
};

export default SelectButton;
