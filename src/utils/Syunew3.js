
const SoftKey3W = function () {
    let u = document.URL;
    let url;
    if (u.substring(0, 5) === 'https') {
        url = 'wss://localhost:4006/xxx';
    } else {
        url = 'ws://127.0.0.1:4006/xxx';
    }

    // let SocketUK;

    if (typeof MozWebSocket !== 'undefined') {
        // SocketUK = new MozWebSocket(url, 'usbkey-protocol');
    } else {
        this.SocketUK = new WebSocket(url, 'usbkey-protocol');
    }
    this.on = function (event, callback) {
        if (event === 'open') {
            this.SocketUK.onopen = callback;
        } else if (event === 'error') {
            this.SocketUK.onerror = callback;
        } else if (event === 'close') {
            this.SocketUK.onclose = callback;
        } else if (event === 'message') {
            this.SocketUK.onmessage = callback;
        }
    }
    this.FindPort = function (start) {
        let msg = {
            FunName: 'FindPort',
            start: start
        };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.GetBuf = function (pos) {
        var msg =
            {
                FunName: 'GetBuf',
                pos: pos
            };
        this.SocketUK.send(JSON.stringify(msg));
    };

    this.YRead = function (Address, HKey, LKey, Path) {
        var msg =
            {
                FunName: 'YRead',
                Address: Address,
                HKey: HKey,
                LKey: LKey,
                Path: Path
            };
        this.SocketUK.send(JSON.stringify(msg));
    };

    this.YReadEx = function (Address, len, HKey, LKey, Path) {
        var msg =
            {
                FunName: 'YReadEx',
                Address: Address,
                len: len,
                HKey: HKey,
                LKey: LKey,
                Path: Path
            };
        this.SocketUK.send(JSON.stringify(msg));
    };

    this.YReadString = function (Address, len, HKey, LKey, Path) {
        var msg =
            {
                FunName: 'YReadString',
                Address: Address,
                len: len,
                HKey: HKey,
                LKey: LKey,
                Path: Path
            };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.ResetOrder = function () {
        let msg = {
            FunName: 'ResetOrder'
        };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.GetID1 = function (Path) {
        let msg = {
            FunName: 'GetID_1',
            Path: Path
        };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.MacAddr = function () {
        var msg = {
            FunName: 'MacAddr'
        };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.SetBuf = function (InData, pos) {
        var msg =
            {
                FunName: 'SetBuf',
                InData: InData,
                pos: pos
            };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.YWriteEx = function (Address, len, HKey, LKey, Path) {
        var msg =
            {
                FunName: 'YWriteEx',
                Address: Address,
                len: len,
                HKey: HKey,
                LKey: LKey,
                Path: Path
            };
        this.SocketUK.send(JSON.stringify(msg));
    };

    this.YWriteString = function (InString, Address, HKey, LKey, Path) {
        var msg =
            {
                FunName: 'YWriteString',
                InString: InString,
                Address: Address,
                HKey: HKey,
                LKey: LKey,
                Path: Path
            };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.SetWritePassword = function (WHkey, WLkey, newHkey, newLkey, Path) {
        var msg =
            {
                FunName: 'SetWritePassword',
                WHkey: WHkey,
                WLkey: WLkey,
                newHkey: newHkey,
                newLkey: newLkey,
                Path: Path
            };
        this.SocketUK.send(JSON.stringify(msg));
    };
    this.SetReadPassword = function (WHkey, WLkey, newHkey, newLkey, Path) {
        var msg =
            {
                FunName: 'SetReadPassword',
                WHkey: WHkey,
                WLkey: WLkey,
                newHkey: newHkey,
                newLkey: newLkey,
                Path: Path
            };
        this.SocketUK.send(JSON.stringify(msg));
    };
    // this.FindPort_2 = function (start, inData, verfData) {
    //     let msg = {
    //         FunName: 'FindPort_2',
    //         start: start,
    //         in_data: inData,
    //         verf_data: verfData
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.FindPort_3 = function (start, inData, verfData) {
    //     let msg = {
    //         FunName: 'FindPort_3',
    //         start: start,
    //         in_data: inData,
    //         verf_data: verfData
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.GetID_2 = function (Path) {
    //     let msg =
    //         {
    //             FunName: 'GetID_2',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };

    // this.GetVersion = function (Path) {
    //     let msg = {
    //         FunName: 'GetVersion',
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.GetVersionEx = function (Path) {
    //     let msg = {
    //         FunName: 'GetVersionEx',
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };

    // this.sRead = function (Path) {
    //     let msg = {
    //         FunName: 'sRead',
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.sWrite = function (InData, Path) {
    //     let msg = {
    //         FunName: 'sWrite',
    //         InData: InData,
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.sWrite_2 = function (InData, Path) {
    //     let msg = {
    //         FunName: 'sWrite_2',
    //         InData: InData,
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.sWrite_2Ex = function (InData, Path) {
    //     let msg = {
    //         FunName: 'sWrite_2Ex',
    //         InData: InData,
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.sWriteEx = function (InData, Path) {
    //     let msg =
    //         {
    //             FunName: 'sWriteEx',
    //             InData: InData,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.sWriteEx_New = function (InData, Path) {
    //     let msg = {
    //         FunName: 'sWriteEx_New',
    //         InData: InData,
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.sWrite_2Ex_New = function (InData, Path) {
    //     let msg = {
    //         FunName: 'sWrite_2Ex_New',
    //         InData: InData,
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.SetCal = function (Hkey, Lkey, new_Hkey, new_Lkey, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'SetCal',
    //             Hkey:   Hkey,
    //             Lkey:   Lkey,
    //             new_Hkey:new_Hkey,
    //             new_Lkey:new_Lkey,
    //             Path: Path
    //
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.YWrite = function (InData, Address, HKey, LKey, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'YWrite',
    //             InData: InData,
    //             Address: Address,
    //             HKey: HKey,
    //             LKey: LKey,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.DecString = function (InString,Key)
    // {
    //     var msg =
    //         {
    //             FunName: 'DecString',
    //             InString:InString,
    //             Key:Key
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.EncString = function (InString, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'EncString',
    //             InString:InString,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.EncString_New = function (InString, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'EncString_New',
    //             InString: InString,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.Cal = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'Cal',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.Cal_New = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'Cal_New',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.SetCal_2 = function( Key, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'SetCal_2',
    //             Key:Key,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.SetCal_New = function (Key, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'SetCal_New',
    //             Key:Key,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.SetEncBuf = function (InData,pos)
    // {
    //     var msg =
    //         {
    //             FunName: 'SetEncBuf',
    //             InData:InData,
    //             pos: pos
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GetEncBuf = function (pos)
    // {
    //     var msg =
    //         {
    //             FunName: 'GetEncBuf',
    //             pos: pos
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    // this.ReSet = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'ReSet',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.SetID = function (Seed, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'SetID',
    //             Seed:Seed,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GetProduceDate = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'GetProduceDate',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    //
    //
    //
    // this.GetChipID = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'GetChipID',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.StarGenKeyPair = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'StarGenKeyPair',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GenPubKeyY = function ()
    // {
    //     var msg =
    //         {
    //             FunName: 'GenPubKeyY'
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GenPubKeyX = function ()
    // {
    //     var msg =
    //         {
    //             FunName: 'GenPubKeyX'
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GenPriKey = function ()
    // {
    //     var msg =
    //         {
    //             FunName: 'GenPriKey'
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GetPubKeyY = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'GetPubKeyY',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GetPubKeyX = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'GetPubKeyX',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.GetSm2UserName = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'GetSm2UserName',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.Set_SM2_KeyPair = function (PriKey,PubKeyX,PubKeyY,sm2UserName,Path )
    // {
    //     var msg =
    //         {
    //             FunName: 'Set_SM2_KeyPair',
    //             PriKey:PriKey,
    //             PubKeyX:PubKeyX,
    //             PubKeyY:PubKeyY,
    //             sm2UserName:sm2UserName,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this. YtSign = function (SignMsg, Pin, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'YtSign',
    //             SignMsg: SignMsg,
    //             Pin: Pin,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.YtSign_2 = function (SignMsg, Pin, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'YtSign_2',
    //             SignMsg: SignMsg,
    //             Pin: Pin,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.YtVerfiy = function(id, SignMsg, PubKeyX, PubKeyY, VerfiySign, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'YtVerfiy',
    //             id:id,
    //             SignMsg: SignMsg,
    //             PubKeyX: PubKeyX,
    //             PubKeyY: PubKeyY,
    //             VerfiySign :VerfiySign,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.SM2_DecString = function (InString, Pin, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'SM2_DecString',
    //             InString: InString,
    //             Pin: Pin,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.SM2_EncString = function (InString, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'SM2_EncString',
    //             InString: InString,
    //             Path :Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.YtSetPin = function (OldPin, NewPin, Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'YtSetPin',
    //             OldPin: OldPin,
    //             NewPin: NewPin,
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.FindU = function (start)
    // {
    //     var msg =
    //         {
    //             FunName: 'FindU',
    //             start: start
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.FindU_2 = function (start, inData, verfData)
    // {
    //     var msg =
    //         {
    //             FunName: 'FindU_2',
    //             start: start,
    //             in_data: inData,
    //             verf_data: verfData
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    //
    // this.FindU_3 = function (start, inData, verfData)
    // {
    //     var msg =
    //         {
    //             FunName: 'FindU_3',
    //             start: start,
    //             in_data: inData,
    //             verf_data: verfData
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    // this.IsUReadOnl = function (Path)
    // {
    //     var msg =
    //         {
    //             FunName: 'IsUReadOnly',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    // this.SetUReadOnly = function (Path)
    // {
    //     let msg =
    //         {
    //             FunName: 'SetUReadOnly',
    //             Path: Path
    //         };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    // this.SetHidOnly = function( IsHidOnly,Path) {
    //     let msg = {
    //         FunName: 'SetHidOnly',
    //         IsHidOnly: IsHidOnly,
    //         Path: Path
    //     };
    //     this.Socket_UK.send(JSON.stringify(msg));
    // };
    this.ContinueOrder = function () {
        let msg = {
            FunName: 'ContinueOrder'
        };
        this.SocketUK.send(JSON.stringify(msg));
    }
    this.disconnect = function () {
        if (this.SocketUK) {
            this.SocketUK.close();
        }
    }
}

export default SoftKey3W;
