import { motion } from 'framer-motion';

export function HolographicCard({ children, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass p-6 relative overflow-hidden ${className}`}
      style={{
        background: 'rgba(128, 128, 128, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(128, 128, 128, 0.3)',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
