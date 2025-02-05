import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Button = ({
  color,
  textColor,
  label,
  onClick,
  className, 
}: {
  color: string;
  textColor: string;
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (btnRef.current && spanRef.current) {
        const { width } = btnRef.current.getBoundingClientRect();
        const offset = e.offsetX;
        const left = `${(offset / width) * 100}%`;

        spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
      }
    };

    const handleMouseLeave = () => {
      if (spanRef.current) {
        spanRef.current.animate(
          { left: "50%" },
          { duration: 100, fill: "forwards" }
        );
      }
    };

    const button = btnRef.current;
    if (button) {
      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (button) {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      onClick={onClick}
      className={`${color} relative w-full max-w-xs overflow-hidden rounded-lg px-4 py-3 text-lg font-medium ${textColor} ${className}`} // Gabungkan className
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        {label}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
      />
    </motion.button>
  );
};

export default Button;
