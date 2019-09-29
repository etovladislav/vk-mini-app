class QuizService {

    async getQuiz(id) {
        return fetch('https://www.cbr-xml-daily.ru/daily_json.js?' + cacheDate).then(function (response) {
            return response.json();
        })
    }
}
export default new QuizService();
