import { useEffect, useRef } from "react";

export default function ClickOutsideEffect({
  setIsOpen,
  children,
  className = "relative z-30 ",
}) {
  const hideContRef = useRef(null);
  const hideOnClickOutside = (e) => {
    if (hideContRef.current && !hideContRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("click", hideOnClickOutside);
    }
    return () => window.removeEventListener("click", hideOnClickOutside);
  }, []);

  return (
    <div ref={hideContRef} className={`w-fit ${className}`}>
      {children}
    </div>
  );
}
