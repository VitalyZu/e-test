const fetch = require("node-fetch");

//1
function reverse(string) {
    return string.replace(/\w+/g, function (e) {
        e = e.split('')
        let symbol = e[0]
        let upper = symbol.toUpperCase()
        if (upper === symbol) {
            e[0] = e[0].toLowerCase()
            e[e.length - 1] = e[e.length - 1].toUpperCase()
        }
        return e.reverse().join('')
    })
}
//2
function multy(number) {
    let counter = 0
    for (i = 1; i < number; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            counter += i
        }
    }
    return counter
}

//3
function ip(ip) {
    ip = ip.split('.')
    if (ip.length === 4) {
        return ip.every(function (v) {
            if (v <= 255 && v >= 0 && v.length === String(+v).length) { return true }
        })
    } else { return false }
}

//4
class Games {
    constructor(items) {
        this.items = items
        this.games = items.games
        this.categories = items.categories
        this.merchantsCurrencies = items.merchantsCurrencies
    }
    getCategoriesTags() {
        let obj = {}
        this.categories.forEach(function (value) {
            value.Tags.forEach(tag => obj[tag] = true)
        })
        return Object.keys(obj)
    }
    getCategoriesFromTag(tag) {
        let categories = []
        this.categories.forEach(function (value) {
            (value.Tags.includes(tag)) ? categories.push(value.Trans.en) : ''
        })
        return categories
    }
    getCategoryName(code) {
        let categories = []
        this.categories.forEach(function (value) {
            (value.Name.hasOwnProperty(code)) ? categories.push(value.Name[code]) : categories.push('not_available')
        })
        return categories
    }
    getGamesHasDemo() {
        let games = []
        this.games.forEach(function (value) {
            (!!value.hasDemo) ? games.push(value.Name.en) : ''
        })
        return games
    }
    getMerchantGames(id) {
        let games = []
        this.games.forEach(function (value) {
            (value.MerchantID == id) ? games.push(value.Name.en) : ''
        })
        return games
    }
    getMerchantsCurrencies(currency) {
        let merch = []
        this.merchantsCurrencies.forEach(function (value) {
            (value.Currencies.includes(currency)) ? merch.push(value.IDMerchant) : ''
        })
        return merch
    }
}

let items = fetch("http://127.0.0.1:8887/data.json")
    .then(response => response.json())
    .then(function (res) {
        let gameBase = new Games(res)
    })


