# 💧 AiguaBeat — Gestió sostenible dels recursos hídrics a Catalunya

![Logo del projecte](./src/assets/logo.png)

---

## 🌍 Context i repte

> **Repte 3 — Gestió sostenible dels recursos hídrics a Catalunya**  
> Hackató IT Academy 2025 | Medi ambient i sostenibilitat  
> **ODS 6:** Aigua neta i sanejament | **ODS 13:** Acció pel clima

L’aigua és un recurs fonamental per al benestar de la població, el funcionament de l’economia i la sostenibilitat ambiental.  
A les ciutats, el consum d’aigua sovint es manté alt malgrat les campanyes d’estalvi i conscienciació.  
La nostra proposta busca fer visible **on, quan i com** es produeixen consums anòmals o ineficients.

---

## 🚀 Objectiu del projecte

Desenvolupar una **aplicació web interactiva** que permeti:

- 📊 Monitorar el consum d’aigua per barri i hora.
- ⚠️ Detectar automàticament **anomalies** (fugues, pics o caigudes brusques).
- 💬 Generar **alertes personalitzades** segons llindars definits per l’usuari.
- 🗺️ Visualitzar dades en un **mapa dinàmic** amb codis de color.
- 🌦️ Contextualitzar el consum amb dades meteorològiques (pluja i temperatura).
- 📧 Enviar notificacions o informes periòdics (simulats).

### 🖥️ Vista d’escriptori  
<p align="center">
  <img src="./src/assets/Imagen12.png" alt="AiguaMap - Vista d'escriptori" width="800"/>
</p>

---

### 📱 Vista mòbil  
<p align="center">
  <img src="./src/assets/Imagen11.png" alt="AiguaMap - Vista mòbil" width="350"/>
</p>

## 💡 Solució proposada

**AiguaBeat** és una eina visual i intuïtiva que mostra en temps real l’estat del consum d’aigua a Barcelona.

- Mapa interactiu amb **Leaflet + React**
- Classificació automàtica de barris segons estat:
  - 🟢 **Normal**
  - 🟡 **Atenció**
  - 🔴 **Crític**
- Sistema d’alertes personalitzat
- Dashboard amb estadístiques globals

---

## 🧭 Arquitectura del projecte


## 📁 Estructura del projecte

```bash
📦 aiguabeat/
├── 📁 public/                     
│
├── 📁 src/                        
│   ├── 📁 assets/                             
│   │
│   ├── 📁 components/             
│   │   ├── Dashboard.jsx         
│   │   ├── MapView.jsx           
│   │   ├── AlertsList.jsx         
│   │   └── WaterPulse.jsx         
│   │
│   ├── 📁 services/               
│   │   └── api.js                
│   │
│   ├── 📁 data/                   
│   │   ├── summary.json           
│   │   └── consumption.json       
│   │
│   ├── App.jsx                    
│   ├── main.jsx                   
│   └── index.css                  
│
├── package.json                  
└── README.md                     




## ⚙️ Eines i tecnologies utilitzades

| Àmbit | Eina / Llibreria | Descripció |
|-------|------------------|-------------|
| Frontend | **React + Vite** | Estructura SPA, alta velocitat de compilació |
| Estils | **Tailwind CSS** | Disseny responsive i personalitzable |
| Mapa | **Leaflet.js** | Visualització geogràfica de barris i anomalies |
| Icons | **Lucide-react** | Iconografia moderna i vectorial |
| Dades | **JSON-server / Mock API** | Simulació de backend amb dades reals o falses |
| Visuals | **Chart.js  | Gràfics per a informes i estadístiques |

---



🏗️ Frameworks i llibreries utilitzades

⚛️ React — Componentització del frontend

💨 Tailwind CSS — Estils responsive i ràpids

🗺️ Leaflet.js — Mapa interactiu per a visualitzar barris i anomalies

🧩 Lucide-react — Icones modernes i minimalistes

💾 JSON-server — Simulació del backend amb dades locals


## ⚙️ Instal·lació i execució

npm install
npm run dev
npm run build
