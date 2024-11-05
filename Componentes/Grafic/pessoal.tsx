import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

interface UserDetails {
  uid: string;
  email: string;
  name: string;
  cpf: string;
  setor: string;
  perfil: string;
  qtdVendas: number;
  profilePictureUrl?: string;
}

interface SalesGoalProps {
  user: UserDetails;
  salesGoal: number;
}

const SalesGoal: React.FC<SalesGoalProps> = ({ user, salesGoal }) => {
  const progress = Math.min(1, Math.max(0, user.qtdVendas / salesGoal));


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Pessoal</Text>
      <Progress.Circle
        size={180}
        progress={progress}
        showsText={true}
        formatText={() => `${Math.round(progress * 100)}%`}
        color="#05CD99"
        unfilledColor="#0A0E26"
        borderWidth={0}
        thickness={20}
        
        textStyle={styles.percentage}
      />
      <Text style={styles.label}>Total de vendas: {user.qtdVendas}</Text>
      <Text style={styles.label}>Metas de Vendas: {salesGoal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  label: {
    color: '#b2bec3',
    fontSize: 16,
    marginTop: 10,
  },
  percentage: {
    fontSize: 20,
    color: '#fff',
  
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 15,
  },
});

export default SalesGoal;
