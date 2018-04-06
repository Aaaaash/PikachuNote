import styled from 'styled-components';

export const Detail = styled.div`
  width: 325px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid rgba(167, 182, 194, 0.3);
`;

export const Child = styled.div`
  width: 100%;
  height: 64px;
  padding: 10px;
  cursor: pointer;
  box-shadow: inset 0 1px 0 0 rgba(16, 22, 26, 0.15);
  &:hover {
    background-color: rgba(191, 204, 214, 0.4);
  }
`;

export const Titlt = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  & > span {
    padding-right: 10px;
  }
`;

export const AllTag = styled.p`
  margin: 0px 0px 0px 10px;
  & > span {
    margin-right: 5px;
  }
`;

export const About = styled.div`
  font-size: 12px;
  color: #a7b6c2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    padding: 0px;
    margin: 0px;
  }
  & > span {
    margin-right: 10px;
  }
`;
