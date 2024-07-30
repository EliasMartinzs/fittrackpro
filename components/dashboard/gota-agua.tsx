import Progress from "react-circle-progress-bar";

export const AguaProgresso = ({ progress }: { progress: number }) => {
  return <Progress progress={progress} />;
};
