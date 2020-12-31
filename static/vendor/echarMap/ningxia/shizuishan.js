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
    echarts.registerMap('shizuishan', {
        'type': 'FeatureCollection',
        'features': [{
            'id': '640200',
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': ['@@J{AQWËIO¥ue_]gkEKCCQWEKWYcq{MUěYZOLBhGH_HgNaDLJFP@\\q@iFWFKLKHB]PMDY@KOgMAFCRNPELO@MFIEE@]HGF@jBLmFBLLTAHQEeCMFWFGGUAIBGHAH@DFJABYAOKKAG@APKBIHYNEBUCG@ADGRIJOE_OI@KDALU@KFIBwBQFQRCFANAD{FQJSJOJI@WVEBMBY@iLM@@@GB[CKLOVCNANHNNLZRFBZRRZNN\\NLBPATLDJ@JJTFFLBHNLNDJBLABGHGFEHFHJH@@IFFN@RJZLNDVJLPLHJL^JNFJLR\\bVP\\FNIHMRORERAHAzENGJALFNHZHPHDDBJLTDLCPKVAR@JDfCLAVGVC`BFHJLHJ@ND\\ANDJA^LfH\\FLAVDNBJBPCV@`CPEbCRGBA\\GjGHBJHBF@LJF@LBDDBALFBDFCFR@NPJBFFPFDDBDHDFFDHLNHDJHJRRXDFJHzSPKJCjEV@LBXRpTVCLBTLNDD@DIDELAV@TALIFIP[@CIO@ELQPO@GIW@SH_COUaCM@IJGFKAICK@MLKXKXQHYHa^uLkJQXUVMlMFCDAFAFBHAF@VGFBHIHABEBIDCPBLKDCLB'],
                'encodeOffsets': [[109535, 39993]]
            },
            'properties': {
                'cp': [106.376173, 39.01333],
                'name': '石嘴山市',
                'childNum': 1
            }
        }],
        'UTF8Encoding': true
    });
}));
