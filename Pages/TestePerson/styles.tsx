import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  headerText: {
    color: "#595085",
    fontSize: 20,
  },
  scrollView: {
    borderWidth: 1,
    borderColor: "#6A2B75",
    margin: 10,
    borderRadius: 10,
    height: 900,
    marginTop: 30,
  },
  questionContainer: {
    alignItems: "center",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex: 1,
  },
  questionNumber: {
    color: "#850F98",
    fontSize: 45,
  },
  questionText: {
    color: "#595085",
    fontSize: 20,
    marginLeft: 25,
  },
  radioGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    color: "#595085",
  },
  button: {
    backgroundColor: "#850F98",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});
