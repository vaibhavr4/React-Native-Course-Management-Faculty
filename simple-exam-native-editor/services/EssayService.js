let _singleton;
const ESSAY_API_URL = 'http://10.0.3.2:8080/api/exam/EID/essay';
const ESSAY_DEL_API_URL = 'http://10.0.3.2:8080/api/essay/';
class EssayService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }


    createEssay(essay,examId) {
        console.log("In CREATE SERVICE Essay"+essay);
        return fetch(ESSAY_API_URL.replace('EID',examId), {
            body: JSON.stringify(essay),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            alert("Question has been created!!")
            return response.json();
        })
    }
    deleteEssay(qid) {
        console.log("In delete service");
        console.log("API:"+ESSAY_DEL_API_URL+qid);
        return fetch(ESSAY_DEL_API_URL+qid, {
            method: 'DELETE'
        }).then(function (response) {
            alert("Question has been deleted!!");
            return response;
        })
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }
}
export default EssayService