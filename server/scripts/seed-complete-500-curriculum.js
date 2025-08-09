const database = require('../config/database');

// Grade 7: Intermediate Understanding (100 questions)
const grade7Questions = [
    // Types of Computers & Operating Systems (25 questions)
    { question: "Which computer is portable and easy to carry?", options: ["Desktop", "Laptop", "Supercomputer", "Mainframe"], correct: 1, difficulty: "basic" },
    { question: "What is the fastest type of computer for calculations?", options: ["Laptop", "Desktop", "Supercomputer", "Tablet"], correct: 2, difficulty: "basic" },
    { question: "Which operating system is made by Microsoft?", options: ["Linux", "Windows", "macOS", "Android"], correct: 1, difficulty: "basic" },
    { question: "What type of operating system is Linux?", options: ["Paid software", "Open source", "Mobile only", "Game only"], correct: 1, difficulty: "basic" },
    { question: "Which computer can serve many users at once?", options: ["Laptop", "Desktop", "Server", "Tablet"], correct: 2, difficulty: "basic" },
    { question: "What is a mainframe computer used for?", options: ["Small tasks", "Large business operations", "Mobile games", "Home use"], correct: 1, difficulty: "basic" },
    { question: "Which operating system runs on iPhone?", options: ["Android", "Windows", "iOS", "Linux"], correct: 2, difficulty: "basic" },
    { question: "What is an embedded computer?", options: ["Desktop PC", "Computer inside devices", "Laptop", "Server"], correct: 1, difficulty: "basic" },
    { question: "Which computer is used for weather prediction?", options: ["Laptop", "Desktop", "Supercomputer", "Tablet"], correct: 2, difficulty: "basic" },
    { question: "What does GUI stand for in computers?", options: ["General User Interface", "Graphical User Interface", "Global User Interface", "Good User Interface"], correct: 1, difficulty: "basic" },
    { question: "Which OS uses command-line interface mainly?", options: ["Windows", "macOS", "DOS", "Android"], correct: 2, difficulty: "basic" },
    { question: "What is multi-tasking in operating systems?", options: ["Running one program", "Running multiple programs", "No programs", "System programs only"], correct: 1, difficulty: "basic" },
    { question: "Which computer can fit in your palm?", options: ["Desktop", "Laptop", "Handheld device", "Server"], correct: 2, difficulty: "basic" },
    { question: "What is real-time operating system?", options: ["Slow response system", "Immediate response system", "No response system", "Delayed response system"], correct: 1, difficulty: "basic" },
    { question: "Which OS is commonly used in smartphones?", options: ["Windows XP", "DOS", "Android", "Linux desktop"], correct: 2, difficulty: "basic" },
    { question: "What is batch processing in computers?", options: ["Processing one by one", "Processing groups of jobs", "Real-time processing", "Interactive processing"], correct: 1, difficulty: "basic" },
    { question: "Which computer is commonly used in banks?", options: ["Laptop", "Desktop", "Mainframe", "Tablet"], correct: 2, difficulty: "basic" },
    { question: "What is distributed operating system?", options: ["Single computer system", "Multiple computers working together", "No computer system", "Virtual computer system"], correct: 1, difficulty: "basic" },
    { question: "Which OS can support multiple users?", options: ["Single-user OS", "Multi-user OS", "No-user OS", "Guest-user OS"], correct: 1, difficulty: "basic" },
    { question: "What is virtual machine in computing?", options: ["Physical computer", "Software-based computer", "Broken computer", "Old computer"], correct: 1, difficulty: "basic" },
    { question: "Which computer is designed for gaming?", options: ["Calculator", "Gaming console", "Server", "Mainframe"], correct: 1, difficulty: "basic" },
    { question: "What is cloud computing?", options: ["Local computing", "Internet-based computing", "Mobile computing", "Desktop computing"], correct: 1, difficulty: "basic" },
    { question: "Which operating system is free to use?", options: ["Windows", "macOS", "Linux", "iOS"], correct: 2, difficulty: "basic" },
    { question: "What is hybrid computer?", options: ["Only digital", "Only analog", "Both digital and analog", "Neither digital nor analog"], correct: 2, difficulty: "basic" },
    { question: "Which computer processes continuous data?", options: ["Digital computer", "Analog computer", "Hybrid computer", "Quantum computer"], correct:rriculum();lete500CudComp
seeedingRun the se
}

// ();
    }e.closeatabas   await dy {
         } finall;
s:', error)m MCQculuing curriError seede.error('❌     consol  
  r) {tch (erro  } ca   
  
     );ection Test`25 SelECH BOARD 20 ready for T(`🎯 Databaseloge.   consol;
     `)radesge for all gulum coveraive curricd comprehensg(`✅ Adde console.lo      tions}`);
 alQuestotabase: ${s in dattional ques`📊 Totle.log(      consoded}`);
  : ${totalAdeduestions add q Totallog(`📊   console.
     SHED!`);FINIDING  MCQs SEERRICULUM00 CULETE 5\n🎉 COMP`g(le.loconso
        
           });    
       });     
 ;t)(row.counesolve  else r          rr);
    ect(e rej    if (err)          ow) => {
  , r (erruestions', FROM q as countCT COUNT(*)LEet('SE  db.g          ct) => {
olve, rejee((resmist new Proions = awaiQuest const total  
     ntcou// Final           
           }
  edCount;
 ded += add    totalAd
        ions`);st queta.name}gradeDadCount} ${{addeAdded $e.log(`✅       consol    
          }  }
                   }
             ;
      e).messagor, erruestion:'ng qError addile.error('nso   co                 
     {iled'))int faIQUE constra'UNludes(ssage.incor.meif (!err              es
      licatkip dup     // S              {
  or)rr (eatch         } c      nt++;
 ou      addedC           
             }        });
                        );
                          }
                               ;
     olve()res  else                           
        ject(err);) re   if (err                             {
      (err) =>                            
    i + 1],ct,== q.correi], i =ptions[.oonResult, q[questi                          ,
       ?, ?)' ?,) VALUES (?,_orderect, optionext, is_corr_tid, option (question_nsINTO optioNSERT        'I                            db.run(
                          {
reject) =>((resolve, w Promise neitwa  a                      i++) {
 ength;tions.lq.op= 0; i < r (let i  fo           s
        nsert option // I                             
   ;
              })         
            );           }
                                );
 stIDolve(this.laelse res                                err);
