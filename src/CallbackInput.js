import React from 'react';

export class CallbackInput extends React.Component {

    render() {
        return (
            <div>
                <label>
                    {this.props.name}:
                <input type="text" value={this.props.value} onChange={this.props.onChange} />
                </label>
                <p>
                    <code>
                        {this.props.codeValue()}
                    </code>
                </p>
            </div>
        );
    }
}
