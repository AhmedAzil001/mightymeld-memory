export function Tile({ content: Content, flip, state, mode }) {
  switch (state) {
    case "start":
      return (
        <Back
          className={`inline-block h-[4.4rem] w-[4.4rem] bg-cyan-400 rounded-xl ${
            mode && "bg-slate-600"
          }`}
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front
          className={`inline-block h-[4.4rem] w-[4.4rem] bg-cyan-600 rounded-xl text-cyan-200 ${
            mode ? "bg-slate-300 text-slate-700" : "animate-scale"
          }`}
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched
          className={`inline-block h-[4.4rem] w-[4.4rem] text-cyan-300 rounded-xl animate-shake ${
            mode && "text-slate-800"
          }`}
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return <div onClick={flip} className={className}></div>;
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
