import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mercatoGlobale = [
  { label: 'Mercato biotech mondiale (2025)', value: '2.150 mld $', fonte: 'Mordor Intelligence' },
  { label: 'Previsione 2031', value: '4.410 mld $', fonte: 'Mordor Intelligence' },
  { label: 'Crescita annua (CAGR)', value: '+12,7%', fonte: 'Mordor Intelligence' },
  { label: 'Quota "salute" sul fatturato', value: '48,9%', fonte: 'Mordor Intelligence' },
];

const mercatoItalia = [
  { label: 'Imprese biotech in Italia', value: '5.869', fonte: 'Assobiotec 2025' },
  { label: 'Fatturato del settore', value: '53,4 mld €', fonte: 'Assobiotec 2025' },
  { label: 'Addetti', value: '102.565', fonte: 'Assobiotec 2025' },
  { label: 'Micro e piccole imprese', value: '89%', fonte: 'Assobiotec 2025' },
];

const rischi = [
  { label: 'Costo medio per un farmaco approvato', value: '≈ 2,6 mld $', fonte: 'Tufts/DiMasi' },
  { label: 'Tempo di sviluppo', value: '10-12 anni', fonte: 'Tufts CSDD' },
  { label: 'Probabilità di successo dalla Fase I', value: '≈ 9,6%', fonte: 'BIO/Biomedtracker' },
];

function DataCard({ title, data }: { title: string; data: { label: string; value: string; fonte: string }[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-start justify-between gap-2 text-sm">
            <span className="text-muted-foreground">{d.label}</span>
            <span className="text-right">
              <span className="font-semibold block">{d.value}</span>
              <span className="text-xs text-muted-foreground">{d.fonte}</span>
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Lezione() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">La lezione guidata</h2>
        <p className="text-muted-foreground">
          Sei il team di <strong>BioSensor S.r.l.</strong>, una startup che sviluppa un kit diagnostico rapido.
          Un investitore vuole sapere se darvi i soldi. Impara gli strumenti per rispondere, un passo alla volta.
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="s1" className="w-full">
        <AccordionItem value="s1">
          <AccordionTrigger className="text-lg">
            <span><Badge className="mr-2">Passo 1</Badge>Il mercato in 60 secondi</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>
              Prima di valutare <em>un</em> investimento, bisogna capire <em>il</em> mercato. Le buone notizie:
              il settore cresce forte. La cattiva: è durissimo e costosissimo.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <DataCard title="🌍 Mondo" data={mercatoGlobale} />
              <DataCard title="🇮🇹 Italia" data={mercatoItalia} />
              <DataCard title="⚠️ I rischi" data={rischi} />
            </div>
            <p className="text-sm text-muted-foreground">
              Fonti complete nel file Excel (foglio "Fonti"): Mordor Intelligence, Report Assobiotec-Federchimica 2025,
              Tufts CSDD, BIO/Biomedtracker.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="s2">
          <AccordionTrigger className="text-lg">
            <span><Badge className="mr-2">Passo 2</Badge>Perché i soldi di domani valgono meno</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <p>
              Ti offro <strong>100 € oggi</strong> oppure <strong>100 € tra un anno</strong>. Scegli oggi, sempre: potresti
              depositarli al 5% e tra un anno avresti 105 €. Quindi 100 € "di tra un anno" valgono solo
              100 / 1,05 = <strong>95,24 € di oggi</strong>.
            </p>
            <p>
              Questa operazione si chiama <strong>attualizzare (o scontare)</strong>: si porta indietro nel tempo un flusso
              di cassa futuro usando il <strong>coefficiente 1 / (1 + t)ⁿ</strong>, dove <em>t</em> è il tasso di sconto
              (es. 5% = 0,05) ed <em>n</em> gli anni che mancano.
            </p>
            <div className="rounded-lg bg-muted p-4 text-sm font-mono">
              Esempio: 1.000 € tra 3 anni, tasso 10% → 1.000 × 1/(1,10)³ = 1.000 × 0,7513 = <strong>751,31 € di oggi</strong>
            </div>
            <p className="text-sm text-muted-foreground">
              Più il tasso è alto, più il futuro "pesa" poco: ed è proprio così che si tiene conto del rischio.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="s3">
          <AccordionTrigger className="text-lg">
            <span><Badge className="mr-2">Passo 3</Badge>Il VAN: il giudice numero uno</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <p>
              Il <strong>VAN (Valore Attuale Netto)</strong> attualizza TUTTI i flussi di cassa del progetto e toglie
              l'investimento iniziale. In una riga: <strong>quanti euro di oggi guadagno davvero?</strong>
            </p>
            <div className="rounded-lg bg-muted p-4 text-sm font-mono">
              VAN = -Investimento + Flusso₁/(1+t)¹ + Flusso₂/(1+t)² + ... + Flussoₙ/(1+t)ⁿ
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>VAN &gt; 0</strong> → il progetto crea valore: si può fare!</li>
              <li><strong>VAN = 0</strong> → si guadagna esattamente il tasso richiesto: indifferente.</li>
              <li><strong>VAN &lt; 0</strong> → il progetto distrugge valore: lasciar stare.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              In Excel: <code className="text-xs bg-muted px-1 rounded">=-Investimento + NPV(tasso; flussi anno 1...n)</code>.
              Attenzione: il flusso dell'anno 0 NON si sconta, è già di oggi!
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="s4">
          <AccordionTrigger className="text-lg">
            <span><Badge className="mr-2">Passo 4</Badge>TIR e Payback: gli altri due giudici</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <p>
              Il <strong>TIR (Tasso Interno di Rendimento)</strong> è il tasso che rende il VAN esattamente zero.
              La domanda che risponde: <strong>"Che rendimento mi dà questo progetto?"</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>TIR <strong>maggiore</strong> del tasso richiesto → conviene.</li>
              <li>TIR <strong>minore</strong> → non conviene.</li>
            </ul>
            <p>
              Il <strong>Payback</strong> invece chiede: <strong>"Tra quanti anni rientro dei soldi?"</strong> Si sommano i
              flussi finché il bilancio torna positivo. Nel biotech è quasi sempre lungo (anni di R&S prima dei ricavi):
              un punto debole da saper difendere davanti agli investitori.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="s5">
          <AccordionTrigger className="text-lg">
            <span><Badge className="mr-2">Passo 5</Badge>Il verdetto</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            <p>
              I tre giudici insieme decidono: <strong>VAN &gt; 0</strong>, <strong>TIR &gt; tasso richiesto</strong> e
              <strong> payback accettabile</strong>. Se anche uno solo dice no, l'investitore ci ripensa.
            </p>
            <p>
              Ora tocca a te: apri il <strong>Simulatore</strong> qui a fianco, muovi gli slider e prova a "spezzare" il
              progetto di BioSensor (aumenta il rischio, ritarda i ricavi...). Poi sfida il <strong>Quiz</strong>!
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
