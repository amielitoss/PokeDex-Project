import "./Loading.css";

type LoadingProps = {
  message: string;
};

function Loading({ message }: LoadingProps) {
  return (
    <div className="loading-state">
      <div className="pokeball-loader"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;
