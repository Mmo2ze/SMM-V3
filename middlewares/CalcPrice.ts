// 
export const calcSellPriceRate = (buyPrice:number):number=>{
    if(buyPrice < 1 )
        return  8-((buyPrice-0.1)*3.5)
    if(buyPrice < 2.5 )
        return  4.85-((buyPrice-1)*.8333)
    if(buyPrice < 5 )
        return  3.6-((buyPrice-2.5)*.2)
    if(buyPrice < 10 )
        return  3.1-((buyPrice-5)*.1)
    if(buyPrice < 20 )
        return  2.6-((buyPrice-10)*.05)
    if(buyPrice < 50 )
        return  2.1-((buyPrice-20)*.01)
    if(buyPrice <= 100 )
        return  1.8-((buyPrice-50)*.004)
    else return 1.6
}
export const calcSellPrice = (buyPrice:number):number => {
    let x = calcSellPriceRate(buyPrice)
    return x * buyPrice;
}
export const  calcResellerPrice = (buyPrice:number):number=>{
    let x:number = (calcSellPrice(buyPrice) - buyPrice)*.60
    return x + buyPrice
}


