/** @format */

import styled from 'styled-components';
import MainNav from './MainNav';
import Logo from './Logo';
// import Uploader from '../data/Uploader';
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1.6rem 1.6rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
