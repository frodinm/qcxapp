import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    Vibration,
    Dimensions
} from 'react-native';
import IOSicon from 'react-native-vector-icons/dist/Ionicons'
import flashon from '../assets/camera/ic_flash_on_white.png'
import flashoff from '../assets/camera/ic_flash_off_white.png'
import Camera from 'react-native-camera'

const {width,height} = Dimensions.get('window');


export class CameraComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,

                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                torchMode: Camera.constants.TorchMode.off,
            }
        };
        this.switchTorch = this.switchTorch.bind(this);
    }

    componentDidMount() {

    }

    flashIcon() {
        let icon;
        const {on, off} = Camera.constants.TorchMode;
        if (this.state.camera.torchMode === on) {
            icon = flashon
        } else if (this.state.camera.torchMode === off) {
            icon = flashoff
        }

        return icon;
    }

    switchTorch() {
        let newTorchMode;
        const {on, off} = Camera.constants.TorchMode;

        if (this.state.camera.torchMode === on) {
            newTorchMode = off;
        } else if (this.state.camera.torchMode === off) {
            newTorchMode = on;
        }
        this.setState({
            camera: {
                ...this.state.camera,
                torchMode: newTorchMode
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden/>

                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    type={this.state.camera.type}
                    torchMode={this.state.camera.torchMode}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}>
                    <View >
                        <TouchableOpacity style={styles.flashButton} onPress={() => this.switchTorch()}>
                            <Image source={this.flashIcon()}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute',top:30,right:50,backgroundColor:'transparent'}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                            <IOSicon name="ios-close" color="white" size={35}/>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }

    onBarCodeRead(e) {
        console.log(
            "Barcode Found!",
            "Type: " + e.type + "\nData: " + e.data
        );
        Vibration.vibrate(200)
        this.props.navigation.state.params.setAddress(e.data.toString())
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,

    },
    flashButton: {
        margin: 30,

    },

});