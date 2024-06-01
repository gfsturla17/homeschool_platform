import styled from 'styled-components';

interface Props {
  justifyContent?: string;
  alignItems?: string;
}

const FlexContainer = styled.div<Props>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;

export default FlexContainer;