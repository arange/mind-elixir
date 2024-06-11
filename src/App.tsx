import { useRef, useState } from "react";
import "./App.scss";
import MindElixirReact from "./MindElixirReact";
import MindElixir, { Options } from "mind-elixir";

function App() {
  const plugins = [];
  const [data, setData] = useState(MindElixir.new("new topic"));
  const [options, setOptions] = useState<Pick<Options, "direction">>({
    direction: MindElixir.SIDE,
  });
  const changeDirection = () => {
    options.direction = MindElixir.LEFT;
    setOptions({ ...options });
  };
  const inputEl = useRef(null);
  const ME = useRef(null);
  console.log("App render", ME);
  const handleOperate = (operation) => {
    console.log("handleOperate", operation);
  };
  const handleSelectNode = (operation) => {
    console.log("handleSelectNode", operation);
  };
  const handleExpandNode = (operation) => {
    console.log("handleExpandNode", operation);
  };
  const center = () => {
    // access mind-elixir instance
    ME.current.instance.toCenter();
  };
  const download = async () => {
    console.log(ME.current.instance.getData());
    try {
      const blob = await ME.current.instance.exportPng(false);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "filename.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="App">
      <div className="showcase">
        <h2>Render</h2>
        <div className="block">
          <MindElixirReact
            ref={ME}
            data={data}
            options={options}
            plugins={plugins}
            style={{ height: "75vh", width: "100%" }}
            onOperate={handleOperate}
            onSelectNode={handleSelectNode}
            onExpandNode={handleExpandNode}
          />
        </div>
        <div className="block">
          <input placeholder="Paste data here" ref={inputEl}></input>
          <button onClick={() => setData(JSON.parse(inputEl.current.value))}>
            Set data
          </button>
          <button onClick={changeDirection}>Set options</button>
          <button onClick={center}>Center</button>
          <button onClick={download}>Export as PNG</button>
        </div>
      </div>
    </div>
  );
}

export default App;
