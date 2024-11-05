// src/screens/DetailsClient.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'black',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    marginTop: 60,
  },
  backButton: {
    marginLeft: 20,
  },
  logoContainer: {
    backgroundColor: '#0000',
    marginLeft: 50,
  },
  clientInfoContainer: {
    padding: 20,
  },
  clientName: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 25,
    marginRight: 20,
  },
  clientProfile: {
    color: '#9987A3',
    textAlign: 'left',
    marginTop: 30,
    fontSize: 15,
    marginRight: 20,
  },
  profileBadge: {
    backgroundColor: '#ACABBA',
    borderRadius: 10,
    marginTop: 10,
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#0F3A3A',
    fontWeight: 'bold',
    fontSize: 15,
  },
  clientDetailCard: {
    padding: 20,
    backgroundColor: '#232230',
    borderRadius: 10,
    marginTop: 20,
  },
  clientDetailText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9987A3',
  },
  clientDetailValue: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  especificacoesCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#181724',
    borderRadius: 10,
  },
  especificacoesTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scriptTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  scriptDescription: {
    color: '#fff',
    fontSize: 18,
  },

  containerButton: {
    alignItems: "center",
    padding: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 30, 
    backgroundColor: "#3D3270",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    elevation: 10, 
  },
  vendaButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },


  updateButton: {
    marginTop: 20,
  },
  scriptContainer: {
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5, // Sombra no Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scriptCard: {
    backgroundColor: "#66044B", // Cor de fundo do cartão
    padding: 10, // Espaçamento interno
    marginBottom: 10, // Margem inferior entre os cartões
    width: "60%", // Largura do cartão
    borderRadius: 10, // Bordas arredondadas
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Sombra no Android
  },

});
