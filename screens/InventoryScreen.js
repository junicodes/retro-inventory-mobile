import React, {useEffect, useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Image } from '@rneui/themed';
import { ScrollView } from "react-native-gesture-handler";
import { getData } from "../utils/dataService";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InventoryScreen({navigation, route}) {

  const [payload, setPayload] = useState(null);

  const loadDataStore = async () => {
    const payload = await getData('@inventory');
    if(payload !== null) {
      setPayload(payload.reverse());
    }
  }

  useEffect(async () => {
    // await AsyncStorage.removeItem('@inventory')
    loadDataStore();
  }, [])

  useEffect(() => {
      //load new payload if new item is added
      if(route.params) {
        if(route.params.canRefresh) {
          loadDataStore();
        }
      }
  }, [route])

  const noDataFound = (
    <> 
      { 
        payload === null && <Text style={{textAlign: 'center', marginTop: 100, fontSize: 20}}>No Data found</Text> 
      } 
    </>
  )
  
  const loadPayload = (
   <>
      {
        payload?.length > 0 && payload.map(item => (
          <View key={item.id} style={[styles.card]}>
              <View>
                <TouchableOpacity style={[styles.menuImgBox]}>
                    <Image
                        source={{
                          uri: item.photo
                        }}
                        style={[styles.menuImage]}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={styles.infoHeader}>{item.name}</Text>
                    <Text style={styles.infoPriceTag}>&euro; {item.purchasePrice}</Text>
                </View>
              </View>
          </View>
        ))
      }
   </>
  )
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.leadingHeader}>
        <Text style={styles.leadingHeaderText}>Inventory</Text>
        <TouchableOpacity style={{backgroundColor: 'blue', borderRadius: '100%', padding: 5}} onPressIn={() => navigation.navigate('AddInventory')}>
          <MaterialCommunityIcons size={20} name="plus" color={'white'} />
        </TouchableOpacity>
      </View>
      <View  style={{displa: 'flex', flexDirection: 'row', flexWrap: "wrap"}}>
          {loadPayload}
      </View>
      {noDataFound}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 100,
        paddingHorizontal: 10,
        backgroundColor: '#f4f3ef'
    }, 
    leadingHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      paddingHorizontal: 10,
      marginBottom: 5
    },
    leadingHeaderText: {
      color: '#393011',
      fontSize: 40,
      fontWeight: 'bold'
    },
    menuImgBox: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '100%',
      height: 200
    },
    menuImage:{   
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    info: {
      backgroundColor: 'white', 
      padding: 20,
      height: 120, 
      borderBottomStartRadius: 20, 
      borderBottomEndRadius: 20
    },
    infoHeader: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    infoPriceTag: {
      marginTop: 35,
      fontSize: 20,
      fontWeight: 'normal'
    },
    card: {
      width: '50%',
      padding: 5,
      //IOS
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.10,
      shadowRadius: 2.22,
      // Android
      elevation: 2.5,
    }
  });
  