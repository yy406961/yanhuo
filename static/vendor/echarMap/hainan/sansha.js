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
    echarts.registerMap('sansha', {
        "type": "FeatureCollection",
        "features": [{
            "id": "460300",
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    ["@@KCOLAJBJDDVFRHJB\\JfVXFZBRATGPMHS@KGKOKqO[QUGQCOAGFCZDFLA\\ALHHNLHNFT@JDBJELYAiQaEQE]W"],
                    ["@@HCFCFEBGEKMAMLCHAHRH"],
                    ["@@KDEFShGJSNGJGJIFCF@HBHDDDBXE^QbcR]DICMCGICEA"],
                    ["@@k^AXNV\\AcFOGWMMO@UDSL"],
                    ["@@HBJCBGEAKBAJ"],
                    ["@@DBB@BCAAC@AD"],
                    ["@@AAOHCLAVHPNHZJ|XLRKDKOYm]YEUIWQ[_"],
                    ["@@CdNbRNZINOFYIYYOSBQH"],
                    ["@@AZN^RHXKH[@WOG]BOF"],
                    ["@@HTHJjZLBNBTFNBRBNFXI`KHGHOAMKOOGKIKCeAsGSCMBOHGHMHEJ"],
                    ["@@hNpJxHfFVF\\BL@PKHYCSOG¯F_GYI[QmOU@cFGF@RNPbPND"],
                    ["@@yHEHAXDNLTTNPDLBªVfLNRARED@FQFSCQ[_MIOG[GýS"],
                    ["@@BEAsKISASfI`DTVRTCPa"],
                    ["@@@SEagBKjTZfE@I"],
                    ["@@EAUAWDIR@TNNbX\\PVDROCWGWi_"],
                    ["@@RaOaa@YTRbbPFA"],
                    ["@@FA\\QBEAESUCCOBGD@DBfDFHD"],
                    ["@@ICIB@BJHFADE"],
                    ["@@GCIBADJFHABE"],
                    ["@@VuKogEcbEld`dA"],
                    ["@@\\c]_gA]TClbRjK"],
                    ["@@AIKD@JH@FC"],
                    ["@@NOG[UKUHWVEZLNdETG"],
                    ["@@RG^WF]EISKklEVVR"],
                    ["@@DHFDRGHGAoOCWNFj"],
                    ["@@LRVBxO@a_SUCQJILG`"],
                    ["@@PJHAJ@HWOCQAGV"],
                    ["@@LAJKGMKDGD@JFJ"],
                    ["@@LJLBNIJMDMCIECKAUJIVBJ"],
                    ["@@@BLDNEJKCGIIICIFGFFV"],
                    ["@@Lg_aoNEh`\\jG"],
                    ["@@FHJFNABGGKSGEBBN"],
                    ["@@b^jFdOVgQcmCkFaPHf"],
                    ["@@xNRaMoiQQ`ATBb"],
                    ["@@nyBKISUIQIeA]FinB\\FJPJJDHDFDPARD^A"],
                    ["@@\\RXABGEKOKUIMCODBNHHJD"],
                    ["@@QwQKoBELARIVLNXN\\AfK"],
                    ["@@BCCMAEICHYGMMEQ@OLOXMN@RNJVZRA\\WJC"],
                    ["@@`@DATe@WAOCKGIq@UFEVHP@\\BLPPJB"],
                    ["@@\\EDCBQAEKKKqGE@[T@FBNHTP`f`FB"],
                    ["@@JAPGRUDI@KCMUOEAw@GDCN@THTVRNHHB"],
                    ["@@lOQe[SeRHf`R"],
                    ["@@@\\DHRNPFNDNARCR]@IAKIUECGA}@GBCHAP"],
                    ["@@DRNVZNH@TENKBGD_@KMOUII@MDIFKJEHCN"],
                    ["@@BhBDRNPFFAF@RKFQBKAMGIIEaCQHCF"],
                    ["@@BNTX\\RLBHCPcBM@gEYII]CWFILEXAb"],
                    ["@@DjHVJF\\DDA@UCwACEA]DIBAF"],
                    ["@@PbFDDDnBFCF]AKGI[KS@IDMNAF"],
                    ["@@LFHRDN@ROLOHs@kSWMEGBYVGLGVCX"],
                    ["@@@JTTVANELGn­HsGSecEAEHOªo"],
                    ["@@BjV\\lP|DbI@iK]wccKeDSd"],
                    ["@@DHdNrATSFMEWaaICiAEFKdEd"],
                    ["@@HLpRLEBMAK]K@kNEJC "],
                    ["@@FHJ^NRB^EFEFMBc_{ICwBGD"],
                    ["@@DPLPLHZ@JODYESOMQEMHILCV"],
                    ["@@BNJLLDrBREV]TaRWDSBWCQOG[BYDgVWRITENCt"],
                    ["@@BDNN\\PF@PCBCBEAUCMe[GAOBAB@j"],
                    ["@@BLFFnR`JXPNhCRKASIOoWkMUQ@MHIJAH@J"],
                    ["@@LLXDRGXGf@PIPOAOmKWAaDQPSVCN"],
                    ["@@BR\\hH@V@VCLEL_DUCOYkECI@UFKD[jAR"],
                    ["@@DJXNrRxGFEB_EeEGmQQ@aLGFWr"],
                    ["@@DVP\\^PÖfXn\\JFxxXPÜbHH¬äHHŬètVLElWPQ^¯AW[cÛ}w[kWÏAYGMßiŏ³ĉoÓAQBjQLqAP"],
                    ["@@JJLHLDfAvWÜ_LEFIDIKEYB}R¯rSVEHD\\@JEN"],
                    ["@@BHFF\\LF@dUBIOiII[GEBQPAF@j"],
                    ["@@Fr@FDBhJtADABGNyOoEEGCkCO@EBWtAJ"],
                    ["@@DTÎĂÒÒ|XJ¸@EM²]lQVQXUDSWQyHYF£RJ]@»QkI±çė·­uWOCWHEJ@|"],
                    ["@@HnNVLNÐ¦TNrRXCRCHQBS@KecsQM½YAyHUPAr"],
                    ["@@DX^NüTFZ@JCJaG[[kyyesKUAMHSCZ"],
                    ["@@DNnlHBFAfODMAMomKCMAI@IFIT@L"],
                    ["@@BNRfHJXAHADGDIBs@aCEGAqFEFAj"],
                    ["@@HlhHFnHdELO@MeU_a]WGW@Gh"],
                    ["@@DJV\\bf\\bJfKDGFaUkIG]CWBKN"],
                    ["@@BJzjZL@FENY@Ke_uICMJg"],
                    ["@@ZtHDxDH@vQFCRaAGQ_ECIAe@oBqbCF"],
                    ["@@DdXZ`JpBHAYFGFoAGCCkYMAmB_H]NONCL"],
                    ["@@BTZR^HXBFKB_CSIQ]CaDIPAR"],
                    ["@@BbHLLJRD`CHGDGAKK[GGKE[@MFGH"],
                    ["@@FLPVHT\\pJNfjxFFBHFtCTGLHtHHJDTBFCT[BK@§k]uYUIIQICNBDNNZbnX^CFGFIEYWQOIUEAGDCF"],
                    ["@@@F`jJJf^RFJ@LEFC@G¡IEOHAH"],
                    ["@@XXPBJEX]AOKEMCEKEIE@MPM\\@N"],
                    ["@@DLJN´ldRNEJS@GeWUGSQKKKCQ@aQODKNEL"],
                    ["@@BRFPRLLBTELM\\iPuAMQMGBEHQGHK@CCAGP_HWF[GEMCIHS`ETGv"],
                    ["@@FZVdJJh\\pJJ@`_BEWgWSYOOUBEFCL"],
                    ["@@BFDDLDRE^MTKd_JGTYR_FUBKAGK[EEECG@ODCDCFC\\CRa|eXMTUVCD@F"],
                    ["@@DFDDJ@DABA@CAEKCGDAD"],
                    ["@@BHFDJ@LCDE@MAKGGIAIBC`"],
                    ["@@NFHGCCIAGH"],
                    ["@@@BNFHAAGGCK@@F"],
                    ["@@@HLDFABCBKAGCAOD@L"],
                    ["@@XhFFXFh@DE@ICEW_GCKA[COBED@F"],
                    ["@@BFDHJHHJJJJBP@HGBWK[GCQAOBCBKR"],
                    ["@@BDhZNDN@NCFGDW@IQ[GCIAWF]`CH"],
                    ["@@JVLHLFnFHALS@MCSUMMGQAUBGDKZ@F"],
                    ["@@HLFDNCLDR@JLCXUjQRW@ECEEAyGYByAQFYNS\\CP"],
                    ["@@BPHFJBR@VChWDICMGKEAMAcJa\\AF"],
                    ["@@TbTPXLNdRLJNHN@VKNQGaDaGiIc[K[UQSAMDKpDNANCNmNAR"],
                    ["@@BHr~FDFATOTs@G]oKIKAEDcjEHAJ"],
                    ["@@FZ^JJCZ@RaCQKIQCg@KLCV"],
                    ["@@DP\\JD@FAdcBMAM_QGAGDIFG^KT"],
                    ["@@@LXXBHFDHDHFRTNBPAPOHQCMQAEECIKIMBEFBUDMKMGCKDOJGHEV"],
                    ["@@@BLVPDBADKBS@CCCICM@ABEP"],
                    ["@@@DTXHFL@PA\\[@GCGYYCAGBg`AF"],
                    ["@@BDHHHBHCFICSCCKCEBEF@T"],
                    ["@@@NBFFBrHNFbBbI@ECmM[IWCEEAOBCCAGCAYAEBEHGV@PFT@FEJ]H@F"],
                    ["@@BZlj^V\\PfNVGHWmc_MykUECBIF@D"],
                    ["@@@HFNJHL\\\\LR@PCXGDEAYCCCGG[ScEEO@EBE@GGACECCBCDCJIBELAh"],
                    ["@@LLFBN@FADAAMGEEAG@K@CFAF"],
                    ["@@FTDDTABAJS@OGIE@I@KFABCR"],
                    ["@@JZRn²ÐJFL@ZKTCDA@GOoMIÛÍGCQFAB"],
                    ["@@@DV^F@F@RSDS@EAC_KC@OVAF"],
                    ["@@BFzhhbbTj`PFfJL@TSBEISceEGDSRYNmGEAes[SEAEDKl"],
                    ["@@LhBFtxXpFFVDH@FEL]AIQ_gegaeOCBAD"],
                    ["@@@RFNJHNFVBLANEHMNeCsCKEEQ@MF[PKNGTEZ"],
                    ["@@DFDBJCBECGEAGBAJ"],
                    ["@@@FHFFBDE@KEGE@CBAB@H"],
                    ["@@BJDJj~HHJBJBLAHEFEBGCKQwKQKOOMGAOBEFK^@H"],
                    ["@@BZBDNBFA^]VUBEAEEEECG@SBWFIJAZ"],
                    ["@@BVBDFFVPPBJ@JCHGAGY]YKKAGFAH"],
                    ["@@BJHFPATIJKBIEOGCMBUVGN"],
                    ["@@NVPFjAt@HATQ@CGYACGAUAwD]BYV@D"],
                    ["@@@FDHVRlFHAFGGYGGUKM@YFABCJ"],
                    ["@@FrNTNFLA\\IJQDkCOGGIGKC[AKHKPAL"],
                    ["@@DVHH^DJ@\\KFCBKGuCEsGGBCDKn@J"],
                    ["@@BRtRJnJCc^mCsMKIA±DÓZSN"],
                    ["@@BnDTxHFND^GJCBCJeASAIY{qikAIBAj"],
                    ["@@D\\bXHBHATEIYCEYKUEI@AD"],
                    ["@@LZJBhNePeAUKI]fIVYbCNCZCL"],
                    ["@@`jlRrA`_@ca[qI_Lid"],
                    ["@@HNPVXVNBRCVMFI@QcEGWEUAIFUbE|"],
                    ["@@NHLPHRFNCLGdgNUTYTMrSnUHQFUCYCCCBMlGJ_J{XIFMLQZgvIDOAIIKc@cB{FcLILCC¸UDCACCASC{A¥BU@QLKPETA\\@"],
                    ["@@B|hL\\HÆLPAJCFI@IEGQI]E¥K]IqS"],
                    ["@@@ZP\\RPbFXBjCTKBGEGkeI[BGF"],
                    ["@@BFhNR\\BpC\\WBECEMKGAoD@qHCB"],
                    ["@@^JbATYMigA]\\@b"],
                    ["@@BHLTJBRBNABEBSCYCEaKGAEDCf"],
                    ["@@@FFJLLdBF@ZGDCHMAC]KiCEBMJCD"],
                    ["@@@FXXdADAHEFQASAEEAiEWZAF"],
                    ["@@@DHPJFFBlGTM@ACSACMAE@{TAB"],
                    ["@@FZLRFBF@^U@CAEWYG@UDCB@F"],
                    ["@@DD^BH@\\QDC@GWUCAMAGBCBQhAF"],
                    ["@@FDTDLAHCPSNYHINILMFG@GEEKAo@IDINOZOd@JBL"],
                    ["@@TLNFNBZBbATCFGDGBWGSKIYOiESAKBIDEDCFERAJDXDJ"],
                    ["@@LHJBHAHADCDG@CCEGGOCI@IDCHBJDF"],
                    ["@@IMQMICODMJCDADBFDHDDPJLPFDHDRDVADCBA@GW]"],
                    ["@@FHHFTBNAJIDGDU@GAGACEAK@]NKNAF@N"],
                    ["@@DHFDF@H@FCDEFMBGCaCCM@OBGBADAJHh"],
                    ["@@BDDDFDF@JAHCJGDMAuCEE@KBKBEDENAj@L"],
                    ["@@QRI^JfRX^JPBZEZSNY@YSYUM_KWBMF"],
                    ["@@kZWxPrlRlHtB[RcKeQ]i]iKg@kN"],
                    ["@@DFNHX@NGDGHSAMEISGOAKBKJATBX"],
                    ["@@LBP@RAXCjSRIFG@EEEECaCo@KYDMJAHAPFJHFLFhN"],
                    ["@@LFTBHEBQGQQQaKMFCNJVZV"],
                    ["@@PFLAJCTQBGAKGIMAWHIJCNAJDH"],
                    ["@@TL`LH@HIBSGMSMKAQAKDEJ@JFN"],
                    ["@@lNZFJ@LAHEDGBQISIEI@YJODK@QCM@ALDHHJ"],
                    ["@@HJHFJDHCFKXYJQHaCMIAQAcNGFENER@NFZ"],
                    ["@@FFF@BC@ICAE@ABAH"],
                    ["@@XR^HH@DE@CAGGGKCIIECQAGBCDAHDF"],
                    ["@@bXHBFAFCBGAEYQ@ECCIBMHCFDF"],
                    ["@@BBBA@AAAAD"],
                    ["@@BJJDZDPCLIJKJgAEGCGBGFKLSJEHOLEH"],
                    ["@@DVFJPDRLL\\AbCNGHe`CPDDHHJCTIZYLGRQDOK__uKKQQQGGBAL"],
                    ["@@L@DAHG@CACKCQBODADBHDDFBJCDB"],
                    ["@@PFJ@FCDG@IAOE@EBYPAH@BFD"],
                    ["@@LNJBNBDABCCEECIIKCE@ADAD@D"],
                    ["@@DFJHDADC@GCGECEACBCBBJ"],
                    ["@@DFDDJDF@BC@AGMBCHEBAAECAICK@CBADDX"],
                    ["@@DFJBT@JEDE@KCECAE@CBEFODEDAH"],
                    ["@@AJ^VHBFCBMJALAFCBMECE@IFYBSAED"],
                    ["@@@DDBF@FADA@IKIA@CBADDFCF"],
                    ["@@DJDDF@FAFAFGBEAEAA[ECBADDH@D"],
                    ["@@PXHVNHVHJALOJGBIEWWQEGIEMAgFIF@JPJ"],
                    ["@@VHDAFG@AQKI@ODABBDLF"],
                    ["@@FFF@HCDGBECGM@CDCH@H"],
                    ["@@CDBFNDXBXEDC@EIIEAIFeF"],
                    ["@@AH`Pd@xJJVGFQIa@SE}EUBS@IWUCMJFr"],
                    ["@@DFJALEFG@ECCOCIJCHBF"],
                    ["@@HBHAFCDGAEGCKBGH@HDD"],
                    ["@@@JDJDBDAHMLM@CAAKGCBMT"],
                    ["@@BNCLBJLPNBHEBEJIDI@MGOIMIGGAG@EDCJDR"],
                    ["@@@JFFHBH@NQ@CIGGCC@EBGN"],
                    ["@@@DDBB@HGBCACCAC@EL"],
                    ["@@FHFBFADC@CGCCECAGBADDF"],
                    ["@@@JDDDBFABC@GCEECCBCBBD"],
                    ["@@DBRAJA@A@AMOIEGAE@ADHZ"],
                    ["@@A\\FLH@j[PB\\JD@BEGM[[[MWCCBBPMX"],
                    ["@@JPPPHDL@RCfKRBZIRIFOBO@K[[OMSIKCMH[B]HIJKRCNBf"],
                    ["@@FHLLLZFBFABEDSFO@KBeDIHIBEQMKIKCSFIHEZIVBFHJHV"],
                    ["@@PAPKEgcqOcBSRCj@JÀZPKD_EQo[¯a{IuCXKRCpDPx "],
                    ["@@BFDBNDXEDEACY@KCCBCF"],
                    ["@@\\@JBNELKJS@GACKAC@KBSGC@WXIP@FBFLD"],
                    ["@@JCRYBE@ECCIBAHCFEBADBHABGDAF@DH@"],
                    ["@@FDhPNBHAHGJSBM@IEIMWGEICI@MFGJYj@FHL"],
                    ["@@JJTDt@XGHGHYBQqQES@OJILCRARFZJR"],
                    ["@@DBDAGGA@BH"],
                    ["@@PjFP@LCFE@KAMEKMI]S_KOAMD_XGLANDJFF"],
                    ["@@DDF@FADABGGMC@E@EDAJDH"],
                    ["@@DBF@HE@C@KAACAIBED@D@FDH"],
                    ["@@HBH@H@DCCGGCKCYQEC@KFA@AAIMEABG@A@@EEAG@ABADTZRT^Z"],
                    ["@@LHL@D@FC@EGKK@IBADAD@D"],
                    ["@@RJL@JANDNDHDDBjALM@A@C_O[EK@SFSBUHADBB"],
                    ["@@@JHFHDLEFGBM@GCECCEBGJEDGJ"],
                    ["@@HEASCGGEG@QFAHDFFDBFDJJBHA"],
                    ["@@@JDFLBHAHGJEFICIEEIEI@KDCHAR"],
                    ["@@F@D@FCDG@CIGGAA@CFCJDHDB"],
                    ["@@FAFCPM@ECEYEG@CNDNDHFB"],
                    ["@@JHD@FCFEESOME@CDEPLP"],
                    ["@@DCBFrXZEHIIG§CICIKG[AMFCFAH"],
                    ["@@RdHFtHPANCLI@OEMUUmaICK@KBGFCJAVBP"],
                    ["@@FFHBN@NEBE@GACC@]@EDAF@F"],
                    ["@@LFH@FENHXFDCAKQOSM[EoawkGQLQLENATDTJRTTPbJnHJBHEDOACSKiE[KSQq[WIkEYFQLCRHrPZtl"],
                    ["@@GBAFFJFBnBLBbJTLFLDTANINIHUDS@GEUCCWDYJKBABAF@DLDZ@rC²XPBPCPINKPaBMI]a_iUaGUAMBUH"],
                    ["@@FBF@BEDA@CEAABACC@CF@H"],
                    ["@@BBJFP@LCJIHUEIMAMDKLEJEN"],
                    ["@@AJBDFDHAFEDIACICEBEF"],
                    ["@@FFJFFAFEAGECEAI@CD@F"],
                    ["@@@FDBLBVADEBCAGGCKCIBGFCJ"],
                    ["@@BPNRDBJ@VAVM@C@MCIKWCCO@UFEHIV"],
                    ["@@EDAFBFTRZXF@FCFMCGk]IA"],
                    ["@@CBGDIV@DBDNDV@FLTE@CQWWQ"]
                ],
                "encodeOffsets": [
                    [
                        [114139, 17488]
                    ],
                    [
                        [114143, 17487]
                    ],
                    [
                        [115046, 17318]
                    ],
                    [
                        [114920, 17162]
                    ],
                    [
                        [115340, 16968]
                    ],
                    [
                        [114402, 16941]
                    ],
                    [
                        [115208, 16862]
                    ],
                    [
                        [115350, 16779]
                    ],
                    [
                        [115376, 16724]
                    ],
                    [
                        [114662, 16716]
                    ],
                    [
                        [115108, 16687]
                    ],
                    [
                        [115177, 16386]
                    ],
                    [
                        [117685, 16422]
                    ],
                    [
                        [117546, 16276]
                    ],
                    [
                        [114928, 16073]
                    ],
                    [
                        [117361, 16025]
                    ],
                    [
                        [117008, 15924]
                    ],
                    [
                        [120664, 15498]
                    ],
                    [
                        [120647, 15482]
                    ],
                    [
                        [120115, 11344]
                    ],
                    [
                        [120516, 11315]
                    ],
                    [
                        [117327, 11037]
                    ],
                    [
                        [120028, 10993]
                    ],
                    [
                        [118561, 10794]
                    ],
                    [
                        [118504, 10717]
                    ],
                    [
                        [118537, 10713]
                    ],
                    [
                        [116768, 10265]
                    ],
                    [
                        [117331, 10198]
                    ],
                    [
                        [117292, 10125]
                    ],
                    [
                        [117334, 10121]
                    ],
                    [
                        [117468, 9971]
                    ],
                    [
                        [115666, 9869]
                    ],
                    [
                        [115213, 9774]
                    ],
                    [
                        [116907, 9610]
                    ],
                    [
                        [118761, 9546]
                    ],
                    [
                        [114208, 9500]
                    ],
                    [
                        [119552, 9274]
                    ],
                    [
                        [116674, 9088]
                    ],
                    [
                        [117547, 8357]
                    ],
                    [
                        [117611, 7419]
                    ],
                    [
                        [116327, 7130]
                    ],
                    [
                        [115256, 6123]
                    ],
                    [
                        [114700, 3943]
                    ],
                    [
                        [114916, 3974]
                    ],
                    [
                        [114943, 4040]
                    ],
                    [
                        [115229, 5934]
                    ],
                    [
                        [115172, 5878]
                    ],
                    [
                        [115047, 5757]
                    ],
                    [
                        [115224, 5792]
                    ],
                    [
                        [115286, 5696]
                    ],
                    [
                        [115315, 5497]
                    ],
                    [
                        [115259, 5233]
                    ],
                    [
                        [115355, 5230]
                    ],
                    [
                        [115618, 5113]
                    ],
                    [
                        [115935, 6458]
                    ],
                    [
                        [116629, 8198]
                    ],
                    [
                        [116840, 8294]
                    ],
                    [
                        [117257, 8316]
                    ],
                    [
                        [117423, 8408]
                    ],
                    [
                        [117626, 8176]
                    ],
                    [
                        [117708, 7690]
                    ],
                    [
                        [116631, 7790]
                    ],
                    [
                        [117932, 8588]
                    ],
                    [
                        [118025, 8714]
                    ],
                    [
                        [118282, 8695]
                    ],
                    [
                        [112092, 7521]
                    ],
                    [
                        [112575, 8037]
                    ],
                    [
                        [113111, 8312]
                    ],
                    [
                        [113112, 7987]
                    ],
                    [
                        [113264, 8204]
                    ],
                    [
                        [114217, 7726]
                    ],
                    [
                        [114351, 7835]
                    ],
                    [
                        [114232, 7996]
                    ],
                    [
                        [114319, 8097]
                    ],
                    [
                        [114612, 8265]
                    ],
                    [
                        [115602, 8033]
                    ],
                    [
                        [115656, 8612]
                    ],
                    [
                        [115985, 8322]
                    ],
                    [
                        [115940, 8268]
                    ],
                    [
                        [116389, 9453]
                    ],
                    [
                        [116366, 9193]
                    ],
                    [
                        [116935, 8975]
                    ],
                    [
                        [117350, 9059]
                    ],
                    [
                        [116713, 9086]
                    ],
                    [
                        [115582, 9803]
                    ],
                    [
                        [115601, 9815]
                    ],
                    [
                        [115638, 9855]
                    ],
                    [
                        [115647, 9865]
                    ],
                    [
                        [115714, 9887]
                    ],
                    [
                        [114139, 8730]
                    ],
                    [
                        [114901, 9048]
                    ],
                    [
                        [114939, 9088]
                    ],
                    [
                        [115043, 9141]
                    ],
                    [
                        [115239, 9059]
                    ],
                    [
                        [115532, 9125]
                    ],
                    [
                        [118618, 9943]
                    ],
                    [
                        [118831, 10338]
                    ],
                    [
                        [118941, 9810]
                    ],
                    [
                        [119266, 10046]
                    ],
                    [
                        [119065, 9093]
                    ],
                    [
                        [116999, 10061]
                    ],
                    [
                        [116324, 10487]
                    ],
                    [
                        [117089, 9988]
                    ],
                    [
                        [117369, 10205]
                    ],
                    [
                        [116985, 10488]
                    ],
                    [
                        [117443, 10595]
                    ],
                    [
                        [117318, 10662]
                    ],
                    [
                        [117608, 11086]
                    ],
                    [
                        [117450, 11269]
                    ],
                    [
                        [117320, 11593]
                    ],
                    [
                        [117217, 11097]
                    ],
                    [
                        [117241, 10975]
                    ],
                    [
                        [117442, 11745]
                    ],
                    [
                        [117311, 11010]
                    ],
                    [
                        [116929, 11294]
                    ],
                    [
                        [117669, 11124]
                    ],
                    [
                        [119985, 10861]
                    ],
                    [
                        [120455, 10884]
                    ],
                    [
                        [118622, 11107]
                    ],
                    [
                        [119438, 10757]
                    ],
                    [
                        [119637, 10729]
                    ],
                    [
                        [120073, 10569]
                    ],
                    [
                        [120165, 10333]
                    ],
                    [
                        [120082, 10949]
                    ],
                    [
                        [120598, 11033]
                    ],
                    [
                        [120269, 11331]
                    ],
                    [
                        [119529, 11778]
                    ],
                    [
                        [118131, 14284]
                    ],
                    [
                        [119496, 16738]
                    ],
                    [
                        [120534, 15547]
                    ],
                    [
                        [117457, 16559]
                    ],
                    [
                        [117196, 16419]
                    ],
                    [
                        [116955, 16426]
                    ],
                    [
                        [116674, 16216]
                    ],
                    [
                        [116627, 16047]
                    ],
                    [
                        [116445, 15975]
                    ],
                    [
                        [116594, 15849]
                    ],
                    [
                        [116718, 15790]
                    ],
                    [
                        [116977, 15806]
                    ],
                    [
                        [117205, 15974]
                    ],
                    [
                        [116691, 9053]
                    ],
                    [
                        [116500, 7821]
                    ],
                    [
                        [117302, 10182]
                    ],
                    [
                        [114910, 9080]
                    ],
                    [
                        [118496, 10787]
                    ],
                    [
                        [118482, 10760]
                    ],
                    [
                        [119225, 10034]
                    ],
                    [
                        [115706, 19940]
                    ],
                    [
                        [116565, 19619]
                    ],
                    [
                        [116844, 16389]
                    ],
                    [
                        [114927, 17405]
                    ],
                    [
                        [115597, 17187]
                    ],
                    [
                        [115428, 17077]
                    ],
                    [
                        [113865, 16169]
                    ],
                    [
                        [114176, 16847]
                    ],
                    [
                        [114254, 16879]
                    ],
                    [
                        [114265, 16901]
                    ],
                    [
                        [114280, 16933]
                    ],
                    [
                        [114336, 16963]
                    ],
                    [
                        [114371, 16963]
                    ],
                    [
                        [114372, 16986]
                    ],
                    [
                        [114421, 16854]
                    ],
                    [
                        [114392, 16849]
                    ],
                    [
                        [117134, 11742]
                    ],
                    [
                        [117095, 11726]
                    ],
                    [
                        [117075, 11704]
                    ],
                    [
                        [117044, 11663]
                    ],
                    [
                        [117543, 11420]
                    ],
                    [
                        [117058, 11319]
                    ],
                    [
                        [117000, 11341]
                    ],
                    [
                        [117026, 11320]
                    ],
                    [
                        [116805, 11180]
                    ],
                    [
                        [117110, 10628]
                    ],
                    [
                        [117226, 10628]
                    ],
                    [
                        [117094, 10421]
                    ],
                    [
                        [116579, 10260]
                    ],
                    [
                        [117138, 10138]
                    ],
                    [
                        [117073, 10127]
                    ],
                    [
                        [116997, 10004]
                    ],
                    [
                        [117019, 9946]
                    ],
                    [
                        [117142, 10031]
                    ],
                    [
                        [117240, 10088]
                    ],
                    [
                        [118603, 11077]
                    ],
                    [
                        [118583, 10988]
                    ],
                    [
                        [118135, 10502]
                    ],
                    [
                        [118050, 10437]
                    ],
                    [
                        [118274, 10155]
                    ],
                    [
                        [118207, 9620]
                    ],
                    [
                        [119285, 10646]
                    ],
                    [
                        [119315, 9976]
                    ],
                    [
                        [119355, 9980]
                    ],
                    [
                        [119394, 9970]
                    ],
                    [
                        [119253, 9395]
                    ],
                    [
                        [114338, 8881]
                    ],
                    [
                        [114610, 8852]
                    ],
                    [
                        [114444, 16448]
                    ],
                    [
                        [117283, 10971]
                    ],
                    [
                        [117171, 10929]
                    ],
                    [
                        [117097, 10989]
                    ],
                    [
                        [115689, 9883]
                    ],
                    [
                        [116524, 7551]
                    ],
                    [
                        [117267, 10171]
                    ],
                    [
                        [117254, 10160]
                    ],
                    [
                        [117205, 10142]
                    ],
                    [
                        [117261, 10110]
                    ],
                    [
                        [117209, 10077]
                    ],
                    [
                        [119734, 9690]
                    ],
                    [
                        [117371, 11707]
                    ],
                    [
                        [117418, 7773]
                    ],
                    [
                        [114385, 16599]
                    ],
                    [
                        [114330, 16646]
                    ],
                    [
                        [114417, 16587]
                    ],
                    [
                        [115732, 9895]
                    ],
                    [
                        [115730, 9909]
                    ],
                    [
                        [117049, 10113]
                    ],
                    [
                        [116962, 10456]
                    ],
                    [
                        [116960, 11327]
                    ],
                    [
                        [117745, 11345]
                    ],
                    [
                        [115591, 9763]
                    ],
                    [
                        [115037, 17225]
                    ]
                ]
            },
            "properties": {
                "cp": [112.34882, 16.831039],
                "name": "三沙市",
                "childNum": 220
            }
        }],
        "UTF8Encoding": true
    });
}));