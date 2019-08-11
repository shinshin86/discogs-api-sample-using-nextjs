import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Title = styled.div`
  margin: 0;
  width: 100%;
  padding-top: 80px;
  line-height: 1.15;
  font-size: 48px;
  text-align: center;
`;

const Row = styled.div`
  max-width: 500px;
  margin: 40px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const InputText = styled.input`
  margin-left: 16px;
`;

const Button = styled.div`
  text-align: center;
  margin-top: 32px;
`;

const FormSubmit = styled.input`
  background-color: #4385cc;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
`;

const Home = () => (
  <div>
    <Title>Discogs API Sample</Title>
    <Row>
      <form action="/releases">
        <label>
          Release ID:
          <InputText type="text" name="id" />
        </label>
        <Button>
          <FormSubmit type="submit" value="Search" />
        </Button>
      </form>
    </Row>
  </div>
);

export default Home;
