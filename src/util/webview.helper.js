import React, {Component} from 'react';
import {WebView} from 'react-native';
//not able: xmr,bytecoin,nxt,fantomCoin,qnc,
export class WebViewHelper extends Component {
    constructor() {
        super();
        this.state = {
            baseURL: ''
        }
    }

    componentWillMount() {
        const {toAcronym} = this.props.navigation.state.params;
        console.log(toAcronym);
        switch (toAcronym) {
            case 'btc':
                this.setState({
                    baseURL: 'https://blockchain.info/address/'
                })
                break;
            case 'eth':
                this.setState({
                    baseURL: 'https://etherscan.io/address/'
                })
                break;
            case 'bch':
                this.setState({
                    baseURL: 'https://www.blocktrail.com/BCC/address/'
                })
                break;
            case 'etc':
                this.setState({
                    baseURL: 'http://gastracker.io/addr/'
                })
                break;
            case 'exp':
                this.setState({
                    baseURL: 'http://www.gander.tech/address/'
                })
                break;
            case 'xem':
                this.setState({
                    baseURL: 'http://explorer.ournem.com/#/s_account?account='
                })
                break;
            case 'lsk':
                this.setState({
                    baseURL: 'https://explorer.lisk.io/address/'
                })
                break;
            case 'game':
                this.setState({
                    baseURL: 'https://blockexplorer.gamecredits.com/addresses/'
                })
                break;
            case 'steem':
                this.setState({
                    baseURL: 'https://steemdb.com/@'
                })
                break;
            case 'sbd':
                this.setState({
                    baseURL: 'https://steemdb.com/@'
                })
                break;
            case 'zec':
                this.setState({
                    baseURL: 'https://zchain.online/address/'
                })
                break;
            case 'nlg':
                this.setState({
                    baseURL: 'https://blockchain.gulden.com/address/'
                })
                break;
            case 'strat':
                this.setState({
                    baseURL: 'https://chainz.cryptoid.info/strat/address.dws?'
                })
                break;
            case 'ardr':
                this.setState({
                    baseURL: 'https://ardor.tools/account/'
                })
                break;
            case 'rep':
                this.setState({
                    baseURL: 'https://etherscan.io/address/'
                })
                break;
            case 'lbc':
                this.setState({
                    baseURL: 'https://explorer.lbry.io/address/'
                })
                break;
            case 'ltc':
                this.setState({
                    baseURL: 'https://chainz.cryptoid.info/ltc/address.dws?'
                })
                break;
            case 'xrp':
                this.setState({
                    baseURL: 'https://bithomp.com/explorer/'
                })
                break;
            case 'doge':
                this.setState({
                    baseURL: 'http://dogechain.info/address/'
                })
                break;
            case 'dash':
                this.setState({
                    baseURL: 'https://chainz.cryptoid.info/dash/address.dws?'
                })
                break;
            case 'rads':
                this.setState({
                    baseURL: 'https://chainz.cryptoid.info/rads/address.dws?'
                })
                break;
            case 'nbt':
                this.setState({
                    baseURL: 'https://nuexplorer.ddns.net/address/'
                })
                break;
            case 'pot':
                this.setState({
                    baseURL: 'https://chainz.cryptoid.info/pot/address.dws?'
                })
                break;
            case 'gnt':
                this.setState({
                    baseURL: 'https://etherscan.io/address/'
                })
                break;
            case 'waves':
                this.setState({
                    baseURL: 'http://wavesexplorer.com/address/'
                })
                break;
            case 'usdt':
                this.setState({
                    baseURL: 'http://omnichest.info/lookupadd.aspx?address='
                })
                break;
            case 'swt':
                this.setState({
                    baseURL: 'https://etherscan.io/address/'
                })
                break;

        }
    }

    render() {
        const {address} = this.props.navigation.state.params;
        console.log(this.state.baseURL)
        return (
            <WebView
                source={{uri: `${this.state.baseURL}${address}`}}
            />
        );
    }
}