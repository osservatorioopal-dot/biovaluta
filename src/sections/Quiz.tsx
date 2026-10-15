import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type Question = {
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

const questions: Question[] = [
  {
    q: 'Perché 100 € tra un anno valgono meno di 100 € oggi?',
    options: [
      'Perché l\'inflazione li svaluta sempre',
      'Perché oggi potrei investirli e tra un anno ne avrei di più',
      'Perché le banche applicano le commissioni',
    ],
    correct: 1,
    explain: 'Il motivo principale è l\'opportunità: oggi i soldi possono essere investiti per generare un rendimento (e il rischio va pagato).',
  },
  {
    q: 'Il coefficiente di sconto con tasso 10% e n = 2 anni vale...',
    options: ['0,90', '0,83', '0,75'],
    correct: 1,
    explain: '1 / (1,10)² = 1 / 1,21 = 0,826 ≈ 0,83.',
  },
  {
    q: 'Un progetto ha VAN = -40.000 €. Cosa significa?',
    options: [
      'Che perde 40.000 € ogni anno',
      'Che non ripagherà mai l\'investimento',
      'Che, attualizzati i flussi, i costi superano i ricavi: meglio non farlo',
    ],
    correct: 2,
    explain: 'VAN negativo = il progetto DISTRUGGE valore rispetto al tasso richiesto. Non significa perdite contabili ogni anno!',
  },
  {
    q: 'L\'investitore richiede il 15%. Il progetto ha TIR = 21%. Conviene?',
    options: [
      'Sì, perché 21% > 15%',
      'No, perché il TIR va sempre confrontato con il VAN',
      'Dipende dal payback',
    ],
    correct: 0,
    explain: 'Il TIR (21%) supera il tasso richiesto (15%): il progetto rende più del necessario.',
  },
  {
    q: 'Il TIR è, per definizione, il tasso che rende...',
    options: ['il payback uguale a zero', 'il VAN uguale a zero', 'i ricavi uguali ai costi'],
    correct: 1,
    explain: 'Proprio così: TIR = il tasso per cui VAN = 0. È il "rendimento implicito" del progetto.',
  },
  {
    q: 'Nel biotech il payback è spesso lungo perché...',
    options: [
      'i laboratori costano tanto di affitto',
      'servono anni di R&S e trial clinici prima dei ricavi',
      'le startup biotech non sanno vendere',
    ],
    correct: 1,
    explain: 'R&S, fasi cliniche e approvazione regulatoria richiedono 10+ anni: i ricavi arrivano tardi, il payback si allunga.',
  },
];

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) setScore(score + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) setDone(true);
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const passed = score >= 4;
    return (
      <div className="max-w-xl mx-auto space-y-4 text-center pt-8">
        <div className="text-5xl">{passed ? '🏆' : '📚'}</div>
        <h2 className="text-2xl font-bold">
          Hai totalizzato {score} / {questions.length}
        </h2>
        <p className="text-muted-foreground">
          {passed
            ? 'Ottimo lavoro! Ora sai valutare un investimento come un vero analista: apri il file Excel e rifai il caso BioSensor da solo.'
            : 'Quasi! Rileggi la lezione guidata e riprova: concentrati su VAN, TIR e coefficiente di sconto.'}
        </p>
        <Button onClick={restart}>Ricomincia il quiz</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Quiz finale</h2>
        <Badge variant="outline">
          Domanda {idx + 1} di {questions.length}
        </Badge>
      </div>
      <Progress value={((idx + (picked !== null ? 1 : 0)) / questions.length) * 100} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{q.q}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {q.options.map((opt, i) => {
            let cls = 'w-full justify-start text-left';
            if (picked !== null) {
              if (i === q.correct) cls += ' bg-emerald-100 border-emerald-500 hover:bg-emerald-100';
              else if (i === picked) cls += ' bg-red-100 border-red-400 hover:bg-red-100';
            }
            return (
              <Button key={i} variant="outline" className={cls} onClick={() => pick(i)}>
                {opt}
              </Button>
            );
          })}
          {picked !== null && (
            <div className={`rounded-lg p-3 text-sm ${picked === q.correct ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>
              <strong>{picked === q.correct ? 'Esatto!' : 'Non proprio.'}</strong> {q.explain}
            </div>
          )}
          {picked !== null && <Button className="w-full" onClick={next}>{idx + 1 >= questions.length ? 'Vedi il risultato' : 'Prossima domanda'}</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
