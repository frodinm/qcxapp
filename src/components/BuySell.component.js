import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Text,
  TextInput
} from 'react-native'
import {Button} from 'react-native-elements'
import { iOSUIKit } from 'react-native-typography'
import IconMaterial from 'react-native-vector-icons/dist/MaterialIcons';
import IconIOS from 'react-native-vector-icons/dist/Ionicons';

const {width,height} = Dimensions.get('window')

export class BuySellComponent extends Component {
  constructor(){
    super();
    this.handleBidOrderView = this.handleBidOrderView.bind(this);
    this.handleAskOrderView = this.handleAskOrderView.bind(this);
  }


  handleBidOrderView(){
    const {quadrigaOrders} = this.props;
    let btcBids = quadrigaOrders.bids.slice(0,10);
    return btcBids.map((item,index)=>{
      return <View key={index} style={{flexDirection:'column',alignSelf:'flex-start',marginTop:2}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{width:width/4-5,alignSelf:'center',textAlign:'center'}}>{item[0]}</Text>
          <Text style={{width:width/4-5,alignSelf:'center',textAlign:'center'}}>{parseFloat(item[1]).toFixed(4)}</Text>
        </View>
      </View>
    })
  }

  handleAskOrderView(){
    const {quadrigaOrders} = this.props;
    let btcAsks = quadrigaOrders.asks.reverse().slice(0,10);
    return btcAsks.map((item,index)=>{
      return <View key={index} style={{flexDirection:'column',alignSelf:'flex-start',marginTop:2}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{width:width/4-5,alignSelf:'center',textAlign:'center'}}>{item[0]}</Text>
          <Text style={{width:width/4-5,alignSelf:'center',textAlign:'center'}}>{parseFloat(item[1]).toFixed(4)}</Text>
        </View>
      </View>
    })
  }
  
  render() {
    const {acronym} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',justifyContent:'center',backgroundColor:'white',width:width/1.03,elevation:2,shadowColor:'black',shadowOffset:{width:0,height:2},shadowOpacity:0.2,shadowRadius:2,marginTop:5}}>
            <View style={{flexDirection:'column',margin:10}}>
              <Text style={[iOSUIKit.body,{}]}>Amount</Text>
              <TextInput onBlur={()=>{alert('test')}} keyboardType="numeric" placeholder={`Amount ${acronym}`} style={styles.textInput}/>
              <Text style={[iOSUIKit.body,{}]}>Price</Text>
              <TextInput keyboardType="numeric" placeholder={`CAD per ${acronym}`} style={styles.textInput}/>
            </View>
            <View style={{flexDirection:'column',margin:5,marginTop:15,justifyContent:'center'}}>
                <Text style={[iOSUIKit.title3,styles.text]}>Available</Text>
                <Text style={[iOSUIKit.caption,styles.text]}>$0.00 CAD</Text>
                <Text style={[iOSUIKit.caption,styles.text]}>Total: $0.00 CAD</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',width:width/1.03,height:height/8,alignItems:'center',backgroundColor:'white',marginBottom:5,marginLeft:5,marginTop:5,justifyContent:'center',elevation:2,shadowColor:'black',shadowOffset:{width:0,height:2},shadowOpacity:0.2,shadowRadius:2}}>
              <Button title="BUY" buttonStyle={{backgroundColor:'#4ca64c',height:height/15,width:width/2.5}}/>
              <Button title="SELL" buttonStyle={{backgroundColor:'#ffb732',height:height/15,width:width/2.5}}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{backgroundColor:'white',marginLeft:5,elevation:2,shadowColor:'black',shadowOffset:{width:0,height:2},shadowOpacity:0.2,shadowRadius:2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{width:width/2.1,alignSelf:'flex-start',textAlign:'center',backgroundColor:'transparent'}}>Top 10 Bids</Text>
                <View style={{flexDirection:'row',alignSelf:'flex-start'}}>
                <Text style={[iOSUIKit.body,{width:width/4-5,textAlign:'center',alignSelf:'center'}]}>Price</Text>
                <Text style={[iOSUIKit.body,{width:width/4-5,textAlign:'center',alignSelf:'center'}]}>Amount</Text>
                </View>
              {this.handleBidOrderView()}
            </View>
            <View style={{height:250,marginLeft:5,backgroundColor:'white',elevation:2,shadowColor:'black',shadowOffset:{width:0,height:2},shadowOpacity:0.2,shadowRadius:2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{width:width/2.1,alignSelf:'center',textAlign:'center',backgroundColor:'transparent'}}>Top 10 Asks</Text>
              <View style={{flexDirection:'row',alignSelf:'center'}}>
                <Text style={[iOSUIKit.body,{width:width/4-5,textAlign:'center',alignSelf:'center'}]}>Price</Text>
                <Text style={[iOSUIKit.body,{width:width/4-5,alignSelf:'center',textAlign:'center'}]}>Amount</Text>
              </View>
              {this.handleAskOrderView()}
          </View>
          </View>
          <Text style={[iOSUIKit.title3,{width:width,textAlign:'center',marginTop:10}]}>Your Orders</Text>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    backgroundColor: '#f1f1f1',
  },
  text:{
    marginTop:8
  },
  textInput:{
    ...Platform.select({
      ios:{
        borderWidth:1,
        borderColor:'#8E8E93',
        borderRadius:5,
        paddingLeft:5
      }
    }),
    width:width/2.2,
    marginTop:5,
    height:30,
  },
  dropdownBtn:{
    width:width,
    backgroundColor:'green',
    
    height: height/12,
    justifyContent: 'center'
  },
  dropdownBtnStyle:{
    marginTop:10,
    width:width,
    alignSelf:'flex-start'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  title:{
      fontSize:20,
      color:'black'
  },
  amount:{
      fontSize:25,
      color:'black',
      marginTop:6
  }
});