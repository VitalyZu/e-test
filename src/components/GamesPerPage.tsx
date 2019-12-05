import React from 'react'
interface Props {
    changeGamesPerPage(e: any): any
    active: number
}
class GamesPerPage extends React.Component<Props, {}>{

    changeGamesOnPage(e: any) {
        this.props.changeGamesPerPage(e)
    }
    render() {
        return (
            <div className='games-number'>
                <div>games per page: </div>
                <button
                    onClick={this.changeGamesOnPage.bind(this)}
                    data-index={40}
                    className={40 === this.props.active ? 'active-per-btn' : 'per-btn'}>
                    40
                        </button>
                <button
                    onClick={this.changeGamesOnPage.bind(this)}
                    data-index={80}
                    className={80 === this.props.active ? 'active-per-btn' : 'per-btn'}>
                    80
                        </button>
                <button
                    onClick={this.changeGamesOnPage.bind(this)}
                    data-index={120}
                    className={120 === this.props.active ? 'active-per-btn' : 'per-btn'}>
                    120
                        </button>
            </div>
        )
    }
}
export default GamesPerPage