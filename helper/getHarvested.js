function getHarvested(matureAge,dieAge,count){
    if(count == matureAge && matureAge < dieAge){
        return "harvested"
    }else if(count == dieAge && matureAge > dieAge){
        return "die"
    }
}

module.exports = {getHarvested}