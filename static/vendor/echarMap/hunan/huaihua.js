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
    echarts.registerMap('huaihua', {
        'type': 'FeatureCollection',
        'features': [{
            'id': '431200',
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': [
                    ["@@JDLHFBBA@GEEWGEBCDBDH@"],
                    ["@@GEAG@MACEAUAQE]KGCEOE[OCGFK@GAEIAULMPIROPKFFD@JMJK@CMK@CAICIBYHAD@HBFEHALGJBDI@A@AOAAA@GGCBCFC@A@CECCIBMCBCGQEECACIUCUNCF@JJJ@LETKL@LDPJJLHFRDHADGBIAIBKJEVCHIGSDE^KJ@^HDCSmAO@KBKFEXIXENIAODOFIDIAMGIEe@OAICCUKYcBELGBCAIJIKUAGBEFG[]IKCSKYKISYWUOKaMOSE]IkBUAECCC@MIEIEO@SCQEMEQGOCEIEOC_F]NKHIBQEGEUcESKS@K@EDELIVGJGBEAOBODGBIJMHGFIFMDMAISiEWCCWKUGQCIJIHGBABDVBFABEAaAsKEBQFQIC@G@ICK@@LFBBBOLABBBHJD@JEBB@JBBBDCFIDGFCJED@DDJBJFFJD@H@FHHALBJF@HGTCBD@LFDHPJHDFAD@DLP@DIJ@FAFMDCBGNEBGCEE@ABGCEICM@BR@BOBMLG@MCYBEFAF@dCHKHIDQCMEMKQSKGSEY@_BQCKII[CCSEUBIDEFBFCJOJIRKHOFCVCN_DKDGHARIPFJ@F@LAT@NDATQHCBBCFBDHAJFDBX@HCFBJ@D@DAB@@DDLBHBFJHBR@HABOHEHERGNCGBGCAEDBBEB@AADKGIFALCHKJBFFH@JELIHCPCDDDF@LB@HCFSFKFIPOl@JLNJNFNFFAFFN@NJHJNHFJDOVCHGBEA_UCCBAHGEAC@EC@CF@@CM@KEQD_EGCUME@]BGAKGKEGIKAQ@@HGPWN@BDF@Hg@QNOECBC@OZENERAHBLDFFHZFFDDFBDBPFVPZN`LlFJHJn^XLZBHDHFBHAFMDMAEBCF@LBHldDHAFI\\@HDHNBLFJBFFFFDHATCRCJEHEDEBHHGDKCG@HLBJCFAHFFBRGFEDALGJANAFGHQHGJAF@PCLAFCBGAQQOEOFQJMHMLcvERLFF@DEHCF@NFVDT@NChMNDFBFJJHVHFHENEHBHFBH@DETCNEL@BDBXFLLJLFRPTHLDPBNC|@FADCDYHAHFTFFEHE@C@AAWCCYKACBCBATEVBJCRCNC`SJIJEVIHHHAJBFAHED@DBAFCF@DFFHFP@RGLJLFH@TJBF@JGHKHILGN@HP^BLTXPDxDdK`OZIRIF@FBTXBFZZB@DCBGBATB@@@HBHNBVMD@JDB@BAEG@CHGBOBCBIHI\\Q@CIGAK@ENCCIBALBHEJABCN@D@AJLDTJD@RGLBDCHMJER@NNJ@DOESFGVODECECIOIKD]BQI"],
                    ["@@AKHEDGLGF@RKNALKFAFEIACGBCFFHAJBFEBCH@BAACGC@AD@LDF@BCB@@FBBDAFEH@CCBEGKG@I@QWMCGEDS@CKMAILM@GJIDGIMBGLER@\\IFCFQT[BCEG@AF@BAHOHGBGFCLCROBA@GDKJIDAPFVAJANMDMNGBC@CEIBGTSHCREBA@ACECEBEDGLGDSLMCCSO@EFIGEASIG@QUIGGK@SJ]IECCIBCPQHCFG@GHEAC[OYAKBK@WCGEGGUICA@SEOA@GAQDM@SDKEG@KDC@OEAABKBAJCHOCSBGJSBQBANDFFXNJLFBPBP@HAJEFDDD@FCNBDHBFA@IHILBFHD@HEBBBJDADCBBAHFHB@JEB@BDCF@DBDF@HACK@CDGEC@EVQ@EEIMGAC@CBCHALQHEHKNSCICCG@G@OJIAIFQC@DCFGBKFC@KCGDGDC@SOGMEGCIWM@EK@K@EAEMEQCEQMIMCACBIBIHCBEACECOAAIEIKMOIEWIAG@ICEWMGKQIAIAQGKC@O@OEECCGAE@MCGII[QcQqQGCQCGECKOIIKCC@G@CGEKCEEEITUFKLETA^KL@FCVJHBLEVY@KDG@CccAEDCFAPIDODCLCJILAFCFLF@L@LLF@HCCKDCFAPBFCAIMOCQEI@GAEKKKMMKUW@EPKFGJCAMPBFEYaOW@AT@TGVKJAPBJJF@DAZ[NQCEGAKGCISSMWBGAIBEFCHBFBD@POFGFAFCH@HBJAZ@DDIJ@DB@JED@ET@BJBBBED@DNAJCB@BL@HDJBJ\\Z@DED@DDBJAFBBLLHDA@SBCXATBNKTGXE@AGEGGAE@CcBaAAEE[KK@CDCVGJGFAV@@AIG@CCGCCGOIKOKOSACDODE@G@IAC@ADCRC@EEO[OIACGCCEAG@GCCE@CIEIKCA@IFA@@KCEAAABGAEA@IDE@CCEIKEEACBCICAEDECM@MGC@IDEAMDk@SHMJQJKBKAICGIKoQiQW@ILKNCJIHOBODKFEJCLDJAJEDI@KZyDUD]FQJENCVBJAHEF]CEAEMCKGCIBGAOCCTG@AICMFI@@ADCC@AADE@IDGHEFGAOACUGcSWSGKICICK@MBS\\SPW`MLCBG@IEA@@JBHLP@BCDAJGDCCCC@GBC@Ae@AAAIEGICWCO@K@KEIME@EIAEICAIJICAKFCKBG]SCIEGCMBI`KHQBgFIJO@EAIGG[SU[EOA_IaGKCA@IGMQOGUGIKIAEMMOECABEHO@ACECEHKAOEAMK[EM@IDEHQXEFIRG@SEIEWQFGKMSQwWaSIIEO@UE_KMOIOCU@_NWLIDIJGDIDE@OKGMKCEEEM@EHWBEAKS]AMEEEAOD@HGFO@KAEDGJADABOKA@EDA@IEiMcEGEKO[SOGWGKGO]FKRKHUMgGE]GOEWKQQEMCOBMFM@UACCCGOOBGCEBOEOKIMMgCEEAUB[MGSDGHINELINQBOAEGI]QSAIBICEGO_CeGK@ADIHKTECO@IJOBOFIDADEGQAKHIDGCCKD@ADM@EAAGCQDAA@AJIDE@AGACCCIAKHCFENED@DFDA@ABK@AHCBCAOEAGEEAKFKAIBC@K]QOMMAEAEG@IDK@ED@DFBDD@DIAGBAB@FCFGDGFIBK@@FCBWDQCIAGECFUPEHFTCPC@E@MMQ@IFGNCDKAQHC@SIKCBIC@M@ADIBGFKAABDJMD@FBLJH@D[RGJAJADAPGH@DFHABA@ICC@UNMAAG@G@@SAABAHCDA@YYAESWEAE@QJYJ_PcLwCOCSWAKO]@GHMJKLGHG@IAESIG@KEKIQHO@GEEE@CDEBECAC@GFEBIAGBGGUJIFIJ_TMDQDIDUASFABADBDZLDDBXTMPEDC@AECAEBEDCD@DDDF^FPNF@@FADBFHDHFDLRJBDCDGDYRE@@EBIFG@GEGECGAKDGDCDAAACFELG@EACCEUAGDIFQHKAMLBDAHABG@@FBN@NANEPM\\S\\AJBFDHPNLNBHEVAVFLBFCDEDS@KFEDGXIDMCCK@GIEEGQIBSSGS@CBBDNNBDMNCX@FPDFJNFJAJDLHHJVBTPdRFBFABCRCFBFFADDNDBFDVBHDDDCRCHE^CHCBQIKFCA@BBFDFCL@FFDNAHH@FELFH@DADWRGJ@LAJMLALDLBHQLAFT@DBAFEBIBOAABCBCHEBGAE@IM@EDCNEDCAAGCGIUNQHYBAHDBN@JCHDPABBBDBNADM@IAG@IBCFBHDDJ@BDAFG@GCCFBDBDHBGN@DJDJHBJFL@J@HKBKAGCGGIQOCEBSNEFAJMZ@HCFC@WCCBBNKACE@KAEBECBMAABBHADGDAFCCAICAI@SJI@QEU@AA@CBMBAUCM@eCOGUGO@IDGFGNEXIDGBSIGIWkU[kmKGMBEHAAMU@ICGCAMBCDAFIAMFKEI@BEDAGCGBA@]HICCBE@@FBFJPDH@LTZZJBHBDBDEHEBKBS@A@GGK@IGUDKAAAACAAEAQOC@CNGOGIMCWDELKAOMBEECAE@CGEIEcMi[IKUGE@IECBECACDIBCBAN@@CAGFMAISI@@@BDDIAAEAAI@GAMCCFDLDD@H@DCHMGHI@CCCC@CFKEM@EEIKMKSEE@@DDFHDARENBLA@CGGNABDM@CC@CBBHADKFIAAFEDCFCFBFGFFD@DCLCFCDGIK@EDDHKAGDADKFIHE@AB@FAB[LFFNFLLBDJAH@FKLCF@HDLDHHFBD@NCD@DDEH@DJTDDNBFALIDINFFJAPHHNFNNFHDPBBDBDD@FCBBFLCFFH@BDA^HJIFINAHHDDHABKACFODCDBBDDJ@BFADHFTJVFPFJPT@JBDH@D@FLHPHFFCVFFJBFAHMDB@FLBJDHJLFFB@FBBZGHCB@DHFPJHD@BDAPBHMZ@FET@DDBHDF@HODCTGFBBLJJF@D@DEF@NHTBEV@HHJB@NGB@DDFL@DGHAFBFFPNR@BGDAHGJXJHNNFFFBBBLGFAFE@CEGCAGEKKEG@GBCFADFJFDJMH@@L@HDFH@BHLLDHFFFBL@HB@GDCHCAABG@KIS@EBCH@PBHJHF^XRTFFLBL@LOFGJEJCPABAFE@ODENAPHHDXBJALBPALBFDFHBHAdG\\BVFJLJ\\RXTj^XTTNt^JBLBZILBRTFHRAJAFLABELGREJLZHFDLLZBPG\\CTOdAFFDVHBD[\\]JC@IHIBENOFAB@D@JJNDPBFJFDFHBLHLZDFVP@JCNCFGF@BBFNRDBXBFABICI@KBALAHFJLJFTJDEF@DDBJDFHFLEHDD@BE@IAK@EJCFMFCD@HDJFHLFJJ@BBBHLHHAFCDBDABABCBAB@FFD@FADGDCF@FDDFLZD@DEDALHBB@DIDAB@DDDFBXBTPBF@JCHGFAFAFFL@DADGHAD@JYBCBADBZDNHB@JFJRGJ@JEJ@BBAJ@DJNVFFHLHFNDBNBJAHJNFJJPFBHADKR@DBJLPJ@PL@DE\\BDHJBDCFGD@FDHFBNEJBLCdJX@RHD@ACKGAEAQBKEEKGAKLADCP_DALJdDNHVBJ@HABCKODCP@LAHANMVKDCLSTADCFEPEJABBBLDBFD@BCD@DFFFDLAPHF@NEH@B@BC@I@AD@LFBDCHDHFBDADEJCBCBEAO@E@CFATPDBFALMNEBCBEGOBGNGJGHEDAJ@lVHJBLJH@BENAJEHBHDBNBFDDDLPDBPDHAFJL@PDBBJLJHBD@HBZHJDJBBJ@DBFDBF@FITCD@FB@H@H@DLJBAJDJADEDSLOTGTALFDR@vARHHFJLBDADAD]TCD@FFHDBpHJFBD@HCFYTAHLLVHRHJFBFDRAFEFKDABBJBBH@Z@NDNMPAF@DBNTDLAJKT@BFDCFYNGAC@GFK@CDCJAFG@EBYLGLDFMPCJ@DDDP@BF@DIPEJ@`FBBBBDDXFFHBRBDBTT@FEDCNCDUAIBMRCHABSDQPOJG@CCEMGB_hKFOTATH^AFMPGDDFBNFBLARAFADE@CCI@CRCFBDNDD`JLLADIDEDKVFAHDFFDRBFB@PC^@NDVJTFBD@REFOB@LBJAJBDAHOBCXCTJFL@DGPEHBH@DGJEX@DLDBB@BQJQFADJZBLJPFBF@DAJKHCHB@JAFBJLBDBLZFBLCH@BLFXCXDPBNFDBTHHFZEV@JFLFDD@DALGRIH@N@ZFTTDXChFPDXjtNBBBHDLNXHBFCJGLBFAHBLBFDDLHXDNHD@FATS`ADC@IDAXCH@DFDHBBNBFD@HMJPVJBHCLEROVMLKNWLHJHFNARCNEH[dGN@DBHXNdPDDBHAHOVGPVVbPH@LONYJIFKJCRCPBLA`_PIZSTWHM@KFCJEL@HBFBBVALDBNEHILEPALHNRJ@JCNMXQJENALBNHLHNTFZ@hFFJAJCXM\\MNDLFFJ@JCXOZENBJNF\\FP@TGVCJD@F@BHFFKH@BBFNHBFF@BURCHB\\JBL@"]
                ],
                'encodeOffsets': [
                    [[112095, 27476]],
                    [[112543, 27312]],
                    [[113577, 29733]]
                ]
            },
            'properties': {
                'cp': [109.97824, 27.550082],
                'name': '怀化市',
                'childNum': 3
            }
        }],
        'UTF8Encoding': true
    });
}));
