import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { Image } from '@rneui/themed';
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useRef, useState } from "react";
import InventoryInsert from "../components/InventoryInsertI";
import { getData, storeData } from "../utils/dataService";

export default function AddInventoryScreen({navigation}) {
  const [canSubmit, setCanSubmit] = useState(true);

  const formRef = useRef();

  const handleSubmit = () => {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
  }

  const handleFormDataSubmit = async (data) => {

   let payload = [ data ];

   if(await getData('@inventory')) {
      payload = [
        ...await getData('@inventory'),
        data
      ];
   }

   //Store to the data store and close the add Inventory modal
   storeData(payload, '@inventory');

   //Close modal
   navigation.navigate("Inventory", {
     canRefresh: true
   });
   
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.leadingHeader}>
            <TouchableOpacity onPressIn={() => {
              //Clear formik form and go back
              navigation.goBack();
            }}>
              <Text style={{fontSize: 20, color: 'blue'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => handleSubmit()} disabled={!canSubmit}>
              <Text style={{fontSize: 20, color: canSubmit ? 'blue' : 'gray'}}>Add</Text>
            </TouchableOpacity>
        </View>
        <View>
          <InventoryInsert formRef={formRef} onFormDataSubmit={handleFormDataSubmit}/>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f4f3ef'
  },
  leadingHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    marginBottom: 5
  },
  leadingHeaderText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
});
