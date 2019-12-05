import React from 'react'
interface Props {
    name: string
    id: number
    active: string
    categoryChange(value: number, name: string): void
}
class Category extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)
    }
    handleClick() {
        this.props.categoryChange(this.props.id, this.props.name)
    }
    render() {
        return <button
            onClick={this.handleClick.bind(this)}
            className={this.props.active === this.props.name ? 'active-per-btn' : ''}
        >{this.props.name}</button>
    }
}
export default Category