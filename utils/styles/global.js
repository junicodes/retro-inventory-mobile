import { Dimensions, StyleSheet } from "react-native";

export const generalStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    layoutbelowBox: {
      width: "100%",
      height: 100,
    },
    imageBox: {
      width: 150,
      height: 35,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    twoSpaceTop: {
      marginTop: 10,
    },
    screenText: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20
    },
});


export const formViewStyles = StyleSheet.create({
  block: {
    marginVertical: 20
  },
  title: {
    fontSize: 20,
  },
  errorContainer: {
    marginVertical: 3,
  },
  errorText: {
      color: "red",
  },
  input: {
    marginVertical: 10,
    width: "100%",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#ffffff',
    borderColor: '#e6e6e6',
  },

  textArea: {
    height: 150,
  },

  buttonContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: '100%',
    height: 54,
    borderRadius: 8,
    backgroundColor: "#FFD15C",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  
  gselect: {
      marginVertical: 10,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      width: '100%',
      height: 50,
      borderColor: '#F4F4F4',
      borderWidth: 1,
  },
  gselectText: {
      textAlign: 'left',
      color: '#757575',
      fontSize: 14,
  },
});
