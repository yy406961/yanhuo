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
    echarts.registerMap('shaoyang', {
        'type': 'FeatureCollection',
        'features': [{
            'id': '430500',
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': ['@@DCXEL@zLXATCN@XDTBPFR@LEJGH[IQFGXA^VLALAFCZBTCVUDOBOCK@IDENEZBLBP@JKBKHANBNFJ@JEJABBDFDBPG@AEC@CFEHDDHD@DABDBBBCECCGFIDGHCPH@IDEFCNCHEPHNAN@FADCBECQBAjWFDBHHB@NFABB@H@BJAJBHCLRFLbTHBD@`[JMdORADALQ@AA@EHA@A@@CHGHC@FDBFCJ@DBBFJDBDDLABEFBDBBHADBLAHLFDRJVf`^XNPDPGHEHSFEH@PDDLFHJFhNRDHFJABDCBDBDEB@\\JBDHFJXDBJDF@DED@BIAKFIFG`ABI@OFIDDBCCIBGFABEDABADDHABGFCAEBEFBFJFFGBKJ@DD@FATIDB@FBBHBAEHBBDAHD@FOAAG@ACDAJDBCCGIMI@AAACCCAADEF@LDAJDBDABA@GFABC@CCEFAHGHCAGCEGFE@CDA@CADIFGAIDC@CJCFGDBZbFLHBDANOHEDGDCBFAPBBDBPIbYF@F@JDF@FCFOHKFEJAL@`ERANBHACK@GF]DCH@NNJAFEBWDILIHCPEHBBDLVJDPBFELMLCLIdcXSPMBOEGCCAC@EDEJGHCXMVMNGL@JGXGLMRKLGIQDKBIDIHCLHdADIJSNOLGHCTFPEFGDcBS@ODODMASBOJMFC@CF@@ALEBDFADDBA@@@CDAC@ACABCI@CH@ACIC@CFDDABCBACAAAKDMCGBDDIFECBGIGKKGOIc@CFG@CKS@A@EBCNMDI@IIM@EBMHO@GCCMCAC@AHGlKDCDKBMBAJ@BA@CGCCEDEFCDADCAGBEFC@CCOCGIEOFKAMFCAEAIICCAIMCE@@ALA@EHI@M@KIGC@CBC@C@GGCCCAIBCAAKEGECKACGIIC@IBICSABFNJAHAHEBO@C@EKGAGAMJMCEBSEIYEECAEBIAKIGKCAC@IFCFDJ@LAHBFANBNARGRHN@DOPOF@DA@CCCAAHBJEFEBCHEAIEMDKAICC@UPCBEAA@EHI@@DL\\OTIBEA@CDKAEECEFM@EFMBEHKDABEREHE@ICIBIA@DJFABGCI@CAA@CDK@ADGBADKFADA@BEGG@EOMAEECE@EEGACMOECKCBMBC@CAKBAAE@AA@ABEECCADGEOECICEGBEHICELK@AIYGMBGCBG@CACAEDCACCEGGCIAC@OLC@ECE@IDGBEDCJQKCQEQIIGEACHEHGRE@CCO@EDGLS@CGGCGEACIAAMDEACGASGGMAEEAODCCIEIGAADQHCXAHEDABSAQIYBIAICEAKBKHKAE@AJABcBECCIA@EDGJQ@C@AAGMGCG@SJE@QCSEE@KNCBKCKACAAC@I@Gi]OaBMMOAERY@ACKBIBCHCDCEMFOG[AGACKCAE@OHGBA@KCCEAEAIBEGCKACwU@CHGBIDCPCJGHS@GBIBOHEJAFACKFCBEACKGCEC_@EFIEGBGAIMMBMACKEEI@EJqFMB[CKGCACAOACIEK@ABCFELG@A@GKCI@E@KSHUCOBECEEIGQIIIIAAIAAODQBEBADHJ@DKDEDABICA@KLMDAD@JFJ@DGNTHBDBDAFABIFCBGTW^aZ@J@TDRLZBVFPGXKFCAI@GEIAEA@EHGBCAMK_GAaHICO@EAACEMEgFa@OACEI@CHEB]ACAAECASAAGCAEHM@KOaQKAE@CFE@C@AKGOICEAIEIEWGMAOBCLM@AACIGAQCEOMWFIDOP@NGDGJC@KCSASGEGAEHKBO@CEE@[EYACEA]G@AHGFMHEBIAKHIAIQiAIBGAAG@GBBDDFBDKLCFAJC@]AoIiCSOIEIAY@QDu@KAMGOEMAKBED_ZIH@H`bFHAPGRGHIAGAWcMEE@GFEJCJIJaL[FOIQEMCQDSLE\\CFEBI@MIUSGOGIEQQGKG]ECEAIES@IEMBcAKGYSSQ_GGEISUMMKEGAGDEFCLGHG@ECEEKMKGeUU_GIQO]QmmGI@UU]MIEIDIFEAMEECKEIIYGIMkGKGIYKE@CEA@EB@BBDCDCIED@A@ECAG@IDuKOBIFEF@NDPBPFL@NCPGVINMHkVEFCLALCHGHGDK@IGGGQ]IaEISKCBKAODIHKJSJGBE@OUGGEAEFEPGLIFUDIFENDNJNDNBZJR@DFDCB@DJLFH@DJP@FFH@DDDFCBF@DCBK\\@VJXGBWBC@CCUAUBM@GCKIC@SHW`GFQBQIWAOJMTGBLZDTJL\\^EHAFBHLVIJBJADKHAFZdVLDDBJ@PFfHJ@FBHCJEJCPBPMJWFWJEFAL@LBPTnCD]GI@]LCFHTGJUDIFALBJAJCHGBQCGEIKOIKCK@SLKFI@IIE@MDDVJVBDFDRFDHDAANDJFD@D@BEDADHD@HBBPB@B@BCJIAKHGBEFGAC@GBAZDJBJ@DNL@DILINC@EEOLQPOJKNBVFJHBL@HEPDF\\FPHD^LRFVBFBBD@NBHRLHDL@RALCPJDJDFHFJBRDXCDA@EL@JAHEHCDE@EBAHAJB@CCCEA@CFCL@NCD@BFBFNNPNDFJZD@JALBLEFBHFFBBPADGD@BAL@BCBCEC@MFEFGDBLDJDDHB@BCFIJ@BBBRCHDBB@FCN@BLCDDCHGJBLHRCFCBEJAPIP@JDPSFGLCJ@BHLDfP`FHJDJATB^RHJBFAPMRKJMFGJCHHT\\NVAFBDFNhJNPLPFFAHDPAHPDDBD@VENANDPFNRRXLPF^HHFNhGVQLELP^LHXHPH\\TLPHFdFjNJFB@FCB@PLBABCHIFCLBP@HE@GPCFBFFBNT^BLAFGX@FFNFFLDHNPLF@JCHCJIJCXK`MV@PDPJLNF`@VFPJJbTxXTRLNEHXRJFTFH@JQFERWFGJCN@\\FNLFBBH@HGLDFDF@BGPAFDBPFNNBFLJHJHVRPHN@JDBHLJbB`FPV\\\\THHBJ@FIPEJAhGR_LAJDNFHDJ^TAHDLFCJA@BIJBJJDBFFJF@JNLFL@P@XDJDFHBJBBf@@BAD@HDDDDHCBIDC@AKOAG@IB@JFH@DANKX_TOT[NAL@JDJDHLXTdTVHBDBPEHGFCH@JCFBBD@CFJ@NEJD@BSHDDBPAHDJLHNDBF'],
                'encodeOffsets': [[113531, 28320]]
            },
            'properties': {
                'cp': [111.46923, 27.237842],
                'name': '邵阳市',
                'childNum': 1
            }
        }],
        'UTF8Encoding': true
    });
}));