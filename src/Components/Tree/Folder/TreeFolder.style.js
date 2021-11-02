import styled from "styled-components/macro";

export const StyledFolder = styled.section`
  font-weight: bold;
  background-color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-left: ${(p) => p.theme.indent}px;
  .tree__file {
    padding-left: ${(p) => p.theme.indent}px;

    :hover {
      background-color: #0076fe1a;

    }
  }
  
`;
