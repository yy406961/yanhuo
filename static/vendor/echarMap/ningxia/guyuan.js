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
    echarts.registerMap('guyuan', { 
        'type': 'FeatureCollection', 
        'features': [{
            'id': '640400',
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': [
                    ['@@AKGACBBDABD@BDDDDA'],
                    ['@@AGBAC@EJBHHG'],
                    ['@@@@A@OLBPAHBBB@JKHC@AEIBI'],
                    ['@@NABFjVRPVNXNJLDNBDED@BCVCFI@O@CJGLEJIFIAIFAFCLEDGFAHK`WLKNI\\EH@LDTZPJXDXAPADBFHHDJ@TIJOLWYUKEGIDEL@LHHDJ@JCPBPFH@JCFKBMBCJEDBRNVXRHPLJ^LRRVRLCPALBJBJDDr@tEX@JC^Q^MZCR@E^AbMlQ`UlIPBHFHNDDBBHCLBFHH\\C`GHJBJJJ\\@fLFAJEVIDBBHBFJ@DALO^OH@NLLDJB^@bN`HPFZDFDFPFHpffTFBF@\\CJBDFBJNjBBJGFANBJHF@NCHBBBAVBNDNHRPX@BA@KKEAC@@RCXADEB@FBFJDLFPBBBJLDPVADDDJHHLFF@LFH@HA\\IR@PHDDAFNCHELBJFB@RSXUHAJFHGFDDAF@FCBMLMH@BDF@CFBHDHDBPS`GFCBCCIFG@CCGAKGIKCKKAC@CEK@AHAHEDG@GGCCICDE@ALKBAIBKAC@IGGBAHCXFHCLQB@FHFCJABCCEACBELEDEAECAI@MHODCBCCBUACC@CECAB@AA@DEBKEBAAA@HIDANIBKAGDI@CCAINIDCNKPIFCHCCGDAAOCAABKNOLSBGFEH@FIHADGDADIFBDHLBHCLKTGJKDAHLHCD@DBHFFJAFDD@FELBFCHDH@DJEF@PEDBBCHFF@@IDI@AD@DABCDCBEDJF@@DBDCH@JDF@DFFD@B@DGBAB]DEFBBFF@FKD@LGD@HCD@BLDTHHB@HEEAAC@GDMAIDGLCDBBRD@LGHDDHNBBB@AHAADABHDHGFSNQBG@ID@BEDAJB@CDCLGBFDDTINJ@AFIFC@DFAJMRIBABABBDCDB@BD@DED@DCBRBDD@PKBPHBBAJCFGBEDABCHCDABHDDADLDDDDCFB@CJGFXFDLQD[AB@CD@DEDBFC@@ADBDBDF@HADBAC@CJIFIBQFEFCDED@DDDAFE@CJMF@DDJBBA@CHGFKHCFACIEGDECIACFGD@BDDGBAFBCK@CDFDG@JBJDBHLFB@AAMAG@AESHEHDHPHHDAHEIG@GAABMABA@A@AAE@PMP@DU@B@FDC@FDABC@GCGDC@IDAEAGB@@DB@BM@DGAEBBBAAEMCCACC@GACBCFABBJ@CEE@@C@@AK@WECQC@GAEAM@GFCDCRAFENBAGCABOCGGGQEGKAAEDA@AKIEEK@]ACC@EDAF@JDD@FCDEDACEBGCA@BHADA@CCCDABAAHUBKFGFCJCDBTCFPDDFBHAH@FFHKBGDC@CGQGFEACEMGMDCDGDGI@CAAEBBO@IG@IHIDE@MESSA@CDIAEDA@BCECDCDI@EQIE@AA@CFGJCLATCB@BHBBHEDE@EDEAEEDCBCFE@GG@CF@BCJ[@ABBABBJD@DCAOBCTU@CJGDEDATJBADCJSEE@CBARABE@CCCICA@EFCBKAGBEDGAAEDCFBD@BSDAHBBAEABAHBBA@KECHKGB@ABKAEEAMNCAACCOBE@AWBA@DJ@HCDQJE@C@EE@CBGCSB[CKCAGBMJGBMCMBCKCBCJEDK@EAAC@ELQAAEDEEFC@EEKKKIEIBEFALABECCAED@DC@AAA@CHGAAAA@EFIE@B@JCBEAMIC@AFE@AABICWDEKGAADEJDD@DKAEGAIDE@GCAAEFAECBAFA@GDYTiVIJAJA@CCE@ABHH@BEBKCAIEG@AFK@AKF@GEBEGI@CBELCB@IAAI@CBCDOFKPCDADCX@HCBC@EECK@ICAAB@PADE@AHABG@CA@E@EFE@CAAGGC@KDO@EHK@GHCBS@KDKAWDE@AABK@QAACHEVK@IEK@GBSAECBC@AKEDC@ECA[EMCU]EEIMEAE@MG@YBGFG@ACC@CBCLDB@BQFGBETGCIGEAGDELGJIBCAI@OBAFCDCJ]AGDCJEBCA@EAKDMHG@A@IWEQCIACFKCKDABEMEMO@AFMLADCCG@EVIFEBKDGAUJCNDH@LDD@BECSESJAIIAGBGHGR]BOHEBA@ACCKSEUBAFADICG@KJIBECEBAPMAAG@KKIBACCQEGFOAAIGIMECEECCQEK@@CCAQKACEAADE@CAAAKEEKGECKGEC@IHC@GGWCKGULI@ECAEDKLQBKACIEACKIK@CBEFANABGDUAKHGNEDGBADDN@HMJGLIAIBCDAFEDIFGF@FBDBHOTITMBK@EBKLCTGHIHAHDHLHBH@FKHG\\@FANCRS@QFC@CCOAM@KBEDCHEXC@@CCACAAD@PADIDECCOEMQG[[SKK@DGAECEAKEGBCAEC@CDE@ECACHMAEI@CBCHANGN@FFFBDABMD@FFH@FABY@KXDFBHMRDJ@HEJ@F@BGBADD@BAHF@BCDE@GHDJBFCRCNAB@JDDLBHAH@BBH@DJBBLDDB@FADGHCDQBICEGBGCOCCC@ABCVCBAA@EAAE@CBEBCAA@@CYCSCSAEBAD@JKJADBBH@DFATCDG@CACEC@OLGDQBIDC@EBUA]JU@[FQBMFGFCDC@KCM@GCBGAIUBIHGSAOCMCCGCGYIOEAC@KJAdALFJADAD@NANCDSIADFHFF@DG@CJADFJEHAJELMIMCEECBOREHMH@BEF@DB@J@DD@DGFDBABGFODI@GBKJBHCBIACFBDHBJ@DD@HHNADGDCACEAGGEQF@FFPAFEDG@IAEEE@KNABE@CB@BADFPHH@BAHBDDBBD@DEJGDMBIJYEABBP@DAJJHHDJCDBBFHHDNFHJJF@BCAGAAFKBUBEH@LCFBHLLJFJDBBDFPAFEFKCEFC@GEAICAEBMPEBK@CBEHI@EAGGWHAB@PABI@C@AC@KAAC@EBADAJAFABG@@AIAIEEBCEG@CCMAECACG@@CEAOGaEMECC@CBCACSBICMDI@@CFMDG@GCKGCEGC@CFCPNVBJCJILEBWDQKC@KJE@WGKGC@GHE@IACFCBSBGFAFG`ADABGDEAKII@@PDJDXAFSLMCEBIPCtALCBEAIIA@ABANADC@IASQGGO]EEEBABKTBDVX@BKEE@CBBFDF@DEVGNAD^TLMHABBBDBLCLGHKHMHICGBKDMLCEKAQHORKZAHFFFDF@FADBENAZCFQNAFBDDDBFFFF^ANDNCjFFD@AB@BH@@PBDEFBFBBABDDAFDDBHFAFBDANFDAJ@ELCB@DFLJJFABHLJH@DBDCDLDEBD@RBDJ@FFLIDBT\\HFFBLVJ@DABBB@FIBHH@FBBCDABDJHH@DABCFEBBFCDBDABDB@FEDBHABBBDFAPfBB@FENPCBJDLNPCFQLGF@LKFBFENGPBFAF'],
                    ['@@AIAAABCHI@EB@F@F@BCBGJAFCBEAGCCEMAAA@EOK@EFI@CMIC@ABBHAFOJAADGAOACQAKCEAACBCKCCACAABELABC@EGO@AC@IA@A@IFQBCCGGE@EAMCCCO@KGCDAD@JELAT@HBJDHJF`DB@FGH@HBNHLJJ@PBFFL@NFHHJBFCRHDDBBF@FBJ@D@NHF@HANDLJFBPCFDFBTBFCBECEIMAMFIEGFI@A']
                ],
                'encodeOffsets': [
                    [[109061, 36594]],
                    [[108620, 36306]],
                    [[108619, 36271]],
                    [[108021, 37060]],
                    [[108600, 36305]]
                ]
            },
            'properties': {
                'cp': [
                    106.285241, 36.004561
                ],
                'name': '固原市',
                'childNum': 5
            }
        }], 
        'UTF8Encoding': true 
    });
}));