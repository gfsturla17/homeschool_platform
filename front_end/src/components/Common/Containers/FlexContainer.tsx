import styled from 'styled-components';

interface Props {
  justifycontent?: string;
  alignItems?: string;
}

const FlexContainer = styled.div<Props>`
  display: flex;
  justify-content: ${({ justifycontent }) => justifycontent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;

export default FlexContainer;