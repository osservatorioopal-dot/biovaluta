import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Lezione from '@/sections/Lezione';
import Simulatore from '@/sections/Simulatore';
import Quiz from '@/sections/Quiz';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/60 to-background">
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl">🧬</span>
            <h1 className="text-xl font-bold tracking-tight">BioValuta</h1>
            <Badge className="bg-teal-700">Esercitazione — Valutazione degli investimenti</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Corso di Biotecnologia · Valutiamo insieme se finanziare la startup BioSensor S.r.l., passo dopo passo.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="lezione" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="lezione">📖 Lezione</TabsTrigger>
            <TabsTrigger value="simulatore">🧪 Simulatore</TabsTrigger>
            <TabsTrigger value="quiz">🎯 Quiz</TabsTrigger>
          </TabsList>
          <TabsContent value="lezione" className="mt-6">
            <Lezione />
          </TabsContent>
          <TabsContent value="simulatore" className="mt-6">
            <Simulatore />
          </TabsContent>
          <TabsContent value="quiz" className="mt-6">
            <Quiz />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="max-w-5xl mx-auto px-4 pb-8 pt-4 text-xs text-muted-foreground border-t">
        Dati di mercato: Mordor Intelligence (2025), Report Assobiotec-Federchimica 2025, Tufts CSDD / DiMasi,
        BIO-Biomedtracker, DealMaker. Fonti complete nel file Excel allegato (foglio «Fonti»).
      </footer>
    </div>
  );
}
