import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import TransactionTable from '@/components/TransactionTable';
import LojasTable from '@/components/LojasTable';
import EmptyState from '@/components/EmptyState';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Store } from 'lucide-react';
interface Transaction {
  tipo: number;
  descricao: string;
  data: string;
  valor: number;
  loja: string;
}
interface Loja {
  nomeLoja: string;
  dono: string;
  saldo: number;
}
const Index: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
    const [isLoadingLojas, setIsLoadingLojas] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("transactions");

    // Fetch existing transactions when component mounts
    useEffect(() => {
        
        const fetchTransactions = async () => {
            try {
                setIsLoadingTransactions(true);
                const response = await fetch("http://localhost:5097/api/transacoes");
                    
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
                setIsLoadingTransactions(false);
            }
  };
  fetchTransactions();
  }, []);

  // Fetch lojas data when component mounts or tab is switched to lojas
  useEffect(() => {
    const fetchLojas = async () => {
      if (activeTab !== "lojas") return;
      
      try {
        setIsLoadingLojas(true);
          const response = await fetch("http://localhost:5097/api/lojas/saldos", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setLojas(data);
        } else {
          console.error('Failed to fetch lojas');
          toast.error('Failed to load lojas data');
        }
      } catch (error) {
        console.error('Error fetching lojas:', error);
        toast.error('Error connecting to the lojas server');
      } finally {
        setIsLoadingLojas(false);
      }
    };

    fetchLojas();
  }, [activeTab]);

  const handleFileUploadComplete = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    setActiveTab("transactions");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (

    <div className="min-h-screen bg-cnab-gray">
          <Toaster position="top-right" />

          <meta charSet="UTF-8" />

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
        
        <div className="mt-8">
          <Tabs defaultValue="transactions" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                <span>Transações</span>
              </TabsTrigger>
              <TabsTrigger value="lojas" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                <span>Lojas</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <AnimatePresence mode="wait">
                {isLoadingTransactions ? (
                  <motion.div
                    key="loading-transactions"
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
                    key="table-transactions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TransactionTable transactions={transactions} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-transactions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EmptyState />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
            
            <TabsContent value="lojas">
              <AnimatePresence mode="wait">
                {isLoadingLojas ? (
                  <motion.div
                    key="loading-lojas"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center py-12"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      <p className="text-sm text-muted-foreground">Carregando dados das lojas...</p>
                    </div>
                  </motion.div>
                ) : lojas.length > 0 ? (
                  <motion.div
                    key="table-lojas"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LojasTable lojas={lojas} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-lojas"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center py-16 border rounded-xl bg-secondary/50">
                      <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Nenhum dado de loja disponível</h3>
                      <p className="text-muted-foreground">Não foi possível carregar dados das lojas.</p>
                      <p className="text-muted-foreground">Verifique se o servidor de lojas está em execução.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Caio Carvalho  &copy;  {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
