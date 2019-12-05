import React from 'react'
interface Props {
    sorted(e: any): any
    changeReverse(): void
    reverse: boolean
    sortBy: string
}
class Sort extends React.Component<Props, {}> {
    sortBy(event: any) {
        this.props.sorted(event)
    }
    changeReverse() {
        this.props.changeReverse()
    }
    render() {
        return (
            <div className='sort-buttons'>
                <div>sort by: </div>
                <button
                    onClick={this.sortBy.bind(this)}
                    className={this.props.sortBy === 'Name.en' ? 'active-per-btn' : ' '}>Name</button>
                <button
                    onClick={this.sortBy.bind(this)}
                    className={this.props.sortBy === 'ID' ? 'active-per-btn' : ''}>ID</button>
                <div> or </div>
                <button
                    onClick={this.changeReverse.bind(this)}
                    className={(this.props.reverse) ? 'active-per-btn' : ' '}>
                    Reverse
                </button>
            </div>)
    }
}
export default Sort