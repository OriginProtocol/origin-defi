import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface GovernanceProps {}

const StyledGovernance = styled.div`
  color: pink;
`;

export function Governance(props: GovernanceProps) {
  return (
    <StyledGovernance>
      <h1>Welcome to Governance!</h1>
    </StyledGovernance>
  );
}

export default Governance;
