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
    echarts.registerMap('xiangtan', {
        'type': 'FeatureCollection',
        'features': [{
            'id': '430300',
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': ['@@FBNAHBBCDABBDFBBHBD@FDDBBCAGD@FJRADBFBFLDADAJDFEpQDCFSFEP@PDPDFJPTBBJABC@EBCJDP@FDBHNF@DGH@DDHPLDBHC@NBBJCHABRLLHP@JJJDCAIDC@CLAFGDAFBJPDBBDCHBBDBHEDIBC`DLCH@DCL@VVDDABAFQDCFATJJBFAHIDAF@H@NH@FBBdJFEPBDGH@DENDLFBADCD@CJBDB@DCBKBB@JBFAF@JFPBJG@EHSBAHBDB@NAD@BDBJHLBBGNBNEFHRJJB@FC@BBJ@BRHN@LFNAHGDADBRNJBH@DCNcVMNMZO@AIAEKBOFSF@JBV@FCF[FGL@JCHAHDFLDBDCDOPG@KDCJAH@F@TKBIIQ@GBGHI@IFEFBDABOHCBAEE@EBARALGJKFQDC^BDFBVHH@DEHAJCTABCEC@IH@DFLLLDJFFL@HIDANCLGPEBCIEACF@bDHBNMFAL@TBDD@BGF@BDJBBDAJ@FDBDDNAP^fBJADDJ@HHLDJ@JCLFDDDBVTJBBADOL@JBBH@LEJBFE@MDAJBNBHNBHQPKHIDG@EFKPBHBH@FBBFBXEPAJ@FAFBFDFA@CEK@ELOHOLGBABECQBELGJ@LDFGHSHIBOCQDAJ@HBFFDFBHCBEBCBBBFBBDD@LEDEBCECACLBFDH@@GAEQSBEDCF@DFFDJ@FCFKD@PNLADCNDBFEBABDDNBBDB@BIDBBD@DAFCFE@KAABJLDFBNENLHB@LGFGHOHIJED@TOfWJGNMJFHHNBFBFH@BEH@DB@FBJEEE@CDCDAD@DB@HGNCNPPDHDBvHHBFALONKDIDCACGISMEIBCLA@CDCFALD@EGUIKEBUOGQCMCYOUIQC]KKCE@CBEFA@KHSOEIG]UMKQUCG@IBGRIHDF@JIP]FKBOCMEGCGBGFCZGRKFGFA@AEQKMKBMAW@_qCCMEKIACAONQ@IBAF@\\PL@FCDADEBEGACACKNKNKDEBG@ECAWEIKE@MHKLGAGCAEBI@KDAHAFCBC@CACICGOKCIMEAG@QOAMDMDKBMAaK]FKHGL@LE@AEQOIEEAGCEHCACDCFAFBHDBABCAUBKBGDAD@DCBE@EODSAmQ_GQEKIEEAKFk@UBUCGEKiHcIY@IIA@[HKAOBEAEKAEFK@AU@C@EJABECGEEAIHADJDBFCZOFKEIJGLOHBNCPGHMHCJC@GGEAE@ODIBCCEGGAABGJMFQHOAGBOCC@AL@BKH@BADDNAFPLBDJ^AFM@QAAFC@G@GGGAGFIHCFBBEDC@A@GGCAEHG@CFQ@EDA@CCGOGEMAMDAAAADKKEAG@ICCECIBA@INIB]UDKE@E@CCGIGCCBAJGDALQAQLILOJUJQDOLEHE^M\\GDADIACAGAEHGAEFIBABJHCJBJDBDEBBKVIFMDE@MEI@DGACCGEAAEA@DEBECCM@CC@CDC@GIEI@CAACEAI@CCEGE@MFCBBFADCCEBGACRCBIGKDMMC@ADFFBBIDEAMGE@CBCB@HAHADE@@@@FDF@NBD@HDFAHFLLFDH@FTXJPDLDXETBNCJEDOHkXONMLCJ@JDDJDlDHDBF@VJLBJCJELMJINQNIBUGKAK@IHGAEBGBGJG@ACAMCK@ICEEBGAAC@CAIQQE@CLCCOI@ABCCSBG@AMDYEUAABBDADEBEBEFABGECMACC@GDCFAJEJEFG@C@GI@ADEACWUG@GBADALA@GCEDC@QOGG[HAHEHCDIDHR@FCDIAAD@LE@CDAAACGAAFA@AA@GA@ABBDAH@JBDJH@BGD@BBJABG@ABBHPPfLNAFADEJ@HB@DABODCBBHFF@F@BNDN@DCBA@KAG@CDEF@DFBFD`HF\\HDB@BILODEFCHMDOBAFDTHLHNETENIHGFI@UOMCE@UPIDIFKfC^EDECCUAEEAGDIJEJCNA\\DFAJAFQdAHCFAJ'],
                'encodeOffsets': [[114688, 28578]]
            },
            'properties': {
                'cp': [112.944052, 27.82973],
                'name': '湘潭市',
                'childNum': 1
            }
        }],
        'UTF8Encoding': true
    });
}));