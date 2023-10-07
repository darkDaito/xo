let item = document.getElementsByClassName("item");
let x = true
let activeUsers = document.getElementsByClassName("players__counter")[0];
let gtm = document.getElementsByClassName("toMain")[0];
let gameID = location.href.slice(location.href.lastIndexOf("/") + 1);
let gameSym = location.href.slice(location.href.lastIndexOf("/") - 1, location.href.lastIndexOf("/"));
let isWin = false;
let isBlock = gameSym != "x";

function createToken(){
    let tokenNumbers = Math.floor(Math.random()*8999999 ) + 1000000;
    let tokenLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x']
    let token =
      tokenLetters[Math.floor(Math.random() * tokenLetters.length)] + tokenNumbers;
    return token
   

}
let token = createToken()


fetch("addUser/" + token)
.then((res)=>(res.json()))
.then((json)=>{
 console.log(json);
})

setInterval(()=>{
  fetch("signal/" + token)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      activeUsers.textContent = JSON.stringify(json.data);
    });
}, 3000)

function checkWin(list){
  if (!isWin) {
    let winList = ["048", "012", "345", "678", "036", "147", "258", "246"];
    for (let i = 0; i < winList.length; i++) {
      let res =
        list[winList[i][0]] &&
        list[winList[i][0]] == list[winList[i][1]] &&
        list[winList[i][0]] == list[winList[i][2]];
      if (res == true) {
        isWin = true;
        alert("win " + list[winList[i][0]] );
        item[winList[i][0]].style.backgroundColor = 'yellow';
        item[winList[i][1]].style.backgroundColor = "yellow";
        item[winList[i][2]].style.backgroundColor = "yellow";
      }
    }
  }

}

for(let i = 0; i < item.length; i++){
    item[i].addEventListener('click', ()=>{
        if (!isBlock && item[i].textContent == "" && !isWin) {
          item[i].textContent = gameSym;
            isBlock = true;


          let list = [];
          for (let j = 0; j < item.length; j++) {
            list.push(item[j].textContent);
          }
          checkWin(list);

          console.log(list);
          fetch(
            "update/" +
              JSON.stringify(list) +
              "/" +
              gameID
          )
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
            });
        }
    })
}





setInterval(()=>{
    fetch("new/" + gameID)
    .then((res) => res.json())
    .then((json) => {
        console.log(json.data)
        for (let j = 0; j < item.length; j++) {
          item[j].textContent = json.data[j];
        }
        
        let xCounter = 0
        let oCounter = 0;

        for(let j=0; j < json.data.length; j++){
          if(json.data[j] == "x"){
            xCounter++;
          }
          if (json.data[j] == "o") {
            oCounter++;
          }
        }
        if(xCounter == oCounter){
          if (gameSym == 'x') {
            isBlock = false;

          }
          if (gameSym == "o") {
            isBlock = true
          }
        }
        else if (xCounter != oCounter) {
           if (gameSym == "o") {
            isBlock = false;

           }
           if (gameSym == "x") {
            isBlock = true;
           }
        }

          checkWin(json.data);


    });
}, 1000)
