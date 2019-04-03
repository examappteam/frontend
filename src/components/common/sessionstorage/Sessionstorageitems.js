class Sessionstorageitems{
    constructor(){

    }

    setToken(idToken){
        sessionStorage.setItem('jwtToken',(idToken.accessToken));
        console.log("Onnistui tokenin laitto" + sessionStorage.getItem('jwtToken'));
    }

    setEmail(idEmailToken){
        sessionStorage.setItem('email', idEmailToken);
        console.log("Onnistui emailin laitto" + sessionStorage.getItem('email'));
    }
    getToken(){
        return sessionStorage.getItem('jwtToken');
    }
}
export default new Sessionstorageitems();