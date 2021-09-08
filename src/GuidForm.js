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
import { BinData, JUUID, UUID, PYUUID, CSUUID } from './BinData';

export class GuidForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: new BinData(),
            base64: new BinData(),
            hex: new BinData(),
            csuuid: new BinData(),
            juuid: new BinData(),
            pyuuid: new BinData()
        };

        this.handleUUID = this.handleUUID.bind(this);
        this.handleBase64 = this.handleBase64.bind(this);
        this.handleHex = this.handleHex.bind(this);
        this.handleCSUUID = this.handleCSUUID.bind(this);
        this.handleJUUID = this.handleJUUID.bind(this);
        this.handlePYUUID = this.handlePYUUID.bind(this);
    }

    handleUUID(event) {
        const value = event.target.value.trim();
        const binData = UUID(value);
        if (binData.readableValue.length > 31) {
            const base64Data = new BinData(4, binData.base64Value, binData.base64Value);
            const hexData = new BinData(4, binData.base64Value, binData.toHexUUID());
            const csuuidData = new BinData(3, binData.base64Value, binData.toCSUUID())
            const juuidData = new BinData(3, binData.base64Value, binData.toJUUID())
            const pyuuidData = new BinData(3, binData.base64Value, binData.toPYUUID())
            this.setState({
                base64: base64Data,
                uuid: binData,
                hex: hexData,
                csuuid: csuuidData,
                juuid: juuidData,
                pyuuid: pyuuidData
            });
        } else {
            this.setState({
                uuid: binData
            });
        }
    }

    handleBase64(event) {
        const value = event.target.value.trim();
        const binData = new BinData(4, value, value);
        try {
            atob(value);
        } catch (error) {
            this.setState({
                base64: binData
            });
            return;
        }
        const uuidData = new BinData(4, value, binData.toUUID());
        const hexData = new BinData(4, binData.base64Value, binData.toHexUUID());
        const csuuidData = new BinData(3, binData.base64Value, binData.toCSUUID())
        const juuidData = new BinData(3, binData.base64Value, binData.toJUUID())
        const pyuuidData = new BinData(3, binData.base64Value, binData.toPYUUID())
        this.setState({
            uuid: uuidData,
            base64: binData,
            hex: hexData,
            csuuid: csuuidData,
            juuid: juuidData,
            pyuuid: pyuuidData
        });
    }

    handleHex(event) {
        const hex = event.target.value.trim();
        const base64 = HexToBase64(hex);
        const binData = new BinData(4, base64, hex);
        const uuidData = new BinData(4, binData.base64Value, binData.toUUID());
        const base64Data = new BinData(4, binData.base64Value, binData.base64Value);
        const csuuidData = new BinData(3, binData.base64Value, binData.toCSUUID())
        const juuidData = new BinData(3, binData.base64Value, binData.toJUUID())
        const pyuuidData = new BinData(3, binData.base64Value, binData.toPYUUID())
        if (hex.length > 10) {
            this.setState({
                uuid: uuidData,
                base64: base64Data,
                hex: binData,
                csuuid: csuuidData,
                juuid: juuidData,
                pyuuid: pyuuidData
            });
        } else {
            this.setState({
                hex: binData
            });
        }
    }

    handleCSUUID(event) {
        const value = event.target.value.trim();
        const binData = CSUUID(value);
        if (binData.readableValue.length > 31) {
            const uuidData = new BinData(4, binData.base64Value, binData.toUUID())
            const base64Data = new BinData(4, binData.base64Value, binData.base64Value);
            const hexData = new BinData(4, binData.base64Value, binData.toHexUUID());
            const juuidData = new BinData(3, binData.base64Value, binData.toJUUID())
            const pyuuidData = new BinData(3, binData.base64Value, binData.toPYUUID())
            this.setState({
                uuid: uuidData,
                base64: base64Data,
                hex: hexData,
                csuuid: binData,
                juuid: juuidData,
                pyuuid: pyuuidData
            });
        } else {
            this.setState({
                csuuid: binData
            });
        }
    }

    handleJUUID(event) {
        const value = event.target.value.trim();
        const binData = JUUID(value);
        if (binData.readableValue.length > 31) {
            const uuidData = new BinData(4, binData.base64Value, binData.toUUID());
            const base64Data = new BinData(4, binData.base64Value, binData.base64Value);
            const hexData = new BinData(4, binData.base64Value, binData.toHexUUID());
            const csuuid = new BinData(3, binData.base64Value, binData.toCSUUID());
            const pyuuidData = new BinData(3, binData.base64Value, binData.toPYUUID());
            this.setState({
                uuid: uuidData,
                base64: base64Data,
                hex: hexData,
                csuuid: csuuid,
                juuid: binData,
                pyuuid: pyuuidData
            });
        } else {
            this.setState({
                juuid: binData
            });
        }
    }

    handlePYUUID(event) {
        const value = event.target.value.trim();
        const binData = PYUUID(value);
        if (binData.readableValue.length > 31) {
            const uuidData = new BinData(4, binData.base64Value, binData.toUUID());
            const base64Data = new BinData(4, binData.base64Value, binData.base64Value);
            const hexData = new BinData(4, binData.base64Value, binData.toHexUUID());
            const csuuid = new BinData(3, binData.base64Value, binData.toCSUUID());
            const juuidData = new BinData(3, binData.base64Value, binData.toJUUID());
            this.setState({
                uuid: uuidData,
                base64: base64Data,
                hex: hexData,
                csuuid: csuuid,
                juuid: juuidData,
                pyuuid: binData
            });
        } else {
            this.setState({
                pyuuid: binData
            });
        }

    }

    render() {
        return (
            <form>
                <table>
                    <tr>
                        <td>UUID</td>
                        <td><CallbackInput name="UUID" onChange={this.handleUUID} value={this.state.uuid.readableValue || ''} /></td>
                    </tr>
                    <tr>
                        <td>Base64</td>
                        <td><CallbackInput name="Base64" onChange={this.handleBase64} value={this.state.base64.base64Value || ''} /></td>
                    </tr>
                    <tr>
                        <td>CSUUID</td>
                        <td><CallbackInput name="CSUUID" onChange={this.handleCSUUID} value={this.state.csuuid.readableValue || ''} /></td>
                    </tr>
                    <tr>
                        <td>JUUID</td>
                        <td><CallbackInput name="JUUID" onChange={this.handleJUUID} value={this.state.juuid.readableValue || ''} /></td>
                    </tr>
                    <tr>
                        <td>PYUUID</td>
                        <td><CallbackInput name="PUUID" onChange={this.handlePYUUID} value={this.state.pyuuid.readableValue || ''} /></td>
                    </tr>
                    <tr>
                        <td>Hex</td>
                        <td><CallbackInput name="Hex" onChange={this.handleHex} value={this.state.hex.readableValue || ''} /></td>
                    </tr>
                </table>
            </form>
        );
    }
}
