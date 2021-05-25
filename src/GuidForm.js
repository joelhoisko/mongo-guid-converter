// function GuidForms2({ props }) {
//     const [hex, setHex] = useState("");
//     const [base64, setBase64] = useState("");
//     const [csuuid, setCsuuid] = useState("");

//     function handleHex(evt) {
//         // ...
//         setHex(value);
//         setBase64(value);
//     }

//     function handleHex(evt) {
//         // ...
//         setHex(value);
//         setBase64(value);
//     }

//     function handleHex(evt) {
//         // ...
//         setHex(value);
//         setBase64(value);
//     }

//     return <form>
//         <input onChange={handleHex} value={hex} />
//         <input onChange={handleHex} value={hex} />
//         <input onChange={handleHex} value={hex} />
//     </form>
// }

// <GuidForm2 />

import React from 'react';
import { HexToBase64, Base64ToHex } from './Converter'
import { CallbackInput } from './CallbackInput';
import { BinData, JUUID, UUID, PYUUID } from './BinData';

export class GuidForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64: new BinData(),
            hex: new BinData(),
            uuid: new BinData(),
            csuuid: new BinData(),
            juuid: new BinData(),
            puuid: new BinData()
        };

        this.handleBase64 = this.handleBase64.bind(this);
        this.handleHex = this.handleHex.bind(this);
        this.handleUUID = this.handleUUID.bind(this);
        this.handleCSUUID = this.handleCSUUID.bind(this);
        this.handleJUUID = this.handleJUUID.bind(this);
        this.handlePUUID = this.handlePUUID.bind(this);
    }


    handleBase64(event) {
        const value = event.target.value;
        this.setState({
            base64: value,
            hex: Base64ToHex(value)
        });
    }

    handleHex(event) {
        const value = event.target.value;
        if (value.length > 10) {
            this.setState({
                hex: value,
                base64: HexToBase64(value)
            });
        } else {
            this.setState({
                hex: event.target.value
            });
        }
        console.log(JSON.stringify(this.state));
    }

    handleUUID(event) {
        const value = event.target.value;
        if (value.length > 31) {
            this.setAll(value);
        } else {
            this.setState({
                uuid: UUID(value)
            });
        }
    }

    handleCSUUID(event) {
        const value = event.target.value;
        if (value.length > 32) {
            this.setState({
                csuuid: value,
                // base64: csuuidToBase64(value)
            });
        } else {
            this.setState({
                csuuid: event.target.value
            });
        }
        console.log(JSON.stringify(this.state));
    }

    handleJUUID(event) {

    }

    handlePUUID(event) {

    }

    setAll(uuid) {
        this.setState({
            uuid: UUID(uuid),
            hex: UUID(uuid),
            base64: UUID(uuid),
            juuid: JUUID(uuid),
            puuid: PYUUID(uuid)
        });
    }

    render() {
        return (
            <form>
                <CallbackInput name="UUID" onChange={this.handleUUID} value={this.state.uuid.readableValue} codeValue={this.state.uuid.toUUID.bind(this.state.uuid)} />
                <CallbackInput name="Base64" onChange={this.handleBase64} value={this.state.base64.readableValue} />
                <CallbackInput name="Hex" onChange={this.handleHex} value={this.state.hex.readableValue} />
                <CallbackInput name="CSUUID" onChange={this.handleCSUUID} value={this.state.csuuid.readableValue} />
                <CallbackInput name="JUUID" onChange={this.handleJUUID} value={this.state.juuid.readableValue} />
                <CallbackInput name="PUUID" onChange={this.handlePUUID} value={this.state.puuid.readableValue} />
            </form>
        );
    }
}
