import { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

const Graph = (paper) => {
  const graphContainer = useRef(null);
  const data = paper.paper;
  useEffect(() => {
    const sentimentColors = {
      positive: "#14D03A",
      neutral: "#D6BF29",
      negative: "#F1494F",
    };

    const abbreviatedText = (text, maxLength = 20) => {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    const nodes = new DataSet([
      {
        id: 1,
        label: abbreviatedText(data.title),
        title: data.title,
        color: "#418DD5",
        shape: "hexagon",
      },
    ]);

    const edges = new DataSet([]);

    data.references.forEach((ref, index) => {
      const refTitle = Object.keys(ref)[0];
      const sentiment = ref[refTitle].sentiment;
      nodes.add({
        id: index + 2,
        label: abbreviatedText(refTitle),
        title: refTitle,
        color: "#5CFDCD",
      });
      edges.add({
        from: 1,
        to: index + 2,
        title: ref[refTitle].sentence,
        color: sentimentColors[sentiment],
        label: sentiment,
      });
    });

    const dataForVis = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      nodes: {
        shape: "dot",
        size: 10,
      },
      edges: {
        color: "#000000",
        width: 2,
      },
      layout: {
        hierarchical: false,
      },
      height: "100%",
    };

    const network = new Network(graphContainer.current, dataForVis, options);
    network.fit();

    network.on("selectNode", (params) => {
      const selectedNode = params.nodes[0];
      const node = nodes.get(selectedNode);
      nodes.update({ ...node, label: node.title });
    });

    network.on("deselectNode", (params) => {
      params.previousSelection.nodes.forEach((nodeId) => {
        const node = nodes.get(nodeId);
        node.forEach((n) => {
          nodes.update({ ...n, label: abbreviatedText(n.label) });
        });
      });
    });

    return () => {
      network.destroy();
    };
  }, []);

  return <div ref={graphContainer} style={{ height: "93vh" }} />;
};

export default Graph;
