import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import logo from './assets/logo.png';

const foods = [
  // [Nama, Kelompok & Nutrisi Utama, Manfaat, Cara Konsumsi / Perhatian]
  ['Hare (Beras)', 'Karboidratu, Enerjia', 'Sumber energi utama', 'Tein no han ho variedade (Etu merah baik untuk diabetes)'],
  ['Batar (Jagung)', 'Karboidratu, Fibra', 'Fornese enerjia no ajuda digestivu', 'Tunu, tein, ka han direto. Di’ak ba labarik no adultu'],
  ['Fehuk (Kentang)', 'Karboidratu, Vitamina C', 'Fornese enerjia no ajuda imunidade', 'Tunu ka tein (evita frita). Di’ak ba labarik'],
  ['Ubi', 'Karboidratu, Vitamina A', 'Fornese enerjia no diak ba matan', 'Tunu ka tein (evita frita). Di’ak ba labarik no adultu'],
  ['Ai-farina', 'Karboidratu, Fibra', 'Fornese enerjia no ajuda digestivu', 'Tein ka han hanesan ai-han komplementar'],
  ['Ikan', 'Proteína, Omega-3', 'Di’ak ba kakutak, fuan no matan', 'Ikan segar. Hindari digoreng, baik untuk asam urat jika tidak berlebihan'],
  ['Tempe', 'Proteína, Fibra', 'Di’ak ba usus no músculu', 'Tempehan, diak ba ema hotu (kecuali alergi soya)'],
  ['Tahu', 'Proteína, Cálcio', 'Di’ak ba ruin no músculu', 'Tein ka han hanesan ai-han prinsipál'],
  ['Manu (manu)', 'Proteína, Zat Besi', 'Di’ak ba músculu no raan', 'manu tanpa kulit lebih baik (kurangi lemak)'],
  ['Na\'an (Daging)', 'Proteína, Zat Besi', 'Di’ak ba músculu no raan', 'Hindari daging berlemak'],
  ['manu-tolun', 'Proteína, Kolina, Vit D', 'Di’ak ba kakutak no isin', 'Kuning manu-tolun baik untuk anak. 1-2 butir per Loron'],
  ['Avokadu', 'Gordura, Vitamina E', 'Di’ak ba fuan no kulit', 'Makan langsung atau dengan roti'],
  ['Kelapa', 'Gordura, Minerais', 'Di’ak ba enerjia imediata', 'Santan baik dalam jumlah kecil. Hindari banyak pada obesitas'],
  ['Kacang', 'Gordura, Proteína', 'Di’ak ba fuan no músculu', 'Kacang panggang (bukan asin). Baik untuk camilan'],
  ['Bmanu', 'Vitamina, Zat Besi', 'Di’ak ba raan no matan', 'Rebus sebentar (jangan terlalu matang). Baik untuk anemia'],
  ['Kol (Kubis)', 'Vitamina, Vit C', 'Di’ak ba imunidade', 'Segar atau salad. Baik untuk imunitas'],
  ['Labu (Pumpkin)', 'Vitamina, Beta-karotenu', 'Di’ak ba matan no digestivu', 'Tein, tunu, ka han ho bubur. Di’ak ba labarik'],
  ['Wortel', 'Vitamina, Beta-karotenu', 'Di’ak ba matan', 'Tunu ka tein. Di’ak ba labarik no adultu'],
  ['Tomate', 'Vitamina, Vit C', 'Di’ak ba fuan no kulit', 'Segar atau saus. Baik untuk kesehatan jantung'],
  ['Papaya', 'Vitamina, Vit A', 'Di’ak ba digestivu no imunidade', 'Makan langsung. Baik untuk anak dengan masalah pencernaan'],
  ['Banana', 'Vitamina, Potássiu', 'Di’ak ba músculu no enerjia', 'Makan langsung. Baik untuk atlet dan anak, hati-hati pada diabetes'],
  ['Laranja (Jeruk)', 'Vitamina, Vit C', 'Di’ak ba imunidade', 'Makan langsung atau jus (tanpa gula). Baik untuk anemia'],
  ['Moringa', 'Vitamina, Zat Besi', 'Di’ak ba raan no imunidade', 'Tein hanesan modo. Di’ak ba labarik no inan isin rua'],
  ['Sesame', 'Mineral, Cálcio', 'Di’ak ba ruin', 'Han ho arroz ka halo pasta. Baik untuk osteoporosis'],
  ['Kunyit', 'Mineral, Antioxidante', 'Di’ak ba inflamasaun', 'Usa hanesan temperu. Baik untuk arthritis dan imunitas'],
  ['Cenoura (Wortel)', 'Mineral, Beta-karotenu', 'Di’ak ba matan', 'Tunu ka tein. Di’ak ba labarik'],
  ['Milho (Jagung)', 'Fibra, Enerjia', 'Di’ak ba digestivu', 'Tunu ka tein. Di’ak ba labarik no adultu'],
  ['Abóbora (Labu)', 'Fibra, Beta-karotenu', 'Di’ak ba digestivu no matan', 'Tein ka tunu. Di’ak ba labarik'],
  ['Melancia', 'Fibra, Bee', 'Di’ak ba hidratasaun', 'Makan langsung. Baik untuk cuaca panas'],
  ['Hudi (Pisang)', 'Fibra, Potássiu', 'Di’ak ba digestivu no músculu', 'Makan langsung. Baik untuk anak, hati-hati pada diabetes']
];

const diseases = {
  'Stunting': {
    title: 'Stunting (Altura ka aas/idade)',
    meaning: 'Stunting mak kondisaun ne’ebé altura ka aas labarik nian badak liu kompara ho padraun ba nia idade no sexu (badak oan).',
    cause: 'Menus konsumu proteina, ferro, no folatu selama isin rua. Nia mos kauza husi bebe nebe la hetan susu-ben eksklusifu inan nian, depois bebe fulan neen (6) la fo ai-han komplementar ba bebe no bebe menus konsumu proteina animal (ikan, naan, manu-tolun).',
    impact: 'Difikulta desenvolvimentu kakutak (IQ) bebe no labarik, imunidade fraku, no risku diabetes no hipertensaun iha futuro.',
    VulnerableGroups: 'bebe no labarik (0-59 meses), inan isin rua nebe ho malnutrisaun grave.',
    sign: 'labarik badak; labarik laiha energia, ladun ativu, no kresimentu bele la lao maske idade aumenta (badak).',
    action: 'oferese ai-han nutritivu hahu husi Loron 1000 dahuluk (inisiu bebe iha kabun laran ate tinan 2), oferese ai-han proteina liu-liu proteina animal, oferese susu-ben eksklusifu ba bebe (0-6 meses), oferese ai-han komplementar nebe kontein nutritientes karboidrato, proteina, kolestrol diak (HDL) no ai-han mikronutrientes sira, halo imunizasaun ba labarik no sanitasaun nebe mos.'
  },
  'Wasting': {
    title: 'Wasting (weight-for-height/weight-for-length)',
    meaning: 'Wasting mak kondisaun ne’ebé peso labarik nian ki’ik liu kompara ho nia altura ka naruk.',
    cause: 'Infesaun grave (diareia, pneumonia), oferese ai-han komplementar ne’ebé nakonu liu ho be kompara ho ai-han (MPASI encer), Injestaun enerjia no protein la sufisiente.',
    Impact: 'iha risku mortalidade, sistema imunidade kolaps, metabolismu isin hetan perturbasaun akut, bele sai Marasmus ka Kwashiorkor.',
    VulnerableGroups: 'Labarik ne’ebé ho infesaun repetida (pneumonia, diareia), labarik tinan 5 mai kraik ne’ebé laiha apetite diak.',
    sign: 'bele hare klaru ruin isin nian (kulit taka ruin), labarik nia LLA menus husi 11,5 cm, hahalo labarik nian ne’ebé tanis bebeik, lakoi han, no fraku tebes.',
    action: 'Halo konsultasaun lalais iha unidade saúde; fó ai-han enerjétiku no protein tuir idade no orientasaun profissional saúde, oferese susu-ben inan ka ai-han komplementar ba labarik ne’ebé nakonu ho nutritivu (MPASI padat) bainhira labarik nia kondisaun stavel.'
  },
  'Underweight': {
    title: 'Underweight (Peso ba idade ki’ik)',
    meaning: 'Underweight mak kondisaun ne’ebé todan labarik nian ki’ik liu kompara ho nia idade.',
    cause: 'Menus injestaun kaloria moras ne’ebé akompanha mmos ho moras infesaun, no fatores ambientais.',
    Impact: 'hamenus produtividade labarik, labarik laiha vontade atu estuda no hamnenus konsentrasaun labarik durante prosesu aprendizazen.',
    VulnerableGroups: 'Labarik tinan 5 mai kraik.',
    sign: 'Isin kik liu ne’ebé la normal iha nia idade; todan isin nian menus husi -2SD, todan isin susar atu sae selama fulan 3 nia laran (growth faltering), labarik senti kolen lalais de’it bainhira halimar ho nia kolega sira.',
    action: 'Fo han labarik Loron ida dala-5 ka dala-6, fo ai-han nutrientes, balansu no variedade (proteina, karboidratu, lipidos, vitaminas no mineral), monitoriza kresimentu labarik; aumenta qualidade no frequência ai-han tuir idade, karik labarik nia todan la aumenta selama fulan 2 lalais lori labarik ba postu saude hodi hetan tratamentu.'
  },
  'Overweight': {
    title: 'Overweight (Peso Aas Liután)',
    meaning: 'Overweight mak kondisaun bainhira todan isin ka IMT aas liu padraun ne’ebé konsidera saudável ba idade no sexu (bokur).',
    cause: 'Bele akontese bainhira enerjia ne’ebé tama hosi ai-han no bebida liu enerjia ne’ebé isin presija, no bele kontribui hosi atividade física menus, fatores genétiku no ambiente, abitu han ne’ebé la saudavel (konsumu junk food barak liu), toba la to’o oras 8 iha Loron ida.',
    Impact: 'Hamenus produtividade labarik, labarik laiha vontade atu estuda no hamnenus konsentrasaun labarik selama prosesu aprendizazen, risku akontese diabetes, hipertensaun, stroke, kankru liu-liu kankru intestino, susun, no fetal (janin), sleep apnea, puberdade sedu ba labarik, no moras fuan.',
    vulnerableGroups: 'Bele akontese ba ema hotu maibé ida ne’ebé risku liu mak labarik ho inan-aman isin bokur iha risku 80%, ema hirak ne’ebé konsumu barak liu junk food, labarik ho screen time > 3 horas, labarik ne’ebé nia oras deskansa < oras 8, familia ne’ebé iha abitu han la saudavel, no sira ne’ebé ladun halo ezersisiu barak.',
    sign: 'Isin bokur demais, mosu strechmark iha kabun, kelen. Metan iha kakorok, kalilin, no selangkangan, dada is makas maske la’o ho distansia besik, sempre nakorok bainhira toba, sin iha ain-tur, labarik feto sira ne’ebé puberdade sedu, ema ne’ebé baruk bok an, senti kolen bebeik, iha apetite ne’ebé di’ak ba ai-han midar sira, no labarik ne’ebé susar iha konsentrasaun selama iha prosesu aprendizazen.',
    action: 'Fó ai-han variadu no nutritivu, limita bebida ho açúcar no ai-han ho enerjia aas, promove atividade física apropriadu ba idade, no monitoriza peso no kresimentu regularmente.'
  },
  'Kwashiorkor': {
    title: 'Kwashiorkor (Forma grave tanba menus proteina)',
    meaning: 'Kwashiorkor mak kondisaun grave ne’ebé mosu tanba labarik menus proteina, maski nia hetan kaloria (karboidratu) sufisiente.',
    cause: 'Labarik la hetan susu-ben inan kompletu (0-2 anos), konsumu ai-han komplementar ne’ebé etu de’it, la iha proteina, Labarik ladun konsumu proteina animal (manu-tolu, ikan, na’an manu,) no proteina husi ai-moris (tahu, tempe, fore-mungu, koto nst), labarik hetan infesaun sira hanesan campak ka diarea ne’ebé kauza labarik lakon proteina iha nia isin.',
    impact: 'Hamosu edema/bubu iha liman, ain, oin ka kabun, sistema imunidade ne’ebé bele halo labarik fasil tebes hetan moras, kresimentu fisiku paradu, bele risku mortalidade karik la hetan tratamentu ho lalais.',
    VulnerableGroups: 'Labarik idade 1-3, labarik ne’ebé han "etu de’it" (la iha proteina), no labarik hafoin sofre sarampu grave.',
    sign: 'Edema ka bubu iha liman ka ain no bele mos oin, mudansa iha kulit no labarik nia fuk ne’ebé fasil monu, labarik laiha vontade atu halimar, no apetite ba han menus (nafsu han menus).',
    action: 'Emergénsia nutrisaun. Lori labarik ba unidade saúde lalais atu hetan avaliasaun no tratamentu profissional; labele trata mesak iha uma.'
  },
  'Marasmus': {
    title: 'Marasmus',
    meaning: 'Marasmus mak forma malnutrisaun grave ne’ebé labarik nia isin sai krekas tebes tanba la hetan enerjia no nutriente sufisiente sira seluk (proteina no mikronutriente sira) selama tempu naruk.',
    cause: 'Labarik la hetan enerjia (kaloria) no nutriente sufisiente selama tempu naruk, bebe la hetan susu-ben inan nian ka susu-ben formula maske idade sedauk fulan ne’en, ai-han komplementar (MPASI) ne’ebé oferese so iha de’it karboidratu sem nutrientes sira seluk (protein no micronutriente sira).',
    impact: 'Risku ba mortalidade aas tebes bainhira la hetan tratamentu iha ospital lalais, perturbasaun sistema metabolismu isin ne’ebé kauza hipotermia no hipoglikemia (gula darah rendah).',
    vulnerableGroups: 'Bebe idade < 1 tinan, labarik ne’ebé la hetan susu-ben inan no no ai-han nutritivu ne’ebé sufisiente.',
    sign: 'Oin hanesan ema katuas, Ruin hare klaru, LILA <11cm, kabun kempes (schapoid), kulit maran no loos, Diareia kroniku ne’ebé susar atu di’ak, labarik hare fraku, la responsivu.',
    action: '1. Tenki hetan tratamentu iha ospital (FASE STABILIZASAUN: foo F-75 (susu terapeutiku kaloria ki’ik) ho neneik hodi prevene "syok metaboliku" (labarik bele mate). FASE REABILITASAUN: fornese F-100 (susu terapeutiku kaloria aas) no RUTF (pasta ho proteina aas). Foo vitamin no mineral (zinc no kalium), no tau atensaun ba labarik nia temperatura, glicose iha ran, no batimento fuan labarik nian.'
  },
  'Anemia': {
    title: 'Anemia (Ferro / Zat Besi)',
    meaning: 'Anemia mak kondisaun ne’ebé labarik ka adultu nia hemoglobina/ran mean menus tanba falta Ferro (zat besi). Ran mean mak parte ne’ebé lori oksigeniu ba isin laran.',
    cause: 'Labarik/adultu la han proteina animal (hati, ikan, manu, daging), feto sira ne’ebé mak lakon ferru tanba menstruasaun, inan isin rua ne’ebé menus ferru tamba inan sira presija Ferru barak liu dala-rua kompara ho ema seluk, hemu liu Xa ka hafoin han (tanina hamosu absorpsaun ferru).',
    impact: 'Desenvolvimentu kognitivu labarik nian ne’ebé la masimu, labarik/adultu laiha vontade atu halimar ka halo servisu ruma, puan, kanek-katuas, susar ba labarik atu aprende ka absorve materia sira, ba inan isin rua risku atu akontese ran fakar (haemorrhage), no inan ne’ebé sofre anemia bele kauza bebe moris ho todan menus, no labarik fasil hetan moras.',
    vulnerableGroups: 'Feto idade produtivu, inan isin rua, vegetarianu, labarik ne’ebé la gosta han.',
    sign: 'Fisiku ne’ebé fraku, kole lalais, oin lanu ka nakukun bebeik, ulun moras, difikuldade konsentra, menus enerjia, susar dada is maske halo atividade ne’ebé ladun todan, liman laran no liman kukun ne’ebé kamutis, ibun kulit maran no kamutis, labarik ne’ebé susar atu iha konsentrasaun no senti dukur bebeik iha klase laran, laiha apetite ba han (anorexia).',
    action: 'Konsume ai-han nutritivu no variadu, liuliu ai-han riku ho ferru, folatu no vitamina B12. Se iha sinal anemia, ba unidade saúde atu halo avaliasaun no hetan tratamentu tuir nia kauza.'
  },
  DefVitA: {
    title: 'Defisiensia Vitamin A',
    meaning: 'Defisiensia Vitamin A mak kondisaun ne’ebé labarik ka adultu nia isin menus Vitamina A. Vitamin A importante ba matan, imundade, no kresimentu sél.',
    cause: 'La han konsumu proteina animal (naan aten, manu-tolu, ikan), menus konsumu proteina, modo-tahan, aifuan ne’ebé kór-oranje/mean (karotisena) hanesan: wortel, has, Aidila, Infesaun campak no diareia ne’ebé hamenus reserva vitamin A iha isin, konsumu gordura ka mina ne’ebé ho kuantidade ki’ik (tanba vitamin A absorsi ho lipidos).',
    impact: 'Matan labele hare iha nakukun (rabun senja), matan maran, no risku matan at (buta), Imunidade fraku ne’ebé bele kauza fasil hetan moras hanesan sarampu no diare, no Risku mortalidade aumenta dala 2-3.',
    vulnerableGroups: 'Bebe no labarik (6-59 meses), inan isin rua no inan fó-susu.',
    sign: 'Susar atu hare iha kalan, matan laran maran (xerosis), Labarik fasil tebes hetan infesaun hanesan sarampu no diareia.',
    action: 'Fó kapsula vitamina A 2x kada tinan ate labarik tinan 5, Fó ai-han riku ho vitamina A hanesan fígado, manu-tolun, senora, no sujere atu prosesa ai-han hirak ne’e ho gordura HDL (lemak baik). Se iha problema haree ka sinal seluk, ba unidade saúde atu hetan avaliasaun.'
  },
  'Defisiénsia Iodo': {
    title: 'Defisiensia Iodium',
    meaning: 'Defisiensia Iodium mak kondisaun ne’ebé isin falta iodium. Funsaun Iodium atu kontrola metabolismu isin, ajuda desenvolvimentu fisiku labarik nian, no nia mos importante tebes ba dezenvolvimentu kakutak bebe nian.',
    cause: 'La konsumu Iodium, han ai-han matak ne’ebé iha "substansia goitrogénika" (repollo, fehuk), la han ikan tasi.',
    impact: 'Kakorok bo’ot, halo fuk monu, isin senti malirin bebeik, susar atu mehi, ba inan ne’ebé isin rua sira bele mosu risku abortu (keguguran), prematur, no risku mortalidade ba bebe, kretinisme (labarik badak, kapasidade aprende ne’ebé tarde, tilun diuk,) no todan isin sae lalain, hamenus nivel intelejensia labarik.',
    vulnerableGroups: 'Inan isin rua, labarik, familia ne’ebé la konsumu Iodium iha ai-han ne’ebé sira konsumu.',
    sign: 'Kakorok bo’ot, labarik badak, labarik nia nanal mahar ne’ebé halo labarik kolia ladun mos, isin kulit maran.',
    action: 'Uza masin Iodium iha hahán Loron-Loron. Han ikan tasi, boek, duut tasi (seaweed), susu-ben. Hemu kapsula Iodium ba inan isin-rua sira.'
  },
  DefZinc: {
    title: 'Defisiensia Zinc',
    meaning: 'Defisiensia Zinc mak kondisaun ne’ebé isin menus Zinc. Zinc importante tebes ba Imunnidade, kresimentu no rekuperasaun kanek. Zinc mos importante ba aumenta labarik nia apetite han (nafsu makan).',
    cause: 'La konsumu proteina animal (naan, ikan, manu-tolu) ne’ebé iha zinc barak.Diareia kroniku (diare bebeik) ne’ebé halakon zinc husi isin, Konsumu fore-rai, sereal, gandum, ne’ebé demais bele perturba absorsaun Zinco iha isin hahan.',
    impact: 'Labarik diare dala barak, Kanek di’ak kleur, apetite han menus, Imunidade fraku → fasil hetan moras, resimentu labarik nian la normal ne’ebé risku ba Stunting.',
    vulnerableGroups: 'Labarik balita ne’ebé diare bebeik, Ema ho moras usus (Crohn, celiac).',
    sign: 'Fuuk monu hotu, isin kulit maran maran, kór-mean (dermatitis), kanek ne’ebé di’ak kleur, diareia bebeik, laiha apetite atu han (anoreksia).\n6. Labarik vontade laiha no la ativu.',
    action: 'Konsumu Oyster (tiram), no ai-han ne’ebé iha Zinc barak hanesan naan karau, manu, naan aten (figado), lakeru fuan, hemu Suplementu Zinc, evita konsumu fore sira, serat ho kuantidade barak bainhira konsumu ai-han Zinc.'
  },
  DefVitD: {
    title: 'Defisiensia Vitamin D',
    meaning: 'Defisiensia Vitamin D mak kondisaun ne’ebé isin falta Vitamin D. Vitamin D importante tebes ba absorsaun (serap) kalsiu no Fosforo, ne’ebé importante ba ruin no imundade isin.',
    cause: 'Labarik/adultu la hetan Loro-matan sufisiente, La han ikan (salmon, sarden, tuna) no manu-tolu liu-liu manu-tolun kinur, bebe ne’ebé konsumu de’it susu-ben inan no la hetan suplementu Vitamin D, no ema hirak ne’ebé mak obesidade.',
    impact: 'Ruin ain labarik ne’ebé kle’uk ho forma X ka O (Rakhitis), ruin iha hirus matan tebe sai(pigeon chest), bele kauza Osteomalasia, no osteoporose, no Imunidade fraku ne’ebé kauza fasil hetan infeksaun sistema respiratorio no hamosu Penumonia, Infecção Respiratória Aguda no Bronquite.',
    vulnerableGroups: 'Bebe ne’ebé simu de’it susu-ben inan no la hetan suplementu, labarik no adultu ne’ebé la hetan Loron-matan, ema ho isin bokur (obesidade), ferik (lansia).',
    sign: 'Labarik ne’ebé la’o modelu ain (O/X), ruin parte hirus-matan ne’ebé tebe sai (pigeoon chest), craniotabes, nehan ne’ebé moris tarde no a’at lalais, ruin ne’ebé fasil tohar (osteoporosis), kram otot, no ain sin bebeik (formigueiro), ruin ne’ebé fraku.\n5. Labarik nia gija (dentes) tarde atu sae.',
    action: '1. Loron-MATAN: ba liur (sai) iha tempu Loron-matan sedu (horas 7-10) selama 15-30 minutu, 2-3 dala/semana.\n2. Maka: Ikan (salmon, sarden, tuna). Tolu (bahan), hati, susu/sake ne\'ebé fortifikadu ho Vitamin D.\n3. Suplementu: Bebe ASI: 400 IU Loron-Loron. Adultu ho defisiensia: 1000-5000 IU Loron-Loron (tuir reseita doutor).'
  },
  'DefFolat': {
    title: 'Defisiensia Folat (Vitamin B9)',
    meaning: 'Defisiensia FOLAT (Vitamin B9) mak kondisaun ne’ebé isin falta Folatu (asam folat). Folatu importante tebes ba formasaun selula ran mean no dezenvolvimentu kakutak bebe.',
    cause: 'La han modo-tahan freshku (tein modo-tahan ne’ebé tasak liu bele hakalon folatu iha modo), nesesidade ácido fólico ba inan isin rua (trimester 1) no inan fo susu aumenta ba formasaun selula embrião, no Alcoholic.',
    impact: 'Anemia macrocítica, isin senti kolen bebeik, glossite(Nanal mean, bubu), iha risku ba bebe moris ho defisiente, no Risku partus sedu (prematur).',
    vulnerableGroups: 'Inan isin rua (trimester 1), feto joven, no alcoholic (ema hirak ne’ebé konsumu bebeik alkohol).',
    sign: 'Nanal mean, bubu (glossite), kanek iha ibun, kulit kamutis, forsa laiha, dada is araska, fasil senti kolen maske halo atividade kma’an, fuan tuku-tuku (palpitasaun).',
    action: 'Konsumu modo-tahan sira ne’ebé fila ho setengah matang hanesan bmanu, brokoli, asparagus. Konsumu ai-fuan sira hanesan: Laranja, Hudi, Pateka, konsumu fore-sira, naan aten. Importante liu mak atu la tein to to modo sira namlaik no maran.'
  },
  'Defisiénsia Vitamina B12 (Kobalamin)': {
    title: 'Defisiénsia Vitamina B12',
    meaning: 'Defisiénsia Vitamina B12 mak kondisaun bainhira isin la hetan Vitamina B12 ho sufisiente. Vitamina B12 importante tebes ba formasaun sélula raan mean, sistema nervozu, no formasaun DNA.',
    cause: 'La konsumu naan, problema absorpsaun iha usus (Crohn, celiac, ka operasaun usus), Uza ai-moruk ba asidu estômagu (omeprazole, metformin) selama tempu naruk, Inan isin rua presija B12 barak atu suporta dezenvolvimentu bebe nian, Ema idade avansadu (ferik) sira nia estômagu prodús asidu menus, halo absorpsaun B12 menus.',
    Impact: 'Anemia makrositika, Danu permanente ba nervu (saraf), formigamentu, dorménsia, no susar atu lao no karik la hetan tratamentu lalis bele kauza paralisia (kelumpuhan), labele atu kontrola movimentu isin, lakon memoria, konfuzaun, depresaun, no kazu grave bele mosu demensia, no Risku Alzheimer aumenta ba ema ne’ebé ho defisiensia B12 selama tempu naruk, desenvolvimentu kakutak ba bebe la masimu bainhira inan isin-rua ho defisiensia B12, bebe moris mai ho defisiensia neurolojiku (labele la’o, labele ko’alia), no risku moras fuan no stroke aumenta.',
    VulnerableGroups: 'Inan isin-rua, idoso, ema hirak ne’ebé ho moras intestinu, ema ne’ebé uza metformia ema ne’ebé moras diabetes), Pasientes ho anemia perniciosa,labarik sira ne’ebé ho kresimentu tarde, pasiente HIV.',
    sign: 'Difikuldade atu konsentra no hanoin, Lakon memoria hanesan ema ho demensia, mudansa mood (triste, kolen, ka depresaun), fasil hirus, Iha kazu grave hamosu konfuzaun no halusinasaun.',
    action: 'Konsume ai-han riku ho vitamina B12 hanesan ikan, na’an aten, ikan salmon, tuna, manu-tolun liu-liu manu-tolun nia kinur, produtu susu-ben (yougurt, keju), oyster, konsumu ai-han fortifikadu (sereal, susu soja, susu almond) ne’ebé aumenta ho B12. Se iha sinal anemia, fraqueza ka formigamentu, ba unidade saúde hodi hetan tratamentu.'
  }
};

