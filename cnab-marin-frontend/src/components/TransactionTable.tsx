import React, { useState } from 'react';
import {
    ArrowUpDown,
    ChevronDown,
    ChevronUp,
    Search,
    CreditCard,
    FileText,
    DollarSign,
    TrendingUp,
    ShoppingCart,
    Send,
    Inbox,
    Home,
    ArrowDownCircle,
    ArrowUpCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Loja {
    nome: string
}

interface Transaction {
    tipo: number;
    dataHoraMovimentacao: string;
    valor: number;
    cpf: string;
    cartao: string;
    loja: Loja;
    natureza: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
}

const transactionTypes: Record<number, { name: string, icon: React.ReactNode, color: string }> = {
    1: { name: 'Débito', icon: <ArrowDownCircle className="w-4 h-4" />, color: 'text-red-500' },
    2: { name: 'Boleto', icon: <FileText className="w-4 h-4" />, color: 'text-yellow-500' },
    3: { name: 'Financiamento', icon: <DollarSign className="w-4 h-4" />, color: 'text-purple-500' },
    4: { name: 'Crédito', icon: <ArrowUpCircle className="w-4 h-4" />, color: 'text-green-500' },
    5: { name: 'Recebimento Empréstimo', icon: <TrendingUp className="w-4 h-4" />, color: 'text-blue-500' },
    6: { name: 'Vendas', icon: <ShoppingCart className="w-4 h-4" />, color: 'text-orange-500' },
    7: { name: 'Recebimento TED', icon: <Send className="w-4 h-4" />, color: 'text-teal-500' },
    8: { name: 'Recebimento DOC', icon: <Inbox className="w-4 h-4" />, color: 'text-pink-500' },
    9: { name: 'Aluguel', icon: <Home className="w-4 h-4" />, color: 'text-indigo-500' },
};


const getTransactionType = (type: number) => {
    return transactionTypes[type] || {
        name: `Tipo ${type}`,
        icon: <CreditCard className="w-4 h-4" />,
        color: 'text-gray-500'
    };
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return isNaN(date.getTime())
        ? "Data inválida"
        : date.toLocaleString("pt-BR", { timeZone: "UTC" }).replace(",", " -");
};

const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const decodeUtf8 = (text: string): string => {
    try {
        return text;
    } catch (error) {
        return text;
    }
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    const [sortField, setSortField] = useState<keyof Transaction | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [searchTerm, setSearchTerm] = useState('');

    const sortedTransactions = [...transactions].sort((a, b) => {
        if (!sortField) return 0;
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredTransactions = sortedTransactions.filter(transaction => {
       const searchLower = searchTerm.toLowerCase();
        return (
            (transaction.loja && transaction.loja.nome.toLowerCase().includes(searchLower)) ||
           String(transaction.valor).includes(searchTerm) ||
            String(transaction.tipo).includes(searchTerm) ||
            getTransactionType(transaction.tipo).name.toLowerCase().includes(searchLower)
        );
    });

    const handleSort = (field: keyof Transaction) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const renderSortIndicator = (field: keyof Transaction) => {
        if (sortField !== field) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
        return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    };

    return (
        <div className="w-full animate-fade-in-up">
            {transactions.length > 0 && (
                <div className="flex items-center mb-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscando transações..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                        {filteredTransactions.length} de {transactions.length} transações
                    </div>
                </div>
            )}
            {filteredTransactions.length > 0 ? (
                <div className="rounded-xl border overflow-hidden bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th><button onClick={() => handleSort('tipo')}>Tipo {renderSortIndicator('tipo')}</button></th>
                                    <th><button onClick={() => handleSort('dataHoraMovimentacao')}>Data e Hora {renderSortIndicator('dataHoraMovimentacao')}</button></th>
                                    <th><button onClick={() => handleSort('valor')}>Valor {renderSortIndicator('valor')}</button></th>
                                    <th>CPF</th>
                                    <th>Cartão</th>
                                    <th>Loja</th>
                                    <th>Natureza</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction, index) => {
                                    const transactionType = getTransactionType(transaction.tipo);
                                    return (
                                        <tr key={index} className="border-t">
                                            <td className={`${transactionType.color}`}>{transactionType.icon} {transactionType.name}</td>
                                            <td>{formatDateTime(transaction.dataHoraMovimentacao)}</td>
                                            <td>{formatCurrency(transaction.valor)}</td>
                                            <td>{formatCpf(transaction.cpf)}</td>
                                            <td>{transaction.cartao}</td>
                                            <td>{decodeUtf8(transaction.loja.nome)}</td>
                                            <td>{transaction.natureza}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : <p>Nenhuma transação encontrada.</p>}
        </div>
    );
};

export default TransactionTable;
