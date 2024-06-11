import { forwardRef, useEffect, useRef } from "react";
import MindElixir, { Options } from "mind-elixir";
import "./MindElixirReact.css";

const defaultOptions: Options = {
  el: "#map", // or HTMLDivElemindnt
  direction: MindElixir.LEFT,
  draggable: true, // default true
  toolBar: true, // default true
  keypress: true, // default true
  locale: "en", // [zh_CN,zh_TW,en,ja,pt,ru] waiting for PRs
  overflowHidden: false, // default false
  mouseSelectionButton: 0, // 0 for left button, 2 for right button, default 0
  before: {
    insertSibling() {
      return true;
    },
    async addChild() {
      return true;
    },
  },
};

function MindElixirReact(
  { style, data, options, plugins, onOperate, onSelectNode, onExpandNode },
  ref
) {
  const isFirstRun = useRef(true);
  useEffect(() => {
    isFirstRun.current = true;

    const mind = new MindElixir({
      el: ref.current,
      ...(options || defaultOptions),
    });

    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];
      mind.install(plugin);
    }
    mind.bus.addListener("operation", (operation) => {
      onOperate(operation);
    });
    mind.bus.addListener("selectNode", (operation) => {
      onSelectNode(operation);
    });
    mind.bus.addListener("expandNode", (operation) => {
      onExpandNode(operation);
    });
    ref.current.instance = mind;
  }, [ref, options, plugins, onOperate, onSelectNode, onExpandNode]);
  useEffect(() => {
    if (isFirstRun.current) {
      if (!ref.current.instance) return;
      ref.current.instance.init(data || MindElixir.new("new topic"));
      isFirstRun.current = false;
    } else {
      ref.current.instance.refresh(data);
    }
  }, [ref, options, data]);
  return <div ref={ref} style={style}></div>;
}

export default forwardRef(MindElixirReact);
