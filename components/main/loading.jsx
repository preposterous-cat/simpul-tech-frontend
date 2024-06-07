const Loading = ({ text }) => {
  return (
    <div className="flex flex-col items-center p-32">
      <svg
        className="animate-spin h-10 w-10 text-primary-foreground"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          stroke="lightgray"
        ></circle>

        {/* Spinning Circle */}
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          stroke="currentColor"
          strokeDasharray="90"
          strokeDashoffset="0"
        ></circle>
      </svg>
      {text && <span className="mt-2 text-center">{text}</span>}
    </div>
  );
};

export default Loading;
