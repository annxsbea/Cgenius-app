// DashboardGlobal.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCompanyData } from '../../Services/Empresa';

const DashboardGlobal: React.FC = () => {
  const { companyData, loading } = useCompanyData();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Global</Text>
      {loading ? (
        <Text style={styles.info}>Carregando dados da empresa...</Text>
      ) : companyData ? (
        <>
          <Text style={styles.companyTitle}>Informações da Empresa</Text>
          <Text style={styles.info}>Nome: {companyData.name}</Text>
          <Text style={styles.info}>Meta de Vendas: {companyData.metaVendas}</Text>
          <Text style={styles.info}>Quantidade de Vendas: {companyData.qtdVendas}</Text>
        </>
      ) : (
        <Text style={styles.info}>Dados da empresa não disponíveis</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2d3436',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  companyTitle: {
    fontSize: 20,
    color: '#00b894',
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    color: '#b2bec3',
    marginVertical: 5,
  },
});

export default DashboardGlobal;
