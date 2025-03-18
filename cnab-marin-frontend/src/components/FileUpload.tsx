
import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface FileUploadProps {
  onFileUploadComplete: (transactions: Transaction[]) => void;
}

interface Transaction {
  tipo: number;
  descricao: string;
  data: string;
  valor: number;
  loja: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor selecione um arquivo com dados CNAB para continuar.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);

    try {
      const response = await fetch("https://localhost:7156/api/cnab/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data: Transaction[] = await response.json();
        onFileUploadComplete(data);
        toast({
          title: "Upload concluído com sucesso",
          description: `${data.length} transações processadas.`,
        });
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Upload falhou",
          description: errorData.message || "Erro ao fazer upload do arquivo.",
        });
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        variant: "destructive",
        title: "Upload falhou",
        description: "Não foi possível conectar ao servidor",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 animate-fade-in">
      <div 
        className={`file-drop-area ${isDragging ? 'active' : file ? 'border-green-500 bg-green-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt,.cnab"
        />
        
        {file ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Arraste solte seu arquivo CNAB</h3>
            <p className="text-sm text-muted-foreground mb-4">ou</p>
          </>
        )}
        
        {!file && (
          <button 
            onClick={handleBrowseClick}
            className="button-primary bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <FileText className="w-4 h-4 mr-2" />
            Buscar arquivos
          </button>
        )}
        
        {file && (
          <div className="flex space-x-4 mt-4">
            <button 
              onClick={handleBrowseClick}
              className="button-primary bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Mudar arquivo
            </button>
            
            <button 
              onClick={handleUpload}
              disabled={isUploading}
              className="button-primary"
            >
              {isUploading ? 'Fazendo upload...' : 'Processar Arquivo'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
