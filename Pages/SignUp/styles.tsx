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
    marginTop: 100,
  },
  logoContainer: {
    marginBottom: 40,
  },
  contentContainer: {
    padding: 20,
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
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  
  cardTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 30,
    color: "#fff",
    paddingStart: 20,
  },
  welcomeText: {
    marginTop: 10,
    color: "#fff",
    paddingStart: 25,
  },
  scrollView: {
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
  signInText: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
  },
  signInLink: {
    textAlign: "center",
    color: "#C899E7",
    textDecorationLine: "underline",
  },
  snackbar: {
    backgroundColor: "#181724",
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
