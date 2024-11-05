import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
  },
  centeredContent: {
    alignItems: 'center',
  },
  header: {
    flexDirection: "row",
    marginTop: 10,
  },
  logoContainer: {
    backgroundColor: "#0000",
    marginLeft: 20,
  },
  perfilContent: {
    alignItems: "flex-start",
    marginTop: 20,
  },
  title: {
    color: '#595085',
    fontSize: 24,
  },
  title2: {
    color: '#FFF',
    fontSize: 28,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 40,
  },
  description: {
    color: '#DADADA',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'justify',
  },
  processingMessage: {
    color: '#DADADA',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  backToProfileButton: {
    marginTop: 30,
  },
  backToProfileText: {
    color: '#595085',
    fontSize: 16,
  },
});

export default styles;
