import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SwapProps {}

const StyledSwap = styled.div`
  color: pink;
`;

export function Swap(props: SwapProps) {
  return (
    <StyledSwap>
      <h1>Welcome to Swap!</h1>
    </StyledSwap>
  );
}

export default Swap;
