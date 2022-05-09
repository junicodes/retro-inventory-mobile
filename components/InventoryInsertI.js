import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    StyleSheet,
} from "react-native";
import { Image, Icon } from '@rneui/themed';
import { formViewStyles } from "../utils/styles/global";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import { getData } from "../utils/dataService";


const validationSchema = Yup.object().shape({
    name: Yup.string()
      .label("name")
      .required("Please enter an inventory name to continue"),
    purchasePrice: Yup.string()
    .label("purchasePrice")
    .required("Please enter a value to continue")
});

const ErrorMessage = ({ errorValue }) => (
    <View style={formViewStyles.errorContainer}>
      <Text style={formViewStyles.errorText}>{errorValue}</Text>
    </View>
);

const category = [
    'MUSIC_INSTRUMENT',
    'ELECTRONICS',
    'JEWELRY',
    'APPLIANCES',
    'MOBILE GADGETS',
    'WATCHES',
    'FASHION'
]

export default function InventoryInsert({formRef, onFormDataSubmit}) {

    //State
    const [categoryDefault, setcategoryDefault] = useState('Select a Category...')
    const [image, setImage] = useState(null);

    let formPayload = { name: "", description: "", purchasePrice: "" };

    //Ref
    const selDropDownRef = useRef({});
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) { setImage(result.uri) }
    };    

    const onAddInventoryHandler = async (values) => {
        let totalPurchase = 0;
        const payload = await getData('@inventory');

        if(data) { totalPurchase = await payload.reduce((acc, val) => acc + val.purchasePrice, 0) }

        //validate the category and image
        if(!image) return alert("Please add a photo to continue");

        if(!categoryDefault) return alert("Please select a category type to continue");

        //Validate only 40000 euro total per user (assumin the JSON database is used by by only one user)
        if(Math.random(totalPurchase) > 40000) return alert("You are onlly allowed to add item below 40000 Euro");

        const data = {
            ...values,
            ...{
                id: Math.random(),
                photo: image,
                type: categoryDefault
            }
        }

        return onFormDataSubmit(data)
    }


  return (
    <>
        <View style={styles.imageView}>
            <View style={styles.imageDrop}>
            {
                image && (
                    <Image
                    source={{ uri: image }}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                    />
                )
            }
            </View>
            {
                !image && (
                    <TouchableOpacity onPress={pickImage} style={{position: 'absolute'}}>
                        <Icon
                            name="camera"
                            type="font-awesome"
                            color="blue"
                            size={30}
                        />
                        <Text style={{fontWeight: 'bold', marginTop: 5}}>Add Photo</Text>
                    </TouchableOpacity>
                )
            }
            {
                image && (
                    <TouchableOpacity onPress={() => setImage(null)} style={{position: 'absolute', right: '35%', bottom: '20%'}}>
                        <Icon
                            name="trash"
                            type="font-awesome"
                            color="red"
                            size={25}
                        />
                    </TouchableOpacity>
                )
            }
        </View>

        <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={formPayload}
            onSubmit={(values, actions) => onAddInventoryHandler(values, actions, categoryDefault, image)}
            validationSchema={validationSchema}
        >
            {({
            handleChange,
            values,
            errors,
            touched,
            handleSubmit,
            handleBlur,
            }) => (
            <View style={formViewStyles.container}>

                <View>
                    <Text style={{fontWeight: 'bold'}}>Name</Text>
                    <TextInput
                        style={formViewStyles.input}
                        numberOfLines={1}
                        value={values.name}
                        placeholderTextColor="lightgray"
                        placeholder="E.g. Bracelet"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                    />
                    <ErrorMessage errorValue={touched.name && errors.name} />
                </View>
                <View style={{position: 'relative'}}>
                    <Text style={{fontWeight: 'bold'}}>Category</Text>
                    <SelectDropdown
                        data={category}
                        ref={selDropDownRef}
                        onSelect={selectedItem => {  
                            setcategoryDefault(selectedItem)
                        }}
                        defaultButtonText={categoryDefault}
                        buttonStyle={{...formViewStyles.gselect}}
                        buttonTextStyle={{...formViewStyles.gselectText}}
                        buttonTextAfterSelection={ selectedItem => selectedItem }
                        rowTextForSelection={item => item }
                        />
                        <Icon
                            name="angle-down"
                            type="font-awesome"
                            color="#4F4F4F"
                            size={20}
                            containerStyle={{position: 'absolute', right: 20, top: 40}}
                        />
                </View>
            
                <View>
                    <Text style={{fontWeight: 'bold'}}>Value</Text>
                    <TextInput
                        style={formViewStyles.input}
                        numberOfLines={1}
                        value={values.purchasePrice}
                        keyboardType="numeric"
                        placeholderTextColor="lightgray"
                        placeholder="E.g. 700"
                        onChangeText={handleChange("purchasePrice")}
                        onBlur={handleBlur("purchasePrice")}
                    />
                    <Icon
                        name="euro"
                        type="font-awesome"
                        color="#4F4F4F"
                        size={15}
                        containerStyle={{position: 'absolute', right: 20, top: 40}}
                    />
                    <ErrorMessage errorValue={touched.purchasePrice && errors.purchasePrice} />
                </View>
                
                <View>
                    <Text style={{fontWeight: 'bold'}}>Description</Text>
                    <TextInput
                        multiline
                        style={[formViewStyles.input, formViewStyles.textArea]}
                        maxLength={400}
                        value={values.description}
                        placeholderTextColor="lightgray"
                        placeholder="Optional"
                        onChangeText={handleChange("description")}
                        onBlur={handleBlur("description")}
                    />
                </View>
            </View>
            )}
        </Formik>
    </>
  );
}

const styles = StyleSheet.create({
    imageView: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        height: 220
    },
    imageDrop: {
        width: 150,
        borderStyle: "solid",
        borderColor: "#e6e6e6",
        borderWidth: 2,
        height: 150,
        borderRadius: 1000,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 1000
    },
});
