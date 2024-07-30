export const AguaIcon = ({ size = 100, fillLevel = 0, color = "#00f" }) => {
  const validFillLevel = Math.max(0, Math.min(100, fillLevel));

  const fillHeight = `${validFillLevel}%`;

  return (
    <div className="drop">
      <div
        className="water-fill"
        style={{ height: fillHeight, backgroundColor: color }}
      ></div>
      <div className="fill-text">{validFillLevel}%</div>
    </div>
  );
};
