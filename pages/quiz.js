import React, { useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function ResultWidget({ result }) {
  const [acertos,setAcertos] = useState(0);
  const qtAcertos = result.reduce((soma,atual)=>{ if(atual){ return soma + 1}  return soma },0);
  return (
  
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
          {`Você Acertou ${qtAcertos} Questões`}
          <ul>
          {result.map((result,index)=>{ 
            return(
              <li key={`id_57${index}`}>
                {`Questão ${index + 1}: ${result ? 'Acertou': 'Errou'}`}
              </li>
            )
          })           
          }
          </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
}) {
  const [alternativaSelecionada,setAlternativaSelecionada] = useState(undefined);
  const [isFormSubmit,setIsFormSubmit] = useState(false);
  const isCorrect = alternativaSelecionada === question.answer;  
  const questionId = `question__${questionIndex}`;
  
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsFormSubmit(true);
            addResult(isCorrect);
            setTimeout(()=>{
              setAlternativaSelecionada(undefined)
              setIsFormSubmit(false);
              

              onSubmit();
              
            },2500)
            
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input
                  //style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  disabled={isFormSubmit}
                  onChange={()=>{
                    //console.log(alternativaSelecionada);
                    setAlternativaSelecionada(alternativeIndex);
                     
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={alternativaSelecionada === undefined || isFormSubmit}>
            Confirmar
          </Button>
        </form>
        {isCorrect && isFormSubmit && <p>Você Acertou !!</p>}
        {!isCorrect && isFormSubmit && <p>Você Errou !!</p>}
       {/* <p>{alternativaSelecionada}</p> */}
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [results,setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
      setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function AddResult(result){
    setResults([
      ...results,
      result
    ])
  }
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
 
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={AddResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget result={results}/>}
      </QuizContainer>
    </QuizBackground>
  );
}