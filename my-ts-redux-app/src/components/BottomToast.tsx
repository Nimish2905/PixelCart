// BottomToast.tsx

import React, { useEffect, useState } from "react";
import "./BottomToast.css";

interface BottomToastProps {
  message: string;
}

const BottomToast: React.FC<BottomToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return visible ? <div className="bottom-toast">{message}</div> : null;
};

export default BottomToast;
