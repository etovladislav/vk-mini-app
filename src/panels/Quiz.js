import React from 'react'
import PropTypes from 'prop-types'
import {platform, IOS} from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator'
import './Persik.css'
import Div from "@vkontakte/vkui/dist/components/Div/Div"
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout"
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio"
import Button from "@vkontakte/vkui/dist/components/Button/Button"
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow"
import Progress from "@vkontakte/vkui/dist/components/Progress/Progress"
// import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout"
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward'

const osName = platform()

class Quiz extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activePanel: 'home',
            fetchedUser: null,
            authToken: null,
            items: [],
            currentQuestion: {},
            answers: [],
            questionCount: 10,
            questionIndex: 0,
            selectedAnswerId: null,
            answerIds: []
        }
        this.nextQuestion = this.nextQuestion.bind(this)
        this.onAnswerChanged = this.onAnswerChanged.bind(this)
        this.showCongrats = this.showCongrats.bind(this)
    }

    componentDidMount() {
        const question = this.props.questions.find(el => el.is_first === true)
        this.setState({
            currentQuestion: question,
            answers: question.answers,
            questionIndex: 0,
            selectedAnswerId: question.answers[0].id
        })
    }

    showCongrats() {
        this.sendResults()
        // this.props.go('congrats')
    }
    nextQuestion() {
        const answer = this.state.answers.find(el => el.id === this.state.selectedAnswerId)
        this.setState({answerIds: [...this.state.answerIds, answer.id]})
        if (answer.next_question_id === null) {
            this.setState({isFinish: true})
        } else {
            const question = this.props.questions.find(el => el.id === answer.next_question_id)
            this.setState({
                currentQuestion: question,
                answers: question.answers,
                questionIndex: this.state.questionIndex + 1,
                selectedAnswerId: question.answers[0].id
            })
        }

    }

    sendResults() {
            var req = {
                external_id: this.props.fetchedUser.id,
                answers: this.state.answerIds
            };
        this.setState({answerIds: [...this.state.answerIds, this.state.selectedAnswerId]})

        fetch('https://demo18.alpha.vkhackathon.com/answer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            })
            .then((response) => response.json())
            .then((responseJson) => (this.props.go('congrats', responseJson)))
            console.log(req)
    }
    onAnswerChanged(e) {
        const answerId = Number(e.currentTarget.value)
        const answer = this.state.answers.find(el => el.id === answerId)
        if (answer.next_question_id === null) {
            this.setState({isFinish: true})
        }
        this.setState({
            selectedAnswerId: answerId
        })
    }

    render() {
        let {
            id
        } = this.props

        let {
            currentQuestion,
            questionIndex,
            answers
        } = this.state

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<HeaderButton onClick={this.props.go} data-to="home">
                        {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}
                >
                    Persik
                </PanelHeader>
                <Div>
                    <h1>Вопрос №{questionIndex + 1}</h1>
                    <Separator style={{margin: '12px 0'}}/>
                    <p style={{lineHeight: '1.5'}}>{currentQuestion.text}</p>
                    <InfoRow title={this.props.id}>
                        <Progress value={this.state.questionIndex / this.props.questions.length * 100}/>
                    </InfoRow>
                    <Separator style={{margin: '12px 0'}}/>
                    <img src={'https://demo18.alpha.vkhackathon.com/storage/' + currentQuestion.img}
                         style={{width: '100%'}} alt=""/>
                    <FormLayout>
                        <div>
                            {
                                answers.length > 0 && answers.map((item, index) => (
                                    <Radio name="answer"
                                           key={index}
                                           value={item.id}
                                           checked={this.state.selectedAnswerId === item.id}
                                           onChange={this.onAnswerChanged}
                                    >
                                        {item.text}
                                    </Radio>
                                ))
                            }
                        </div>
                    </FormLayout>
                    <br/>
                    {this.state.isFinish ?
                        <Button size="xl" level="commerce"
                                onClick={this.showCongrats}
                                data-to="congrats">Узнать результаты!</Button>
                        :
                        <Button before={<Icon24BrowserForward/>} level="secondary" onClick={this.nextQuestion}
                                size="xl">Следующий
                            вопрос</Button>
                    }
                </Div>
            </Panel>
        )
    }
}

Quiz.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.object.isRequired,
    go: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired
}
export default Quiz
