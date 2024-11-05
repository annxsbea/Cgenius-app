// useCompanyData.ts
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

interface CompanyData {
  name: string;
  metaVendas: string;
  qtdVendas: string;
}

export const useCompanyData = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyDoc = await firestore().collection('empresa').doc('OKLUnOf3V9L3HhpAXhVk').get();
        if (companyDoc.exists) {
          setCompanyData(companyDoc.data() as CompanyData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  return { companyData, loading };
};
