import React from 'react'
import { string } from 'prop-types'
interface Props {
    merch: any
}
class Merchants extends React.Component<Props, {}>{
    render() {
        return (
            <div className='merch'>
                <div><span>ID:</span> {this.props.merch.ID}</div>
                <div><span>Name:</span> {this.props.merch.Name}</div>
                <div><span>Alias:</span> {this.props.merch.Alias}</div>
                <div><span>Image:</span> {this.props.merch.Image}</div>
                <div><span>MenuId:</span> {this.props.merch.menuId}</div>
            </div>
        )
    }
}
export default Merchants