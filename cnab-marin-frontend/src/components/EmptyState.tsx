
import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-6 my-8 rounded-xl border-2 border-dashed"
    >
      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">Nenhuma transação registrada</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Faça o upload do arquivo CNAB para ver os dados das transações.
      </p>
      <div className="flex justify-center space-x-4">
        <div className="flex items-center text-xs text-muted-foreground bg-secondary px-3 py-2 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Créditos
        </div>
        <div className="flex items-center text-xs text-muted-foreground bg-secondary px-3 py-2 rounded-full">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          Débitos
        </div>
        <div className="flex items-center text-xs text-muted-foreground bg-secondary px-3 py-2 rounded-full">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Pix
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
