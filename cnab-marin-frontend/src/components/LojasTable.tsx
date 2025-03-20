import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Store, 
  User, 
  Coins
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Loja {
  nomeLoja: string;
  dono: string;
  saldo: number;
}

interface LojasTableProps {
  lojas: Loja[];
}

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Decode UTF-8 strings if needed
const decodeUtf8 = (text: string): string => {
  try {
    return text;
  } catch (error) {
    console.error("Error decoding text:", error);
    return text;
  }
};

const LojasTable: React.FC<LojasTableProps> = ({ lojas }) => {
  const [sortField, setSortField] = useState<keyof Loja | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sort lojas
  const sortedLojas = [...lojas].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    // For numbers and other types
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Filter lojas
  const filteredLojas = sortedLojas.filter(loja => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (loja.nomeLoja && loja.nomeLoja.toLowerCase().includes(searchLower)) ||
      (loja.dono && loja.dono.toLowerCase().includes(searchLower)) ||
      String(loja.saldo).includes(searchTerm)
    );
  });
  
  // Handle sorting
  const handleSort = (field: keyof Loja) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Render sort indicator
  const renderSortIndicator = (field: keyof Loja) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="w-full animate-fade-in-up">
      {lojas.length > 0 && (
        <div className="flex items-center mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar lojas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {filteredLojas.length} de {lojas.length} lojas
          </div>
        </div>
      )}
      
      {filteredLojas.length > 0 ? (
        <div className="rounded-xl border overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('nomeLoja')}
                    >
                      <span>Loja</span>
                      {renderSortIndicator('nomeLoja')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('dono')}
                    >
                      <span>Dono</span>
                      {renderSortIndicator('dono')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('saldo')}
                    >
                      <span>Saldo</span>
                      {renderSortIndicator('saldo')}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLojas.map((loja, index) => (
                  <TableRow key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.03}s` }}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 text-blue-500">
                          <Store className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{decodeUtf8(loja.nomeLoja)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 text-gray-500">
                          <User className="w-4 h-4" />
                        </div>
                        <span>{decodeUtf8(loja.dono)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 text-amber-500">
                          <Coins className="w-4 h-4" />
                        </div>
                        <span className={`font-medium ${loja.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(loja.saldo)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : lojas.length > 0 ? (
        <div className="text-center py-10 border rounded-xl bg-secondary/50">
          <p className="text-muted-foreground">Nenhuma loja corresponde à sua busca.</p>
        </div>
      ) : null}
    </div>
  );
};

export default LojasTable;