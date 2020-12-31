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
    echarts.registerMap('xining', {
        'type': 'FeatureCollection',
        'features': [{
            'id': '630100',
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': ["@@PBHANKJMDCTJHBJALC^CF@PDD@FIFCLAJEpMJBHFDD@JBBJDL@DIRIAE@AVE@CCMDEbA`BJ@TSBCBK@A`IFEFERINEJCP@TCJCTMLYLETIPCGMCWA@SHE@KEIOBaDMLY@MOoAQACC@QBAACEEEWK@ADEAGGGOIACGMBOIIIMAGDENGJOJGBG@GMMAA@KIKBKM@GAWMDC@ACEAIECKE@ELU@CGK@WCQ@WIMBK@GFCBE@UAEKKAEKEAEFIJEDE@EESDG@CKGAC@MEI@EBSAEGKKKBIDCLABAACGGHIDMACIIEO@ICEGKDIHGRMB@HHFHDDD@DADG@CECCSDEDANHLBHAPADCHIDAHAJHFBD@DC@CGU@ABEDCFATCJELKHCDMBAJADCn}FM@KCC@I@CCEKIMIKIQ@TS@ACI@EJSDMACCCOKOSUOBEDIAMIEGBMKEKCg@O@WDCFMRW@CWmIMMOWaBQCOEIMG@C@AFCBEECG@w@MASEUHUNKDEC@C@CCIAGBKCCGAaBBMAEIQCIEIsYKKEAG@MJEHKRKNCJ@PABCBG@ILGBGHCDOBYC@PDZA\\BF@DGFkLE@OGIAmBiPMBKDI@YJOLiHMDUPKJAF@HkDQBmRCD@FCDEDGAMESQO]McCAYCGAOIUEACBKEOCAMASAAAAIIKE@EHGBG@EAOFGCCRGDAB[BOFCBAJcPGFGPCFDH@DINCJEDmJ]HIDIHOPKTEJOTAFDDBJAHCD[BSNKDEP@DJJMNCLBL@HKLMHEJEDI@KHEJWDCBEDGDEBAJCBKFCD@BBHJJIF@JIJCRQJADJVEBCB@DDH@FHN@FSn@FBD@DOFCFAJADWTWLCDGPGVARRN@DUTENSJCDGPOLADBNBHHCBBADBLERBNEPUX@FEJ@FBDDD`HFBJLXJVBLHNFD@JKPCPG^WLELARUVBPDFFRFTN^BPDFDVXPLJLfTFD@D@DVTRHVFFFFPVbNFJDbHFFPPVRDADEPAJEF@JBDAJABAP@HCBIHAF@HFH@DB@FFL@HAFBDFH@DIJG^@NCJGDEHDVNPBTBJAHU`GLCJ@JCHCD@NGH@FJDDHCJIHMDIJSHINDFCDCDOJDJKTCBI@WAQDKDQPMDCDKRERKFCDAVGdSVILELAPEH§hMDIAUOGCI@eREFBHQHQPGD[@QEGDCFEDG@CAISEAIBGFADMDILIBAFEDANADADFJADGHUL@BB^EJGRKBEDCF@DBD@HCHEDYRUHCBADNLBH@NBFFDBDAF@PBFHDGH@DAdINLNJHHDR@FAHIFBJFFBANNLFHVHFD@JJHFHNBNKXA@AGACCCCCI@EHCVEJQLKJCTD\\SBC@EDC]F@THJAJGHCAGBGHENAlDFAHKJCH@XFPH\\MLBFEHAND`@^DB@JQFA^FTILAFBJLPFDHJ@PHH@JIXEPMLBLUJIFAV@RKtAXBFDFBV@LARANERBJIJCP@PFLBNAJCNMFBLFL@FAJGVIHCV@HCBA@QG[@EVSBEAECE@AFAZ@HBNHF@FODAZGTGJA"],
                'encodeOffsets': [[104041,38159]]
            },
            'properties': {
                'cp': [101.778916,36.623178],
                'name': '西宁市',
                'childNum': 1
            }
        }],
        'UTF8Encoding': true
    });
}));
