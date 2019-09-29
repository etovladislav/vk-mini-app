import React from 'react'
import connect from '@vkontakte/vk-connect'
import View from '@vkontakte/vkui/dist/components/View/View'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner'
import '@vkontakte/vkui/dist/vkui.css'

import Home from './panels/Home'
import Quiz from './panels/Quiz'
import PanelSpinner from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner"
import Congrats from "./panels/Congrats"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchedUser: null,
            popout: <ScreenSpinner size='large'/>,
            activePanel: 'home',
            test: {},
            isLoaded: false,
            congr: null
        }
        this.getTest = this.getTest.bind(this)
        this.sendUserData = this.sendUserData.bind(this)
        this.go = this.go.bind(this)
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data})
                    this.sendUserData();
                    break
                default:
                    console.log(e.detail.type)
            }
        })
        connect.send('VKWebAppGetUserInfo', {})
        this.getTest()
        this.setState({popout: null})

    }

    sendUserData() {
        var req = {
            external_id: this.state.fetchedUser.id,
            first_name: this.state.fetchedUser.last_name,
            last_name: this.state.fetchedUser.first_name,
            photo: this.state.fetchedUser.photo_100 || null
        };
        fetch('https://demo18.alpha.vkhackathon.com:8080/client', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req)
        })
        console.log(req)
    }

    async getTest() {
        fetch("https://demo18.alpha.vkhackathon.com:8080/test/1")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        test: result,
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    go = (e, d) => {
        if (d) {
            this.setState({congr: d})
            this.setState({activePanel: e})
            return;
        }
        this.setState({activePanel: e.currentTarget.dataset.to})
    }

    render() {
        return (
            <View activePanel={this.state.activePanel} popout={this.state.popout}>
                {!this.state.isLoaded ? <PanelSpinner/> :
                    <Home id='home' fetchedUser={this.state.fetchedUser} test={this.state.test} go={this.go}/>}
                {!this.state.isLoaded ? <PanelSpinner/> :
                    <Quiz id='quiz' go={this.go} fetchedUser={this.state.fetchedUser} questions={this.state.test.questions}/>}
                {!this.state.isLoaded ? <PanelSpinner/> :
                    <Congrats id='congrats' go={this.go} congr={this.state.congr}fetchedUser={this.state.fetchedUser}/>}
            </View>
        )
    }
}

export default App

