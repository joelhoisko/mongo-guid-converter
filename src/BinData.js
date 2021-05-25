import { HexToBase64, Base64ToHex } from './Converter';

export class BinData {

    constructor(subtype, rawValue, readableValue) {
        this.subtype = subtype;
        this.rawValue = rawValue;
        this.readableValue = readableValue;
    }

    toBase64() {
        return btoa(this.rawValue);
    }

    toUUID() {
        var hex = Base64ToHex(this.toBase64()); // don't use BinData's hex function because it has bugs in older versions of the shell
        var uuid = hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
        return 'UUID("' + uuid + '")';
    }

    toJUUID() {
        var hex = Base64ToHex(this.toBase64()); // don't use BinData's hex function because it has bugs in older versions of the shell
        var msb = hex.substr(0, 16);
        var lsb = hex.substr(16, 16);
        msb = msb.substr(14, 2) + msb.substr(12, 2) + msb.substr(10, 2) + msb.substr(8, 2) + msb.substr(6, 2) + msb.substr(4, 2) + msb.substr(2, 2) + msb.substr(0, 2);
        lsb = lsb.substr(14, 2) + lsb.substr(12, 2) + lsb.substr(10, 2) + lsb.substr(8, 2) + lsb.substr(6, 2) + lsb.substr(4, 2) + lsb.substr(2, 2) + lsb.substr(0, 2);
        hex = msb + lsb;
        var uuid = hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
        return 'JUUID("' + uuid + '")';
    }

    toCSUUID() {
        var hex = Base64ToHex(this.toBase64()); // don't use BinData's hex function because it has bugs in older versions of the shell
        var a = hex.substr(6, 2) + hex.substr(4, 2) + hex.substr(2, 2) + hex.substr(0, 2);
        var b = hex.substr(10, 2) + hex.substr(8, 2);
        var c = hex.substr(14, 2) + hex.substr(12, 2);
        var d = hex.substr(16, 16);
        hex = a + b + c + d;
        var uuid = hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
        return 'CSUUID("' + uuid + '")';
    }

    toPYUUID() {
        var hex = Base64ToHex(this.toBase64()); // don't use BinData's hex function because it has bugs
        var uuid = hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
        return 'PYUUID("' + uuid + '")';
    }

    toHexUUID() {
        var hex = Base64ToHex(this.toBase64()); // don't use BinData's hex function because it has bugs
        var uuid = hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
        return 'HexData(' + this.subtype + ', "' + uuid + '")';
    }
}

export function UUID(uuid) {
    var hex = uuid.replace(/[{}-]/g, ""); // remove extra characters
    var base64 = HexToBase64(hex);
    return new BinData(4, base64, uuid); // new subtype 4
}

export function JUUID(uuid) {
    var hex = uuid.replace(/[{}-]/g, ""); // remove extra characters
    var msb = hex.substr(0, 16);
    var lsb = hex.substr(16, 16);
    msb = msb.substr(14, 2) + msb.substr(12, 2) + msb.substr(10, 2) + msb.substr(8, 2) + msb.substr(6, 2) + msb.substr(4, 2) + msb.substr(2, 2) + msb.substr(0, 2);
    lsb = lsb.substr(14, 2) + lsb.substr(12, 2) + lsb.substr(10, 2) + lsb.substr(8, 2) + lsb.substr(6, 2) + lsb.substr(4, 2) + lsb.substr(2, 2) + lsb.substr(0, 2);
    hex = msb + lsb;
    var base64 = HexToBase64(hex);
    return new BinData(3, base64, uuid);
}

export function CSUUID(uuid) {
    var hex = uuid.replace(/[{}-]/g, ""); // remove extra characters
    var a = hex.substr(6, 2) + hex.substr(4, 2) + hex.substr(2, 2) + hex.substr(0, 2);
    var b = hex.substr(10, 2) + hex.substr(8, 2);
    var c = hex.substr(14, 2) + hex.substr(12, 2);
    var d = hex.substr(16, 16);
    hex = a + b + c + d;
    var base64 = HexToBase64(hex);
    return new BinData(3, base64, uuid);
}

export function PYUUID(uuid) {
    var hex = uuid.replace(/[{}-]/g, ""); // remove extra characters
    var base64 = HexToBase64(hex);
    return new BinData(3, base64, uuid);
}

export function TestUUIDHelperfunctions() {
    var s = "{00112233-4455-6677-8899-aabbccddeeff}";
    var uuid = UUID(s);
    var juuid = JUUID(s);
    var csuuid = CSUUID(s);
    var pyuuid = PYUUID(s);
    console.log(uuid.toUUID());
    console.log(juuid.toJUUID());
    console.log(csuuid.toCSUUID());
    console.log(pyuuid.toPYUUID());
    console.log(uuid.toHexUUID());
    console.log(juuid.toHexUUID());
    console.log(csuuid.toHexUUID());
    console.log(pyuuid.toHexUUID());
}
