const quicksData = [
  {
    label: "Inbox",
    svg: (isActive) => (
      <svg
        width="19"
        height="19"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.8187 0.514526H1.47368C0.782159 0.514526 0.21637 1.08032 0.21637 1.77184V19.3742L5.24561 14.3449H17.8187C18.5102 14.3449 19.076 13.7791 19.076 13.0876V1.77184C19.076 1.08032 18.5102 0.514526 17.8187 0.514526ZM16.5614 3.02908V11.8302H4.20201L3.46019 12.5721L2.73095 13.3013V3.02908H16.5614ZM21.5907 5.54381H24.1053C24.7968 5.54381 25.3626 6.10959 25.3626 6.80112V25.6608L20.3334 20.6315H6.50296C5.81144 20.6315 5.24565 20.0657 5.24565 19.3742V16.8596H21.5907V5.54381Z"
          fill={isActive ? "#FFFFFF" : "#8785FF"}
        />
      </svg>
    ),
    isActive: false,
    activatedBg: "bg-indicator-blue",
  },
  {
    label: "Task",
    svg: (isActive) => (
      <svg
        width="19"
        height="16"
        viewBox="0 0 29 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.92984 0.400635H25.5614C26.9445 0.400635 28.076 1.53221 28.076 2.91526V19.2603C28.076 20.6433 26.9445 21.7749 25.5614 21.7749H2.92984C1.5468 21.7749 0.415222 20.6433 0.415222 19.2603V2.91526C0.415222 1.53221 1.5468 0.400635 2.92984 0.400635ZM2.9298 2.91528V19.2603H12.9883V2.91528H2.9298ZM25.5614 19.2603H15.5029V2.91528H25.5614V19.2603ZM24.3042 7.31582H16.7603V9.20178H24.3042V7.31582ZM16.7603 10.4591H24.3042V12.3451H16.7603V10.4591ZM24.3042 13.6024H16.7603V15.4883H24.3042V13.6024Z"
          fill={isActive ? "#FFFFFF" : "#F8B76B"}
        />
      </svg>
    ),
    isActive: false,
    activatedBg: "bg-indicator-orange",
  },
];

export default quicksData;
