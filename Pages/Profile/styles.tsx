import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    overflow: "scroll",
  },
  logoContainer: {
    marginTop: 80,
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 50,
  },
  personIconContainer: {
    marginLeft: 30,
  },
  infoContainer: {
    marginLeft: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#A99EDE',
  },
  
  nameText: {
    fontWeight: "bold",
    marginTop: 10,
    color: "#929292",
    fontSize: 20,
  },
  cpfText: {
    fontWeight: "bold",
    marginTop: 6,
    color: "#A99EDE",
    fontSize: 15,
  },
  setorText: {
    color: "#A99EDE",
    marginTop: 6,
    fontSize: 15,
  },
  personalitiesContainer: {
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 30,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#A99EDE",
    fontSize: 20,
  },
  card: {
    marginTop: 10,
    backgroundColor: "#F5F9F9",
    borderRadius: 10,
  },
  cardText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#479696",
    textAlign: "center",
    padding: 10,
  },
  testsContainer: {
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 30,
  },
  testButton: {
    marginTop: 10,
    backgroundColor: "#3D3270",
    borderRadius: 10,
    padding: 30,
    opacity: 0.5,
    width: 250,
  },
  testButtonContent: {
    flexDirection: "row",
    opacity: 1,
  },
  testButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#D0CCE4",
    marginLeft: 20,
  },
  testButtonDescription: {
    color: "#D0CCE4",
    marginTop: 20,
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: "#3D3270",
    marginTop: 60,
    borderRadius: 10,
    width: 150,
    alignSelf: "flex-end",
    marginRight: 30,
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#D0CCE4",
    textAlign: "center",
    padding: 10,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  errorContainer: {
    backgroundColor: "#f8d7da",
    padding: 15,
    borderRadius: 5,
    margin: 15,
  },
  errorText: {
    color: "#721c24",
    fontSize: 16,
    textAlign: "center",
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,  
    backgroundColor: '#3D3270', 
    borderRadius: 15,
    padding: 5,
  },
successContainer: {
  marginTop: 10,
  padding: 10,
  backgroundColor: '#d4edda', 
  borderRadius: 5,
},
successText: {
  color: '#155724', 
  textAlign: 'center',
},


});

export default styles;