t() rejec  if (err                         ) {
     rron(e functi                           ion],
questiculty, q.ff.diade, qa.gr   [gradeDat                         ,
?, ?)'ALUES (?, text) Vuestion_ qficulty,de, dif (graionsINTO questRT SE         'IN                  un(
     db.r                   => {
 ct) reje(resolve, omise(t new PrawainResult = uestiot q     cons           
    ionstque Insert           //               try {
           estions) {
a.quDatof grade q   for (const   
               = 0;
     ntoulet addedC            )...`);
questionsgth} estions.lenqu{gradeData.ions ($questeData.name} ng ${gradddie.log(`📚 Aol       cons
     { grades) deData of (const gra     for       
   dded = 0;
 totalA  let     
       ];
         e 11" }
  ame: "Grad nstions,e11Que: gradtionsques 11, de:     { gra       ,
" }Grade 9s, name: "one9Questiads: grionstrade: 9, que        { g},
    Grade 8" e: ", namde8Questionsns: graiode: 8, quest       { gra
      7" },"Grade, name: uestionsns: grade7Q7, questiode: gra          { es = [
  st gradon    c  
       );
   .getDb(databaset db =        cons;
 onnect().c databasewait       ary {
    t  
 ====');
  =========================='========le.log(socon);
    LUM MCQs'RRICU0 CUTE 50ING COMPLE SEEDle.log('🌱
    consoum() {Curricul00mplete5dCon seectioc fun;

asyn }
]"medium"difficulty: , : 3rectcor these"], "All of", "Varietyy", , "Velocitolume"ions: ["V?", optdatas big izeacterarch chon: "Whistique
    { " },basiculty: ", diffic, correct: 0"]ets"No datasets", asat "Medium dsets",l datats", "Smaltase["Large daptions:  data?", ois bigat "Wh question:     {" },
lty: "basicfficuct: 3, dicorre"], hese"All of t, y"cessibilit"Ac", iveness"Cost-effect", "Scalabilityptions: [it?", ooud benefWhich is cl " { question:  ic" },
 ty: "bas 2, difficul, correct:mputing"]"Air coting", ed compunet-basg", "Interomputinher c"Weatng", ky computiptions: ["Sputing?", ooud coms clt i: "Whaionuest   { q
 asic" },: "bfficulty dict: 3,"], correse"All of theing",  processy", "Datannectivit"Consors", ons: ["Seent?", opticomponh is IoT "Whic n:questio,
    {  }c"ty: "basiicul, diffct: 2"], corredevices"Smart ", smart deviceConnected s", "tterneon in"Things ",  thingst for: ["Interne?", optionshings T Internet of "What is question:,
    {medium" }culty: "iffi: 3, drrect co"],heseAll of t" vision", "Computeressing", e procanguagl lura"Nating", achine learnns: ["Mio", optation?is AI applicWhich question: "  {   ic" },
culty: "bast: 1, diffi"], correcce intelligen "Plantigence", intellimale", "Anntelligencine iache", "Mncgen intellis: ["Humaon?", optienceigal intell artifici"What is: estion   { qu},
 : "basic" lty, difficu, correct: 3hese"]f tAll opeed", " "Scuracy",, "Aciency"fic: ["Efptionsefit?", otomation bench is au"Whiestion:  qu" },
    {asiclty: "b, difficucorrect: 1al work"], Physic work", ", "Humanocesses"work prc tomatiork", "AuManual wns: ["tio op?",omationWhat is autn: "   { questio
 " },cty: "basi 3, difficulct:e"], correthes"All of ,  change"lturalnge", "Cuconomic chage", "El chancia"So options: [t?",logy impacs techno"Which istion: { que   ic" },
 basulty: " diffic correct: 1,l art"],tang digiCreatintent", "digital co "Writing y",fectivelgy efg technoloUsin", "igital booksing dReadions: ["", optacy?literal s digit "What iquestion: },
    {  "basic"iculty:3, diffrect: ], cor these"ofy", "All cessibilitAcy", "cienc"Effi, rency"pa"Transoptions: [benefit?", vernance gois e-ich on: "Wh { questi   " },
iculty: "bas, difficct: 0re"], corntnt governme"Efficiement",  govern", "Easyentnmoverail gices", "Emservovernment onic gectr"Elons: [, optiance?"rnveis e-got n: "Wha { questio
    },"basic"ty: cul 3, diffiect:rrhese"], co "All of tfactors",Educational actors", "ographic f "Getors",c fac"Economi options: [divide?",s digital ch affectWhiuestion: " },
    { q""basiculty: fficrect: 0, di"], corternet split, "Infference"r di, "Computeon"atiar"Digital sepp", ess galogy acc"Techno: [ptionsdivide?", o digital t isWhastion: " { queum" },
   ty: "medicul 3, diffirrect:], coese" of thll"A, g you are", "Somethinyou have""Something ow",  kng you"Somethinions: [ optor?",ion factthenticathich is aun: "W  { questiom" },
  : "mediu difficulty 0,correct:sis"], put, Analy, Inrol"Contss",  AcceInternal,l, entra"C", plicationApet, uter, Intern"Compty",  Availabili, Integrity,ality"Confidentis: [ion", opt CIA triad?n: "What isquestio},
    { " asicy: "b, difficultrect: 3se"], corl of theity", "Al"Availabilrity", egity", "Intonfidentialons: ["Ctie?", opcipl prinityurWhich is secquestion: "    { " },
siclty: "baficuif, d 3ct:, correof these"]ty", "All curi seformationrity", "Intwork security", "Ner secu["Computens: io?", optbersecurity is cyion: "Whatst,
    { que"basic" }: cultyiffi 1, drrect:], coAT"NAT", "PCP", ""DNS", "DH options: [ly?",tomatical au IPgnsWhich assi "{ question:
    basic" },iculty: " difft: 0, correccol"],n Prototiofiguraed Host Con"Dedicat", rotocolion PfiguratonHost Cd tribute, "Disl"tion ProtocoraConfigut "Direct Hos, Protocol"ation gurfiic Host Con: ["Dynamptions", oCP?"What is DHestion: },
    { quum" mediiculty: "ff di 3,orrect:se"], cof thee", "All Authoritativ "LD", "T["Root",ns: ptiope?", oer tyrvDNS sehich is estion: "W    { qudium" },
culty: "mediffict: 1, , corre"]h structure", "Messtructuree", "Ring cture stru "Treture",Flat strucptions: ["archy?", oNS hier"What is D question: " },
    {dium"meulty: iffict: 3, d correcese"],"All of th"BGP", ", FP", "OSP"RIs: [optionotocol?", s routing prWhich iquestion: "
    { m" },: "mediudifficultyect: 0, , corring"]RoutDomain ed Inter-trollon, "Cin Routing"omaized Inter-Dentral "Cg",in Routin Inter-DomaClassifieduting", "Ron er-Domaiss Int["Classles: R?", optionis CIDon: "What  { questi  um" },
 ulty: "mediiffic 0, drect:], corer"rvP seDHC "rver",DNS seway", "lt gate"Defauk", net masions: ["Sub", opts subnet?atech calculhition: "Wes    { quium" },
: "medlty: 0, difficu, correct"] creation"Networkeletion", rk d, "Netwo"binationork comon", "Netwk divisi: ["Networptionsting?", onetat is sub: "Wh{ question    " },
ty: "mediumicul 0, diff], correct:"224-239", -223"928-191", "1"12"1-126", ns: [?", optioA IP rangess Cla"Which is { question:    " },
 ium"mediculty: ect: 2, diffcorr], "6"", "5",  ["3", "4options:v4?", n IP iny classesow ma "H question:
    {sic" },ba": ficulty, difrrect: 1 co],ng"dressit adng", "Porddressi", "MAC aaddressing"Logical g", ressinal add["Physicns: ", optioressing?IP addhat is tion: "W
    { quessic" },culty: "bact: 3, diffi, corre of these"] "AllP","HTT "UDP", ","TCPns: [io", optl?cotwork protonech is Whiquestion: " { " },
   "basicty: cult: 2, difficorrec"], etwork rulerule", "Non unicati"Comm", leruoftware le", "Sware ru ["Hardtions:ocol?", opnetwork prothat is n: "Wtio    { ques" },
sicty: "baifficul 3, d"], correct: of these", "Allg", "Mesh"Rinr", : ["Sta, optionslogy type?"h is topoion: "Whic
    { questbasic" },"lty: difficuect: 1,  corrice"],twork devocol", "Neork prott", "Netwlayoul hysica "Network ppeed",twork s["Neions: ogy?", opt topol networkn: "What isioest
    { quons)(35 questi Impact hnology & Tecking // Networ   },

 y: "basic", difficult, correct: 3of these"], "All ", "AVG", "SUMNT"ns: ["COUon?", optionctigate fu is aggre: "Whichionest
    { qum" },diu"melty: difficuorrect: 3, "], cthese", "All of "INTERSECTN",  "UNIO: ["JOIN",, optionsle data?"abombines t: "What cquestion {    },
 medium": "lty 3, difficurrect:], cof these"", "All o", "RIGHT", "LEFTNER"IN[options: type?", oin SQL j "Which is estion:    { qu" },
mediumulty: " 0, diffic correct:],ioning"tit", "Par"Indexingtion", rmaliza", "Denolizationrma["Notions: ", op redundancy?s datat reduce "Wha { question:   },
 ""mediumifficulty:  3, dct: corre"],se thell of"A"3NF", "2NF", "1NF", , options: [l form?"h is norma "Whicon:questi},
    { "  "mediumulty:ict: 0, diffcorrecding"], "Data hi, a deletion" "Dation",licatup", "Data dationorganiza ions: ["Dat?", optonizatimalnoratabase  is dtion: "What { ques
   " }, "basicficulty:ct: 1, dif], corree key" "Compositdex key","Inn key", "Foreig", imary keyns: ["Prptioships?", oelation table rntainsai"Which mstion:  que" },
    {y: "basicultt: 1, diffic, correce key"]positComx key", ""Indeable",  another te toferencr", "Reifienique ident: ["Uionskey?", optforeign is hat estion: "W,
    { qubasic" }lty: " difficu 0,rect: key"], cor, "Indexite key""Composkey", eign "For, y" keryrimations: ["Pss?", oprd uniqueneecoh ensures r "Whicion:{ questc" },
    asi"blty: fficu, dirrect: 0e key"], compositCokey", ""Index ence", eign refer"For", dentifier iiqueUnions: ["y?", opt ke is primaryhatn: "Westio},
    { quc" asi "bulty:, difficrect: 2G"], cor"HAVINOUP BY", "GRRDER BY", ERE", "Ons: ["WHiota?", optse groups dahich claution: "W   { ques },
 "basic": tyficulifect: 1, d corr"], "HAVINGUP BY",GROY", ""ORDER B"WHERE", options: [",  sorts data?hat clauseestion: "W},
    { quc" lty: "basiicudiff 1, t:Y"], correcP BOU, "GRBY"RDER ", "OHERET", "W"SELEC[ions: data?", opters ltficlause "Which on: uesti},
    { q" basicculty: " 0, diffict:, correTE"]", "DELE", "UPDATE "INSERT"SELECT",, options: [ects data?"command selWhat question: "  { c" },
  y: "basidifficultct: 3, e"], correhes "All of tLETE","DE"UPDATE", ", NSERTtions: ["I", opcommand?ML ch is Dtion: "Whi
    { quesdium" },"meficulty: rect: 1, dif cor], Language"erya Qu "Date", Languaga Control"Dat",  Languagenipulation", "Data Mage Languaitionin["Data Def, options: ?""What is DMLuestion: },
    { q"basic" ty: ficuldifrrect: 3, "], coll of theseDROP", "AER", "ATE", "ALTCREs: [", optionL command?""Which is DD:  question" },
    {m "mediuiculty:ffect: 0, di], corrguage"a Query Lane", "Datl Languagata Contro "D Language",pulationMani", "Data n Language Definitio"Data [s:L?", optionWhat is DDion: "{ quest
    ium" },"medfficulty:  diect: 3,, corrof these"]L", "All , "DC", "DML"s: ["DDL", optiontegory?mand ca comWhich is SQLquestion: " { c" },
   ty: "basi, difficult: 0"], correcy LanguageQuer", "System y Languagerd Quernda", "Staery Languagele Qu"Simpage", ry Langud Quectureons: ["Stru", optifor?and does SQL ston: "What     { questiium" },
edculty: "m, diffi: 1"], correctk usageor"Netw", Disk usage"orithm", by algge "Memory usa", sagee uons: ["Timity?", optilexs space compon: "What isti    { quem" },
: "mediuiculty diff: 0,"], correct n)log"O(²)", (n)", "O(n(1)", "Ons: ["Ooptioplexity?", ome cst timh is be "Whicquestion:
    {  },medium"iculty: " diffct: 1,"], correeusag "Disk age",emory usithm", "Mlgortaken by a", "Time e usageac"Sp options: [lexity?",s time comp: "What i{ question" },
    m"mediufficulty: 3, dicorrect: se"], f the "All o",sortrtion t", "Inseorion s", "Selectrte soBubbls: ["?", optionng algorithmich is sorti"Wh: { question    },
 : "medium"tycul, diffirect: 1, coren"]No childrode", "ildren per nhree ch node", "Tdren pero chilnode", "Tw child per ne["Otions:  tree?", opis binaryat stion: "Whque  { " },
  "mediumifficulty: , dorrect: 3"], chesef t"All oorder", "Postorder",  "Pre", ["Inorderons:?", optithodaversal mes tree trich i "Wh { question:
   "medium" },ulty: : 1, difficcorrect, cture"]truueue s "Qure",ructst, "Stack "ture-based strucde", "No structure: ["Array?", optionsked listWhat is lin"question: 
    { "basic" },culty: ffict: 3, die"], correhesAll of t", "Fronteue", "Deququeue", ""En options: [peration?",s queue oich iion: "Wh    { quest
asic" },"bculty: iffi1, dct: re"], correo structu"N", reructudom stane", "RFO structurure", "FILIFO struct" [tions:re?", opstructudata ue t is question: "Wha que" },
    {sic "ba difficulty:t: 3,correcthese"], "All of "Top", ", "Pop", h"Pustions: [ op",operation?ch is stack ion: "Whi quest  {
  c" },asilty: "bfficurrect: 1, di"], coture, "No struce"tructurm s"Randoructure", "LIFO stucture",  strs: ["FIFO, optionstructure?"ack data t is ston: "Wha{ questi  
  asic" }, "bficulty:, difct: 3 corree"],All of thesearch", "lete", "S"De t",er"Ins: [, options?"perationis array o: "Which question { },
   asic" : "bficulty, dif, correct: 1lements"]", "Wrong eNo elementsents", "ion of elemCollectt", " elemen ["Singlens:?", optiois arrayhat estion: "W
    { quasic" },ficulty: "bect: 3, dif], corre" of thes "Allueue",, "Q", "Stack"s: ["Arrayon", opti structure?linear data "Which is on: questi  {" },
  y: "basicdifficultct: 0, ], correng""Data hidiopying", ata ction", "Data dele", "Ddzation methoa organis: ["Daton?", optita structure"What is dastion:   { quetions)
  es(35 ques & SQL tur/ Data Struc    /c" },

ty: "basidifficulct: 3, ], correof these"", "All or", "def"fif", : ["?", optionsthon keywordch is Pyn: "Whiioest   { qu" },
 siciculty: "baiff, d, correct: 0="]", ">=", "!="=", tions: ["=rator?", opt ope assignmenat ision: "Wh quest
    {c" },ulty: "basidiffic: 3, , correctse"] thell of=", "A"!=", ">"==", s: [", optionr?n operatocompariso"Which is  question: " },
    {c "basity:3, difficulect: "], corrAll of these", "ot"or", "nand",  ["ns:, optioerator?" opboolean "What is uestion: },
    { qasic""bulty:  3, diffic"], correct:hesel of t, "Al", "*"", "-: ["+optionsor?", thon operats Py "Which iestion: { qu   " },
umty: "medificulif0, drect: re"], corass structuure", "Clition structCondure", ""Loop struct, ing itself"n callctio: ["Fun?", optionsons recursihat iion: "W
    { quest" },: "basiccultydiffi 3, "], correct:ese thl oft()", "Al"inpu nt()","prin()", : ["lensioopttion?", unc-in fbuilth is on: "Whicsti{ que   dium" },
 lty: "mecuct: 1, diffire], corWrong form"", m""No for forms", m", "Many: ["One for", optionsism?rph is polymo "What { question:
   medium" },": ulty, diffic 3rect:corese"], f thAll oel", ", "Multilevltiple""Mu"Single", : [ionsoptpe?", ance tynheritich is ition: "Wh  { ques" },
  um"mediy: difficult0, correct: __"], build"__, _create__""_, ", "__new__it__"__inoptions: ["hon?", r in PytstructoWhat is constion: "que,
    { edium" } "mficulty:rect: 3, dif"], corhese, "All of totected"vate", "prc", "pri ["publis:t?", optionepodifier concaccess mhich is "Westion: 
    { quasic" },ficulty: "b 0, dif, correct: "new"], "def","object", ["class": ptionsPython?", oss in la creates catWhtion: "ques },
    { "ediumculty: "mct: 3, diffi, corre of these"] "Alleritance",ect", "Inhbj"O", : ["Class", options concept? OOPh isWhic: "  { question},
  asic" ulty: "bficdif 0, t: correc"],"loadequire", de", "rlu", "incimport ["s:optionPython?", dule in ports mo"What imtion: { ques
    }," c"basity: ul, difficorrect: 3, c of these"]"os", "Allrandom", math", "options: ["le?", duon mohich is Pythstion: "W que },
    {"lty: "basic, difficurect: 0)"], cord()", "loa", "read(", "file(): ["open()", optionsn Python?le ifit opens haon: "W{ questi},
     "basic" fficulty:rect: 3, dicorse"], "All of the, "a",  "w"",ptions: ["r, omode?"pening  is file ohichn: "W   { questio,
 "medium" }ty: ul, difficorrect: 0g"], cist copyining", "Lst sorton", "Litidele", "List hortcuttion sist creaions: ["Lon?", optcomprehensiat is list "Whtion: { ques,
    ic" }lty: "basdifficu: 3, orrect cf these"],"All ot()", plier()", "s", "lowpper()tions: ["uhon?", opethod in Pyting mWhich is strestion: " { qu" },
   um "mediulty:ifficct: 1, dcorre], ction"Module fun", "ethod"Class mction", funAnonymous nction", "ed fu"Nam [ons:", optin?bda functio is lamWhat"uestion: ,
    { qum" }lty: "medi 0, difficu"], correct:urnf-retde", ""for-while"if-else", cept", "try-extions: [ython?", options in Ps exceple"Which handion: est
    { qu" },csi"bay: 0, difficultorrect: "func"], ce", in, "defction"f", "funions: ["deon?", optn Pythction iines fun def"Whatstion: 
    { que"basic" },: fficulty2, di], correct: er"th", "NeiBothhile", "for", "ws: ["", optionin Python?oop is l"Which n: uestio q   {c" },
 ty: "basiifficul1, dect:  corr"],Variablemment", ""Co",  structure", "Codeation["Decor: ", optionsn Python? iindentationWhat is ion: "uest{ q,
    " }basiclty: "difficuect: 1, ||"], corr, "()""{}", "", "[]ons: [ optin?",Pythory in onates dicti crea "Whichquestion:
    { "basic" },lty: ficu, dif, correct: 1", "Set"]Dictionary"e",  sequencmmutable"Ice", quentable se"Muions: [", optn?e in Pythoplhat is tuestion: "W { quum" },
    "medifficulty:diect: 2, , correger"]ist", "Intuple", "L, "T"String"tions: [", op Python?le ins mutabich i "Whion: quest},
    {basic" lty: " 0, difficu correct:", "||"],"(), ", "{}"ons: ["[]on?", optiin Pythes list hat creat: "W  { question},
   "basic" difficulty:rect: 3, hese"], cor tl of, "Alool", "b "str"",t"in [", options:?ta type da Pythonh ishic"Wuestion:  { q" },
   ty: "basiciculff 1, diorrect:, cabase"]", "Datstem sy"Operating", ing languagemmProgracies", ""Snake spens: [tio?", op Python isWhaton: "questi{ )
    tionsesqus (30 ndamentalogramming FuPython Pr//  [
    s =1Questionrade1
const guestions)e (100 qr Sciencomputeal C11: Forme ad

// Gr
];dium" } "meiculty:, diffrrect: 0], coanager" "File mger",s mana", "Procesger mana", "MemoryI/O manager"ons: [", optit/output?inpuch manages tion: "Whiues { q" },
   sicty: "ba difficulect: 2,"], corrork softwareNetware", "or hardw fm software "Systeftware",socation li", "Appsoftware"Hardware  [tions:", opr?rive d device"What isn:  questio },
    {sic""bay: ifficult: 3, drrectse"], coAll of the", "te, "Wri, "Read" ["Create"options:", on?e operatiis fil: "Which  { questionc" },
   si: "badifficultyorrect: 0, te"], c, "File dae"File siz "ile type",", "Frne contaions: ["Filem?", opti systetory in fileecat is direstion: "Wh qu   {ic" },
 lty: "basdifficu, orrect: 3 cf these"],, "All oXT", "E "NTFS"FAT","ons: [?", optiype t file systemhich isn: "Wquestio},
    { "medium" y: ltdifficu, : 1"], correctrocess tool"P", y tool"Memoron tool", onizati", "Synchrraffic light ["Ts:, optionOS?"ore in emaph "What is sestion:
    { qu" },edium"m y:3, difficultect: se"], corr"All of theon", etecti", "Dance"Avoid, tion"Prevenoptions: ["dlock?", ts deah prevenon: "Whic   { questi
 " },"mediumfficulty: 1, diect: "], corrationrecess cng", "Pros runni", "Procesitelyndefinaiting iess wrocon", "Pompleticess croions: ["P?", optin OSis deadlock : "What question,
    { ium" }: "medulty0, difficect: ger"], correvice mana"Der", "File manager", s manag, "Procesager"ory man"Memtions: [?", opanagement memory mndles: "Which hastion{ que},
    " um"mediy:  difficultorrect: 2,mory"], c", "No meusing disk memory ndedry", "Exte memo "Fake",al memory"Rens: [, optioemory?"al m virtut is: "Whastion   { que" },
  "medium difficulty:rect: 0,iler"], corompnker", "Cder", "Li"Loaduler",  ["Scheptions:s?", osse proceedulesscht nenpohich comion: "Wuest  { q
  },c" "basificulty: 1, dif], correct: s"cesself pro"Hasses", , "No proceocesses""Multiple process", : ["One pr?", optionstaskingt is multi"Whastion: ,
    { queum" }medifficulty: "ect: 3, di"], correse"All of th", itinging", "Way", "Runnad: ["Renstio?", opte stas processhich ion: "W{ questi" },
    mediumfficulty: "rrect: 0, diche"], com in caPrograPU", "am in C", "Progrdiskn m ograry", "Prom in memoogras: ["Prionopt", ?rocess in OSat is pestion: "Whqu
    { c" },lty: "basidifficu: 3, ect], corrf these" "All ogement",na"File ma", mentnages maoces"Pr, ment"nagemory ma ["Me", options:tion? funcs OS: "Which i{ question},
    "basic" ulty: , difficrrect: 1"], cowork "Net",rdware, "Haftware"System so", "ftwareication soons: ["Applopti, ystem?"ting ss operaon: "What i   { questi,
 "medium" }iculty: t: 0, diffp"], correchilations, "XOR reationship""NOT relp", ionshi-AND relathip", "OROR relations"AND-ns: [", option's law? Morgat is Den: "Wha   { questio },
 edium""miculty: , diff: 2ct"], correutive"Distribent", empot", "IdAssociative", "ativeommuttions: ["C= A?", op is A + A  lawhich Booleanion: "W
    { quest},m" iumed"ifficulty: t: 0, dcorrecse"], e", "Fal"1", "Tru"0", s: [", optionputs 1,1?t for inutpuR gate ois XOn: "What estio qu" },
    {"mediumculty: t: 2, difficorrec"], ND", "XOR"OR", "NA"AND", s: [?", option gateersalivch is un"Whi{ question:  },
    : "basic"ltycu1, diffiorrect: output"], ce oubl"Dtput", ou"No t", osite outpupp"Ooutput", "Same ns: [ptio ounction?",OT gate fWhat is N "ion:estqu,
    { "basic" }: , difficultyect: 1corr,  "False"]rue","T", 0", "1: ["ions,1?", optuts 0ut for inpoutp gate What is ORuestion: "    { qc" },
 "basi difficulty:1, correct: "False"],ue", 1", "Tr", "ns: ["0,1?", optiouts 1r input foND gate outp is AWhaton: " questi  {
  c" },y: "basilt3, difficucorrect: "], hesel of td No", "AlYes an, "se"nd Fal, "True and 1""0 ations: [lues?", opn vae Booleaich arestion: "Wh   { qu,
 " }mediumfficulty: "ct: 1, dia"], correlor algebr", "Coext algebra"Talgebra", Logic a", " algebrs: ["Number", optionn algebra?leaat is Bootion: "Wh
    { quesstions)s (25 queem SystatingLogic & OperBoolean  //  },

   m" "mediufficulty:ect: 1, diry"], corrl memoua "Virtemory",", "No mstructionsinnd  a for datahared memorymory", "S meeparate["Sons: re?", optictuchiten Neumann arat is von: "Whtioques
    { " },"mediumdifficulty: : 1, "], correctaskslf ts", "Hao taskusly", "Nsimultaneoasks "Multiple te task", : ["Onionsing?", optssallel proceWhich is par: "ion { quest" },
   "basicty:  1, difficulcorrect:alf CPU"], ", "H CPUres", "NoPU cotiple C", "MulPU ["Single Ctions:, op"or?ocessmulticore pr"What is  ion: quest   {},
 : "basic"  difficultyrect: 1,"], corelsits", "Pixtz", "B "Herytes",["B", options: ? clock speedasuresh unit meon: "Whicesti    { qu,
asic" }iculty: "bdiffcorrect: 1, "],  speeded", "Diskmory speMency", " freque, "CPUme display"ns: ["Tiiod?", opt speeat is clock"Wh estion: qu
    { },ium"y: "medult, diffic: 3rectse"], corf the", "All o corestiple"Mul", eliney", "Pipche memors: ["Caoptionormance?", es CPU perfhich improvn: "Wioquest    { " },
 "mediumculty:firect: 1, difg"], cor processin "Nong", processi"Serialcessing", ction protrulel insralflow", "Pa["Water ns: ", option CPU?pelining iWhat is piestion: "qu,
    {  }um""medilty: ifficut: 1, drrecons"], constructi, "Mixed iructions" "No instctions",tru"Simple insuctions", lex instromps: ["C?", optionRISC feature"Which is n:    { questio" },
 y: "mediumltdifficurrect: 0, cods"], ommanNetwork c " commands",s", "Diskandry comm"Memo, U commands""CPptions: [n set?", onstructiohat is iuestion: "W
    { qsic" },y: "badifficultorrect: 2, "], c4-bit CPUt CPU", "632-biit CPU", "PU", "16-b"8-bit Cons: [", optit system? 32-bi: "Which istionues
    { qm" },diuiculty: "met: 1, diffrec"], corspacesk e", "Diemory siz, "Mata width""CPU dth", ["Text lengptions: , o computer?"ize in sis word"What ion:  quest},
    {c" lty: "basi 1, difficuorrect:"16"], c", "8", "2", "4options: [ nibble?", n oneny bits i "How ma{ question:
    " },medium "difficulty:orrect: 1, value"], calf value", "H, "Double ntation"mber represeative nu"Neg", g two ["Addinoptions:ement?", pls two's com "What iuestion:{ q },
    dium"meulty: ", diffic: 0ctit"], correize br bit", "Solo "Ca bit", "Extrt", bins: ["Signioy?", optn binartive iegapresents nWhich reon: "{ questim" },
    ty: "mediu0, difficul correct: , "17"],6", "14"["15", "1: tions op decimal?",11 inary 11 binhat istion: "W ques },
    {edium"culty: "mct: 1, diffi"], correigitsact d"Subtrde by 2", "Divis of 2", owerby piply , "MultAdd digits"options: ["mal?", o deciy tt binaro converion: "How t    { questc" },
 "basidifficulty:, ect: 1, corr0", "16"], "1"2", "8" options: [",ber base?ctal num is o "Whatquestion:" },
    { ty: "basic2, difficul], correct: Z"", "", "A"H["G", s: tion?", opimal digith is hexadec"Whicuestion:  q  {um" },
   "medificulty:ect: 0, dif"], corr111101", "", "1010", "1100ions: ["10?", optryn bina 10 idecimal"What is question:  },
    { ic"y: "basficult 2, dif correct:", "16"],, "28", "10": ["tions", opr base?numbeinary is bhat "W stion:   { que" },
  "mediumficulty:t: 2, dif"], correcd disk", "Har"Register", "Cache"RAM", options: [?", omputermory in castest mes fh ion: "Whicti
    { ques },ium"med: ", difficulty: 0"], correctn-Save", "Load-Ru-Store"Read-Writetput", s-Oucesput-Pro, "Inde-Execute"-Decochions: ["Fet", optcycle?ine is mach"What ion:  { quest
   ium" },"medy: difficult 3, t:rec corse"], of the "Allers",egist"R", LU", "CUons: ["A", optiponent?PU comh is Cion: "Whic { quest },
   medium"culty: ", diffirect: 1corput"], splay outata", "Di", "Store dsationPU operl C, "Contrors"e numbealculat"Coptions: [nction?", l Unit fuontrois C: "What  question },
    {ium"medulty: "fficect: 0, di], corr Unit"plied Logic", "ApLogic Unit"Automatic it",  Logic Undvanced", "ALogic Unitithmetic "Ar: [?", optionsand fores ALU stat doion: "Whuest { qtions)
   es25 qu (Systemse & Number rchitecturer A  // Comput= [
  Questions ade9
const gruestions)pth (100 qtual Dee 9: Concep
// Grad];
" }
: "basiculty difficct: 1,"], corregputin, "Old comomputing"ar csers", "Fnear uputing ng", "Comomputi ["Center cs:", optionputing?s edge comhat i: "W question" },
    {asicty: "bficulif: 3, d, correcthese"] t "All of"submit",ssword", ", "patextns: ["", optiot type?s HTML inpuh i "Whicn:estioqu{     " },
 "basic difficulty:t: 0,rrec>"], co"<data>", , "<fieldut>"<inp, "m>"s: ["<for", optionm in HTML?s forWhat createtion: "
    { ques },ic"culty: "basfi, difrrect: 0, cont"]# comme "","/* */", t"// commen", ->s: ["<!-- -optionx?", ntant sy HTML commech is"Whiion:  quest
    {"basic" },lty: , difficuect: 1orrp"], cackuual b "Manp", "No backuervice", backup sOnlinebackup", "ocal : ["Loptionsckup?", loud ba is catstion: "Wh  { queic" },
   "basty:icul, difforrect: 1<cell>"], ch>", "", "<td><tr>", "<t["options: in HTML?", ll s table cereate "Which cn:  { questio},
  asic" y: "bltcut: 0, diffirecow>"], cor "<r"<th>",", "<td>r>", ions: ["<t", optL?e row in HTMreates tablhat cion: "W { quest
   "basic" },iculty:  0, diff, correct:"]data>grid>", "<>", "<, "<tab": ["<table>, optionsML?"ble in HT creates tach"Whiuestion:    { qic" },
 "basficulty: ect: 1, dif], corres""No resourc", urcesesod rimitees", "Lsource reustabl, "Adj resources""Fixedns: [ioptd?", oty in clouilis scalabon: "What i questi },
    {""basicculty: iffict: 3, drrethese"], co, "All of Drive""Oneropbox", ", "DDriveGoogle ["tions: ice?", oporage servstdes cloud h proviWhiction: "ques    { " },
y: "basicultt: 1, diffic, correcg"]inmputMobile co "uting", comp", "Cloudonmentenvirting pu comual"Virt",  computing"Real: [nson?", optiotilizais virtuahat tion: "W
    { ques" },"basicfficulty: di3, , correct:  of these"]rid", "All "HybPrivate",", "s: ["Publiction type?", opdeploymentis cloud ch ion: "Whi { quest},
   c" "basiculty: ct: 0, diffi], correService"rage as a  "Stoice",Serv a rity as"Secue", ervicstem as a SSyice", "rve as a SearSoftwns: [", optiofor?"aS stand at does Saestion: "Wh qu {},
   "basic" lty: icuiff3, drect: or"], c of these, "All"IaaS"", PaaSaS", "ions: ["Sadel?", opt service moudWhich is cloquestion: "" },
    {  "basicficulty:: 1, difcorrectmputing"], "Air coomputing", ather c, "Wecomputing"based ernet-"Int", ing"Sky computoptions: [ng?", ticloud compu is : "What question {,
   ic" }"bas:  difficultyect: 1,st>"], corr>", "<li>", "<li<ul, "["<ol>"", options:  list?redates unordere"Which cquestion: " },
    { asicculty: "bfit: 1, dif"], correcto><phoc>", ">", "<pi", "<img ["<image>", options:ML?HTage in  displays imion: "What
    { questc" },y: "basificultif: 1, dectrr"url"], co, k""lin"href", rc", s: ["s, optionstination?"ink de specifies lattribute: "Which ionest qu {
   basic" },ty: " difficulect: 1,l>"], corrur"<f>", "<hre, a>""<>", "<linkptions: [TML?", o in Herlinkates hyp creWhat"stion: ,
    { que"basic" }ifficulty: ct: 1, dcorrepan>"],  "<s "<br>","<h1>","<p>", ptions: [eading?", ocreates hich tag tion: "Wh    { quessic" },
lty: "bacu, diffi, correct: 1"<div>"]<hr>", >", "<br""<p>", ons: [, opti HTML?"reak in line bates"What cren: uestio,
    { q "basic" }iculty:t: 0, diffec corriv>"],", "<d, "<br>, "<h1>""<p>"options: [, ph?"graeates parach tag cr"Whi uestion: },
    { qsic"ulty: "bafic diforrect: 1,, c<html>"]ody>", "<btitle>", "", "<: ["<head>ons?", optie titleebpagfor wis used What tag : " { questionc" },
   y: "basilt2, difficurrect: >"], co", "<title<html>>", "<body, "head>"ns: ["<", optioent?cumML dotarts HTch tag sion: "Whi quest  {
  }, "basic" ulty:, difficcorrect: 0], "Languagekup  Marme Text "Ho",p Language MarkunsferHyper Tra"uage", up Langt Mark, "High Texage"p LangukuarHyper Text Mptions: [" ond for?",TML staoes Hon: "What duesti q  {)
  ions questmputing (25 Cloud Co &TML Basics
    // Hc" },
"basiculty:  2, diffirect:, cor"]toothBlue "ptic",", "Fiber oiFi"W, rnet"Ethe[": ons, opti speed?"test networkrovides fas: "Which pquestion    { " },
cty: "basifficulct: 0, di], correub"rk h"Netwo", k bridgetwor "Ne exit",Network", "int entrance poetworktions: ["Ning?", optworkteway in ne"What is ga: stion{ que,
    asic" }iculty: "b 1, diff correct:ayer"],rt lanspoer", "Tr"Network layer", a link layDat, "yer"al la: ["Physic?", optionstionor detecandles errich layer h: "Wh{ question  },
  "basic" fficulty: rect: 0, diwork"], core Neted Privat", "Verifiate Network Privualork", "Visivate Netwery Pr "Vk",ate Networrtual Priv["Vi, options:  VPN?"What ision: "   { quest,
 " }: "basic difficultyrrect: 3, coof these"],"All rewall", "Fion", ypti"Encrirus", Antiv": [", optionsk security?vides networ prohichn: "W  { questio  " },
basicy: "ultfic difect: 0,col"], corron ProtoiguratiConfa Host , "Datol" ProtocionguratnfiCogital Host , "Di"oltion Protocfigurat Conrect Hos, "Dirotocol"ion Pfiguratc Host Con"Dynami: [nstio opCP?","What is DH: tionques{  },
    y: "basic"ult: 3, diffic"], correctpeaterer", "Re"Routitch", ", "Sw["Hubs: option signal?", ies networkplife am"Which devicstion:   { que" },
  "basicty: ficul, dif correct: 1"],etwork n, "Simplework""Secure net", Sub network"", etwork["Super n options: ?",t is subneton: "Whaquesti" },
    { "basiciculty:  diffcorrect: 1,, TTP"]", "H, "IPP", "TC["UDP"ns:  optio?", protocoled-orient connectionch isWhin: " { questioc" },
   si "bay:ifficult 0, dct: correress"],, "Addl""Protocodevice", "Network t", ["Data uniions: ", optorking?cket in netws paWhat iquestion: "   { ,
  "basic" }ficulty: 2, dift:orrec], cTransport"rk", ""Netwo, a Link"l", "Datica ["Physoptions:etwork?", in nting  rouyer handles laich "Whon:ti  { quesic" },
  culty: "basct: 0, difficorre"], mteSystwork "Direct NeSystem", gital Name  "Di",work SystemData Net", "me System"Domain Na options: [DNS?",s "What iuestion:  q" },
    {icy: "basult: 1, difficcorrect"], ablexial c"Coa r optic",bei", "Fi, "WiF"Ethernet"options: [ogy?", s technollesh is wiren: "Whic{ questio" },
    ty: "basicfficulrect: 2, dile"], cortwork cab", "Netion systemy protec"Security", are onlftwy", "Soonlare ardw ["Hns:tio", opirewall?hat is fion: "Wstque
    { c" },"basi: ifficultyct: 2, dP"], correMTP", "TC"S", "FTP ["HTTP", tions: opr email?",ed focol is us proto "Whichn:ioestqu   {  },
 "basic"y: ficultif 1, d"], correct:location", "Data a type"Datpeed", sfer s trane", "Data ["Data siz, options:orking?"in netwbandwidth  "What is n:estio{ qu
    asic" },iculty: "bt: 0, diffeccorriangle"],  "Tr",re"Squa"Circle", "Star",  [ptions:pology?", o network to"Which isuestion: 
    { q"basic" },: ulty 1, diffic correct:"],isplay data, "Dss data" "Proce",tworksfferent ne"Connect di", tore data"Sns: [?", optio used foris router: "What uestion q
    {basic" },: ", difficultyt: 1ecAN"], corr", "PAN", "MAN"WAN", "Loptions: [?", uildinguters in bts componnec ch networktion: "Whic
    { quessic" },y: "ba difficultt: 1,"], correcaddresset ternress", "Intwork addNeress", "dware add "Har address",re"Softwaions: [pt oss?",AC addre"What is Mtion:  ques" },
    {lty: "basic 0, difficuorrect:, cl"]tocod Prote", "Integral Protocoernational, "Intol" Protoc "Internalocol",rnet Protons: ["Inteti oping?",orketw in nand for st does IPn: "What { questio
   ic" },: "basdifficultyorrect: 1, VD"], c, "D", "CD"AM, "R"ard diskons: ["He?", optitypmemory ster ch is fastion: "Whi  { que},
  "basic" ficulty:  2, difect:D"], corr", "Ck", "RAMdis "Hard : ["ROM", optionsry?",tile memoWhat is vola: " { questionic" },
   : "basulty: 1, diffic"], correctRegister", ", "Cache "ROM""RAM",: [", optionsnt storage?rmaney is pehich memoruestion: "W   { qasic" },
 ulty: "bfficect: 0, diory"], corrMemal Access  "ReMemory",d Access "Rapi", Memoryess , "Read Access Memory" AccRandomions: ["or?", optnd fAM staes R "What douestion:   { qestions)
 g (25 quworkinemory & Netmputer M  // Co [
  8Questions =t grade)
constions quesons (100tiounda Fcedade 8: Advan

// Grasic" }
];lty: "bficu1, difrrect: ], cota"ve da", "Modatag", "Copy  codint data byecProt", "lete data ["De", options:ption?is encry: "What estion,
    { quasic" } "bfficulty:t: 1, di"], correcFie WiFreFi", ""Public Wii", otected WiFprassword-Fi", "P Wis: ["Openionpt", ocure?s seon ictiiFi connehich W"W question:    {ic" },
 culty: "bas: 1, diffi correctde data"],", "Hi"Move data", for safetya py datCoe data", "s: ["Deletption, oackup?"a bat is datWhtion: "
    { ques"basic" },: tydifficulcorrect: 1, Videos"], ic", "Muss", "cheSecurity pat", ": ["Gamestionsop", ity?ecure ses improvhich updat "Won:sti,
    { queic" }"basfficulty:  1, dict:, corredesign"]etwork , "Nng"ammier progrput", "Comr infofopeople ting , "Manipulaes"g bridgildin"Buions: [?", optgineeringal enci so"What isestion: ,
    { quc" }asi "b difficulty:orrect: 1,le"], c"Visibidden", , "HPrivate"", "c"Publioptions: [ng?", tti privacy seich is goodestion: "Whqu   { 
 ic" },ulty: "basic: 2, diff], correct16", "32" "10",["8", "ptions: , o base?"numberexadecimal  is htion: "Whates,
    { qu" }"basicficulty: , difcorrect: 1on"], traction", "SubcatiMultipli",  by 2""Divisionon", dditiions: ["A, opt?"ary to binrts decimalethod conve "Which mn: { questio" },
   "basiclty: , difficu 1rrect:peed"], coInternet s"ze", omputer si"Ces", ctivity tracine ae", "Onl siz["Shoe", options: otprint?ital fo"What is dign:    { questioic" },
 asculty: "bct: 1, diffiP"], corre", "SMTTPPS", "F"HTTP", "HTTns: [io", optafer?ite is sh websWhicstion: "
    { queic" },ty: "bas, difficulcorrect: 2"],  securityep", "Noty stxtra securirds", "E passwoTwoword", ""One passtions: [ opn?",enticatiotor auth is two-fac "Whatuestion:   { q },
 ic" "basficulty:, diforrect: 1hone"], cEmail", "Petails", "sonal de", "Perons: ["Namte?", optiprivad be kept on shoulinformatich stion: "Whi   { quesic" },
 : "bafficultyt: 1, dirrecaming"], coOnline g "tos",g pho", "Sharinrmationinfoonal ing persteal, "Sing others"s: ["Helpionopt", y theft? is identittion: "Whates},
    { quasic" culty: "b: 2, diffi"], correct"1048", 0", "102400", "1"100ions: [, opt kilobyte?"tes in one"How many byion: est   { qu
 c" },"basiculty: , diffiorrect: 1], c "14"", "12",10"8", " [ons:, optiy 1010?"f binarimal value o is dec "Whation:    { questbasic" },
ficulty: " dif3,], correct: e"gabyt, "MeKilobyte""Byte", "Bit", options: ["ta unit?", rgest dala"Which is ion:  quest {c" },
   basiculty: ": 0, diffirrect, co100"]11", ", "1"110""101", tions: [", opal 5?ecimation of d represent is binaryn: "What { questioic" },
   asty: "bculdifficorrect: 1,  "32"], ", "16",["4", "8 options: e?",ne byte oakits mmany btion: "How ues
    { q }, "basic"fficulty:rrect: 0, dind Y"], co B", "X a"A and2", nd "1 and 1",  ["0 a", options: digits?e binaryich ar: "Whtionques
    { c" }, "basiiculty:fft: 1, di, correcshopping"]line  "Onlearning",Online "rassment", ha "Online line help","Onoptions: [", llying?is cyberbu"What  { question:    c" },
basiulty: ": 1, difficect"], corr "Emailwser","Bro", eus softwarAntivirll", "["Firewa: ns", optioes?viruster  compufromrotects ich pestion: "Wh   { qu,
 ic" }: "basfficultyt: 1, di correcare"],e softw"Fre",  software", "Systemftwareso, "Harmful tware""Good sof[ options: ?",is malwareWhat ": on  { questi
  sic" },ulty: "ba 2, diffic"], correct:ingeverythDownload sites", "web"Verify  ll links", a"Click ",wordsShare passns: ["ce?", optioine practie onl is safchstion: "Whique
    { " },"basiciculty: : 1, diffcorrects"],  email", "System"Good emailsl info", ls to steaFake emaiine", "Fishing onlptions: ["ng?", ois phishiion: "What uest   { qic" },
 y: "basdifficult: 1, "], correctters"Only let", ly numbersplex", "Onomnd c a"Long", imple sort andns: ["Shd?", optioswortrong pass a shat make"Wn: stio  { questions)
  5 ques (2 Numberinaryr Safety & B/ Cybe
    /},
asic" : "bicultyt: 1, diffs"], correcSpam emailils", "Deleted ema"ddresses", roup email aail", "Ge em"Singls: [?", optionng listmaili: "What is stion   { que,
 " }"basicfficulty:  di2,], correct: Draft", ", "Trash"", "Sent""Inboxtions: [?", opd emails deleteer storesfoldich stion: "Wh{ que
    "basic" },ulty: , diffic correct: 1ent"],achm "Attject line","Sub", nd at eatic text", "Autom["Passwordns: e?", optioturil signahat is emaon: "W questi
    {sic" },culty: "ba1, difficorrect: "],  "Archiveete","Delrward",  "Foy",Repl["s: , optionemail?"ards n forwch optiostion: "Whique
    { "basic" },y: icultfft: 1, diecl"], corrmaiaft e"Drl", emaiSent  email", "antedUnwil", "tant emampor"I [ options:m email?","What is spastion: 
    { quesic" },culty: "baiffiect: 1, d, corr ".mp3"], ".jpg",f"txt", ".tt [".ptions: oion?",ile extensnt fs fo"Which i{ question: " },
    : "basiciculty1, diffct:  corre "Text"],",", "Videoioage", "Aud"Im [options: file?", is .wavat type  "Wh { question:
   },ic" ulty: "basffic: 1, di], correct", ".mp3"pgdb", ".j".m".txt", ons: [pti", osion? extene file is databas: "Whichionst
    { que" },ty: "basicicul, difft: 1e"], correc"Text fil", file", "Video mageated i, "Animdio file"ions: ["Au, optle?"gif fi . isn: "What  { questioc" },
  basificulty: "ect: 0, dif"], corr ".mp3".exe",pg", txt", ".jons: [".ion?", optie extensn text fil is plaiion: "Whichuest,
    { q"basic" }iculty:  diff: 1,rect], cor", "Video""Audio sentation",t", "Pre ["Documentions:ile?", op.pptx fis pe : "What ty question  {,
  " }: "basicculty diffit: 1,"], correcmp3pg", ".", ".jt", ".xlsxons: [".txoptinsion?", xteeet file ereadshsp "Which is on:questi {    ic" },
ulty: "basficrect: 1, dif, cor"Video"]"Audio", ", b pagemage", "Weons: ["Iopti file?", is .htmlion: "What { quest   " },
 asic: "btyiculiff 1, d], correct:", ".mp3" ".jpg, ".zip",t"[".tx", options: extension?e mpressed fils coich i: "Whuestion  { q },
  y: "basic"ltficuifect: 1, d corrdeo"],io", "Viud"Ament", ord docu, "WImage"options: ["", cx file? .doype is tion: "What   { questasic" },
 "bty: 2, difficult: ecrr".mp3"], co ".exe", ",, ".jpg: [".txt"tions?", ople extensionle fi is executab: "Whichon  { questi},
  " asicficulty: "bect: 1, difcorrile"], "Video fe",  "Audio filment file",e", "Docu"Image fil [ options:le?", is .pdf fi"What:  { question   },
sic" : "bafficultydi, t: 2"], correc.exep4", "".m", pg", ".txt".j [ptions:, o files?"deoon is for vitensi ex"Whichon: questi },
    { "basic"difficulty: rrect: 1, "], coxt filefile", "Te", "Video o fileAudi file", ""Image: [ptions .mp3?", o file is ofWhat typeuestion: "
    { q},ic" "basficulty: ect: 1, difzip"], corr.exe", ".".jpg", "", xt".toptions: [?", nsionxteile emage f is in: "Whichstio   { queic" },
 lty: "bas difficut: 1,], correc"l subject"Emai", dress"Email ad", th emailsent wile "Fiail text", Emions: ["?", optailent in emattachmt is "Whaion: quest },
    { "basic"ficulty: if: 0, dect], corrlear Copy""Cy", al Copentr Copy", "ComputerCopy", "Carbon "Cions: [, optl?"in emaiean at does CC m"Whuestion:  { q  ic" },
  "basifficulty:orrect: 1, d"], cails "Draft ememails",, "Deleted s"d email "Receive",mails e ["Sent", options: in email?t is inbox: "Whaonti   { ques },
 c" "basiculty: diffi1,: "], correct", "%"@", "&s: ["#", ionress?", opt email addsed ins uich symbol ion: "Wh   { questiic" },
  "basfficulty: di: 0,correct], mail" "External ", mail "Express mail",Emergencymail", "ectronic ons: ["Elopti email?", : "What isquestion    { questions)
ions (25 le Extens/ Email & Fi

    /"basic" },iculty: ect: 0, diffre"], corrHardwa", "oftware "Sts",endocumle ip, "Mult" on webent documgleions: ["Singe?", opt web pan: "What isstio,
    { quebasic" } "ifficulty:, d: 1"], correctser, "Browivirus""Ant", cker "Ad bloewall","Firions: [, opts?"ementcks advertis"Which blo: onesti{ qu    " },
icty: "basfficul 0, direct: coroad"],oad", "Uplwnl "Dossage",, "Error me window": ["New", optionswser? broin pop-up at isstion: "Wh
    { que" },ty: "basiciculct: 1, diff corre"],oad"Downl, ark" "Bookmion",ptr data o "Cleaon",fresh butt"Retions: [, opr history?"wsears bro cleon: "Which   { questi},
 sic" ty: "baifficulrect: 1, d cortem file"],", "Sys program", "Largelel data fi"Smald item", "Foo [", options:b browser?in wee ookiWhat is cion: "est
    { quic" }, "basficulty:ct: 1, dif"], correg websites"Deletinsites", owsing web"Brver", tes on serwebsig "Storinites", ing webseatCr"ons: [opti?", web hostings at i "Whn:{ questio" },
    "basicfficulty:  2, direct:tml"], cor.com", ".h".http", "ww", ".wions: [", optl domain?s top-leve"Which in: { questio" },
     "basicdifficulty:, ect: 0"], corrder name", "Folame", "File nmail address"Eress", bsite addtions: ["Weope?", omain nam"What is dtion:  { ques},
   sic" "bafficulty: 1, dict: ], corree data""Mobil", tellite", "SandBroadba, "l-up"ions: ["Dianet?", optnterster i provides faWhichestion: " qu,
    {asic" }: "b, difficulty, correct: 0ation"]Data loc, "e"ata type", "D"Data siz, eed"transfer spata ions: ["Dnet?", optdth in interdwit is banion: "Wha{ quest
     },basic"y: "lt: 0, difficuctrrecess"], costem Pronet Sy "Intergram",ch ProSear "Internet otocol",rity Prnternet Secu"Iider", rvice Provernet Seions: ["Int?", opt"What is ISP question: ,
    { "basic" }fficulty: di1,], correct: P"TP", "SMTPS", "F, "HTTTP"tions: ["HTl?", opco web protos securen: "Which iuestio q
    { },c""basiifficulty: orrect: 1, d"], ce internet, "Browsnternet"rom i "Delete f",o internet files t"Sendinternet", "Get from ns: [ptio", opload?hat is uuestion: "W,
    { qic" }asficulty: "bdifrect: 1, et"], coron intern", "Share rnet inteelete from", "Dnets from interfile", "Get ternetoad to in: ["Upl, optionsdownload?" is ion: "What
    { quest, "basic" } difficulty:ct: 1,CD"], correM", "che", "RAser ca"Browdisk", ["Hard  options: ?", temporarilyes web pages storhich"Wstion:  que,
    {"basic" }fficulty: ct: 1, dily"], corredeo onnly", "Vi "Image oble link",", "Clicka"Text only, options: [k?"yperlint is hon: "Whauesti },
    { qsic""baty: iculiffct: 0, ds"], corre"Broken pagepages", , "Hidden  pages"", "Deletedesweb pag["Saved options: ?", browsern okmarks it are bo: "Whaionst{ que
    c" },si"baifficulty: ect: 1, de"], corrror pagage", "Erdle pe", "Mid"First pagast page", s: ["Le?", optionsiteb a w homepage of "What ision:    { questasic" },
"bculty: iffi: 2, drrectari"], cole", "Safox", "Googefome", "FirChrions: ["e?", opth enginopular searcch is a p"Whiquestion: 
    { c" },ty: "basifficulrrect: 1, di, coger"]ile mana, "F"ntliemail c", "Ender toolWebsite fier", "rowseb bions: ["We?", optch engins a searWhat iuestion: "  { qc" },
  ulty: "basidiffict: 1, , correc"], "POP""SMTP, "HTTP", : ["FTP"", optionses?eb pagused for wocol is  protWhichstion: "    { que },
 "basic"culty:diffirrect: 1, cor"], Locatosource que Renicator", "U Resource Lo"Unitedcator", rce LoesouUniform R", "urce Locatorersal ResoUniv[": nsor?", optiond fes URL sta"What do: estion
    { qu" },lty: "basicfficudiorrect: 1, ], care device""Hardw m",are progras", "Softwb page we ofon, "Collecti web page""Single, options: [te?" websiis a"What n: iouest   { qc" },
 basificulty: " 2, dift:rec, cor "Paint"]", "Chrome",cel "Ex["Word",options: , browser?"lar web ch is a popuon: "Whiuesti q
    {,"basic" }ifficulty: rrect: 0, d Web"], code World, "WiWorld"e eb Wid Work", "WWide"World e Web", "World Widptions: [", o?and foroes WWW stn: "What d{ questioions)
     questowsers (25t & Web Br  // Interne },

  sic": "baculty 1, diffi