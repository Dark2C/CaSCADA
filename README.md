# CaSCADA - Piattaforma per il monitoraggio sicuro, dall'industria all'agricoltura sostenibile.

CaSCADA è una piattaforma per il monitoraggio agricolo progettata per ridurre l'impatto ambientale delle coltivazioni attraverso dati, intelligenza artificiale e sicurezza integrata.  
Nasce come evoluzione di un progetto industriale preesistente, già impiegato in ambito SCADA, adattato oggi alle esigenze dell'agricoltura digitale.

---

## Obiettivo della Challenge

- Raccogliere dati ambientali tramite sensori IoT (temperatura, umidità, CO2)
- Ottimizzare risorse come acqua, fertilizzanti ed energia
- Calcolare e ridurre la carbon footprint per impianto
- Fornire insight e suggerimenti attuabili
- Garantire sicurezza end-to-end
- Supportare multi-utenza e scalabilità per consorzi agricoli

---

## Soluzione proposta

CaSCADA è strutturata su tre livelli indipendenti ma integrati, per funzionare anche in scenari con connettività intermittente o infrastrutture eterogenee.
Per un approfondimento completo, consultare il documento `paper.pdf`.

---

## Architettura

| Livello | Funzione | Tecnologie |
|--------|----------|-------------|
| **Edge** | Rilevamento e cifratura dati | ESP32, BLE, TLV, PSK, HMAC |
| **Fog** | Decodifica, verifica, buffering locale | Raspberry Pi, Node.js, SQLite |
| **Cloud** | Dashboard, gestione utenti, analisi AI | MongoDB, React, API REST, JWT |

---

## Sicurezza

- **Autenticazione** con PSK univoche per ogni dispositivo
- **Crittografia** dei dati con chiave derivata da `HMAC(PSK, timestamp + nonce)`
- **Integrità** garantita da HMAC-SHA256
- **Indipendenza dal canale** (BLE/Wi-Fi/LoRa): la sicurezza è applicativa, non legata al trasporto
- **Rotazione sicura delle chiavi** attraverso provisioning controllato

---

## Dashboard e Interfaccia

- Mappa geospaziale con stato nodi (verde/giallo/rosso)
- Grafici storici ambientali (temperatura, umidità, CO2, luce)
- Insight in linguaggio naturale generati da AI
- Export dati ambientali (CSV, JSON, PDF)
- Gestione impianti, dispositivi, utenti e ruoli
- Provisioning delle chiavi di sicurezza (PSK)

---

## Intelligenza Artificiale

- Insight contestuali basati su dati storici e stagionali
- Identificazione anomalie con spiegazioni tecniche
- Supporto a logiche predittive (es. irrigazione)
- Integrazione con fonti esterne (dati meteo, benchmark agricoli)

---

## Carbon Footprint

- Calcolo delle emissioni per impianto basato su dati raccolti localmente
- Stima del consumo energetico e impatto ambientale
- Strategie suggerite per la riduzione della CO2
- Possibile integrazione con dataset certificati (IPCC/ISO)

## Demo del modulo AI Insight
Per una demo dell'esperienza utente del modulo AI Insight, avviare il codice nella cartella "AI_INSIGHT" con il comando:
```bash
npm install
node index.js
```
**Nota:** prima di avviare la demo, configurare la chiave di Gemini nel file index.js.
Alternativamente, è presente una registazione video nella medesima cartella.