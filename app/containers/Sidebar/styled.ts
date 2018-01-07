import styled from 'styled-components';

export const Container = styled.div`
  width: 250px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(167, 182, 194, 0.3);
`;

export const Header = styled.div`
  display: flex;
  padding: 8px 0px;
  font-size: 12px !important;
  border-bottom: 1px solid rgba(167, 182, 194, 0.3);
`;

export const HeaderButton = styled.button`
  margin-right: 10px;
  font-size: 13px !important;
  outline: none !important;
`;

export const Tree = styled.div`
  flex: 1;
  padding-top: 10px;
`;
