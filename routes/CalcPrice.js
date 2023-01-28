function calcSellPriceRate(buyPrice){
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

function calcSellPriceRate(buyPrice){
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
calcSellPrice = (buyPrice) => {
    x = calcSellPriceRate(buyPrice)
    return x * buyPrice;
}
function calcResellerPrice(buyPrice){
    x = (calcSellPrice(buyPrice) - buyPrice)*.60
    return x + buyPrice
}

const services = [
    {
        id:3362,
        id2:1,
        name : 'Instagram Views',
        buyPrice :  0.09,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-5Min',
        Speed : '30KDay',
        Platform :'Instagram' ,
        Panel : 'smmfollows.com',
        Quality: 'Real',
        Min : '50' ,
        Max : '10M',
        dropRate : 'No Drop',
        Refill : 'No Refill'
    },
    {
        
        id : 5649,
        id2: 2,
        name : 'Telegram Post Views [ Any Post ] ',
        buyPrice :  0.1667,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : 'Instant',
        Speed : '5M/Day',
        Platform :'Telegram' ,
        Panel : 'secsers.com',
        Quality: 'Real',
        Min : '100' ,
        Max : '100M',
        dropRate : 'No Drop',
        Refill : ''
    },
    {
        id:3360,
        id2:3,
        name : ' Instagram Views',
        buyPrice :  0.1852,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-5Min',
        Speed : '50K-100K/Day',
        Platform :'instagram' ,
        Panel : 'smmfollows.com',
        Quality: 'Real',
        Min : '100' ,
        Max : '10M',
        dropRate : 'No Drop',
        Refill : 'No Refill'
    },
    {
        id:1600 ,
        id2: 4,
        name : 'TikTok Views ',
        buyPrice :  0.2761,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-5Min',
        Speed : '50K-100K/Day',
        Platform :'TikTok' ,
        Panel : 'smmfollows.com',
        Quality: 'Real',
        Min : '100' ,
        Max : '10M',
        dropRate : 'Low Up to 5%',
        Refill : 'No Refill'
    },
    {
        id: 5045,
        id2 : 5,
        name : 'Instagram Story Views',
        buyPrice : 0.36 ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '15Min',
        Speed : '500-1000/Day',
        Platform :'Instagram' ,
        Panel : 'secsers.com',
        Quality: 'Real/Mix',
        Min : '50' ,
        Max : '100K',
        dropRate : 'Low Up to 5%',
        Refill : 'No Refill'
    },
    {
        id:5042,
        id2: 6,
        name : 'Instagram Reel Views ',
        buyPrice : 0.3704  ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : 'Instant',
        Speed : '2M/Day',
        Platform :'Instagram' ,
        Panel : 'secsers.com',
        Quality: 'Real',
        Min : '50' ,
        Max : '3M',
        dropRate : 'No Drop',
        Refill : 'LifeTime'
    },
    {
        id:4080 ,
        id2: 7,
        name : 'Instagram Likes',
        buyPrice : 0.7782 ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : 'Instant',
        Speed : '10K/Hour',
        Platform :'Instagram' ,
        Panel : 'smmfollows.com',
        Quality: 'Real',
        Min : '10' ,
        Max : '10k',
        dropRate : 'No Drop',
        Refill : '30 Days'
    },
    {
        id: 1689,
        id2: 8,
        name : 'instagram Follower',
        buyPrice : 2.3946  ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-1hour',
        Speed : '10k/day',
        Platform :'Instagram' ,
        Panel : 'easysmmpanel.com',
        Quality: 'Mix',
        Min : '100' ,
        Max : '	8000',
        dropRate : 'High up to 60%',
        Refill : 'No Refill'
    },
    {
        id: 3820,
        id2: 9,
        name : 'Instagram Followers',
        buyPrice :  4.8143,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-1Hour',
        Speed : '20K/Day',
        Platform :'Instagram' ,
        Panel : 'smmfollows.com',
        Quality: 'Real',
        Min : '10' ,
        Max : '1M',
        dropRate : 'Low Up to 5%',
        Refill : '365Days'
    },
    {
        id: 1359,
        id2: 10,
        name : 'Instagram Followers [High Quality]',
        buyPrice : 5.4943 ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-5Min',
        Speed : '25K/Day',
        Platform :'Instagram' ,
        Panel : 'easysmmpanel.com',
        Quality: 'Real',
        Min : '10' ,
        Max : '100K',
        dropRate : 'Low Up to 5%',
        Refill : '99Day'
    },
    {
        id: 3783,
        id2: 11,
        name : 'TikTok Likes',
        buyPrice : 5.8889,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-5Min',
        Speed : '50K-200K/Day',
        Platform :'TikTok' ,
        Panel : 'smmfollows.com',
        Quality: 'Real',
        Min : '50' ,
        Max : '500',
        dropRate : 'Low Up to 5%',
        Refill : '30Days'
    },
    {
        id: 5254,
        id2: 12,
        name : 'Youtube Views ',
        buyPrice : 10.1575 ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-15Min',
        Speed : '5K-10K/Day',
        Platform :'Youtube' ,
        Panel : 'secsers.com',
        Quality: 'Real',
        Min : '10' ,
        Max : '10K',
        dropRate : 'Low Up to 10-15%',
        Refill : 'No Refill'
    },
    {
        id: 944,
        id2: 13,
        name :  'Telegram Members',
        buyPrice : 14.441 ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-1Hour',
        Speed : '15K/Day',
        Platform :'Telegram' ,
        Panel : 'easysmmpanel.com',
        Quality: 'Real/Mix',
        Min : '400' ,
        Max : '100K',
        dropRate : 'Low Up to 10-15%',
        Refill : 'No Refill'
    },
    {
        id: 5614,
        id2: 14,
        name : 'Youtube Video Likes',
        buyPrice : 17.9426 ,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : 'Instant',
        Speed : '10k/day',
        Platform :'Youtube' ,
        Panel : 'secsers.com',
        Quality: 'Real',
        Min : '20' ,
        Max : '100K',
        dropRate : 'Low Up to 5%',
        Refill : 'No Refill'
    },
    {
        id: 7508,
        id2: 15,
        name : 'Telegram Public Channel/Group Members ',
        buyPrice :  18.0331,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-1Hour',
        Speed : '30K-50K/Day',
        Platform :'Telegram' ,
        Panel : 'secsers.com',
        Quality: 'Real',
        Min : '10' ,
        Max : '5M',
        dropRate : 'Low Up to 10-15%',
        Refill : '45Days'
    },
    {
        id: 70,
        id2: 16 ,
        name : 'Facebook HQ Real Post Likes ',
        buyPrice :  23.2714,
        sellPrice : function(){
            return calcSellPrice(Object(this).buyPrice)
        },
        resellPrice : function(){
            return calcResellerPrice(Object(this).buyPrice)
        },
        startTime : '0-5Min',
        Speed : '10k/day',
        Platform :'Facebook' ,
        Panel : 'easysmmpanel.com',
        Quality: 'Real',
        Min : '100' ,
        Max : '10K',
        dropRate : 'Low Up to 5%',
        Refill : '30Days'
    }
]


calcSellPrice = (buyPrice) => {
    x = calcSellPriceRate(buyPrice)
    return x * buyPrice;
}
function calcResellerPrice(buyPrice){
    x = (calcSellPrice(buyPrice) - buyPrice)*.60
    return x + buyPrice
}

// for( i = .1 ; i < 1; i += .1)
//     console.log('buy Price : ' + i.toFixed(2) + ' ---> Sell Price : ' + calcSellPrice(i).toFixed(2)+'\nthe rate = ' +calcSellPriceRate(i).toFixed(2)+'\n----------------------------------------------------------------')
// for( i = 1 ; i < 5; i += .5)
//     console.log('buy Price : ' + i.toFixed(2) + ' ---> Sell Price : ' + calcSellPrice(i).toFixed(2)+'\nthe rate = ' +calcSellPriceRate(i).toFixed(2)+'\n----------------------------------------------------------------')
// for( i = 5 ; i < 10; i += 1)
//     console.log('buy Price : ' + i.toFixed(2) + ' ---> Sell Price : ' + calcSellPrice(i).toFixed(2)+'\nthe rate = ' +calcSellPriceRate(i).toFixed(2)+'\n----------------------------------------------------------------')
// for( i = 10 ; i < 20; i += 2)
//     console.log('buy Price : ' + i.toFixed(2) + ' ---> Sell Price : ' + calcSellPrice(i).toFixed(2)+'\nthe rate = ' +calcSellPriceRate(i).toFixed(2)+'\n----------------------------------------------------------------')
// for( i = 20 ; i < 50; i += 5)
//     console.log('buy Price : ' + i.toFixed(2) + ' ---> Sell Price : ' + calcSellPrice(i).toFixed(2)+'\nthe rate = ' +calcSellPriceRate(i).toFixed(2)+'\n----------------------------------------------------------------')
// for( i = 50 ; i < 100; i += 10)
//     console.log('buy Price : ' + i.toFixed(2) + ' ---> Sell Price : ' + calcSellPrice(i).toFixed(2)+'\nthe rate = ' +calcSellPriceRate(i).toFixed(2)+'\n----------------------------------------------------------------')
// for( i = 100 ; i < 201; i += 20)
//     console.log('buy Price : ' + i.toFixed(2) + ' ---> Sell Price : ' + calcSellPrice(i).toFixed(2)+'\nthe rate = ' +calcSellPriceRate(i).toFixed(2)+'\n----------------------------------------------------------------')



// Print services

    // console.log('Platform:  ' + services[i].Platform)
    // console.log('\nName:  ' + services[i].name)
    // console.log('\nId:  ' + services[i].id2)
    // console.log('\nPrice per 1000 :   ' + (services[i].resellPrice()).toFixed(2)+'Egp')

    // // console.log('\nStart time:  ' + services[i].startTime)
    // console.log('\nSpeed :  ' + services[i].Speed)
    // console.log('\nMin:  ' + services[i].Min)
    // console.log('\nMax:  ' + services[i].Max)
    // console.log('\nDrop rate:  ' + services[i].dropRate)
    // console.log('\nRefill:  ' + services[i].Refill)
console.log(calcSellPriceRate(16.0867) * 16.0867);
