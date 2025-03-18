import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import TransactionTable from '@/components/TransactionTable';
import EmptyState from '@/components/EmptyState';
import { Toaster } from '@/components/ui/sonner';

interface Transaction {
  tipo: number;
  descricao: string;
  data: string;
  valor: number;
  loja: string;
}

const Index: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch existing transactions when component mounts
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://localhost:7156/api/transacoes");

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data);
                } else {
                    console.error('Failed to fetch transactions');
                    toast.error('Failed to load existing transactions');
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
                toast.error('Error connecting to the server');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

  const handleFileUploadComplete = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
  };

  return (

    <div className="min-h-screen bg-cnab-gray">
          <Toaster position="top-right" />

          <Header />

      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">Sistema de processamento de transações CNAB</h1>
          <p className="text-muted-foreground text-center mb-8">Faça upload do arquivo para ver os dados</p>
        </motion.div>
        
        <FileUpload onFileUploadComplete={handleFileUploadComplete} />
        
        <AnimatePresence mode="wait">
        {isLoading ? (
             <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-12"
            >
            <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Carregando transações...</p>
            </div>
            </motion.div>
            ) : transactions.length > 0 ? (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TransactionTable transactions={transactions} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Caio Carvalho &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
