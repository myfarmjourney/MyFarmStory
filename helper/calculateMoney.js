function calculateMoney(money,price,action){
    console.log("uang: "+ money);
    console.log(action);
    
    
    if(action == "sell"){
        money += price
        return money
    }else if(action == "buy"){
        money -= price
        return money
    }
    
}

module.exports = {calculateMoney}