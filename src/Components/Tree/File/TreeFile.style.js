import styled from "styled-components/macro";

export const StyledFile = styled.div`

display: flex;
  align-items: center;
  flex-direction:row;
  font-weight: normal;
  padding-left: ${(p) => p.theme.indent}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  // background-color: #0076fe1a !important;


  
  :hover {
    cursor: pointer;
    // background-color: #0076fe1a !important;
  }


  
`;
