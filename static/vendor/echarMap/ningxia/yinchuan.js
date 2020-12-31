(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }
    echarts.registerMap('yinchuan', { 
        'type': 'FeatureCollection', 
        'features': [{ 
            'id': '640100', 
            'type': 'Feature', 
            'geometry': { 
                'type': 'Polygon', 
                'coordinates': ['@@@CFGUKGQCMBSH[¯JSEGmUQBLYgSeHECWBUJgBGV[DAPHHBrDDAG]DG@[FBCV[VPGA[GYMYWu{sUoOWECCE_FgFDMAk¹FÅ`KY}WkMEGCJOTGJSLONW^OJja^[\\EFcTUJaDaZYLS^GJaRg^BLM@CDKAIBSBUH@H@BUJCHGF@DGLBDFB@BIFFFBDI@BFE@@BJTCD@BJBADHBzB\\FD@FCTBBBXVHRID@xIBaBA`EBw@MLADBFJDTV@B]TIP@FABQJUKA@M`GDCD@BH@BDADIB@JEFDD@DQLKFEDKVCPIJMHSFAFCFBD@HHXHHTJFH@LS^CJBHiHABGHSFDPCBKCOBIDMJIDOAEAAAMOGIGBArED]JFF@DAD[FAAEGC@WDADJJADGH@DNDADMD@DNFBDADIAAAWUICCCCKAEWUEAkRMBEHAG@GGOsLEGW}s`HRVj^xBDEJ`aJEFGJGDGLJLXFTHNBDQZ]\\K`GJIHAPIJCLBFFLV^@DGXENBVDNGJBFJHT@PL@DINCPKNCRJJ@NPPAJENBLXPJJBV@TCPIT@PFNBBVFBBDHBHADKHABAJCJOLARELAH@NDHJLNJJFFDBFCNBFFFNJV\\BBAJQ\\@FBDTLHJJDBBDL@JCNCFCDADFRFHBDKJGHAL@HDBVDFFPFLLR@BBAHBDLNDFFHVPNFFHDLTFXRHLDLLHBHN@jKZ@NAFAXUJ@PITIRI\\C^ADCBMDILGFEDANCxAJALEV@BKLCJ@`PPFJIHQBCH@VDFAZMJGLABOH@LBPLZBBAEI@CBGHGJAVBHHXENEfDRFBGKSAKnEAK@iHE^GF@JFNEP@FKMODQBEhNLPZ@NC^OALGLKXEjEr@@[EOKIbChM`GHGAgPKZY[ŅUco]oįÏ@ENOBEZEH@BCVGHCRQ^aRKYv[ZIVAhGPCRIvMfQRAZSVUbQVGKPC'], 
                'encodeOffsets': [[109389, 39080]] 
            }, 
            'properties': { 
                'cp': [106.278179, 38.46637], 
                'name': '银川市', 
                'childNum': 1 
            }
        }], 
        'UTF8Encoding': true 
    });
}));
