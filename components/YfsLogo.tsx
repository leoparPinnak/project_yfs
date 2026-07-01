import React, { useState, useEffect } from 'react';

interface YfsLogoProps {
  className?: string;
  loop?: boolean;
  showText?: boolean;
}

export const YfsLogo: React.FC<YfsLogoProps> = ({ className = "h-8 w-auto", loop = true, showText = false }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!loop) return;

    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 5500); // Replay drawing animations every 5.5 seconds (1s pause after completion)

    return () => clearInterval(interval);
  }, [loop]);

  return (
    <svg 
      key={key} // Changing the key re-mounts the SVG and triggers CSS animations
      viewBox="0 0 1252 1258" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`logo-svg-animated ${className}`}
      aria-label="YFS İnşaat Logosu"
    >
      <polygon id="f-mid" className="fill-shape" points="821,438 827,424 1005,424 998,438" />
      <polygon id="f-top" className="fill-shape" points="966,188 972,174 1120,174 1111,188" />
      <polygon id="y-long-arm" className="fill-shape" points="930,170 960,170 420,1110 396,1090" />
      <polygon id="y-short-arm" className="fill-shape" points="266,178 305,176 662,605 645,635" />
      <polygon id="pencil-tip" className="fill-shape" points="399,1093 381,1152 419,1105" />
      <path id="s-top" className="stroke-line" d="M 598,477 C 638,447 685,444 723,481" />
      <path id="s-bottom" className="stroke-line" d="M 709,665 C 856,772 734,895 622,832" />
      <path id="bottom-wave" className="stroke-line" d="M 381,1152 Q 430,1120 460,1152 T 530,1152" />
      {showText && (
        <text 
          id="brand-text" 
          x="550" 
          y="1165" 
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize="60" 
          letterSpacing="24" 
          fill="currentColor" 
          fontWeight="300"
        >
          YFS İNŞAAT
        </text>
      )}
    </svg>
  );
};

export default YfsLogo;
