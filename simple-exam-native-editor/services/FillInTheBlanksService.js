let _singleton;
const FILL_API_URL = 'http://10.0.3.2:8080/api/exam/EID/blanks';
const FILL_DEL_API_URL = 'http://10.0.3.2:8080/api/blanks/';
class FillInTheBlanksService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }


    createBlanks(fill,examId) {
        console.log("In CREATE SERVICE MULTI");
        return fetch(FILL_API_URL.replace('EID',examId), {
            body: JSON.stringify(fill),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            alert("Question has been created successfully!!");
            return response.json();
        })
    }

    deleteBlank(qid) {
        console.log("In delete service");
        console.log("API:"+FILL_DEL_API_URL+qid);
        return fetch(FILL_DEL_API_URL+qid, {
            method: 'DELETE'
        }).then(function (response) {
            alert("Question has been deleted!!");
            return response;
        })
    }


    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new FillInTheBlanksService(_singleton);
        return this[_singleton]
    }
}
export default FillInTheBlanksService