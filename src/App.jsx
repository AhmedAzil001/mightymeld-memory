import { useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";

function App() {
  const [gameState, setGameState] = useState("start");
  const [dark,setDark]=useState(false);

  switch (gameState) {
    case "start":
      return <StartScreen start={() => setGameState("play")} mode={dark} handleMode={()=>setDark(!dark)} />;
    case "play":
      return <PlayScreen end={() => setGameState("start")} mode={dark} handleMode={()=>setDark(!dark)}/>;
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
