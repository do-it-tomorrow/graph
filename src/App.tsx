import { GraphInput } from "./components/GraphInput";
import { GraphCanvas } from "./components/GraphCanvas";
import { GraphSettings } from "./components/GraphSettings";

import { Settings } from "./types";
import { Graph } from "./types";

import { useState } from "react";
function App() {
  const [graph, setGraph] = useState<Graph>({
    nodes: new Array<string>(),
    adj: new Map<string, string[]>(),
    rev: new Map<string, string[]>(),
    edges: new Array<string>(),
    edgeLabels: new Map<string, string>(),
  });
  const [directed, setDirected] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({
    labelOffset: 0,
    darkMode:
      localStorage.getItem("darkMode") !== null
        ? localStorage.getItem("darkMode") === "true"
        : false,
    nodeRadius:
      localStorage.getItem("nodeRadius") !== null
        ? Number.parseInt(localStorage.getItem("nodeRadius")!)
        : 16,
    nodeBorderWidthHalf:
      localStorage.getItem("nodeBorderWidthHalf") !== null
        ? Number.parseFloat(localStorage.getItem("nodeBorderWidthHalf")!)
        : 1,
    showComponents: false,
    showBridges: false,
    treeMode: false,
    lockMode: false,
  });

  const updateGraph = (graph: Graph) => setGraph(graph);
  const updateDirected = (directed: boolean) => setDirected(directed);
  const updateSettings = (settings: Settings) => setSettings(settings);

  return (
    <>
      <div
        className={
          settings.darkMode
            ? "dark bg-ovr text-text absolute w-full overflow-scroll"
            : "light bg-ovr text-text absolute w-full overflow-scroll"
        }
      >
        <GraphInput
          updateGraph={updateGraph}
          directed={directed}
          updateDirected={updateDirected}
        />
        <GraphCanvas graph={graph} directed={directed} settings={settings} />
        <GraphSettings
          directed={directed}
          settings={settings}
          updateSettings={updateSettings}
        />
      </div>
    </>
  );
}

export default App;
