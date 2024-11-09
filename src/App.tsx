import "./App.css";
import {AppLayout} from "@/components/app-layout.tsx";
import Deck from "@/pages/deck/deck.tsx";


function App() {

  const pages = [
    {
      title: 'Deck',
      component: <Deck/>
    },
  ]

  return <AppLayout children={pages[0].component} />;
}

export default App;
