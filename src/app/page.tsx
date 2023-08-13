'use client'
import { api } from "@/config/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [info, setInfo] = useState<any>([]);
  const [valueInput, setValueInput] = useState<string>('');
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quantityUsers, setQuantityUsers] = useState<boolean>()

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/questions')
      setQuestions(data.data);
      setQuantityUsers(data.usersQuantity)
    })()
  }, []);

  const handleStart = () => {
    setIsStart(true);
  };

  const handleInputChange = async (value: any) => {
    let currentQuestion = await questions[currentQuestionIndex].id.toLowerCase();
    const inf = { id: currentQuestion, answer: value }
    setInfo((oldState: any) => {
      const newInfo = [...oldState, inf]
      return newInfo
    });
  };

  const handleInputKeyPress = async (event: any) => {
    if (event?.key === "Enter" || event.type === 'click') {
      await handleInputChange(valueInput)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const lastInf = { id: questions[currentQuestionIndex].id.toLowerCase(), answer: valueInput };
        const newInfo = [...info, lastInf];
        const { data } = await api.post('/questions', newInfo);
        const blob = new Blob([data], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        a.click();
        window.URL.revokeObjectURL(url);
        window.location.href = '/';
      }
      setValueInput('')
    }
  };

  if (!questions || !quantityUsers) {
    return null;
  }

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between py-10 px-4 sm:px-10 md:px-24">
      <div className="flex w-full justify-between items-center">
        <p className="text-sm">
          README Generator
        </p>

        <p className="w-44 text-right text-sm">
          Usado {quantityUsers} vezes
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
              <p className="text-lg text-slate-300 m-auto">{questions[currentQuestionIndex]?.question}</p>
              <input
                className="bg-transparent w-full border-b-violet-700 border-b-[1px] mt-5 pb-4 text-2xl outline-0"
                placeholder="Responda aqui"
                onChange={(e) => setValueInput(e.target.value)}
                onKeyUp={handleInputKeyPress}
                value={valueInput}
              />
              <p className="mt-2 text-slate-500" ><b className="text-slate-200 cursor-pointer" onClick={(e) => handleInputKeyPress(e)}>Enter</b> para continuar</p>
            </div>
          </div>
        )
      }

      <div>
        <p className="text-xs">Feito com 🤍 por <a className="font-semibold" href="https://github.com/lucaslimasz" target="_blank">Lucas Lima</a></p>
        <p className="text-xs w-full text-center mt-1"><a href="https://github.com/Lucaslimasz/readme-generator" target="_blank">contribuintes</a></p>
      </div>
    </main >
  );
}
