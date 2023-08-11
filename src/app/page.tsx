'use client'
import { useState } from "react";

interface IInfo {
  images: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  technologiesUsed: string;
  github: string;
  tutorialToStartProject: string;
  user: string;
}

export default function Home() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [info, setInfo] = useState<IInfo>({} as IInfo);
  const [valueInput, setValueInput] = useState<string>('');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const data = [
    {
      id: 'title',
      question: 'Qual o título do projeto?',
    },
    {
      id: 'sub-title',
      question: 'Qual o sub-título do projeto?',
    },
    {
      id: 'description-project',
      question: 'Descrição do projeto',
    },
    {
      id: Math.random(),
      question: 'Qual o link do projeto no ar?',
    },
    {
      id: Math.random(),
      question: 'Quais tecnologias foram usadas no projeto? (Separe por vírgulas)',
    },
    {
      id: Math.random(),
      question: 'Qual o link do repositório no GitHub?',
    },
    {
      id: Math.random(),
      question: 'Qual é o tutorial para iniciar o projeto?',
    },
    {
      id: Math.random(),
      question: 'Qual o seu nome de usuário no github?',
    },
  ];

  const handleStart = () => {
    setIsStart(true);
  };

  const handleInputChange = (value: any) => {
    const newInfo: IInfo = { ...info };
    let currentQuestion = data[currentQuestionIndex].question.toLowerCase();
    newInfo[currentQuestion as keyof IInfo] = value;

    console.log(currentQuestion, newInfo)

    setInfo(newInfo);
  };


  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (currentQuestionIndex < data.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        handleInputChange(valueInput)
        setValueInput('')
      }
    }
  };


  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between py-10 px-24">
      <div className="flex w-full justify-between items-center">
        <p className="text-sm">
          README Generator
        </p>
        <p className="w-44 text-right text-sm">
          Usado 300 vezes
        </p>
      </div>

      {
        !isStart && (
          <button onClick={handleStart} className="bg-[#180b2c] py-4 px-8 rounded-md font-bold">
            Iniciar
          </button>
        )
      }

      {
        isStart && (
          <div className="flex flex-col w-full items-center">
            <div className="w-full m-auto justify-center items-center max-w-xl">
              <p className="text-lg text-slate-300 m-auto">{data[currentQuestionIndex].question}</p>
              <input
                className="bg-transparent w-full border-b-violet-700 border-b-[1px] mt-5 pb-4 text-2xl outline-0"
                placeholder="Responda aqui"
                onChange={(e) => setValueInput(e.target.value)}
                onKeyPress={handleInputKeyPress}
                value={valueInput}
              />
              <p className="mt-2 text-slate-500"><b className="text-slate-200">Enter</b> para continuar</p>
            </div>
          </div>
        )
      }


      <div>
        <p className="text-xs">Feito com 🤍 por Lucas Lima</p>
      </div>
    </main>
  );
}
