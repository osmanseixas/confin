import styled from "styled-components";
import { formatCurrency } from "../../utils/Format";

const CardContainer = styled.div`
  background: ${(props) => props.bg || "#fff"};
  color: ${(props) => props.color || "#000"};
  padding: 20px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
`;

export default function Card({ titulo, valor, corFundo, corLetra }) {
  return (
    <CardContainer bg={corFundo} color={corLetra}>
      <h3>{titulo}</h3>
      <h2>{formatCurrency(valor)}</h2>
    </CardContainer>
  );
}