const diseasesDiet = {
  'Hipertensaun': {
    title: 'Hipertensaun (Tensi Aas)',
    dietGoal: 'Hamenus tensaun raan no proteje fuan no raan.',
    recommended: ['Modo-tahan fresku (bmanu, senora, tomate)', 'Ai-fuan (hudi, laranja, papaia)', 'Ikan (liuliu ikan salmon, tuna)', 'Sereal integral (oat, batar, hare mutiara)', 'lis mutin', 'Feijão (Koto, lentilha)'],
    avoid: ['Hahan sira ne’ebé mak masin barak (soup instantaneu, snack salgado)', 'na’an mina sira', 'bebidas midar (soda)', 'tua no sigaru']
  },
  'Kanker': {
    title: 'Kanker (Kansér)',
    dietGoal: 'Reforsa sistema imunidade, hamenus inflamasaun, no proteje sélula hetan estragus.',
    recommended: ['Modo-tahan no ai-fuan ho kór variadu (brokoli, tomate, ai-dila)', 'Ikan (omega-3)', 'Sereal integral (oat, karuku)', 'kinur (anti-inflamatóriu)', 'Fore sira (feijão, lentilha, fore-rai)'],
    avoid: ['Ai-han prosesadu (sosis, smoked meat, bacon)', 'na’an mean (karau, bibi, fahi, kuda)', 'Bebida alkohol', 'Asukar barak (gula, kue, es krim)', 'Fritura no mina barak']
  },
  'Diareia': {
    title: 'Diareia (Diarréia)',
    dietGoal: 'Substitui bee no eletrólitu, hamenus irritasaun iha usus, no hasa’e enerjia isin.',
    recommended: ['Bee barak (ORS se disponível)', 'sasoro (sem masin)', 'Hudi tasak', 'Sopa (kaldu sem mina)', 'paun', 'Ai-fuan hodi hasai bee (pipinu, tomate, pateka'],
    avoid: ['Ai-han gordurosu (naan mina, gorengan)', 'Bebida midar (soda, jus midar)', 'Ai-han ho sal barak', 'hahan matak (salada, lalapan, sushi, salmon)', 'Modo-modo ho fibra aas (buncis, bmanu)']
  },
  'Obesidade': {
    title: 'Obesidade (Isin Bokur)',
    dietGoal: 'Hamenus todan, kontrola kaloria, no hadi’a metabolismu.',
    recommended: ['Modo-tahan (bmanu, brokoli, lakeru)', 'Ai-fuan (maçã, ai-dila, hudi)', 'Proteina magra (ikan, manu sem kulit, tofu)', 'Sereal integral (oat, batar)', 'Bee barak'],
    avoid: ['Junk food (pizza, burger, batata frita)', 'Bebida midas (soda, jus midar)', 'hahan midar (osi, donut, es krim)', 'hahan sona sira', 'na’an mina (fahi, karau)']
  },
  'Anemia': {
    title: 'Anemia (Falta Ferru)',
    dietGoal: 'Aumenta nivel ferru iha raan, hodi hamenus sintoma anemia.',
    recommended: ['na’an aten (fahi, karau, manu)', 'Ikan', 'na’an manu', 'Manu-tolun', 'Fore sira (feijão, lentilha, fore-rai)', 'no konsum ho ai-han ho Vitamina C (laranja, tomate) atu absorve ferru'],
    avoid: ['Xá no kafé (durante hahán, tanba hamenus absorpsaun ferru)', 'Ai-han ho cálcio barak (susu=ben)', 'tua', 'ai-han prosesadu sira']
  },
  'Diabetes': {
    title: 'Diabetes (Asukar Raan Aas)',
    dietGoal: 'Kontrola asukar raan, hamenus risku komplikasaun, no mantein todan saudável.',
    recommended: ['Modo-tahan la ho amidu (non-starchy vegetables) hanesan bmanu, brokoli, repollo', 'Ai-fuan ho índise glisémiku ki’ik (maçã, ai-dila)', 'Sereal integral (oat, batar, karuku)', 'Proteina magra (ikan, manu, tofu)', 'Legumes (feijão, lentilha)'],
    avoid: ['hahan midar (masin-midar, bani-been, dosi)', 'Bebidas midar (soda, jus midar)', 'ai-han prosesadu (etu mutin ne’ebé barak, paun mutin/roti putih)', 'ai-han ho amido barak (fehuk, ubi)', 'hahan sona no mina barak']
  },
  'Kolesterol Aas': {
    title: 'Kolesterol Aas',
    dietGoal: 'Hamenus nível kolestrol LDL (kolestrol aat) no aumenta kolestrol HDL (kolestrol diak).',
    recommended: ['Ikan (omega-3: salmon, tuna)', 'Oat', 'koto, lentilha', 'Temu, kinur', 'ai-fuan (maçã, hudi)', 'fore-rai no kacang fore sira (tempe, tahu)'],
    avoid: ['Na’an mina (karau, fahi)', 'hahan sona (fried chicken, fried chips)', 'Bebidas midar', 'Mina saturada (manteiga, mina husi animal)', 'ai-han prosesadu (sosis, bacon)']
  },
  'Doença Renal': {
    title: 'Moras Rins (Penyakit Ginjal)',
    dietGoal: 'Hamenus servisu rin, kontrola bee, eletrólitu, no proteina.',
    recommended: ['Proteina magra ho kuantidade ki’ik (ikan, manu sem kulit)', 'Modo-modo la ho potássiu aas (repolho, pepino)', 'Maçã, uva', 'etu mutin', 'manu-tolun mutin'],
    avoid: ['Masin barak (ai-han prosesadu, snack sira ne’ebé ho masin barak )', 'Ai-han ho potássiu aas (hudi, tomate, batata)', 'Ai-han ho fósforu aas (susu, queijo, fore)', 'Proteina barak (na’an karau, fahi)', 'Bebidas midar (soda, jus midar)']
  },
  'Doença Respiratória': {
    title: 'Moras Sistema Respiratóriu',
    dietGoal: 'Reforsa sistema imunidade, hamenus inflamasaun, no ajuda dada is ho di’ak.',
    recommended: ['Ai-han ho Vitamina C (laranja, tomate, moringa)', 'na’an manu, soup (kaldu manu)', 'kinur', 'Ikan', 'hemu Bee barak'],
    avoid: ['Fuma (sigarro, karreta nia suar)', 'Bebida jelada (es krim, bebidas malirin sira)', 'ai-han ho masin barak', 'tua', 'ai-han prosesadu']
  },
  'Osteoporose': {
    title: 'Osteoporose (Ruin Fraku)',
    dietGoal: 'Aumenta densidade ruin, hodi hamenus risku tohar.',
    recommended: ['Susu-ben (ba ema la intolerante)', 'Tofu (fortifikadu ho kalsiu)', 'Bmanu, brokoli', 'Ikan (sarden, salmon)', 'manu-tolun kinur', 'ai-han ho Vitamina D (Loron-matan, ikan)'],
    avoid: ['Kafé barak (tanba hamenus absorsaun kalsiu)', 'Xá barak', 'Bebidas midar (soda)', 'tua', 'masin barak (hamenus kalsiu)']
  },
  'Gota': {
    title: 'Gota (Asam Urat)',
    dietGoal: 'Hamenus nível asam urat iha raan no evita atakasaun gota.',
    recommended: ['Ikan (maibé la barak, tuna/sarden iha kuantidade ki’ik)', 'Tofu (iha kuantidade moderadu)', 'Modo-sira (repolho, pepino)', 'Ai-fuan (maçã, hudi)', 'Laranja, limão (Vitamina C)'],
    avoid: ['Na’an aten)', 'Seafood (boek, cumi-cumi)', 'na’an bokur (na’an karau, fahi)', 'tua (liuliu serveja)', 'Bebidas midar (soda)']
  },
  'Hepatite': {
    title: 'Hepatite (Moras Aten)',
    dietGoal: 'Proteje atén, hamenus inflamasaun, no ajuda rekuperasaun.',
    recommended: ['Proteina magra (ikan, na’an manu, tofu)', 'Modo-tahan (bmanu, brokoli)', 'ai-fuan (maçã, uva)', 'Sereal integral (oat, etu)', 'Bee barak'],
    avoid: ['Tua', 'hahan ho mina barak', 'ai-han prosesadu (sosis, bacon)', 'hahan midar', 'Ai-moruk ne’ebé prejudika atén (sem reseita)']
  },
  'Tuberculose': {
    title: 'Tuberculose (TB)',
    dietGoal: 'Reforsa sistema imunidade, fó enerjia, no ajuda rekuperasaun pulmaun.',
    recommended: ['Proteina barak (manu, ikan, manu-tolun)', 'Sereal integral (oat, hare)', 'Ai-fuan (ai-dila, laranja, hudi)', 'Modo-tahan (bmanu, senhora)', 'fore-rai no fore sira (koto, fore-mungu, tahu, tempe)'],
    avoid: ['Tua', 'fuma', 'Bebidas midar (soda)', 'ai-han prosesadu', 'ai-han mina barak']
  },
  'AIDS': {
    title: 'AIDS/HIV',
    dietGoal: 'Reforsa sistema imunidade, mantein todan, no hamenus risku infeksaun.',
    recommended: ['Proteina magra (manu, ikan, tofu, ovo)', 'Sereal integral (oat, batar)', 'Modo-tahan (bmanu, brokoli)', 'ai-fuan (ai-dila, laranja)', 'fore-rai no kacang sira'],
    avoid: ['Ai-han prosesadu (sosis, smoked meat)', 'Bebidas midar (soda, jus midar)', 'tua', 'ai-han ho masin barak (snack)', 'fuma']
  },
  'Hipotiroidismo': {
    title: 'Hipotiroidismo (Tiroide Menus)',
    dietGoal: 'Apoia funsaun tiroide, hamenus sintoma, no mantein metabolismu.',
    recommended: ['Ikan tasi (sarden, tuna)', 'Masin iodizadu (ho kuantidade apropriadu)', 'Modo-tahan (bmanu, brokoli)', 'ai-fuan (maçã, ai-dila)', 'Proteina (manu, ikan, tofu)'],
    avoid: ['Brokoli, repolho, no feijão (tanba iha substansia goitrogénika, maibé la barak)', 'Kafé barak', 'Bebidas midar', 'hahan mina barak', 'Suplementu iodo sem reseita']
  },
  'Hipoglikemia': {
    title: 'Hipoglikemia',
    dietGoal: 'Mantein asukar raan estável, evita asukar ran tun, no fó enerjia ba isin.',
    recommended: ['Karboidratu complexu (hare, batar, oat)', 'Ai-fuan (hudi, maçã)', 'Proteina (manu, ikan, tofu)', 'fore-rai (Protein + gordura diak)', 'Snack saudável (rotu integral ho fore-rai)'],
    avoid: ['Asukar simples (masin-midar, dosi, permen)', 'Bebidas midar (soda, jus midar)', 'fuma', 'tua', 'han tarde (diet)']
  }
};

