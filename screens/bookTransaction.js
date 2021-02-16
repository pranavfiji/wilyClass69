import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from "expo-permissions";
import {BarcodeScanner} from "expo-barcode-scanner";
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState:"normal"

        }
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            /*status === "granted" is true when user has granted permission status ===
             "granted" is false when user has not granted the permission */
            hasCameraPermissions:status==='granted',
            buttonState:"clicked",
            scanned:"false"
        })
        
    }
    handleBarCodeScanned = async({type, data})=>{
        this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
        });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        }
    

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==="clicked"&& hasCameraPermissions){
            return(
                <BarcodeScanner
                stlye={StyleSheet.absoluteFillObject}
                 onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}> </BarcodeScanner>
            )
        }
        return(
            <View style={styles.container}>
                <Text> Issue/Return</Text>
                <Text  style={styles.displayText}>
                    {hasCameraPermissions===true?this.state.scannedData:"request Camera Permission Again"}
                </Text>
                <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton}>
                    <Text style={styles.buttonText}>Scan QR</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scanButton:{
        backgroundColor:"grey",
        padding:10,
        margin:20,

    },
    displayText:{
        fontSize:15,
        textDecorationLine:"underline",

    },
    buttonText:{
        fontSize:15,
        textAlign:"center",
        marginTop:10,


    }
  });
