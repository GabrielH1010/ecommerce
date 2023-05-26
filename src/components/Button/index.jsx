import { StyledButton } from "./styles";

function Button({ children, outlined, ...props }) {
  return (
    <StyledButton outlined={outlined} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