const adultBase = [
  ['Etu ho ikan, bmanu no labu','Hare; ikan; bmanu; labu','Tunu ikan, tein hare no sayur; servi hamutuk.','Protein, enerjia, ferro no vitamina A.','Normal'],
  ['Batar ho feijão no ovo','Batar; feijão; manu-tolun; tomate','Tein batar no feijão; ovo tein; aumenta tomate fresku.','Protein vegetal/animal, fibra no folatu.','Normal'],
  ['Hare ho manu no buncis','Hare; manu; kacang buncis; cenoura','Tunu manu; tein sayur ho bee uitoan; servi ho hare.','Protein, fibra, vitamin A no C.','Normal'],
  ['Batata-doce ho ikan no sayur','Batata-doce; ikan; kol','Tunu batata; tein ikan; tein kol to’o naksala.','Karboidratu, protein, fibra no vitamin C.','Normal'],
  ['Sopa lentilha ho labu','Lentilha; labu; tomate; bmanu','Tein lentilha; aumenta labu no bmanu iha rohan.','Protein vegetal, ferro, folatu no fibra.','Normal']
];

const mpasi = [
  ['Bubur hare ho labu','Hare; labu','Tein hare to’o naksala, mash ho labu.','Enerjia, beta-karotenu no fibra.','Lumak','6–8 fulan'],
  ['Puré papaia ho hare','Hare; papaia','Tein hare, mash; aumenta papaia maduru.','Enerjia no vitamin A/C.','Lumak','6–8 fulan'],
  ['Bubur hare ho ikan','Hare; ikan','Tein hare; tein ikan ho kuidadu, limpa ossu; mash finu.','Protein no omega-3.','Lumak','9–11 fulan'],
  ['Bubur feijão ho bmanu','Feijão; hare; bmanu','Tein feijão no hare; aumenta bmanu finu; mash/amas.','Protein vegetal, ferro, folatu.','Lumak ho garu','9–11 fulan'],
  ['Hare ho manu no labu','Hare; manu; labu','Tein hotu; hakotu ki’ik ka mash tuir idade.','Protein, enerjia, vitamin A.','Klaran','12–23 fulan'],
  ['Batar ho ikan no sayur','Batar; ikan; kol','Tein batar; aumenta ikan no kol; hakotu ki’ik.','Protein, fibra, vitamin C.','Klaran','12–23 fulan'],
  ['Refeisaun família: hare, feijão, manu, sayur','Hare; feijão; manu; sayur','Prepara hanesan refeisaun família maibé hakotu ki’ik no la aumenta sal barak.','Dieta variadu no seimbang.','Normal família','24+ fulan']
];

function make30(base) {
  return Array.from({length:30}, (_, i) => base[i % base.length].map((x, j) => j === 0 ? x + ' — Menu ' + (i + 1) : x));
}

const adult30 = make30(adultBase);
const mpasi30 = make30(mpasi);
const daily60 = Array.from({length:60}, (_, i) => ({
  day: i + 1,
  breakfast: adultBase[i % adultBase.length][0],
  lunch: adultBase[(i + 2) % adultBase.length][0],
  snack: ['Hudi ho amendoim','Papaia ho susu','Batata-doce','Laranja ho kacang'][i % 4],
  dinner: adultBase[(i + 3) % adultBase.length][0]
}));

const WHO_DATA = [
  [0, 3.3, 49.9, 3.2, 49.1], [1, 4.5, 54.7, 4.2, 53.7], [2, 5.6, 58.4, 5.1, 57.1],
  [3, 6.4, 61.4, 5.8, 59.8], [4, 7.0, 63.9, 6.4, 62.1], [5, 7.5, 65.9, 6.9, 64.0],
  [6, 7.9, 67.6, 7.3, 65.7], [7, 8.3, 69.2, 7.6, 67.3], [8, 8.6, 70.6, 7.9, 68.7],
  [9, 8.9, 72.0, 8.2, 70.1], [10, 9.2, 73.3, 8.5, 71.5], [11, 9.4, 74.5, 8.7, 72.8],
  [12, 9.6, 75.7, 8.9, 74.0], [13, 9.9, 76.9, 9.2, 75.2], [14, 10.1, 78.0, 9.4, 76.4],
  [15, 10.3, 79.1, 9.6, 77.5], [16, 10.5, 80.2, 9.8, 78.6], [17, 10.7, 81.2, 10.0, 79.7],
  [18, 10.9, 82.3, 10.2, 80.7], [19, 11.1, 83.2, 10.4, 81.7], [20, 11.3, 84.2, 10.6, 82.7],
  [21, 11.5, 85.1, 10.9, 83.7], [22, 11.8, 86.0, 11.1, 84.6], [23, 12.0, 86.9, 11.3, 85.5],
  [24, 12.2, 87.8, 11.5, 86.4], [25, 12.4, 88.7, 11.7, 87.3], [26, 12.5, 89.6, 11.9, 88.2],
  [27, 12.7, 90.4, 12.1, 89.1], [28, 12.9, 91.2, 12.3, 89.9], [29, 13.1, 91.9, 12.5, 90.7],
  [30, 13.3, 92.6, 12.7, 91.5], [31, 13.5, 93.3, 12.9, 92.3], [32, 13.7, 94.0, 13.1, 93.0],
  [33, 13.8, 94.6, 13.3, 93.7], [34, 14.0, 95.3, 13.5, 94.4], [35, 14.2, 95.9, 13.7, 95.1],
  [36, 14.3, 96.5, 13.9, 95.7], [37, 14.5, 97.1, 14.0, 96.4], [38, 14.7, 97.7, 14.2, 97.0],
  [39, 14.8, 98.3, 14.4, 97.6], [40, 15.0, 98.8, 14.6, 98.1], [41, 15.2, 99.4, 14.8, 98.7],
  [42, 15.3, 99.9, 14.9, 99.2], [43, 15.5, 100.4, 15.1, 99.7], [44, 15.7, 100.9, 15.3, 100.2],
  [45, 15.8, 101.4, 15.5, 100.7], [46, 16.0, 101.9, 15.7, 101.2], [47, 16.2, 102.4, 15.8, 101.6],
  [48, 16.3, 102.9, 16.0, 102.1], [49, 16.5, 103.3, 16.2, 102.5], [50, 16.7, 103.8, 16.4, 102.9],
  [51, 16.8, 104.2, 16.5, 103.4], [52, 17.0, 104.7, 16.7, 103.8], [53, 17.2, 105.1, 16.9, 104.2],
  [54, 17.3, 105.5, 17.1, 104.6], [55, 17.5, 106.0, 17.3, 105.0], [56, 17.7, 106.4, 17.4, 105.4],
  [57, 17.8, 106.8, 17.6, 105.8], [58, 18.0, 107.2, 17.8, 106.2], [59, 18.2, 107.6, 18.0, 106.6],
  [60, 18.3, 108.0, 18.2, 107.0]
];

function calc(age, sex, w, h) {
  if (age === '' || age === null || age === undefined || !w || !h) return null;
  age = Number(age);
  w = Number(w);
  h = Number(h);
  if (age < 0) return null;

  if (age <= 60) {
    let data = WHO_DATA[Math.min(60, Math.max(0, Math.round(age)))];
    if (!data) data = WHO_DATA[WHO_DATA.length - 1];

    const refWeight = sex === 'M' ? data[1] : data[3];
    const refHeight = sex === 'M' ? data[2] : data[4];

    const minWeight = refWeight * 0.85;
    const maxWeight = refWeight * 1.15;
    const minHeight = refHeight * 0.95;

    const results = {};

    if (w < minWeight) {
      results.weightStatus = { text: 'Underweight', status: 'danger', key: 'Underweight' };
    } else if (w > maxWeight) {
      results.weightStatus = { text: 'Overweight', status: 'danger', key: 'Overweight' };
    } else {
      results.weightStatus = { text: 'Normal', status: 'normal' };
    }

    if (h < minHeight) {
      results.heightStatus = { text: 'Stunting', status: 'danger', key: 'Stunting' };
    } else {
      results.heightStatus = { text: 'Normal', status: 'normal' };
    }

    if (h >= minHeight) {
      if (w < minWeight) {
        results.wastingStatus = { text: 'Wasting', status: 'danger', key: 'Wasting' };
      } else {
        results.wastingStatus = { text: 'Normal', status: 'normal' };
      }
    }

    return { type: 'child', ...results };
  } else if (age <= 228) {
    const bmi = w / ((h / 100) ** 2);
    let bmiStatus;
    if (bmi < 18.5) bmiStatus = 'Abaixo peso';
    else if (bmi < 25) bmiStatus = 'Peso normal';
    else bmiStatus = 'Sobrepeso/Obesidade';
    return { type: 'adolescent', bmi, bmiStatus };
  } else {
    const bmi = w / ((h / 100) ** 2);
    let bmiStatus;
    if (bmi < 18.5) bmiStatus = 'Abaixo peso';
    else if (bmi < 25) bmiStatus = 'Peso normal';
    else if (bmi < 30) bmiStatus = 'Sobrepeso';
    else bmiStatus = 'Obesidade';
    return { type: 'adult', bmi, bmiStatus };
  }
}
// Data Menu 7 Loron Spesifik Hasil Kalkulasi (Anak & Dewasa)
const calcMenu = {
  'Anak Stunting': {
    title: 'Menu 7 Loron ba Labarik Stunting (Altura Badak)',
    week: [
      ['Loron 1', 'sasoro + labu + naan manu aten', 'Etu + ikan tuna + manu', 'pure hudi', 'Etu + manu-tolun + wortel'],
      ['Loron 2', 'sasoro + kentang + daging manu', 'Etu + tempe + brokoli', 'Pure ai-dila', 'Etu + ikan + labu siam'],
      ['Loron 3', 'sasoro + ubi jalar + manu-tolun', 'Etu + hati sapi + bmanu', 'Pure alpukat', 'Etu + tahu + buncis'],
      ['Loron 4', 'sasoro + labu kuning + ikan', 'Etu + manu + kentang', 'pure hudi + jeruk', 'Etu + tempe + sawi'],
      ['Loron 5', 'sasoro + jagung + daging', 'Etu + ikan nila + wortel', 'Pure ai-dila', 'Etu + manu-tolun + kacang hijau'],
      ['Loron 6', 'sasoro + bmanu + manu', 'Etu + hati manu + labu', 'Pure alpukat', 'Etu + ikan + brokoli'],
      ['Loron 7', 'sasoro + tahu + naan karau', 'Etu + ikan tuna + bmanu', 'pure hudi', 'Etu + manu-tolun + labu siam']
    ]
  },
  'Anak Wasting': {
    title: 'Menu 7 Loron ba Labarik Wasting (Peso Menus)',
    week: [
      ['Loron 1', 'sasoro + kaldu manu + manu-tolun', 'Etu + ikan tuna + kentang', 'pure hudi', 'Etu + hati manu + wortel'],
      ['Loron 2', 'sasoro + kaldu ikan + tahu', 'Etu + naan karau + labu', 'Pure ai-dila', 'Etu + ikan + brokoli'],
      ['Loron 3', 'sasoro + kaldu manu + ubi', 'Etu + tempe + bmanu', 'Pure alpukat', 'Etu + manu-tolun + kacang hijau'],
      ['Loron 4', 'sasoro + kaldu sapi + kentang', 'Etu + hati manu + labu kuning', 'pure hudi', 'Etu + ikan + sayur sop'],
      ['Loron 5', 'sasoro + kaldu manu + tahu', 'Etu + ikan tuna + wortel', 'Pure ai-dila', 'Etu + daging manu + kacang panjang'],
      ['Loron 6', 'sasoro + kaldu ikan + manu-tolun', 'Etu + tempe + brokoli', 'Pure alpukat', 'Etu + ikan + bmanu'],
      ['Loron 7', 'sasoro + kaldu sapi + labu', 'Etu + hati sapi + kentang', 'pure hudi', 'Etu + manu-tolun + wortel']
    ]
  },
  'Anak Underweight': {
    title: 'Menu 7 Loron ba Labarik Underweight (Peso ba Idade Kiik)',
    week: [
      ['Loron 1', 'sasoro + manu-tolun + labu', 'Etu + ikan + bmanu', 'Pure ai-dila', 'Etu + manu + wortel'],
      ['Loron 2', 'sasoro + tahu + kentang', 'Etu + tempe + brokoli', 'pure hudi', 'Etu + ikan + labu siam'],
      ['Loron 3', 'sasoro + hati manu + ubi', 'Etu + ikan tuna + sawi', 'Pure alpukat', 'Etu + manu-tolun + kacang hijau'],
      ['Loron 4', 'sasoro + naan karau + labu', 'Etu + manu + kentang', 'Pure ai-dila', 'Etu + ikan + buncis'],
      ['Loron 5', 'sasoro + manu-tolun + bmanu', 'Etu + hati sapi + wortel', 'pure hudi', 'Etu + tempe + labu kuning'],
      ['Loron 6', 'sasoro + ikan + jagung', 'Etu + manu + brokoli', 'Pure alpukat', 'Etu + ikan + sawi putih'],
      ['Loron 7', 'sasoro + tahu + labu kuning', 'Etu + ikan tuna + kentang', 'Pure ai-dila', 'Etu + manu-tolun + bmanu']
    ]
  },
  'Anak Overweight': {
    title: 'Menu 7 Loron ba Labarik Overweight (Peso Aas)',
    week: [
      ['Loron 1', 'sasoro + sayur bening', 'Etu merah + ikan kukus + brokoli', 'Buah segar', 'Etu + manu tanpa kulit + salad sayur'],
      ['Loron 2', 'sasoro + labu siam', 'Etu merah + tahu + tumis kangkung', 'ai-dila', 'Etu + ikan + sayur kacang panjang'],
      ['Loron 3', 'sasoro + wortel', 'Etu merah + manu-tolun + sayur sop', 'maçã', 'Etu + tempe + brokoli'],
      ['Loron 4', 'sasoro + bmanu', 'Etu merah + manu + kentang rebus', 'Jeruk', 'Etu + ikan + labu'],
      ['Loron 5', 'sasoro + kacang hijau', 'Etu merah + tahu + sayur lodeh', 'Pisang', 'Etu + manu + buncis'],
      ['Loron 6', 'sasoro + kentang', 'Etu merah + ikan + brokoli', 'Semangka', 'Etu + tempe + sayur asem'],
      ['Loron 7', 'sasoro + labu kuning', 'Etu merah + daging manu + wortel', 'Buah segar', 'Etu + ikan + sayur bmanu']
    ]
  },
  'Dewasa Underweight': {
    title: 'Menu 7 Loron ba Adultu Underweight (Peso Menus)',
    week: [
      ['Loron 1', 'Oatmeal + pisang + manu-tolun', 'Etu + naan karau + kentang', 'Alpukat + susu', 'Etu + ikan + sup manu'],
      ['Loron 2', 'Bubur manu + manu-tolun', 'Etu + hati sapi + bmanu', 'ai-dila + kacang', 'Etu + tempe + sayur kacang'],
      ['Loron 3', 'Roti gandum + selai kacang', 'Etu + ikan tuna + brokoli', 'Pisang + yogurt', 'Etu + daging manu + wortel'],
      ['Loron 4', 'Oatmeal + alpukat', 'Etu + ikan + kentang rebus', 'Jeruk + kacang almond', 'Etu + tahu + sup kacang merah'],
      ['Loron 5', 'Bubur kacang hijau + manu-tolun', 'Etu + daging + sayur bmanu', 'ai-dila + susu', 'Etu + ikan + labu siam'],
      ['Loron 6', 'manu-tolun rebus + roti', 'Etu + hati manu + brokoli', 'maçã + yogurt', 'Etu + tempe + sayur asem'],
      ['Loron 7', 'Pancake + madu', 'Etu + ikan tuna + sayur sop', 'Pisang + kacang', 'Etu + daging + kentang']
    ]
  },
  'Dewasa Obesitas': {
    title: 'Menu 7 Loron ba Adultu Obesitas (Isin Bokur)',
    week: [
      ['Loron 1', 'Oatmeal + buah beri', 'Etu merah + ikan kukus + brokoli', 'maçã', 'Sup manu + tahu + sayur'],
      ['Loron 2', 'manu-tolun rebus + roti gandum', 'Etu merah + manu panggang + salad', 'Jeruk', 'Etu + ikan + tumis kacang panjang'],
      ['Loron 3', 'Yogurt + buah', 'Etu merah + tempe + sayur lodeh', 'ai-dila', 'Etu + manu tanpa kulit + brokoli'],
      ['Loron 4', 'Oatmeal + pisang', 'Etu merah + ikan + kentang rebus', 'Semangka', 'Etu + tahu + sayur sop'],
      ['Loron 5', 'manu-tolun + roti gandum', 'Etu merah + daging manu + salad', 'maçã + kacang', 'Etu + ikan + brokoli'],
      ['Loron 6', 'Yogurt + buah beri', 'Etu merah + tempe + kacang panjang', 'Jeruk', 'Etu + manu + sayur bmanu'],
      ['Loron 7', 'Oatmeal + alpukat', 'Etu merah + ikan + labu siam', 'ai-dila', 'Etu + tahu + brokoli']
    ]
  }
};

