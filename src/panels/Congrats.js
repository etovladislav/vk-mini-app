import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Div from "@vkontakte/vkui/dist/components/Div/Div"
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator'
import { Link } from '@vkontakte/vkui';

class Congrats extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activePanel: 'congrats',
            fetchedUser: null,
            authToken: null,
            result: {
                products: {
                    "id": 1,
                    name: "Вам повезло! Специально для вас у нас есть интересный банковский продукт",
                    desc: "Промсвязь банк",
                    url: "ссылка",
                    img: "Fng2SH6fP7uZ87CQRHv1t9H8EXyRV15c602QnLlo.jpeg",
                    "pivot": {
                        "answer_id": 1,
                        "product_id": 1
                    }
                },
                result: {
                    "id": 2,
                    text: "Хм..Похоже ты лох",
                    img: "Fng2SH6fP7uZ87CQRHv1t9H8EXyRV15c602QnLlo.jpeg",
                    "test_id": 1
                }
            }
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
                <PanelHeader>Результат</PanelHeader>
                <Group>
                    <Div>
                        <h1>{this.props.congr.message.result.text}</h1>
                        <Separator style={{margin: '12px 0'}}/>
                        <img src={'https://demo18.alpha.vkhackathon.com:8080/storage/' + this.props.congr.message.result.img}
                             style={{width: '100%'}} alt=""/>
                    </Div>
                </Group>
                <Group>
                    <Div>
                        <h1>{this.props.congr.message.products.name}</h1>
                        <p>{this.props.congr.message.products.desc}</p>
                        <img src={'https://demo18.alpha.vkhackathon.com:8080/storage/' + this.state.result.result.img}
                             style={{width: '100%'}} alt=""/>
                        <br/>
                        <br/>
                        <Div style={{textAlign: 'center'}}>
                            <Link href={this.props.congr.message.products.url} target="_blank">Уже бегу оформлять! 🦄</Link>
                        </Div>
                    </Div>
                </Group>

            </Panel>
        )
    }
}

Congrats.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    congr: PropTypes.object,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
}

export default Congrats
