import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import { useRouter } from 'next/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

import { useEffect, useState } from 'react';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;


export default function Home() {
  const router = useRouter();
  const [name,setName] = useState('');
  const dale = false;
  

  
  return (
    <QuizBackground backgroundImage={db.bg} teste="cover" >
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event)=>{
              event.preventDefault();
              router.push(`/quiz?name=${name}`)      
              
            }}>
              {dale === false &&<Input name="NomeDoJogador" placeholder="Coloque seu nome" onChange={(event)=>{
                setName(event.target.value);  
              }} value={name}/>}
              <Button type="submit" disabled={name.length === 0}>{`Jogar ${name}`}</Button>
            </form>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/higorosantos" />
    </QuizBackground>
  );
}
