import "./App.css";
import {AppLayout} from "@/components/app-layout.tsx";
import Deck from "@/pages/deck/deck.tsx";
import {WelcomePage} from "@/pages/welcome/welcome-page.tsx";


function App() {

    const pages = [
        {
            title: "Welcome",
            component: <WelcomePage/>
        },
        {
            title: 'Deck',
            component: <Deck/>
        },
    ]
    //return <WelcomePage/>
    return <AppLayout children={pages[1].component}/>;
}

export default App;
