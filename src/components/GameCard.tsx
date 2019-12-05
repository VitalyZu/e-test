import React from 'react'
interface Props {
    gameName: any[]
    imgPath: string
    id: number
    alt: string
    toFavorite(name: any, id: number): any
}
class GameCard extends React.Component<Props, {}> {
    toFavorite() {
        this.props.toFavorite(this.props.gameName, this.props.id)
    }
    render() {
        let favorite = (JSON.parse(localStorage.favorite)).hasOwnProperty(this.props.gameName)
        return (
            <div className={(favorite) ? 'game-card-fav' : 'game-card'}>
                <div>{this.props.gameName}</div>
                <img alt={this.props.alt} src={this.props.imgPath} />
                <button onClick={this.toFavorite.bind(this)}>{(favorite) ? 'Unfollow' : 'Follow'}</button>
                <button>Start</button>
            </div>)
    }
}
export default GameCard