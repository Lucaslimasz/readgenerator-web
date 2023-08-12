'use client'
import { api } from "@/config/api";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [info, setInfo] = useState<any>([]);
  const [valueInput, setValueInput] = useState<string>('');
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/questions')
      setQuestions(data.data);
    })()
  }, []);

  const handleStart = () => {
    setIsStart(true);
  };

  const handleInputChange = (value: any) => {
    let currentQuestion = questions[currentQuestionIndex].id.toLowerCase();
    const inf = { id: currentQuestion, answer: value }
    setInfo((oldState: any) => ([...oldState, inf]));
  };

  const handleInputKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        handleInputChange(valueInput)
        setValueInput('')
      } else {
        const { data } = await api.post('/questions', info);
        const blob = new Blob([data], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        a.click();
        window.URL.revokeObjectURL(url);
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
          <button onClick={handleStart} className="bg-[#180b2c] border-purple-950 border-2 py-4 px-10 rounded-full font-bold">
            Gerar ReadMe
          </button>
        )
      }

      {
        isStart && (
          <div className="flex flex-col w-full items-center">
            <div className="w-full m-auto justify-center items-center max-w-xl">
              <p className="text-lg text-slate-300 m-auto">{questions[currentQuestionIndex].question}</p>
              <input
                className="bg-transparent w-full border-b-violet-700 border-b-[1px] mt-5 pb-4 text-2xl outline-0"
                placeholder="Responda aqui"
                onChange={(e) => setValueInput(e.target.value)}
                onKeyUp={handleInputKeyPress}
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