function App() {
  const [page, setPage] = useState('home');
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedMenuKey, setSelectedMenuKey] = useState(null); // State baru
  const [form, setForm] = useState(() => JSON.parse(localStorage.getItem('nutrisiraForm') || '{}'));
  const [result, setResult] = useState(null);

  useEffect(() => localStorage.setItem('nutrisiraForm', JSON.stringify(form)), [form]);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  
  const goToCondition = (key) => {
    setSelectedCondition(key);
    setPage('conditions');
  };

  // Ubah fungsi goToMenus agar bisa menerima data
  const goToMenus = (menuKey) => {
    setSelectedMenuKey(menuKey || 'sehat');
    setPage('menus');
  };

  const menu = page === 'home'
    ? [
        ['calculator', 'Kalkula Status Nutrisaun', 'BBI, kresimentu no rekomendasaun'],
        ['conditions', 'Moras nutrisaun sira', 'Stunting, wasting, underweight, kwashiorkor, marasmus'],
        ['diets', 'Dieta ba moras sira', 'Orientasaun jeral'],
        ['foods', 'Ai-han nutritivu sira', 'Makanan lokal no nutriente'],
        ['menus', 'Ezemplu menu diária', '60 Loron, adultu, labarik no MPASI'],
        ['safety', '5 chaves ba ai-han seguru', 'Prátika seguransa ai-han']
      ]
    : [];

  return (
    <div className="app">
      <header>
        <img src={logo} />
        <div>
          <h1>NutriSira</h1>
          <p>Informasaun nutrisaun iha liman</p>
        </div>
      </header>

      <div className="layout">
        <aside>
          <button onClick={() => { setPage('home'); setSelectedCondition(null); }}>Iní</button>
          {page !== 'home' && <button onClick={() => { setPage('home'); setSelectedCondition(null); }}>← Fila fali</button>}
          <small>HILI INFORMASAUN</small>
          {menu.map(x => (
            <button key={x[0]} onClick={() => { setPage(x[0]); setSelectedCondition(null); }}>
              <b>{x[1]}</b>
              <span>{x[2]}</span>
            </button>
          ))}
        </aside>

        <main>
          {page === 'home' ? (
            <>
              <section className="hero">
                <h2>Hili informasaun ne’ebé ita hakarak aprende</h2>
                <p>NutriSira ajuda ita aprende kona-ba nutrisaun, monitoriza kresimentu no hili ai-han saudavel.</p>
              </section>
              <div className="cards">
                {menu.map(x => (
                  <article onClick={() => { setPage(x[0]); setSelectedCondition(null); }} key={x[0]}>
                    <div className="cardicon">
                      {x[0] === 'calculator' ? '⚖' : x[0] === 'conditions' ? '♥' : x[0] === 'foods' ? '🥬' : x[0] === 'menus' ? '🍲' : x[0] === 'safety' ? '✓' : '🍽'}
                    </div>
                    <h3>{x[1]}</h3>
                    <p>{x[2]}</p>
                  </article>
                ))}
              </div>
            </>
          ) : page === 'calculator' ? (
            <Calculator form={form} update={update} result={result} setResult={setResult} goToCondition={goToCondition} goToMenus={goToMenus} />
          ) : page === 'conditions' ? (
            <Conditions selectedCondition={selectedCondition} />
          ) : page === 'foods' ? (
            <Foods />
          ) : page === 'menus' ? (
            <Menus selectedMenuKey={selectedMenuKey} />
          ) : page === 'diets' ? (
            <Diets goToMenus={goToMenus} />
          ) : (
            <Safety />
          )}

          <footer>
            Informasaun nee ba edukasaun no screening. La substitui konsellu ka tratamentu husi profisionál saúde/nutritionist.
          </footer>
        </main>
      </div>
    </div>
  );
}

