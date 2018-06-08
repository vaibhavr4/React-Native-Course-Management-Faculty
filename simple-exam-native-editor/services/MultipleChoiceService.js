let _singleton;
const MULTIPLECHOICE_API_URL = 'http://10.0.3.2:8080/api/exam/EID/multi';
const MULTIPLECHOICE_DEL_API_URL = 'http://10.0.3.2:8080/api/multi/';
class MultipleChoiceService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }


    createMulti(multi,examId) {
        console.log("In CREATE SERVICE MULTI");
        return fetch(MULTIPLECHOICE_API_URL.replace('EID',examId), {
            body: JSON.stringify(multi),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            alert("Question created successfully!!")
            return response.json();
        })
    }

    deleteMulti(qid) {
        console.log("In delete service");
        console.log("API:"+MULTIPLECHOICE_DEL_API_URL+qid);
        return fetch(MULTIPLECHOICE_DEL_API_URL+qid, {
            method: 'DELETE'
        }).then(function (response) {
            alert("Question has been deleted!!");
            return response;
        })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MultipleChoiceService(_singleton);
        return this[_singleton]
    }
}
export default MultipleChoiceService