import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  logoContainer: {
    marginTop: 80,
    alignItems: "center",
  },
  searchContainer: {
    marginTop: 20,
  },
  searchbar: {
    backgroundColor: "#554059",
    opacity: 0.8,
    borderRadius: 15,
    padding: 2,
    margin: 20,
    marginTop: 80,
  },
  searchbarInput: {
    color: "#fff",
  },
  clientListContainer: {
    flex: 1,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    padding: 20,
  },
  title: {
    color: "white",
    textAlign: "center",
    marginTop: 50,
    fontSize: 25,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    flexGrow: 1,
  },
  clientCard: {
    backgroundColor: "#554059",
    opacity: 0.7,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 10,
    padding: 20,
  },
  clientName: {
    color: "white",
    marginLeft: 20,
    fontSize: 22,
  },
  clientDetails: {
    color: "white",
    marginLeft: 20,
    fontSize: 16,
  },
  snackbar: {
    backgroundColor: "#333",
  },
});

export default styles;
