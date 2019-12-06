import React, { ButtonHTMLAttributes, MouseEvent } from 'react';
import * as _ from 'lodash';
import Category from './Category';
import GameCard from './GameCard';
import Sort from './Sort';
import { thisExpression } from '@babel/types';
import { number } from 'prop-types';
import GamesPerPage from './GamesPerPage';
import Merchants from './Merchants';
interface State {
    error: any
    isLoaded: boolean
    items: any
    categoryId: number | string
    gamesOnPage: number
    pageNumber: number
    sortBy: string
    reverse: boolean
    favorite(): any
    favoriteBase: any
    activeButton: number
    activePerPage: number
    activeCategory: string
    searchButtonsNumber(): any
    getCategories(): any[]
    getGames(): any[]
    gamesInCategory(): any
}
class App extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            categoryId: 0,
            gamesOnPage: 40,
            pageNumber: 1,
            sortBy: 'Name.en',
            reverse: false,
            get favorite(): any {
                if (localStorage.favorite) {
                    return JSON.parse(localStorage.favorite)
                } else (localStorage.setItem('favorite', '{}'))
            },
            favoriteBase: [],
            activeButton: 1,
            activePerPage: 40,
            activeCategory: 'All',
            searchButtonsNumber(): any { return Math.ceil(this.gamesInCategory().length / this.gamesOnPage) },
            getCategories(): any[] {
                let arr = this.items.categories.slice()
                arr.unshift({ 'ID': '0', 'Name': { 'en': 'All' } })
                arr.push({ 'ID': 'f', 'Name': { 'en': 'Favorite' } }, { 'ID': 'm', 'Name': { 'en': 'merchant' } })
                return arr
            },
            getGames(): any[] {
                let categoryItems = this.items.games.slice()
                let favoriteBase: any[] = []
                if (this.favoriteBase.length !== 0 && this.categoryId != 0) {
                    favoriteBase = this.favoriteBase.slice()
                    favoriteBase = _.filter(favoriteBase, (e) => {
                        return _.includes(e.CategoryID, this.categoryId.toString())
                    })
                } else { favoriteBase = this.favoriteBase.slice() }
                if (this.categoryId != 0) {
                    categoryItems = _.filter(this.items.games, (e) => {
                        return _.includes(e.CategoryID, this.categoryId.toString())
                    })
                }
                let arr = _.sortBy(categoryItems, this.sortBy)
                if (this.reverse) { arr.reverse() }
                if (this.categoryId == 'f') {
                    favoriteBase = this.favoriteBase.slice()
                    return _.chunk(favoriteBase, this.gamesOnPage)[this.pageNumber - 1]
                }
                if (this.categoryId == 'm') {
                    return _.chunk(this.items.games.merchants, this.gamesOnPage)[this.pageNumber - 1]
                }
                arr = _.concat(_.sortBy(favoriteBase, this.sortBy), arr)
                return _.chunk(arr, this.gamesOnPage)[this.pageNumber - 1]
            },
            gamesInCategory() {
                let categoryItems = this.items.games.slice()
                if (this.categoryId != 0) {
                    categoryItems = _.filter(this.items.games, (e) => {
                        return _.includes(e.CategoryID, this.categoryId.toString())
                    })
                }
                return _.concat(this.favoriteBase, categoryItems)
            }
        }
        this.categoryChange = this.categoryChange.bind(this)
        this.toFavorite = this.toFavorite.bind(this)
    }
    categoryChange(value: number, name: string) {
        this.setState({
            categoryId: value,
            pageNumber: 1,
            activeButton: 1,
            activeCategory: name
        })
    }
    handleButtonClick(e: any) {
        e.preventDefault()
        this.setState({
            pageNumber: e.currentTarget.innerHTML,
            activeButton: +e.currentTarget.dataset.index
        })
    }
    changeGamesOnPage(e: any) {
        this.setState({
            pageNumber: 1,
            gamesOnPage: e.currentTarget.innerHTML,
            activePerPage: +e.target.dataset.index,
            activeButton: 1
        })
    }
    sortBy(e: any) {
        if (e.target.innerHTML === 'Name') {
            this.setState({
                sortBy: 'Name.en'
            })
        } else {
            this.setState({
                sortBy: 'ID'
            })
        }
    }
    changeReverse() {
        let current = this.state.reverse
        this.setState({
            reverse: !current
        })
    }
    toFavorite(name: any, id: number) {
        let current: any = this.state.favorite
        let currentGame = this.state.favoriteBase
        let newItems = this.state.items
        if (current[name] !== undefined) {
            delete current[name]
            newItems.games.push(_.find(currentGame, function (e: any) {
                return e.ID === id
            }))
            _.remove(currentGame, function (e: any) {
                return e.ID === id
            })
        } else {
            current[name] = id
            currentGame.push(_.find(this.state.items.games, function (e) {
                return e.ID === id
            }))
            _.remove(this.state.items.games, function (e: any) {
                return e.ID === id
            })
        }
        this.setState({
            items: newItems,
            favorite: current,
            favoriteBase: currentGame
        })
        localStorage.setItem('favorite', JSON.stringify(current))
    }
    componentDidMount() {
        fetch("http://127.0.0.1:8887/data.json") //Web Server for Chrome https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?utm_source=chrome-app-launcher-info-dialog
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                    let arr: any = []
                    if (localStorage.favorite) {
                        for (let key in JSON.parse(localStorage.favorite)) {
                            arr.push(_.find(this.state.getGames(), function (e) {
                                return e.ID === JSON.parse(localStorage.favorite)[key]
                            }
                            ))
                            _.remove(this.state.items.games, function (e: any) {
                                return e.ID === JSON.parse(localStorage.favorite)[key]
                            })
                        }
                    }
                    this.setState({
                        favoriteBase: arr
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error.message
                    })
                }
            )
    }
    render() {
        const { error, isLoaded } = this.state
        let that = this
        if (error) {
            return <div>Error: {error}</div>
        } else if (!isLoaded) {
            return <div className='loading'>Loading...</div>
        } else {
            let that = this
            let searchButtons: any[] = []
            for (let i = 1; i <= this.state.searchButtonsNumber(); i++) {
                searchButtons.push(
                    <button
                        key={'btn' + i}
                        onClick={e => this.handleButtonClick(e)}
                        data-index={i}
                        className={i === this.state.activeButton ? 'active-btn' : 's-btn'}>
                        {i}
                    </button>)
            }
            let games
            if (this.state.getGames() && this.state.categoryId != 'm') {
                games = this.state.getGames().map(function (item) {
                    return <GameCard
                        key={'game' + item.ID}
                        id={item.ID}
                        alt={item.ID}
                        gameName={item.Name.en}
                        imgPath={item.ImageFullPath}
                        toFavorite={that.toFavorite} />
                })
            } else if (this.state.categoryId === 'm') {
                games = _.map(this.state.items.merchants, function (value, key) {
                    return <Merchants merch={value} />
                })
            }
            else { games = <h1>Nothing...</h1> }
            return (
                <div>
                    <GamesPerPage
                        changeGamesPerPage={this.changeGamesOnPage.bind(this)}
                        active={this.state.activePerPage}
                    />
                    <Sort
                        sorted={this.sortBy.bind(this)}
                        changeReverse={this.changeReverse.bind(this)}
                        reverse={this.state.reverse}
                        sortBy={this.state.sortBy}
                    />
                    <div className='categories'>
                        {this.state.getCategories().map(function (item) {
                            return <Category
                                key={'cat' + item.ID}
                                name={item.Name.en}
                                id={item.ID}
                                data-index={item.Name.en}
                                active={that.state.activeCategory}
                                categoryChange={that.categoryChange} />
                        })}
                    </div>
                    <div className='stats'>
                        {(this.state.categoryId !='m')?<div>Games in category: {this.state.gamesInCategory().length}</div>:null}
                        <div>You have {this.state.favoriteBase.length} favorite games</div>
                    </div>
                    <div className='games'>
                        {games}
                    </div>
                    <div className='search-buttons'>
                        {searchButtons}
                    </div>
                </div>
            )
        }
    }
}
export default App