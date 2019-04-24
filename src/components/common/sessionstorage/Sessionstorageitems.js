class Sessionstorageitems{
    constructor(){

    }

    setToken(idToken){
        sessionStorage.setItem('jwtToken',(idToken));
        console.log("Onnistui tokenin laitto" + sessionStorage.getItem('jwtToken'));
    }

    getToken(){
        return sessionStorage.getItem('jwtToken');
    }
}
export default new Sessionstorageitems();