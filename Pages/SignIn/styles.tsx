import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  safeAreaView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  logoContainer: {
    marginBottom: 70,
  },
  contentContainer: {
    padding: 10,
    width: "90%",
    height: "80%",
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.3,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 30,
    color: "#fff",
    paddingStart: 30,
  },
  welcomeText: {
    marginTop: 10,
    color: "#fff",
    paddingStart: 30,
  },
  cardContent: {
    marginTop: 20,
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: "#00000095",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  gradientButton1: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
  },
  pressable: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  signUpText: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
  },
  signUpLink: {
    textAlign: "center",
    color: "#C899E7",
    textDecorationLine: "underline",
  },
  snackbar: {
    backgroundColor: "#181724",
    color: "#fff",
  },
  loadingContainer: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});
