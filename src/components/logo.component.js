import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image, 
  FlatList,
  Dimensions,
  TouchableNativeFeedback,
  TouchableHighlight
} from 'react-native';
import { SearchBar,Divider } from 'react-native-elements'
import IconSimple from 'react-native-vector-icons/dist/SimpleLineIcons'
import {Logos} from 'util'

const {height,width} = Dimensions.get('window');


export class LogoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      results : Logos
       }
       this.handleChangeText = this.handleChangeText.bind(this);
       this.handleRender = this.handleRender.bind(this);
    }
  componentDidMount(){
  
  }
  _keyExtractor = (item, index) => item.name;

  handleRender(item,index){
    const {closeFunction} = this.props;
    if(Platform.OS === 'android'){
      if(TouchableNativeFeedback.canUseNativeForeground()){
        return (
          <View>
            <TouchableNativeFeedback onPress={function(){closeFunction.return(item.acronym,item.name)}} useForeground={true} background={TouchableNativeFeedback.Ripple()} delayPressIn={0}>
               <View key={index} style={{backgroundColor:'white',alignItems:'center',flexDirection:'row',paddingTop:10,paddingBottom:10}}>
              <View style={{paddingLeft:10}}>
                <Image style={{height:40,width:40,margin:5,marginRight:15}} resizeMode="contain" source={item.logo}/>
              </View>
              <View style={{}}>
                <Text style={{fontSize:16}}>{item.name}</Text>
                <Text style={{fontSize:12}}>{item.acronym.toUpperCase()}</Text>
              </View>
              <View style={{position:'absolute',right:'5%'}}>
                <IconSimple name="arrow-right" size={12} color="orange"/>
              </View>
              </View>
            </TouchableNativeFeedback>
            <Divider style={{height:1,width:width/1.1,backgroundColor:'orange',alignSelf:'center'}}/>
          </View>
        )
    }else{
      return(
        <View>
        <TouchableHighlight underlayColor="orange" onPress={function(){closeFunction.return(item.acronym,item.name)}} >
              <View key={index} style={{backgroundColor:'white',alignItems:'center',flexDirection:'row',paddingTop:10,paddingBottom:10}}>
              <View style={{paddingLeft:10}}>
                <Image style={{height:40,width:40,margin:5,marginRight:15}} resizeMode="contain" source={item.logo}/>
              </View>
              <View style={{}}>
                <Text style={{fontSize:16}}>{item.name}</Text>
                <Text style={{fontSize:12}}>{item.acronym.toUpperCase()}</Text>
              </View>
              <View style={{position:'absolute',right:'5%'}}>
                <IconSimple name="arrow-right" size={12} color="orange"/>
              </View>
              </View>
          </TouchableHighlight>
          <Divider style={{height:1,width:width/1.1,backgroundColor:'orange',alignSelf:'center'}}/>
        </View>
      )
    }
  }else{
    return(
      <View>
        <TouchableHighlight underlayColor="orange" onPress={function(){closeFunction.return(item.acronym,item.name)}} >
              <View key={index} style={{backgroundColor:'white',alignItems:'center',flexDirection:'row',paddingTop:10,paddingBottom:10}}>
              <View style={{paddingLeft:10}}>
                <Image style={{height:40,width:40,margin:5,marginRight:15}} resizeMode="contain" source={item.logo}/>
              </View>
              <View style={{}}>
                <Text style={{fontSize:16}}>{item.name}</Text>
                <Text style={{fontSize:12}}>{item.acronym.toUpperCase()}</Text>
              </View>
              <View style={{position:'absolute',right:'5%'}}>
                <IconSimple name="arrow-right" size={12} color="#ebebeb"/>
              </View>
              </View>
          </TouchableHighlight>
          <Divider style={{height:1,width:width/1.1,backgroundColor:'#f1f1f1',alignSelf:'center'}}/>
        </View>
    )
  }
  }
  
 handleChangeText(text){
    const newArray = []
    Logos.map((item)=>{
      if(item.name.toLowerCase().indexOf(text.toLowerCase()) != -1 || item.acronym.toLowerCase().indexOf(text.toLowerCase()) != -1 ){
        newArray.push(item)
      }
    })
    this.setState({
      results: newArray
    })


  }
  render() {
    return (
        <View style={styles.container}>
        <View style={{flexDirection:'row',width:width/1.2}}>
          <SearchBar
            round
            lightTheme
            placeholder='Type Here...' 
            onChangeText={(text)=>{this.handleChangeText(text)}}
            containerStyle={{width:'100%'}}
          />
          <View style={{width:width/6,justifyContent:'center',alignItems:'center',backgroundColor:'#e1e8ee'}}>
            <TouchableOpacity onPress={()=>{this.props.modalRef.close()}}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
          </View>
        <FlatList
        data={this.state.results}
        keyExtractor={this._keyExtractor}
        renderItem={({item,index}) => this.handleRender(item,index)}
        numColumns={1}
        bounces={true}
        extraData={this.state}
        style={{backgroundColor:'#fff'}}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    backgroundColor:'#fff',
  },
  preview: {
    flex: 1,
    
  },
  flashButton: {
    margin: 25,
  
  },

});