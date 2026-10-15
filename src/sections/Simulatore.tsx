import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { npv, irr, payback, discountedFlows, eur, eur2, pct } from '@/lib/finance';

const FLOW_MIN = -500000;
const FLOW_MAX = 1500000;

function FlowSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <span className={`text-sm font-semibold tabular-nums ${value < 0 ? 'text-red-600' : 'text-emerald-700'}`}>
          {eur(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        min={FLOW_MIN}
        max={FLOW_MAX}
        step={10000}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}

function Verdict({ ok }: { ok: boolean }) {
  return (
    <div
      className={`rounded-xl p-5 text-center text-lg font-bold ${
        ok ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {ok
        ? '✅ SÌ, INVESTI! Il VAN è positivo e il TIR supera il tasso richiesto.'
        : '❌ NO, RIVEDIAMO LE IPOTESI: il progetto non crea abbastanza valore.'}
    </div>
  );
}

export default function Simulatore() {
  const [invest, setInvest] = useState(500000);
  const [flows, setFlows] = useState([-200000, -100000, 400000, 700000, 1000000]);
  const [rate, setRate] = useState(0.12);

  const allFlows = useMemo(() => [-invest, ...flows], [invest, flows]);
  const van = useMemo(() => npv(rate, allFlows), [rate, allFlows]);
  const tir = useMemo(() => irr(allFlows), [allFlows]);
  const pb = useMemo(() => payback(allFlows), [allFlows]);
  const disc = useMemo(() => discountedFlows(rate, allFlows), [rate, allFlows]);

  const chartMax = Math.max(...allFlows.map(Math.abs), ...disc.map(Math.abs), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Il simulatore di BioSensor</h2>
        <p className="text-muted-foreground">
          Muovi gli slider: i tre giudici (VAN, TIR, Payback) si aggiornano in tempo reale, come nel file Excel.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">🧪 Le tue ipotesi (sono TUE: cambiale!)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FlowSlider label="Investimento iniziale (anno 0)" value={-invest} onChange={(v) => setInvest(-v)} />
            {flows.map((f, i) => (
              <FlowSlider
                key={i}
                label={`Flusso di cassa — anno ${i + 1}`}
                value={f}
                onChange={(v) => setFlows(flows.map((x, j) => (j === i ? v : x)))}
              />
            ))}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Tasso di sconto (il "rischio" percepito)</Label>
                <span className="text-sm font-semibold tabular-nums">{pct(rate)}</span>
              </div>
              <Slider value={[rate * 100]} min={0} max={40} step={0.5} onValueChange={(v) => setRate(v[0] / 100)} />
              <p className="text-xs text-muted-foreground">
                Più il progetto è rischioso, più l'investitore chiederà: prova a salire al 25-30%!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">⚖️ Il verdetto dei tre giudici</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-xs text-muted-foreground">VAN</div>
                  <div className={`text-lg font-bold tabular-nums ${van > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {eur2(van)}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-xs text-muted-foreground">TIR</div>
                  <div className={`text-lg font-bold tabular-nums ${tir !== null && tir > rate ? 'text-emerald-700' : 'text-red-600'}`}>
                    {tir === null ? '—' : pct(tir)}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-xs text-muted-foreground">Payback</div>
                  <div className={`text-lg font-bold tabular-nums ${pb !== null && pb <= 5 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {pb === null ? 'mai 😬' : `${pb.toFixed(1)} anni`}
                  </div>
                </div>
              </div>
              <Verdict ok={van > 0 && tir !== null && tir > rate} />
              <p className="text-xs text-muted-foreground">
                Regola: VAN &gt; 0, TIR &gt; tasso richiesto ({pct(rate)}), payback ragionevole (qui: entro 5 anni).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">📊 I flussi, anno per anno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {allFlows.map((f, i) => {
                  const h = (v: number) => Math.max(4, (Math.abs(v) / chartMax) * 80);
                  return (
                    <div key={i} className="grid grid-cols-[70px_1fr_110px] items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{i === 0 ? 'Oggi' : `Anno ${i}`}</span>
                      <div className="relative h-5 flex items-center">
                        <div className="absolute left-1/2 h-full w-px bg-border" />
                        {f >= 0 ? (
                          <div className="absolute left-1/2 bg-teal-600/80 rounded-r" style={{ width: h(f), height: 16 }} />
                        ) : (
                          <div className="absolute bg-red-400/80 rounded-l" style={{ left: `calc(50% - ${h(f)}px)`, width: h(f), height: 16 }} />
                        )}
                      </div>
                      <span className="text-right tabular-nums">
                        {eur(f)}
                        <span className="block text-muted-foreground">att. {eur(disc[i])}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-3" />
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-teal-600/80" /> flusso nominale</span>
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-red-400/80" /> flusso negativo</span>
                <span>"att." = flusso attualizzato al tasso scelto</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Badge variant="outline" className="text-xs">
        💡 Domanda di classe: che succede al VAN se i ricavi slittano di un anno? E se il tasso sale al 30%? Trovate il punto di pareggio!
      </Badge>
    </div>
  );
}
