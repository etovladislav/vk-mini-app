import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator'
import Button from '@vkontakte/vkui/dist/components/Button/Button'

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activePanel: 'home',
            fetchedUser: null,
            authToken: null,
            test: []
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        let {
            id
        } = this.props
        return (
            <Panel id={id}>
                <PanelHeader>Пройди тест</PanelHeader>
                <Group>
                    <Div>
                        <h1>{this.props.test.name}</h1>
                        <Separator style={{margin: '12px 0'}}/>
                        <p style={{lineHeight: '1.5'}}>
                            {this.props.test.desc}
                        </p>
                        <img src={'https://demo18.alpha.vkhackathon.com:8080/storage/' + this.props.test.img}
                             style={{width: '100%'}} alt=""/>
                        <Div>
                            <Button size="xl" level="secondary"
                                    onClick={this.props.go}
                                    data-to="quiz">Начать тест!</Button>
                        </Div>
                    </Div>
                </Group>
            </Panel>
        )
    }
}

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    test: PropTypes.object.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
}

export default Home
