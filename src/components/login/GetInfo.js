
var objPeople = [

    {
      email: "student",
      password: "student",
      identity: "student"
    },
  {
    email: "teacher",
    password: "teacher", 
    identity: "teacher"
  },
  {
    email: "pete",
    password : "pete",
    identity: "student"
  },
  ]

function getInfo(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var tidentity = "teacher";
    var sidentity = "student";
    var sloggedin = false;
    var tloggedin = false;
    for(let i = 0; i < objPeople.length; i++){
      if(email == objPeople[i].email && password == objPeople[i]. password){
        console.log(email + "is logged in");
        
        
        if(tidentity === objPeople[i].identity){
          console.log("Opettaja");
          tloggedin = true;
          
          return tidentity;
        }
        if(sidentity === objPeople[i].identity){
          console.log("Opiskelija");
          sloggedin = true;
          return sidentity;
        }
      }
      
    }
    if (sloggedin === false){
        console.log("Invalid");
    }
    if (tloggedin === false){
      console.log("Invalid");
  }
  
  

  }
  
    
  

  export default getInfo;