
import React from 'react';
import Logo from './Logo';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    return (

      <header className="sticky top-0 z-10 glass-effect px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Logo />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm text-muted-foreground"
        >
          Sistema de Processamento de CNAB
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