function Calculator({ form, update, result, setResult, goToCondition, goToMenus }) {
  const [personType, setPersonType] = useState('child');

  const handleCalc = () => {
    if (personType === 'child') {
      setResult(calc(form.age, form.sex, form.w, form.h));
    } else {
      const w = Number(form.w);
      const h = Number(form.h);
      if (!w || !h) return;
      const bmi = w / ((h / 100) ** 2);
      const st = bmi < 18.5 ? 'Abaixo peso' : bmi < 25 ? 'Peso normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidade';
      
      let bbi;
      if (form.sex === 'M') {
        bbi = (h - 100) - ((h - 100) * 0.10);
      } else {
        bbi = (h - 100) - ((h - 100) * 0.15);
      }
      
      setResult({ type: 'adult', bmi, st, bbi });
    }
  };

  // Fungsi untuk menentukan menu spesifik berdasarkan hasil
  const getMenuKey = () => {
    if (result) {
      if (result.type === 'child') {
        if (result.heightStatus && result.heightStatus.key === 'Stunting') return 'Anak Stunting';
        if (result.wastingStatus && result.wastingStatus.key === 'Wasting') return 'Anak Wasting';
        if (result.weightStatus && result.weightStatus.key === 'Underweight') return 'Anak Underweight';
        if (result.weightStatus && result.weightStatus.key === 'Overweight') return 'Anak Overweight';
      } else if (result.type === 'adult') {
        if (result.st === 'Abaixo peso') return 'Dewasa Underweight';
        if (result.st === 'Obesidade') return 'Dewasa Obesitas';
        if (result.st === 'Sobrepeso') return 'Dewasa Obesitas'; // Sama seperti obesitas
      }
    }
    return null; // Jika normal, kembali ke menu sehat
  };

  const handleGoToMenus = () => {
    const menuKey = getMenuKey();
    if (menuKey) {
      goToMenus(menuKey); // Kirim menuKey (misal: 'Anak Stunting')
    } else {
      goToMenus('sehat'); // Kirim 'sehat' jika normal
    }
  };

  return (
    <section>
      <h2>Kalkula Status Nutrisaun</h2>
      <div className="calc-choice">
        <button type="button" onClick={() => setPersonType('child')}>Labarik</button>
        <button type="button" onClick={() => setPersonType('adult')}>Adultu</button>
      </div>

      <div className="formgrid">
        {personType === 'child' && (
          <label>
            Idade (fulan)
            <input type="number" min="0" max="60" step="1" value={form.age || ''} onChange={e => update('age', e.target.value)} placeholder="Ex: 24" />
          </label>
        )}
        <label>
          Sexu
          <select value={form.sex || 'M'} onChange={e => update('sex', e.target.value)}>
            <option value="M">Mane</option>
            <option value="F">Feto</option>
          </select>
        </label>
        <label>
          Peso (kg)
          <input type="number" step="0.1" value={form.w || ''} onChange={e => update('w', e.target.value)} placeholder="Ex: 12" />
        </label>
        <label>
          Altura/Panjang (cm)
          <input type="number" step="0.1" value={form.h || ''} onChange={e => update('h', e.target.value)} placeholder="Ex: 86" />
        </label>
      </div>

      <button className="primary" onClick={handleCalc}>
        KALKULA
      </button>

      {result && (
        <div className="result">
          <h3>Rezultadu</h3>
          
          {result.type === 'child' && (
            <>
              <div className="metrics">
                <div><strong>{Number(form.w).toFixed(1)} kg</strong><span>Peso atual</span></div>
                <div><strong>{Number(form.h).toFixed(1)} cm</strong><span>Altura atual</span></div>
              </div>

              <div className={`status-box ${result.weightStatus.status}`}>
                <span><b>Peso/Idade:</b> {result.weightStatus.text}</span>
                {result.weightStatus.key && (
                  <button className="btn-link" onClick={() => goToCondition(result.weightStatus.key)}>
                    Detalhes →
                  </button>
                )}
              </div>

              <div className={`status-box ${result.heightStatus.status}`}>
                <span><b>Altura/Idade:</b> {result.heightStatus.text}</span>
                {result.heightStatus.key && (
                  <button className="btn-link" onClick={() => goToCondition(result.heightStatus.key)}>
                    Detalhes →
                  </button>
                )}
              </div>

              {result.wastingStatus && (
                <div className={`status-box ${result.wastingStatus.status}`}>
                  <span><b>Peso/Altura:</b> {result.wastingStatus.text}</span>
                  {result.wastingStatus.key && (
                    <button className="btn-link" onClick={() => goToCondition(result.wastingStatus.key)}>
                      Detalhes →
                    </button>
                  )}
                </div>
              )}

              <div className="notice">
                <b>Nota:</b> Estimativa ida ne'e ba screening edukativu. Ba rezultadu ne'ebé akurat liu, tenke uza tabela LMS WHO validada iha unidade saúde.
              </div>
              
              <div className="menu-link-container">
                <button className="btn-secondary" onClick={handleGoToMenus}>
                  {getMenuKey() ? `Haree Menu Espesial: ${getMenuKey()}` : 'Haree Ezemplu Menu Diária'}
                </button>
              </div>
            </>
          )}

          {result.type === 'adult' && (
            <>
              <div className="metrics">
                <div><strong>{Number(form.w).toFixed(1)} kg</strong><span>Peso atual</span></div>
                <div><strong>{result.bmi.toFixed(1)}</strong><span>IMT</span></div>
              </div>
              <p><b>Status:</b> {result.st}</p>
              
              {result.st !== 'Peso normal' && (
                <div className="status-box warning">
                  <span><b>BBI (Berat Badan Ideal):</b> {result.bbi.toFixed(1)} kg</span>
                </div>
              )}

              <div className="menu-link-container">
                <button className="btn-secondary" onClick={handleGoToMenus}>
                  {getMenuKey() ? `Haree Menu Espesial: ${getMenuKey()}` : 'Haree Ezemplu Menu Diária'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function Conditions({ selectedCondition }) {
  return (
    <section>
      <h2>Moras nutrisaun sira</h2>
      <div className="grid">
        {Object.entries(diseases).map(([k, v]) => (
          <article 
            className={`info ${selectedCondition === k ? 'highlighted' : ''}`} 
            key={k} 
            id={`condition-${k}`}
          >
            <h3>{v.title}</h3>
            <p><b>Tanba:</b> {v.cause}</p>
            <p><b>Impaktu:</b> {v.impact || v.Impact}</p>
            <p><b>Sinal:</b> {v.sign}</p>
            <p><b>Grupu Vulneravel:</b> {v.VulnerableGroups || v.vulnerableGroups}</p>
            <p><b>Saida mak presiza halo:</b> {v.action}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Foods() {
  // Data makanan dikelompokkan berdasarkan kategori
  const foodGroups = [
    {
      title: "Karboidratu (Enerjia)",
      items: [
        ['etu', 'Enerjia, Fibra', 'Fontes energia prinsipal, fasil atu absorve', 'Tein no han ho variedade (etu mean di’ak ba diabetes)'],
        ['Batar', 'Enerjia, Fibra', 'Fornese enerjia no ajuda digestivu', 'Tunu, tein, ka han direto. Di’ak ba labarik no adultu'],
        ['Fehuk-ropa', 'Enerjia, Vitamina C', 'Fornese enerjia no ajuda imunidade', 'Tunu ka tein (evita sona). Di’ak ba labarik'],
        ['Fehuk kor laranja', 'Energia, Vitamina A', 'Fontes energia, riku ho beta-karoten (di’ak ba matan)', 'Di’ak ba labarik no adultu'],
        ['Fehuk kor ungu', 'Energia, Antioksidante', 'Fontes energia, riku ho antosianin (Di’ak hodi kontrola ran midar)', 'Di’ak ba labarik, pasiente diabtes no ema bo’ot'],
        ['Fehuk kor ungu', 'Enerjia, Fibra', 'Fontes energi, di’ak ba digestivo', 'Tunu ka tein. Di’ak ba labarik no adultu'],
        ['Fehuk sira', 'Enerjia, Vitamina A', 'Fontes energia, di’ak ba matan', 'Tunu ka tein (evita sona). Di’ak ba labarik'],
        ['Ai-farina', 'Enerjia, Fibra', 'Fornese enerjia no ajuda digestivu', 'Tein ka han hanesan ai-han komplementar'],
        ['Paun (Roti)', 'Enerjia, Fibra', 'Fontes energia ba atividade diaria', 'Han ho modo ou kanji. di’ak nu’udar main menu'],
        ['Sagu (bubur jagung)', 'Enerjia, Fibra', 'fontes energia kompleksu, riku fibra', 'Tein hanesan sasoro. Di’ak ba labarik no ida ne’ebé ho intoleransi glutein'],
        ['Fehuk-Manas', 'Enerjia, Vitamina A', 'Sumber energi, kaya beta-karoten', 'Tunu ka tein. Di’ak ba labarik no adultu'],
        ['Fore-rai', 'Enerjia, Proteina', 'Fontes energia ne’ebé lais, riku proteina', 'Han hanesan lanche. Evita sona ba pasiente ho Gota (asam urat)'],
        ['Fore-munggu', 'Enerjia, Proteina', 'fontes energia, riku ho proteina vegetal', 'Tein hanesan sasoro. Di’ak ba labarik no inan isin rua'],
        ['Batar daan', 'Enerjia, Fibra', 'Fornese enerjia no ajuda digestivu', 'Tein hanesan sasoro. Di’ak ba labarik no adultu']
      ]
    },
    {
      title: "Proteína (Animal no Vegetal)",
      items: [
        ['Ikan', 'Omega-3, Proteína', 'Di’ak ba kakutak, fuan no matan', 'Evita sona, di’ak ba pasiente Gota (asam urat) karik konsumu naton ka la barak liu.'],
        ['Manu (manu)', 'Ferro, Proteína', 'Di’ak ba músculu no raan', 'manu tanpa kulit lebih baik (kurangi lemak)'],
        ['Na’an (Daging)', 'Ferro, Proteína', 'Di’ak ba músculu no raan', 'Evita na’an mina sira'],
        ['Manu-tolun', 'Kolina, Vit D, Proteína', 'Di’ak ba kakutak no isin', 'Manu-tolun kinur di’ak ba labarik. Konsumu manu-tolun 1-2 kada Loron'],
        ['Tempe', 'Fibra, Proteína', 'Di’ak ba usus no músculu', 'Tempe, di’ak ba ema hotu (exeptu ema ne’ebé alergia kedelai)'],
        ['Tahu', 'Cálcio, Proteína', 'Di’ak ba ruin no músculu', 'Tein ka han hanesan ai-han prinsipál'],
        ['Ikan Teri', 'Cálcio, Proteína', 'Di’ak ba ruin no músculu', 'Di’ak ba labarik no ida ne’ebé ho osteoporose'],
        ['Ikan Asin', 'Proteína, Cálcio', 'Di’ak ba ruin (maibe kuidadu ho nia masin)', 'kuidadu ba ema ho hipertensaun'],
        ['Boek', 'Proteína, Cálcio', 'Di’ak ba músculu no ruin', 'La sujere ba ema ho kolesterol a’as'],
        ['Kepiting', 'Proteína, Cálcio', 'Di’ak ba músculu no ruin', 'la sujere ba ema ho kolesterol a’as'],
        ['Hudi dubun', 'Proteína, Fibra', 'Di’ak ba intestino no músculu', 'Tein hanesan modo. Di’ak ba labarik'],
        ['Lakeru fuan', 'Proteína, Ferro', 'Di’ak ba aumenta raan no hasa’e imunidade', 'Han hanesan lanche. Di’ak ba anemia'],
        ['Koto mean', 'Proteína, Fibra', 'Di’ak ba intestino no imunidade', 'Di’ak ba diabetes no anemia']
      ]
    },
    {
      title: "Vitamina (Imunidade & Saúde)",
      items: [
        ['Bmanu', 'Ferro, Vitamina A', 'Di’ak ba raan no matan', 'Fila lalika kleur no lalika halo tasak lo’os. Di’ak ba anemia'],
        ['Ai-farina tahan', 'Ferro, Vitamina A', 'Di’ak ba raan no matan', 'Di’ak ba labarik no inan isin rua'],
        ['Repollo (Kubis)', 'Vitamina C', 'Di’ak ba imunidade', 'Di’ak ba imunidade'],
        ['Kankung', 'Ferro, Vitamina A', 'Di’ak ba raan no matan', 'Di’ak ba anemia'],
        ['Mostarda', 'Vitamina C, Fibra', 'Di’ak ba imunidade no digestivu', 'Di’ak ba labarik no adultu'],
        ['Sayur Paki', 'Ferro, Vitamina A', 'Di’ak ba raan no matan', 'Di’ak ba labarik'],
        ['Agriaun', 'Ferro, Vitamina C', 'Di’ak ba raan no imunidade', 'Fila labele dodok ka tasak liu. Di’ak ba anemia'],
        ['Alfase', 'Vitamina C, Fibra', 'Di’ak ba imunidade no digestivu', 'Han fresku hanesan salad. Di’ak ba labarik'],
        ['Fehuk Dikin', 'Ferro, Vitamina A', 'Di’ak ba raan no matan', 'Di’ak ba labarik'],
        ['Lakeru (Pumpkin)', 'Beta-karotenu, Vit A', 'Di’ak ba matan no digestivu', 'Tein, tunu, ka han ho sasoro. Di’ak ba labarik'],
        ['Labu Siam', 'Vitamina C, Fibra', 'Di’ak ba imunidade no digestivu', 'Di’ak ba labarik no adultu'],
        ['Senoura', 'Beta-karotenu, Vit A', 'Di’ak ba matan', 'Di’ak ba labarik no adultu'],
        ['Tomate', 'Vitamina C', 'Di’ak ba fuan no kulit', 'Di’ak ba saude fuan nian'],
        ['Ai-dila', 'Vitamina A, Vit C', 'Di’ak ba digestivu no imunidade', 'Konsumu direito. Di’ak ba hirak ne’ebé iha problema digestivu'],
        ['Hudi', 'Potássiu, Vitamina B6', 'Di’ak ba músculu no enerjia', 'Di’ak ba atleta sira no labarik, la rekomenda ba hirak ne’ebé ho d iabetes'],
        ['Laranja (Jeruk)', 'Vitamina C', 'Di’ak ba imunidade', 'konsumu direito ka halo sai jus (sem masin-midar). Di’ak ba anemia'],
        ['Has', 'Vitamina C, Vit A', 'Di’ak ba imunidade no matan', 'Di’ak ba labarik no ema bo’ot'],
        ['Nangka', 'Vitamina B6, Vit C', 'Di’ak ba enerjia no imunidade', 'La rekomenda ba ema ho diabetes'],
        ['Sawo', 'Vitamina C, Glukosa', 'Di’ak ba enerjia no imunidade', 'Di’ak ba labarik no ema bo’ot'],
        ['Moringa', 'Ferro, Vitamina A, Vit C', 'Di’ak ba raan no imunidade', 'Di’ak ba labarik no inan isin rua'],
        ['Malinjo', 'Vitamina C, Beta-karotenu', 'Di’ak ba imunidade', 'Di’ak ba adultu'],
        ['Biji Asam', 'Vitamina C', 'Di’ak ba imunidade no digestivu', 'Tein hanesan modo. Di’ak ba adultu'],
        ['Brokoli', 'Vitamina C, Fibra', 'Di’ak ba imunidade no intestino', 'Tein lalais (lalika tasak ka dodok liu). Di’ak hodi hasa’e imunidade'],
        ['Ai-manas', 'Vitamina C, Capsaicin', 'Di’ak ba imunidade no sirkulasasaun raan', 'Usa hanesan temperu. Di’ak ba adultu']
      ]
    },
    {
      title: "Mineral & Fibra (Ruin & Sistema)",
      items: [
        ['Nu', 'Minerais, Gordura', 'Di’ak ba enerjia imediata', 'Usa hanesan santas ho kuantidade oi-tuan. Ba pasiente obesidade evita atu konsumu ho kuantidade barak'],
        ['Fore-rai', 'Minerais, Gordura', 'Di’ak ba fuan no músculu', 'Kacang panggang (bukan asin). Di’ak ba cemilan'],
        ['Kinur', 'Antioxidante, Manganésio', 'Di’ak ba inflamasaun', 'Usa hanesan temperu. Di’ak ba arthritis no hasa’e imunidade'],
        ['Cenoura (Wortel)', 'Beta-karotenu, Fibra', 'Di’ak ba matan', 'Di’ak ba labarik'],
        ['Batar (Jagung)', 'Fibra, Enerjia', 'Di’ak ba digestivu', 'Tunu ka tein. Di’ak ba labarik no adultu'],
        ['Abóbora (Labu)', 'Fibra, Beta-karotenu', 'Di’ak ba digestivu no matan', 'Tein ka tunu. Di’ak ba labarik'],
        ['Melancia', 'Fibra, Bee', 'Di’ak ba hidratasaun', 'Di’ak liu konsumu bainhira Loron-manas'],
        ['Hudi (Pisang)', 'Fibra, Potássiu', 'Di’ak ba digestivu no músculu', 'Di’ak ba labarik, la rekomenda ba pasiente diabetes'],
        ['Sesame', 'Cálcio, Gordura', 'Di’ak ba ruin', 'Han ho etu ka halo pasta. Di’ak ba pasiente osteoporosis'],
        ['Talas', 'Fibra, Kalium', 'Di’ak ba digestivu no músculu', 'Tein ka tunu. Di’ak ba labarik no adultu'],
        ['Gadung', 'Fibra, Enerjia', 'Di’ak ba enerjia no digestivu', 'Tein ka tunu. Di’ak ba labarik'],
        ['Batar Nurak', 'Fibra, Vitamina C', 'Di’ak ba digestivu no imunidade', 'Di’ak ba adultu'],
        ['Brinjela', 'Fibra, Potássiu', 'Di’ak ba digestivu no fuan', 'Di’ak ba labarik no adultu'],
        ['Mostarda', 'Fibra, Cálcio', 'Di’ak ba ruin no digestivu', 'Di’ak ba adultu'],
        ['(Fore-sikote)', 'Fibra, Vitamina C', 'Di’ak ba digestivu no imunidade', 'Tein hanesan modo. Di’ak ba labarik no adultu'],
        ['Fore Naruk', 'Fibra, Vitamina A', 'Di’ak ba digestivu no imunidade', 'Di’ak ba labarik no adultu'],
        ['Lis Mean', 'Antioksidan, Manganésio', 'Di’ak ba imunidade no sirkulasi raan', 'Uza hanesan temperu. Di’ak ba adultu'],
        ['Lis Mutin', 'Antioksidan, Allicin', 'Di’ak ba imunidade no fuan', 'Uza hanesan temperu. Di’ak ba adultu']
      ]
    }
  ];

  return (
    <section>
      <h2>Ai-han nutritivu sira</h2>
      <p>Lista ai-han tuir grupu, no nia benefísiu ba saúde. Grupu ida-idak iha nia tabel rasik.</p>
      
      {/* Loop untuk setiap kategori */}
      {foodGroups.map((group, index) => (
        <div key={index} className="food-group">
          <h3>{group.title}</h3>
          <table className="food-table">
            <thead>
              <tr>
                <th>Naran Ai-han</th>
                <th>Nutriente Xave</th>
                <th>Benefísiu</th>
                <th>Maneira Konsumu</th>
              </tr>
            </thead>
            <tbody>
              {group.items.map((food, i) => (
                <tr key={i}>
                  <td>{food[0]}</td>
                  <td>{food[1]}</td>
                  <td>{food[2]}</td>
                  <td>{food[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}

function Menus({ selectedMenuKey }) {
  const [activeTab, setActiveTab] = useState(selectedMenuKey === 'sehat' ? 'sehat' : 'kalkulasi');

  // ============================================================
  // DATA MENU SEHAT Loron 7 (Struktur Object)
  // ============================================================
  const healthyMenu = [
    {
      day: 'Loron 1',
      breakfast: 'Sasoro + Manu-tolun + brokoli',
      snackPagi: 'Fehuk daan + susu-ben',
      lunch: 'Etu + ikan + mostarda fila',
      snackSore: 'Hudi daan',
      dinner: 'Etu + tempe sona + alfase budu',
      instructions: [
        'Tein sasoro, manu-tolun no brokoli hamutuk.',
        'Daan fehuk hemu ho susu-ben.',
        'Bafa ikan ho tomate no kinur oi-tuan no fila mostarda labele dodok liu.',
        'Hudi daan hanesan babaik.',
        'Sona Tempe no budu alfase tau ho tomate.'
      ]
    },
    {
      day: 'Loron 2',
      breakfast: 'Paun + selai kacang (peanut butter)',
      snackPagi: 'Fehuk tunu',
      lunch: 'Etu + Naan manu daan + capcay (cenoura, repollo, fore-sikote) + maçã',
      snackSore: 'Fore-munggu daan + susu-ben',
      dinner: 'Etu + ikan daan + lakeru kinur fila',
      instructions: [
        'Daan naan manu hamutuk ho cenoura, fehuk ropa.',
        'Capcay: tein hamutuk ho bee uitoan.',
      ]
    },
    {
      day: 'Loron 3',
      breakfast: 'Fore-munggu daan + susu-ben',
      snackPagi: 'Manu-tolun daan',
      lunch: 'Etu + Bifi naan karau + brokoli + maçã',
      snackSore: 'Fehuk kor unggu daan',
      dinner: 'Etu + + mostarda fila + naan manu sona la ho nia kulit + tomate fuan ida',
      instructions: [
        'Daan fore-mungu tau ho susu-ben.',
        'Brokoli fila tau ho naan manu oi-tuan.',
        'Fila mostarda, labele halo dodok liu.',
        'Sona naan manu la ho nia kulit.',
        'Tomate han matak.'
      ]
    },
    {
      day: 'Loron 4',
      breakfast: 'Oatmeal + Hudi',
      snackPagi: 'Fehuk-ropa daan',
      lunch: 'Etu + manu-tolun + budu alface tau ho tomate + Avocate',
      snackSore: 'Maçã fuan 2',
      dinner: 'Etu + manu suwir + bayam fila + Hudi',
      instructions: [
        'Halo oatmeal ho bee manas.',
        'Fehuk-ropa kukus.',
        'Tein kangkung ho mina uitoan no labele dodok liu.',
        'Daan naan manu ho masin no halo rahun naan manu ne’ebé daan ona, koa ingredientes sira halo ki’ik (lis mean, lis mutin ai-manas oituan, dut morin, no derok tahan), depois fila ingredients sira ho mina oituan (opsional) aumenta naan manu ne’ebé harahun tia no tau ho derok been oituan.'
      ]
    },
    {
      day: 'Loron 5',
      breakfast: 'Paun ho mantega',
      snackPagi: 'Manu-tolun daan',
      lunch: 'Etu + ikan bafa + sayur lodeh + apple',
      snackSore: 'Avocate',
      dinner: 'Etu + sopa naan manu + budu alface + tomate',
      instructions: [
        'Bafa ikan ho tomate no kinur oi-tuan.',
        'Fila cenoura.',
        'Tempe: sona tempe.'
      ]
    },
    {
      day: 'Loron 6',
      breakfast: 'Paun + peanut butter',
      snackPagi: 'Ai-farina daan',
      lunch: 'Etu + boek + kabura + Hudi',
      snackSore: 'Avocate',
      dinner: 'Etu + koto + repollo fila + Ai-dila tasak',
      instructions: [
        'Fila kabura ho mina oi-tuan no ai-manas oi-tuan.',
        'Sona boek, depois fila-fali ho tomate.',
        'Tein koto ho cenoura, mostarda, makaraun.'
      ]
    },
    {
      day: 'Loron 7',
      breakfast: 'Hudi Bafa',
      snackPagi: 'Fehuk midar kor laranja',
      lunch: 'Etu + naan tunu + modo variedade (cenoura, fore-sikote) ho naan manu + Has',
      snackSore: 'Fore-munggu + susu-been',
      dinner: 'Etu + perkedel tahu + alface budu ho tomate + has',
      instructions: [
        'Modo variedade :Fila lis mutin no mean halo mean, tau naan manu no fila to nia tasak oi-tuan, tau cenoura no fore-sikote fila halo mamar oi-tuan aumenta ai-manas oituan (opsional) tau bee oituan, masin, pimenta, tein oi-tuan to nia mamar no tasak.',
        'Tunu naan manu.',
        'Perkedel tahu :Harahun tahu uza garfu, mistura tahu ho manu-tolun, lis mutin, lis tahan no cenoura, tau masin no pimenta uitoan, kedok to merata, forma sai bola hanesan perkedel, sona ho mina no uza mina uitoan.'
      ]
    }
  ];

  // ============================================================
  // DATA MENU MPASI 20 Loron (Struktur Object)
  // ============================================================
  const mpasiMenu = [
    {
      day: 'Loron 1',
      breakfast: 'Sasoro + manu-tolun + Marunggi',
      snackPagi: 'Pure hudi',
      lunch: 'Sasoro + naan manu aten + avocate',
      snackSore: 'Pure ai-dila',
      dinner: 'Sasoro + brokoli + naan manu',
      instructions: [
        'Tein sasoro ho manu-tolun no marunggi.',
        'Pure Ai-dila : de’ut ai-dila ho mamar los no fo ba labarik uza dor (opsional).',
        'Tein sasoro ho naan manu no mostarda oi-tuan.',
        'Pure hudi: Koa hudi halo ki’ik, hanehan ho garfu ka kanuru halo dodok didiak.',
        'Tein sasoro ho brokoli no naan manu.'
      ]
    },
    {
      day: 'Loron 2',
      breakfast: 'Pure Etu, lakeru kinur, manu-tolun, tahu',
      snackPagi: 'Pure avocate ho inan nian susu-ben oi-tuan',
      lunch: 'Sasoro + ikan',
      snackSore: 'Pure maçã + Laranja',
      dinner: 'Sasoro + ikan + marunggi',
      instructions: [
        'Tein etu ho bee barak oi-tuan, kukus lakeru kinur halo tasak didiak, daan manu-tolun to tasak no hasai manu-tolun kinur, koa tahu halo ki’ik no kukus oi-tuan hodi nune’e seguru ba konsumu depois blende hamutuk etu, lakeru kinur, tahu no manu-tolun daan.  .',
        'De’ut ka blender avocate halo dodok tau ho inan nia susu-ben oituan no fo ba labarik.',
        'Kukus maçã ± 30 minutos, hasai no saring maçã no buti laranja been oi-tun ba laran.'
      ]
    },
    {
      day: 'Loron 3',
      breakfast: 'Sasoro + marungi + manu-tolun',
      snackPagi: 'Pure ai-dila',
      lunch: 'Sasoro + naan manu isin + brokoli',
      snackSore: 'Pure hudi',
      dinner: 'Sasoro + cenoura + naan manu',
      instructions: [
        'Tein sasoro, tau ho marunggi no naan manu.',
        'Koa ai-dila no hanehan ka blender halo dodok.',
        'Tein sasoro tau ho cenoura no naan manu.'
      ]
    },
    {
      day: 'Loron 4',
      breakfast: 'Koto daan (cenoura daan, fehuk-ropa daan, naan manu daan)',
      snackPagi: 'Pure alpukat',
      lunch: 'Sasoro ho cenoura, lakeru kinur, fehuk-ropa',
      snackSore: 'Pure jeruk',
      dinner: 'Sasoro + ikan + cenoura',
      instructions: [
        'Koto daan : koto ne’ebe daan ona blender hamutuk ho cenoura, fehuk ropa no naan manu ne’ebe daan ona blender halo dodok los no fo ba labarik.',
        'Tein sasoro + kukus fore-sikote no cenoura.',
        'Tein sasoro ho cenoura, lakeru kinur, fehuk ropa no blender hamutuk bainhira mamar ona'
      ]
    },
    {
      day: 'Loron 5',
      breakfast: 'Fore-munggu + fehuk kinur kor laranja + marunggi',
      snackPagi: 'Pure hudi',
      lunch: 'Sasoro + naan aten + mostarda',
      snackSore: 'Pure ai-dila',
      dinner: 'Sasoro + manu-tolun + modo-tahan',
      instructions: [
        'Daan fehuk-midar kor laranja to tasak, Daan fore-mungu halo dodok no tau marunggi bainhira fore-munggu atu tasak, blender hamutuk no fo ba labarik.',
        'Tein sasoro ho naan manu aten no mostarda halo dodok los no fo ba labarik.',
        'Tein etu ho cenoura, fehuk-ropa, tempe, lis mean, lis mutin ho bee barak halo tasak los, kukus hela batar nurak no lakeru kinur, depois daan manu-tolun. Depois batar tasak ona, iris batar iha ikus kahur hamutuk ingredientes sira no blender halo dodok los.'
      ]
    },
    {
      day: 'Loron 6 (Fulan 9-11)',
      breakfast: 'Sasoro + Ikan + Brokoli',
      snackPagi: 'Fore-munggu + susu-ben',
      lunch: 'Etu + Mostarda + Tempe sona + hudi',
      snackSore: 'Tahu + manu-tolun + brokoli',
      dinner: 'Etu lakeru kinur + naan manu + Brokoli + Ai-dila tasak',
      instructions: [
        'Tein sasoro ho bee naton, tau brokoli, daan ikan no hasai ikan ruin no halo rahun, tau ba sasoro no kedok to brokoli tasak lo’os de’ut lalika halo dodok liu no fo ba labarik.',
        'Tempe sona: Fila mostarda, labele halo dodok liu. Sona tempe no fila ho tomate.',
        'Tahu + manu-tolun + brokoli: prepara ingredientes sira (manu-tolun, etu, brokoli, tahu, kaldu jamur), kedok manu-tolun halo been los depois tau etu, tahu, brokoli kaldu jamur kedok fali hotu kukus to tasak.',
        'Tein etu ho lakeru kinur. Brokoli fila ho naan manu oi-tuan + manu-tolun daan.'
      ]
    },
    {
      day: 'Loron 7',
      breakfast: 'Fore-munggu + fehuk kinur kor laranja + marunggi',
      snackPagi: 'Fore-munggu + masin midar',
      lunch: 'Nasi tim (fos, fore-munggu la ho kulit, cenoura, naan aten)',
      snackSore: 'Sasoro (manu-tolun, mostarda) + Ai-dila tasak',
      dinner: 'Nasi Tim (naan karau isin, tempe, bayam, tomate) + hudi',
      instructions: [
        'Daan fehuk-midar kor laranja to tasak, Daan fore-mungu halo dodok no tau marunggi bainhira fore-munggu atu tasak, no de’ut halo dodok oi-tuan no fo ba labarik.',
        'Nasi Tim: Loke fore-munggu nia kulit, tempre naan manu aten ho tua-sin durante 15 minutos hodi halakon is depois fase no tetak halo rahun, hasai cenoura nia kulit no parut halo rahun, hatama ingredientes hotu ba sanan (fos, fore-munggu, cenoura, naan manu aten) no tein ho ahi bo’ot to nakali no karik nakali ona tein fali ho ahi ki’ik.',
        'Sasoro + manu-tolun: Tein sasoro ho manu-tolun no brokoli.',
        'Nasi tim: Koa naan karau halo ki’ik lo’os, koa tempe halo ki’ik, koa bayam no tomate, hatam ingrdientes sira ba sanan no tein ho ahi bo’ot to’o nakali, no tein fali ho ahi ki’ik.'
      ]
    },
    {
      day: 'Loron 8',
      breakfast: 'Sopa manu-tolun (lis mean, lis mutin, cenoura)',
      snackPagi: 'Avocate (depende abilidade labarik)',
      lunch: 'Nasi tim (naan manu, koto mean) + hudi',
      snackSore: 'Sasoro (ikan, lis tahan) + stroberry',
      dinner: 'Nasi Tim (fos, naan manu isin, naan manu aten, fehuk-ropa, tempe, bayam)',
      instructions: [
        'Sopa manu-tolun: Tein lis mean, lis mutin to morin no tau bee oituan no tau cenoura ne’ebe koa mihis, depois cenoura mamar tau fera manu-tolun no tau ba laran, kedok durante 5 minutos no ikus tau lis tahan oi-tuan.',
        'Nasi tim: tein tasak koto mean, koa naan manu halo ki’ik-ki’ik, koa fore-sikote halo ki’ik-ki’ik, no tau ingredients sira ho fos, tein iha sanan ho ahi bo’ot, no bainhira nakali ona tein fali iha ahi ki’ik.',
        'Nasi Tim: Tempra naan manu ho tua sin durante 15 minutos hodi halakon nia is, depois fase no koa halo ki’ik-ki’ik, koa naan manu halo ki’ik-ki’ik, koa fehuk ropa nia kulit no parut feruk-ropa, koa tempe halo ki’ik-ki’ik, koa baayam no tau hamutuk ingrdients sira iha sanan, tein ho ahi bo’ot, depois nakali tein fali ho ahi ki’ik to nia tasak.'
      ]
    },
    {
      day: 'Loron 9',
      breakfast: 'Sasoro (naan manu, cenoura) + uvas.',
      snackPagi: 'manu-tolun no avocate',
      lunch: 'Nasi Tim (naan manu, bayam, fos mean hoban durante kalan tomak, naan manu koa halo rahun los, fore-munggu la ho kulit hoban durante oras 1, lis mutin no mean, bayam daan no koa halo ki’ik-ki’ik) + hudi, ',
      snackSore: 'Pudding manu-tolun',
      dinner: 'Nasi Tim (naan karau isin, tempe, marunggi, tomate) + maçã',
      instructions: [
        'Manu-tolun + Avocate: Daan manu-tolun to tasak, de’ut avocate halo dodok, parut manu-tolun tama avocate no keduk hamutuk depois fo ba labarik.',
        'Nasi Tim: Sona lis mean no lis mutin ho mina oi-tuan to’o morin, tau naan manu no kedok oituan to’o nia kor mudansa, aumenta bee, no tau fos mean, no fore-munggu husik to nia tasak oi-tuan, depois tau cenoura hein to’o ingredietes sira tasak hotu, no bee menus mak bele hasai no tau ho bayam daan ne’ebe koa ona, husik halo malirin no fo ba labarik.',
        'Pudding manu-tolun: manu-tolun kinur ida, santan kanuru 2, kedok hamutuk, tau susu full cream 50 ml no kedok hamutuk, depois kukus durante 15-20 minutos.',
        'Nasi tim: Koa naan karau halo ki’ik lo’os, koa tempe halo ki’ik, koa marunggi no tomate, hatama ingrdientes sira ba sanan no tein ho ahi bo’ot to’o nakali, no tein fali ho ahi ki’ik to’o ingrdients sira tasak.'
      ]
    },
    {
      day: 'Loron 10',
      breakfast: 'Sasoro (manu-tolun, marunggi) + uvas',
      snackPagi: 'Banana pancake',
      lunch: 'Sasoro + manu-tolun puyuh',
      snackSore: 'Pure jeruk',
      dinner: 'Sasoro + labu siam',
      instructions: [
        'Banana pancake: Harahun hudi fuan 2, aumenta manu-tolun no kedok hamutuk, tau keju rahun kanuru 2, tau susu-ben full cream kanuru 1 no kedok hamutuk, prepara tasu no tau mantega ba tasu laran halo naben, sona pancake halo tasak no fo ba labarik.',
        'Manu-tolun: tein tasak, mash.',
        'Labu: mash.'
      ]
    }
  ];

  // ============================================================
  // DATA MENU KALKULASI (Anak & Dewasa)
  // ============================================================
  const calcMenuData = [
    {
      title: 'Menu 7 Loron untuk Anak Stunting',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Sasoro + labu + hati manu',
          snackPagi: 'Pure hudi',
          lunch: 'Etu + ikan tuna + bmanu',
          snackSore: 'Pure ai-dila',
          dinner: 'Etu + manu-tolun + wortel',
          instructions: [
            'Tein bubur, mash ho labu.',
            'Hati: tein tasak, mash.',
            'Ikan: tein. Bmanu: tein lalais.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Sasoro + kentang + daging manu',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + tempe + brokoli',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + labu siam',
          instructions: [
            'Tein bubur, mash ho kentang.',
            'Daging: tein, mash.',
            'Tempe: mash. Labu: mash.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Sasoro + ubi jalar + manu-tolun',
          snackPagi: 'Pure ai-dila',
          lunch: 'Etu + hati sapi + bmanu',
          snackSore: 'Pure hudi',
          dinner: 'Etu + tahu + buncis',
          instructions: [
            'Tein bubur, mash ho ubi.',
            'Manu-tolun: tein tasak.',
            'Hati: tein. Bmanu: tein lalais.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Sasoro + labu kuning + ikan',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + manu + kentang',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + tempe + sawi',
          instructions: [
            'Tein bubur, mash ho labu.',
            'Ikan: tein. Manu: tein.',
            'Sawi: tein lalais.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Sasoro + jagung + daging',
          snackPagi: 'Pure ai-dila',
          lunch: 'Etu + ikan nila + wortel',
          snackSore: 'Pure hudi',
          dinner: 'Etu + manu-tolun + kacang hijau',
          instructions: [
            'Tein bubur, mash ho jagung.',
            'Daging: tein. Ikan: tein.',
            'Wortel: mash.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Sasoro + bmanu + manu',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + hati manu + labu',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + brokoli',
          instructions: [
            'Tein bubur, mash ho bmanu.',
            'Manu: tein. Hati: tein.',
            'Brokoli: mash.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Sasoro + tahu + naan karau',
          snackPagi: 'Pure hudi',
          lunch: 'Etu + ikan tuna + bmanu',
          snackSore: 'Pure ai-dila',
          dinner: 'Etu + manu-tolun + labu siam',
          instructions: [
            'Tein bubur, mash ho tahu.',
            'Daging: tein. Ikan: tein.',
            'Labu: mash.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Anak Wasting',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Sasoro + kaldu manu + manu-tolun',
          snackPagi: 'Pure hudi',
          lunch: 'Etu + ikan tuna + kentang',
          snackSore: 'Pure ai-dila',
          dinner: 'Etu + hati manu + wortel',
          instructions: [
            'Tein bubur ho kaldu manu.',
            'Manu-tolun: tein tasak. Ikan: tein.',
            'Kentang: mash.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Sasoro + kaldu ikan + tahu',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + naan karau + labu',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + brokoli',
          instructions: [
            'Tein bubur ho kaldu ikan.',
            'Tahu: mash. Daging: tein.',
            'Labu: mash.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Sasoro + kaldu manu + ubi',
          snackPagi: 'Pure ai-dila',
          lunch: 'Etu + tempe + bmanu',
          snackSore: 'Pure hudi',
          dinner: 'Etu + manu-tolun + kacang hijau',
          instructions: [
            'Tein bubur ho kaldu.',
            'Ubi: mash. Tempe: mash.',
            'Bmanu: tein lalais.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Sasoro + kaldu sapi + kentang',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + hati manu + labu kuning',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + sayur sop',
          instructions: [
            'Tein bubur ho kaldu sapi.',
            'Kentang: mash. Hati: tein.',
            'Labu: mash.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Sasoro + kaldu manu + tahu',
          snackPagi: 'Pure ai-dila',
          lunch: 'Etu + ikan tuna + wortel',
          snackSore: 'Pure hudi',
          dinner: 'Etu + daging manu + kacang panjang',
          instructions: [
            'Tein bubur ho kaldu.',
            'Tahu: mash. Ikan: tein.',
            'Wortel: mash.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Sasoro + kaldu ikan + manu-tolun',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + tempe + brokoli',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + bmanu',
          instructions: [
            'Tein bubur ho kaldu ikan.',
            'Manu-tolun: tein. Tempe: mash.',
            'Bmanu: tein lalais.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Sasoro + kaldu sapi + labu',
          snackPagi: 'Pure hudi',
          lunch: 'Etu + hati sapi + kentang',
          snackSore: 'Pure ai-dila',
          dinner: 'Etu + manu-tolun + wortel',
          instructions: [
            'Tein bubur ho kaldu sapi.',
            'Labu: mash. Hati: tein.',
            'Kentang: mash.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Anak Underweight',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Sasoro + manu-tolun + labu',
          snackPagi: 'Pure hudi',
          lunch: 'Etu + ikan + bmanu',
          snackSore: 'Pure ai-dila',
          dinner: 'Etu + manu + wortel',
          instructions: [
            'Tein bubur, mash ho labu.',
            'Manu-tolun: tein. Ikan: tein.',
            'Bmanu: tein lalais.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Sasoro + tahu + kentang',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + tempe + brokoli',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + labu siam',
          instructions: [
            'Tein bubur, mash ho tahu.',
            'Kentang: mash. Tempe: mash.',
            'Labu: mash.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Sasoro + hati manu + ubi',
          snackPagi: 'Pure ai-dila',
          lunch: 'Etu + ikan tuna + sawi',
          snackSore: 'Pure hudi',
          dinner: 'Etu + manu-tolun + kacang hijau',
          instructions: [
            'Tein bubur, mash ho ubi.',
            'Hati: tein. Ikan: tein.',
            'Sawi: tein lalais.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Sasoro + naan karau + labu',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + manu + kentang',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + buncis',
          instructions: [
            'Tein bubur, mash ho labu.',
            'Daging: tein. Manu: tein.',
            'Buncis: tein lalais.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Sasoro + manu-tolun + bmanu',
          snackPagi: 'Pure ai-dila',
          lunch: 'Etu + hati sapi + wortel',
          snackSore: 'Pure hudi',
          dinner: 'Etu + tempe + labu kuning',
          instructions: [
            'Tein bubur, mash ho bmanu.',
            'Manu-tolun: tein. Hati: tein.',
            'Labu: mash.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Sasoro + ikan + jagung',
          snackPagi: 'Pure alpukat',
          lunch: 'Etu + manu + brokoli',
          snackSore: 'Pure jeruk',
          dinner: 'Etu + ikan + sawi putih',
          instructions: [
            'Tein bubur, mash ho jagung.',
            'Ikan: tein. Manu: tein.',
            'Sawi: tein lalais.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Sasoro + tahu + labu kuning',
          snackPagi: 'Pure ai-dila',
          lunch: 'Etu + ikan tuna + kentang',
          snackSore: 'Pure hudi',
          dinner: 'Etu + manu-tolun + bmanu',
          instructions: [
            'Tein bubur, mash ho tahu.',
            'Labu: mash. Ikan: tein.',
            'Bmanu: tein lalais.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Anak Overweight',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Sasoro + sayur bening',
          snackPagi: 'Buah segar',
          lunch: 'Etu merah + ikan kukus + brokoli',
          snackSore: 'Ai-dila',
          dinner: 'Etu + manu tanpa kulit + salad sayur',
          instructions: [
            'Tein bubur ho sayur bening.',
            'Etu merah: tein. Ikan: tunu (sem minyak).',
            'Manu: tein sem minyak.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Sasoro + labu siam',
          snackPagi: 'Maçã',
          lunch: 'Etu merah + tahu + tumis kangkung',
          snackSore: 'Jeruk',
          dinner: 'Etu + ikan + sayur kacang panjang',
          instructions: [
            'Tein bubur, mash ho labu.',
            'Tahu: tein. Kangkung: tein ho mina uitoan.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Sasoro + wortel',
          snackPagi: 'Buah segar',
          lunch: 'Etu merah + manu-tolun + sayur sop',
          snackSore: 'Ai-dila',
          dinner: 'Etu + tempe + brokoli',
          instructions: [
            'Tein bubur, mash ho wortel.',
            'Manu-tolun: tein. Tempe: tein lalais.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Sasoro + bmanu',
          snackPagi: 'Maçã',
          lunch: 'Etu merah + manu + kentang rebus',
          snackSore: 'Jeruk',
          dinner: 'Etu + ikan + labu',
          instructions: [
            'Tein bubur, mash ho bmanu.',
            'Manu: tein. Kentang: tein. Labu: mash.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Sasoro + kacang hijau',
          snackPagi: 'Pisang',
          lunch: 'Etu merah + tahu + sayur lodeh',
          snackSore: 'Buah segar',
          dinner: 'Etu + manu + buncis',
          instructions: [
            'Tein bubur, mash ho kacang.',
            'Tahu: tein. Buncis: tein lalais.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Sasoro + kentang',
          snackPagi: 'Semangka',
          lunch: 'Etu merah + ikan + brokoli',
          snackSore: 'Maçã',
          dinner: 'Etu + tempe + sayur asem',
          instructions: [
            'Tein bubur, mash ho kentang.',
            'Ikan: tunu. Tempe: tein lalais.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Sasoro + labu kuning',
          snackPagi: 'Buah segar',
          lunch: 'Etu merah + daging manu + wortel',
          snackSore: 'Ai-dila',
          dinner: 'Etu + ikan + sayur bmanu',
          instructions: [
            'Tein bubur, mash ho labu.',
            'Manu: tein. Wortel: mash. Bmanu: tein lalais.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Dewasa Underweight',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Oatmeal + pisang + manu-tolun',
          snackPagi: 'Alpukat + susu',
          lunch: 'Etu + naan karau + kentang',
          snackSore: 'Ai-dila + kacang',
          dinner: 'Etu + ikan + sup manu',
          instructions: [
            'Oatmeal: hemu ho bee manas.',
            'Manu-tolun: tein. Daging: tein.',
            'Sup manu: tein ho kaldu.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Bubur manu + manu-tolun',
          snackPagi: 'Ai-dila + kacang',
          lunch: 'Etu + hati sapi + bmanu',
          snackSore: 'Maçã + yogurt',
          dinner: 'Etu + tempe + sayur kacang',
          instructions: [
            'Bubur manu: tein etu ho kaldu.',
            'Hati: tein. Bmanu: tein lalais.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Roti gandum + selai kacang',
          snackPagi: 'Pisang + yogurt',
          lunch: 'Etu + ikan tuna + brokoli',
          snackSore: 'Jeruk + kacang almond',
          dinner: 'Etu + daging manu + wortel',
          instructions: [
            'Roti: han ho selai.',
            'Ikan: tunu. Brokoli: tein lalais. Daging: tein.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Ai-dila + susu',
          lunch: 'Etu + ikan + kentang rebus',
          snackSore: 'Maçã + kacang',
          dinner: 'Etu + tahu + sup kacang merah',
          instructions: [
            'Oatmeal: hemu.',
            'Ikan: tein. Kentang: tein.',
            'Sup kacang: tein.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Bubur kacang hijau + manu-tolun',
          snackPagi: 'Pisang + yogurt',
          lunch: 'Etu + daging + sayur bmanu',
          snackSore: 'Ai-dila + kacang',
          dinner: 'Etu + ikan + labu siam',
          instructions: [
            'Bubur kacang: tein.',
            'Manu-tolun: tein. Daging: tein.',
            'Labu: tein.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Manu-tolun rebus + roti',
          snackPagi: 'Maçã + yogurt',
          lunch: 'Etu + hati manu + brokoli',
          snackSore: 'Ai-dila + kacang',
          dinner: 'Etu + tempe + sayur asem',
          instructions: [
            'Manu-tolun: tein tasak.',
            'Hati: tein. Brokoli: tein. Tempe: tein.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Pancake + madu',
          snackPagi: 'Pisang + kacang',
          lunch: 'Etu + ikan tuna + sayur sop',
          snackSore: 'Maçã + yogurt',
          dinner: 'Etu + daging + kentang',
          instructions: [
            'Pancake: tein ho manu-tolun, pisang.',
            'Ikan: tunu. Daging: tein. Kentang: tein.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Dewasa Obesitas',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Oatmeal + buah beri',
          snackPagi: 'Maçã',
          lunch: 'Etu merah + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Sup manu + tahu + sayur',
          instructions: [
            'Oatmeal: hemu.',
            'Etu merah: tein. Ikan: tunu sem minyak.',
            'Sup: tein ho kaldu.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Manu-tolun rebus + roti gandum',
          snackPagi: 'Jeruk',
          lunch: 'Etu merah + manu panggang + salad',
          snackSore: 'Ai-dila',
          dinner: 'Etu + ikan + tumis kacang panjang',
          instructions: [
            'Manu-tolun: tein tasak.',
            'Manu: tunu. Salad: mistura.',
            'Kacang: tein lalais.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Yogurt + buah',
          snackPagi: 'Ai-dila',
          lunch: 'Etu merah + tempe + sayur lodeh',
          snackSore: 'Maçã',
          dinner: 'Etu + manu tanpa kulit + brokoli',
          instructions: [
            'Yogurt: han.',
            'Tempe: tein. Manu: tein sem minyak.',
            'Brokoli: tein lalais.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Semangka',
          lunch: 'Etu merah + ikan + kentang rebus',
          snackSore: 'Jeruk',
          dinner: 'Etu + tahu + sayur sop',
          instructions: [
            'Oatmeal: hemu.',
            'Ikan: tunu. Kentang: tein.',
            'Sup: tein.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Manu-tolun + roti gandum',
          snackPagi: 'Maçã + kacang',
          lunch: 'Etu merah + daging manu + salad',
          snackSore: 'Ai-dila',
          dinner: 'Etu + ikan + brokoli',
          instructions: [
            'Manu-tolun: tein.',
            'Manu: tunu. Salad: mistura.',
            'Brokoli: tein.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Yogurt + buah beri',
          snackPagi: 'Jeruk',
          lunch: 'Etu merah + tempe + kacang panjang',
          snackSore: 'Maçã',
          dinner: 'Etu + manu + sayur bmanu',
          instructions: [
            'Yogurt: han.',
            'Tempe: tein. Kacang: tein.',
            'Bmanu: tein lalais.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Ai-dila',
          lunch: 'Etu merah + ikan + labu siam',
          snackSore: 'Jeruk',
          dinner: 'Etu + tahu + brokoli',
          instructions: [
            'Oatmeal: hemu.',
            'Ikan: tunu. Labu: tein.',
            'Brokoli: tein lalais.'
          ]
        }
      ]
    }
  ];

  // ============================================================
  // DATA MENU PENYAKIT (Hipertensi, Kanker, dll)
  // ============================================================
  const diseaseSpecificMenus = [
    {
      title: 'Menu 7 Loron untuk Hipertensi',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Apel',
          lunch: 'Nasi merah + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Sup ayam + tahu + sayur',
          instructions: [
            'Hindari garam berlebihan.',
            'Masak nasi merah, kukus ikan hingga matang.',
            'Buat sup ayam dengan kaldu rendah garam.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Jeruk',
          lunch: 'Nasi merah + ayam panggang + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + tumis kacang panjang',
          instructions: [
            'Panggang ayam tanpa garam berlebihan.',
            'Tumis kacang panjang.',
            'Masak ikan dengan sedikit minyak.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Yogurt + buah',
          snackPagi: 'Pepaya',
          lunch: 'Nasi merah + tempe + sayur lodeh',
          snackSore: 'Apel',
          dinner: 'Nasi + ayam tanpa kulit + brokoli',
          instructions: [
            'Masak tempe dengan santan encer.',
            'Rebus brokoli.',
            'Masak ayam tanpa kulit.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Semangka',
          lunch: 'Nasi merah + ikan + kentang rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus ikan dan kentang.',
            'Buat sup tanpa garam berlebihan.',
            'Masak tahu.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Telur + roti gandum',
          snackPagi: 'Apel + kacang',
          lunch: 'Nasi merah + daging ayam + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + brokoli',
          instructions: [
            'Panggang daging ayam.',
            'Rebus brokoli.',
            'Masak ikan dengan sedikit minyak.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Yogurt + buah beri',
          snackPagi: 'Jeruk',
          lunch: 'Nasi merah + tempe + kacang panjang',
          snackSore: 'Apel',
          dinner: 'Nasi + ayam + sayur bayam',
          instructions: [
            'Masak tempe.',
            'Rebus bayam.',
            'Masak ayam dengan sedikit minyak.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Pepaya',
          lunch: 'Nasi merah + ikan + labu siam',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + brokoli',
          instructions: [
            'Rebus ikan dan labu siam.',
            'Rebus brokoli.',
            'Masak tahu.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Diabetes',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Oatmeal + buah beri',
          snackPagi: 'Apel',
          lunch: 'Nasi merah + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Sup ayam + tahu + sayur',
          instructions: [
            'Hindari gula.',
            'Masak nasi merah. Kukus ikan.',
            'Buat sup ayam tanpa gula.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Jeruk',
          lunch: 'Nasi merah + ayam panggang + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + tumis kacang panjang',
          instructions: [
            'Panggang ayam.',
            'Tumis kacang panjang.',
            'Masak ikan tanpa gula.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Yogurt + buah',
          snackPagi: 'Pepaya',
          lunch: 'Nasi merah + tempe + sayur lodeh',
          snackSore: 'Apel',
          dinner: 'Nasi + ayam tanpa kulit + brokoli',
          instructions: [
            'Masak tempe.',
            'Rebus brokoli.',
            'Masak ayam tanpa gula.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Semangka',
          lunch: 'Nasi merah + ikan + kentang rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus ikan dan kentang.',
            'Buat sup tanpa gula.',
            'Masak tahu.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Telur + roti gandum',
          snackPagi: 'Apel + kacang',
          lunch: 'Nasi merah + daging ayam + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + brokoli',
          instructions: [
            'Panggang ayam.',
            'Rebus brokoli.',
            'Masak ikan tanpa gula.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Yogurt + buah beri',
          snackPagi: 'Jeruk',
          lunch: 'Nasi merah + tempe + kacang panjang',
          snackSore: 'Apel',
          dinner: 'Nasi + ayam + sayur bayam',
          instructions: [
            'Masak tempe.',
            'Rebus bayam.',
            'Masak ayam tanpa gula.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Pepaya',
          lunch: 'Nasi merah + ikan + labu siam',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + brokoli',
          instructions: [
            'Rebus ikan dan labu siam.',
            'Rebus brokoli.',
            'Masak tahu.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Anemia',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur kacang hijau + telur',
          snackPagi: 'Jeruk (untuk vitamin C)',
          lunch: 'Nasi + hati sapi + bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + tumis kangkung',
          instructions: [
            'Masak kacang hijau.',
            'Rebus hati sapi.',
            'Rebus bayam. Tumis kangkung.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Roti gandum + selai kacang',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan tuna + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tempe + sayur kacang panjang',
          instructions: [
            'Bakar ikan.',
            'Rebus brokoli.',
            'Tumis kacang panjang. Masak tempe.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + hati ayam + wortel',
          snackSore: 'Pepaya',
          dinner: 'Nasi + daging ayam + labu siam',
          instructions: [
            'Masak bubur ayam.',
            'Rebus hati ayam dan wortel.',
            'Masak daging ayam dan labu siam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + daging sapi + sayur bayam',
          snackSore: 'Apel + kacang',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus daging sapi.',
            'Rebus bayam.',
            'Masak ikan dan kacang panjang.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Bubur kacang hijau + telur',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + hati sapi + wortel',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tempe + sayur sop',
          instructions: [
            'Masak kacang hijau.',
            'Rebus hati sapi dan wortel.',
            'Masak tempe dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan + tumis kangkung',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ayam + brokoli',
          instructions: [
            'Rebus telur.',
            'Tumis kangkung.',
            'Masak ayam dan brokoli.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Apel',
          lunch: 'Nasi + hati ayam + bayam',
          snackSore: 'Jeruk',
          dinner: 'Nasi + daging + kentang',
          instructions: [
            'Masak bubur ayam.',
            'Rebus hati ayam dan bayam.',
            'Masak daging dan kentang.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Diare',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + kaldu ayam',
          snackPagi: 'Pisang',
          lunch: 'Bubur nasi + telur rebus',
          snackSore: 'Pure pepaya',
          dinner: 'Bubur nasi + tahu',
          instructions: [
            'Masak bubur nasi dengan kaldu ayam.',
            'Rebus telur.',
            'Masak tahu, campur ke bubur.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Bubur nasi + kaldu ikan',
          snackPagi: 'Pisang',
          lunch: 'Bubur nasi + kentang rebus',
          snackSore: 'Pure pepaya',
          dinner: 'Bubur nasi + tempe',
          instructions: [
            'Masak bubur nasi dengan kaldu ikan.',
            'Rebus kentang.',
            'Masak tempe, campur ke bubur.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Bubur nasi + kaldu ayam',
          snackPagi: 'Pisang',
          lunch: 'Bubur nasi + wortel',
          snackSore: 'Pure pepaya',
          dinner: 'Bubur nasi + tahu',
          instructions: [
            'Masak bubur nasi.',
            'Rebus wortel.',
            'Masak tahu, campur ke bubur.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + kaldu ikan',
          snackPagi: 'Pisang',
          lunch: 'Bubur nasi + labu siam',
          snackSore: 'Pure pepaya',
          dinner: 'Bubur nasi + kacang hijau',
          instructions: [
            'Masak bubur nasi.',
            'Rebus labu siam.',
            'Masak kacang hijau, campur ke bubur.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Bubur nasi + kaldu ayam',
          snackPagi: 'Pisang',
          lunch: 'Bubur nasi + telur',
          snackSore: 'Pure pepaya',
          dinner: 'Bubur nasi + tahu',
          instructions: [
            'Masak bubur nasi.',
            'Rebus telur.',
            'Masak tahu, campur ke bubur.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Bubur nasi + kaldu ikan',
          snackPagi: 'Pisang',
          lunch: 'Bubur nasi + kentang',
          snackSore: 'Pure pepaya',
          dinner: 'Bubur nasi + tempe',
          instructions: [
            'Masak bubur nasi.',
            'Rebus kentang.',
            'Masak tempe, campur ke bubur.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur nasi + kaldu ayam',
          snackPagi: 'Pisang',
          lunch: 'Bubur nasi + wortel',
          snackSore: 'Pure pepaya',
          dinner: 'Bubur nasi + labu siam',
          instructions: [
            'Masak bubur nasi.',
            'Rebus wortel.',
            'Rebus labu siam, campur ke bubur.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Asam Urat',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Roti gandum + telur rebus',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam tanpa kulit + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur kacang panjang',
          instructions: [
            'Rebus telur.',
            'Rebus brokoli.',
            'Tumis kacang panjang. Masak tahu.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Bubur sumsum + telur',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan nila + tumis kacang panjang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + brokoli',
          instructions: [
            'Rebus telur.',
            'Tumis kacang panjang.',
            'Masak tahu dan brokoli.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Roti gandum + selai kacang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam tanpa kulit + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur kacang hijau + telur',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan nila + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + buncis',
          instructions: [
            'Rebus telur.',
            'Rebus brokoli.',
            'Tumis buncis. Masak tahu.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Apel',
          lunch: 'Nasi + ayam tanpa kulit + kacang panjang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Tumis kacang panjang.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan nila + brokoli',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + buncis',
          instructions: [
            'Masak bubur ayam.',
            'Rebus brokoli.',
            'Tumis buncis. Masak tahu.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + telur',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam tanpa kulit + salad',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur kacang panjang',
          instructions: [
            'Rebus telur.',
            'Tumis kacang panjang.',
            'Masak tahu.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Kanker',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + telur rebus + pepaya',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tempe + sayur kangkung',
          instructions: [
            'Rebus telur.',
            'Kukus ikan.',
            'Tumis kangkung. Masak tempe.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Rebus labu siam. Masak ikan.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Roti gandum + selai kacang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + hati sapi + brokoli',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus hati sapi.',
            'Rebus brokoli.',
            'Buat sop. Masak tahu.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur kacang hijau + telur',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan tuna + kentang',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tempe + sayur bayam',
          instructions: [
            'Masak kacang hijau.',
            'Rebus ikan dan kentang.',
            'Rebus bayam. Masak tempe.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + brokoli',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus telur.',
            'Rebus brokoli.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + hati ayam + wortel',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Masak bubur ayam.',
            'Rebus hati ayam dan wortel.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tempe + sayur bayam',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Rebus bayam. Masak tempe.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Obesitas',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Oatmeal + buah beri',
          snackPagi: 'Apel',
          lunch: 'Nasi merah + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Sup ayam + tahu + sayur',
          instructions: [
            'Masak nasi merah.',
            'Kukus ikan. Rebus brokoli.',
            'Buat sup ayam.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Jeruk',
          lunch: 'Nasi merah + ayam panggang + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + tumis kacang panjang',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Yogurt + buah',
          snackPagi: 'Pepaya',
          lunch: 'Nasi merah + tempe + sayur lodeh',
          snackSore: 'Apel',
          dinner: 'Nasi + ayam tanpa kulit + brokoli',
          instructions: [
            'Masak tempe.',
            'Rebus brokoli.',
            'Masak ayam tanpa kulit.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Semangka',
          lunch: 'Nasi merah + ikan + kentang rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus ikan dan kentang.',
            'Buat sop.',
            'Masak tahu.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Telur + roti gandum',
          snackPagi: 'Apel + kacang',
          lunch: 'Nasi merah + daging ayam + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + brokoli',
          instructions: [
            'Panggang ayam.',
            'Rebus brokoli.',
            'Masak ikan.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Yogurt + buah beri',
          snackPagi: 'Jeruk',
          lunch: 'Nasi merah + tempe + kacang panjang',
          snackSore: 'Apel',
          dinner: 'Nasi + ayam + sayur bayam',
          instructions: [
            'Masak tempe.',
            'Tumis kacang panjang.',
            'Rebus bayam. Masak ayam.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Pepaya',
          lunch: 'Nasi merah + ikan + labu siam',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + brokoli',
          instructions: [
            'Rebus ikan dan labu siam.',
            'Rebus brokoli.',
            'Masak tahu.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Kolesterol Tinggi',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tempe + sayur bayam',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Rebus bayam. Masak tempe.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Yogurt + buah',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + tahu + sayur lodeh',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ayam + brokoli',
          instructions: [
            'Masak tahu.',
            'Rebus brokoli.',
            'Masak ayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan + kentang',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tempe + sayur sop',
          instructions: [
            'Rebus ikan dan kentang.',
            'Buat sop.',
            'Masak tempe.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Telur + roti gandum',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + daging ayam + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + brokoli',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Rebus brokoli. Masak ikan.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Yogurt + buah beri',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + tempe + kacang panjang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ayam + sayur bayam',
          instructions: [
            'Masak tempe.',
            'Tumis kacang panjang.',
            'Rebus bayam. Masak ayam.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan + labu siam',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + brokoli',
          instructions: [
            'Rebus ikan dan labu siam.',
            'Rebus brokoli.',
            'Masak tahu.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Penyakit Ginjal',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + telur rebus',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + kentang rebus',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Kukus ikan. Rebus kentang.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + mentimun',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Masak ikan dan mentimun.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + kentang',
          snackPagi: 'Apel',
          lunch: 'Nasi + daging ayam tanpa kulit + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus kentang.',
            'Panggang ayam.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + kentang rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + mentimun',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus kentang.',
            'Masak ikan dan mentimun.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur nasi + telur',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan + sayur bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan bayam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Penyakit Pernapasan',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Masak bubur ayam.',
            'Kukus ikan. Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Apel',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + daging ayam + kentang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus kentang.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + wortel',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus wortel.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan + sayur bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Masak bubur ayam.',
            'Rebus ikan dan bayam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Osteoporosis',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + telur rebus + susu',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Kukus ikan. Rebus brokoli.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang + susu',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Telur rebus + roti gandum + susu',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + kentang + susu',
          snackPagi: 'Apel',
          lunch: 'Nasi + daging ayam + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus kentang.',
            'Panggang ayam.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Oatmeal + alpukat + susu',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti + susu',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + kentang rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + mentimun',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus kentang.',
            'Masak ikan dan mentimun.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur nasi + telur + susu',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan + sayur bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan bayam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Hepatitis',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + telur rebus',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Kukus ikan. Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + kentang',
          snackPagi: 'Apel',
          lunch: 'Nasi + daging ayam + kentang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus kentang dan ayam.',
            'Tumis kacang panjang.',
            'Masak ikan.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + wortel',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus wortel.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan + sayur bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Masak bubur ayam.',
            'Rebus ikan dan bayam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Tuberkulosis',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + telur rebus',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Kukus ikan. Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + kentang',
          snackPagi: 'Apel',
          lunch: 'Nasi + daging ayam + kentang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus kentang dan ayam.',
            'Tumis kacang panjang.',
            'Masak ikan.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + wortel',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus wortel.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan + sayur bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Masak bubur ayam.',
            'Rebus ikan dan bayam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk HIV/AIDS',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + telur rebus',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Kukus ikan. Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + kentang',
          snackPagi: 'Apel',
          lunch: 'Nasi + daging ayam + kentang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus kentang dan ayam.',
            'Tumis kacang panjang.',
            'Masak ikan.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + wortel',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus wortel.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan + sayur bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Masak bubur ayam.',
            'Rebus ikan dan bayam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Hipotiroidisme',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Apel',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Panggang ayam.',
            'Buat salad.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Bubur nasi + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Apel',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + daging ayam + kentang',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Panggang ayam.',
            'Rebus kentang.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Apel',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam + wortel',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Masak bubur ayam.',
            'Rebus wortel.',
            'Tumis kacang panjang. Masak ikan.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + labu siam',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus ikan dan labu siam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    },
    {
      title: 'Menu 7 Loron untuk Hipoglikemia',
      week: [
        {
          day: 'Loron 1',
          breakfast: 'Bubur nasi + telur rebus',
          snackPagi: 'Pisang',
          lunch: 'Nasi + ikan + kentang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan kentang.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 2',
          breakfast: 'Oatmeal + pisang',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ayam panggang + salad',
          snackSore: 'Apel',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Seduh oatmeal.',
            'Panggang ayam.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 3',
          breakfast: 'Telur rebus + roti gandum',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ikan + wortel rebus',
          snackSore: 'Jeruk',
          dinner: 'Nasi + tahu + sayur bayam',
          instructions: [
            'Rebus telur.',
            'Rebus ikan dan wortel.',
            'Masak tahu dan bayam.'
          ]
        },
        {
          day: 'Loron 4',
          breakfast: 'Bubur nasi + kentang',
          snackPagi: 'Pisang',
          lunch: 'Nasi + daging ayam + kentang',
          snackSore: 'Pepaya',
          dinner: 'Nasi + ikan + kacang panjang',
          instructions: [
            'Rebus kentang dan ayam.',
            'Tumis kacang panjang.',
            'Masak ikan.'
          ]
        },
        {
          day: 'Loron 5',
          breakfast: 'Oatmeal + alpukat',
          snackPagi: 'Jeruk',
          lunch: 'Nasi + ikan kukus + brokoli',
          snackSore: 'Pisang',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Kukus ikan.',
            'Rebus brokoli.',
            'Masak tahu dan sayur sop.'
          ]
        },
        {
          day: 'Loron 6',
          breakfast: 'Telur rebus + roti',
          snackPagi: 'Pepaya',
          lunch: 'Nasi + ayam + wortel',
          snackSore: 'Jeruk',
          dinner: 'Nasi + ikan + labu siam',
          instructions: [
            'Rebus telur dan ayam.',
            'Rebus wortel.',
            'Masak ikan dan labu siam.'
          ]
        },
        {
          day: 'Loron 7',
          breakfast: 'Bubur ayam + telur',
          snackPagi: 'Pisang',
          lunch: 'Nasi + ikan + sayur bayam',
          snackSore: 'Pepaya',
          dinner: 'Nasi + tahu + sayur sop',
          instructions: [
            'Masak bubur ayam.',
            'Rebus ikan dan bayam.',
            'Masak tahu dan sayur sop.'
          ]
        }
      ]
    }
  ];

  // ============================================================
  // FUNGSI UNTUK MENAMPILKAN TABEL (Otomatis, tidak perlu tulis ulang)
  // ============================================================
    const renderMenuTable = (menuData, info = null) => (
    <>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Hari</th>
            <th>Sarapan</th>
            <th>Snack Pagi</th>
            <th>Makan Siang</th>
            <th>Snack Sore</th>
            <th>Makan Malam</th>
            <th>Cara Membuat</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((day, i) => (
            <tr key={i}>
              <td>{day.day}</td>
              <td>{day.breakfast}</td>
              <td>{day.snackPagi}</td>
              <td>{day.lunch}</td>
              <td>{day.snackSore}</td>
              <td>{day.dinner}</td>
              <td className="menu-instruction">
                <ol>
                  {day.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {info && (
        <div className="menu-info-alert">
          <div className="menu-info-header">💡 Informasi Penting</div>
          <ul>
            {info.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  return (
    <section>
      <h2>Contoh Menu Loronan</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('sehat')}>Menu Sehat 20</button>
        <button onClick={() => setActiveTab('mpasi')}>Menu MPASI 20</button>
        <button onClick={() => setActiveTab('kalkulasi')}>Menu Kalkulasi</button>
        <button onClick={() => setActiveTab('penyakit')}>Menu Penyakit</button>
      </div>

           {activeTab === 'sehat' && (
        <div className="menu-section">
          <h3>Menu Sehat 20 Hari</h3>
          {renderMenuTable(healthyMenu, [
            'Pastikan makanan dimasak hingga matang sempurna untuk membunuh bakteri.',
            'Minum air putih minimal 8 gelas sehari untuk menjaga hidrasi.',
            'Variasikan warna makanan di piring (merah, hijau, kuning) untuk memastikan nutrisi seimbang.',
            'Batasi konsumsi gula, garam, dan minyak berlebihan.'
          ])}
        </div>
      )}

      {activeTab === 'mpasi' && (
        <div className="menu-section">
          <h3>Menu MPASI 20 Hari</h3>
          {renderMenuTable(mpasiMenu, [
            'Untuk bayi 6-8 bulan: berikan tekstur lumat (puree) dan frekuensi makan 2-3 kali sehari.',
            'Untuk bayi 9-11 bulan: berikan tekstur cincang halus (mashed) dan frekuensi makan 3-4 kali sehari.',
            'Untuk bayi 12-23 bulan: berikan tekstur cincang kasar dan frekuensi makan 3-4 kali sehari + 1-2 snack.',
            'Hindari memberikan madu pada bayi di bawah 1 tahun karena berisiko botulisme.',
            'Jangan tambahkan garam, gula, atau penyedap rasa pada MPASI bayi di bawah 1 tahun.',
            'Berikan ASI atau susu formula tetap sebagai sumber utama nutrisi hingga usia 2 tahun.',
            'Selalu cuci tangan sebelum menyiapkan dan menyuapi anak.',
            'Jika anak menolak makan, jangan dipaksa. Coba lagi dengan variasi rasa dan tekstur lain.'
          ])}
        </div>
      )}

      {activeTab === 'kalkulasi' && (
        <div className="menu-section">
          <h3>Menu 7 Hari Spesifik Hasil Kalkulasi</h3>
          <p>Menu ini khusus untuk kondisi yang terdeteksi dari kalkulator (Stunting, Wasting, Underweight, Overweight, dan Obesitas).</p>
          <div className="menu-calc-grid">
            {calcMenuData.map((data, key) => (
              <div key={key} className="menu-calc-card">
                <h4>{data.title}</h4>
                {renderMenuTable(data.week, [
                  'Menu ini adalah panduan umum. Sesuaikan porsi dengan usia dan tingkat keparahan kondisi anak.',
                  'Untuk kasus Stunting dan Wasting, fokus pada pemberian protein hewani (ikan, telur, daging) dan energi yang cukup.',
                  'Untuk kasus Overweight dan Obesitas, kurangi gula, gorengan, dan makanan olahan. Tingkatkan serat dari sayur dan buah.',
                  'Konsultasikan dengan dokter atau ahli gizi di puskesmas terdekat untuk pemantauan lebih lanjut.',
                  'Pantau pertumbuhan anak setiap bulan di posyandu untuk melihat perkembangan.'
                ])}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'penyakit' && (
        <div className="menu-section">
          <h3>Menu 7 Hari untuk Penyakit</h3>
          <p>Menu ini khusus untuk penyakit seperti Hipertensi, Kanker, Diare, dll.</p>
          <div className="menu-calc-grid">
            {diseaseSpecificMenus.map((data, key) => (
              <div key={key} className="menu-calc-card">
                <h4>{data.title}</h4>
                {renderMenuTable(data.week, [
                  'Menu ini bersifat pendukung pengobatan, bukan pengganti obat dari dokter.',
                  'Untuk Hipertensi: batasi garam maksimal 1 sendok teh per hari dan hindari makanan olahan.',
                  'Untuk Diabetes: hindari gula sederhana, pilih karbohidrat kompleks (nasi merah, oat), dan makan dalam porsi kecil tapi sering.',
                  'Untuk Anemia: konsumsi makanan kaya zat besi (hati, daging merah, bayam) yang disertai vitamin C (jeruk, tomat) agar penyerapan lebih optimal. Hindari teh/kopi saat makan.',
                  'Untuk Diare: fokus pada rehidrasi (minum banyak cairan/ORS), makan makanan lunak dan rendah serat, hindari makanan pedas dan berlemak.',
                  'Untuk Asam Urat: hindari makanan tinggi purin (jeroan, seafood, daging merah) dan perbanyak minum air putih.',
                  'Selalu konsultasikan kondisi Anda dengan dokter untuk penanganan yang tepat.'
                ])}
              </div>
            ))}
          </div>
        </div>
      )}
          </section>
  );
}

function Diets({ goToMenus }) {
  return (
    <section>
      <h2>Dieta ba Moras Sira</h2>
      <p>Hafoin ita hatene moras ne’ebé ita sente, ita presiza hatene saida mak dian no saida mak la dian ba ita nia isin.</p>
      <div className="grid">
        {Object.entries(diseasesDiet).map(([k, v]) => (
          <article className="info" key={k}>
            <h3>{v.title}</h3>
            
            <div className="goal-box">
              <b>🎯 Objetivu:</b> {v.dietGoal}
            </div>

            <div className="diet-section diet-good">
              <b>✅ Ai-han ne'ebé rekomenda:</b>
              <ul>
                {v.recommended.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="diet-section diet-bad">
              <b>❌ Ai-han ne'ebé la rekomenda:</b>
              <ul>
                {v.avoid.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="menu-link-container">
              <button className="btn-secondary" onClick={goToMenus}>
                Haree Ezemplu Menu Diária
              </button>
            </div>
            
          </article>
        ))}
      </div>
    </section>
  );
}

function Safety() {
  const safetyTips = [
    'Mantén limpeza: fase liman, utensíliu no superfísie.',
    'Separa ai-han cru no tein.',
    'Tein ai-han to’o seguru no maturasaun adekuadu.',
    'Rai ai-han iha temperatura seguru no la husik tempu naruk iha temperatura ambiente.',
    'Uza bee no matéria-prima seguru; fase fruta no sayur antes han.'
  ];

  return (
    <section>
      <h2>5 chaves ba ai-han seguru</h2>
      <div className="grid">
        {safetyTips.map((x, i) => (
          <article className="info" key={i}>
            <div className="bigcheck">{i + 1}</div>
            <p>{x}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);