import { useState, useEffect } from "react";

interface ProgressProps {
  value: number;
}

const CircularProgress = ({ value }: ProgressProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * ((100 - animatedValue) / 100);

  useEffect(() => {
    const duration = 500;
    const step = 1000 / 60;
    const totalSteps = duration / step;
    let currentStep = 0;

    const animate = () => {
      currentStep++;
      const progress = Math.min((currentStep / totalSteps) * value, value);
      setAnimatedValue(progress);

      if (currentStep < totalSteps) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <svg width="200" height="200">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3BC3A4" />
          <stop offset="100%" stopColor="#1F9C8D" />
        </linearGradient>
      </defs>
      <g transform="rotate(-90 100 100)">
        <circle
          r={radius}
          cx="100"
          cy="100"
          fill="transparent"
          stroke="#E6E7EB"
          strokeWidth="2rem"
          strokeDasharray={circumference}
          strokeDashoffset="0"
        ></circle>
        <circle
          r={radius}
          cx="100"
          cy="100"
          fill="transparent"
          stroke="url(#gradient)"
          strokeWidth="2rem"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </g>
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="24px"
        fontWeight="bold"
        fill="black"
      >
        {Math.round(animatedValue)}
      </text>
    </svg>
  );
};

export default CircularProgress;
