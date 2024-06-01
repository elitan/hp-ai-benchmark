import { CoreMessage } from "ai";

/**
 * https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/
 */

export interface Exam {
  testPass: number;
  question: number;
  type: "verbal" | "math";
  system: string;
  messages: CoreMessage[];
  answer: string;
}

const SYSTEM_PROMPT_WORD_COMPREHENSION = `Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska. Ditt mål är att alltid svara korrekt för att få alla rätt.

Välj rätt synonym från de angivna alternativen.

Lös varje uppgift i två steg.

Steg 1: Resonera för att svara korrekt
Steg 2: Skriv ditt svar inklusive svarsalternativ.`;

const SYSTEM_PROMPT_READING_COMPREHENSION = `Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.

Lös varje uppgift i två steg.

Steg 1: Resonera för att svara korrekt
Steg 2: Skriv ditt svar inklusive svarsalternativ.`;

const SYSTEM_PROMPT_SENTENCE_COMPLETION = `Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.

Lös varje uppgift i två steg.

Steg 1: Resonera för att svara korrekt
Steg 2: Skriv ditt svar inklusive svarsalternativ.`;

const SYSTEM_PROMPT_MATH = `Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.

Lös varje uppgift i två steg.

Steg 1: Resonera för att svara korrekt
Steg 2: Skriv ditt svar inklusive svarsalternativ.`;

const readingAbilityText1 = `De blodkärlsinflammationer som kallas vaskuliter leder oftast till ett relativt milt sjukdomsförlopp, men de kan i vissa fall vara livshotande. Denna ovanliga grupp av autoimmuna sjukdomar brukar behandlas med kortison och olika typer av cellhämmande läkemedel, men kanske kan ny kunskap om vesiklar öppna nya möjligheter.
- Genom att blockera vesiklarnas aktivitet har vi sett att inflammationsprocessen bromsas upp, säger Maria
Mossberg, forskare vid Lunds universitet.
I sin forskning har Maria Mossberg, som också arbetar som barnläkare vid Skånes universitetssjukhus i Lund, kunnat visa att vesiklar kan sprida inflammationen vidare i kroppen.
- Kroppens immunceller skickar iväg vesiklarna i blodcirkulationen, och dessa fungerar då som budbärare och signalerar till övriga delar av kroppen att dra igång immunförsvaret. För att studera vesiklarnas effekt odlade Maria Mossberg i ett laboratorium celler från blodkärl och fäste dem på ett konstgjort blodkärl. Blodplasma från människor med vaskulit passerade genom dessa blodkärl och cellerna producerade då fler vesiklar. Hon identifierade också
receptorer, mottagare, på vesiklarnas yta.
- När vi tillförde substanser för att blockera vesiklarnas receptorer bildades färre vesiklar och den inflammatoriska processen bromsades upp, förklarar Maria Mossberg. Substanserna som hon har testat är läkemedel som redan används vid andra sjukdomar.
- Det krävs mer forskning för att ytterligare studera effekt och säkerhet, men det skulle kunna bli ett nytt sätt att behandla vaskulitsjukdomar, säger hon. Vesiklar finns normalt i kroppen och är inblandade i kommunikation och transporter inom och mellan celler. De kan också fungera som sopbilar och frakta ut avfall från cellen. Gemensamt för dem alla är att de skapas genom en avknoppning av cellmembranet. Innehållet kan dock vara olika; cellen vill bli av med något (ett slags rengöring), eller så vill den sprida något till en annan cell.
- För cellen är det ett sätt att överleva. Maria Mossberg beskriver vesiklarna som en joker i kroppen. Forskarna har känt till dem länge, men de är väldigt små och svåra att mäta, så kunskapen om dem är liten.
- Allteftersom den tekniska utrustningen blir bättre får vi också mer kunskap om dem. På flera håll pågår nu forskning om vesiklar och hur dessa är inblandade i bland annat cancersjukdomar och hiv.`;

const readingAbilityText2 = `## Skogsindustrins företrädare

Skogsindustrins företrädare framhåller ofta att svenskt skogsbruk är miljövänligt och bedrivs på ett ekologiskt hållbart sätt. Detta trots att den naturhänsyn som tas i skogsbruket är starkt fragmenterad med endast spridda hänsynsträd kvarlämnade på hyggen, små hänsynsytor och till viss del frivilligt avsatt areal (inte officiellt kvalitetssäkrad). Ett sådant skogsbruk är inte långsiktigt hållbart utan tvärtom starkt utarmande. Något som bekräftas av forskningen, som entydigt visat att många hotade skogslevande arter behöver större sammanhängande naturskogar med naturliga störningar. Skogsbrukets påverkan genom avverkning av naturskogar och miljöer för missgynnade och hotade arter minskar våra skogars biologiska mångfald. Dessutom sker avverkningen ofta ända inpå nyckelbiotoper och naturreservat, trots att skyddszoner behövs för att motverka de ”kanteffekter” som kan uppstå intill hyggen.

Att vissa arter gynnas av att små hänsynsytor och hänsynsträd lämnas är självklart och inget bevis på ett hållbart skogsbruk. Den kritiska frågan är istället hur den långsiktiga överlevnaden för de hotade och missgynnade arterna ser ut vid olika skogsbruksmodeller. I Sverige saknas till stor del forskning på detta område. Detta gäller framför allt i de södra delarna av landet, där läget är särskilt allvarligt då många hotade arter endast finns kvar i små fragmenterade populationer. Teoretiska modeller och empiriska fakta visar att den starkt fragmenterade hänsynen i dagens skogsbruk är sämre på att bevara den biologiska mångfalden än modeller med mer koncentrerad hänsyn. Forskning har dessutom visat att hänsynsnivån i svenskt skogsbruk är alltför låg, vilket gäller även för det certifierade skogsbruket.

Grunden för dagens skogsbruk, ”den svenska skogsbruksmodellen”, lades år 1975. Då lagstiftades det om att storskaligt skogsbruk ska bedrivas i nästan alla våra skogar, samtidigt som en generell hänsyn ska tas till enstaka träd och vissa naturmiljöer. Under 1990-talet förstärktes modellen genom politiska beslut och genom frivilliga miljömärkningssystem (FSC och PEFC). Större delen av de skogar som omger oss och som kommer att växa upp är präglade av denna storskaliga modell med kalhyggesskogsbruk och en mycket schablonartad naturhänsyn. Dagens skogslandskap styrs i stort sett enbart av skogsindustrin, den gamla skogsvårdslagstiftningen och av myndigheten Skogsstyrelsen.

Målet med skogspolitiken är hög virkesproduktion samtidigt som den biologiska mångfalden ska bevaras. Den svenska modellen antogs dock utan vetenskaplig grund och bygger på att hänsynen till naturen ska ske på frivillig bas. Virkesproduktionen däremot styrs genom tydligare lagkrav. Påståendena att modellen ur miljösynpunkt har fungerat kan nog ses som ett önsketänkande och en politisk förhoppning. En starkt bidragande orsak är skogsindustrins krav på ett rationellt skogsbruk med stora arealer ”industriskogar” anpassade till pappersindustrins behov. Detta står i motsatsförhållande till bevarandet av biologiskt rika skogar.

Det är illa att modellen antogs utan vetenskaplig grund. Än värre är att det under den långa tid modellen funnits inte har bedrivits någon omfattande forskning eller miljöövervakning av dess effekter på naturen. Den forskning som trots allt har gjorts visar dock, i likhet med miljömässiga expertbedömningar och utvärderingar av situationen för den biologiska mångfalden, att det råder en allvarlig utarmningssituation. Över 2 000 skogsarter är rödlistade eller saknar gynnsam bevarandestatus. Många värdefulla naturskogsmiljöer är hotade och minskande. Särskilt allvarligt är det för många av de skogsnaturtyper som finns utpekade i EU:s naturvårdsdirektiv. Skogsavverkningar gör att de nu minskar i areal trots att detta står i strid med EU:s miljölagstiftning.

I en av Sveriges lantbruksuniversitet och forskningsinstitutet Skogforsk nyligen publicerad sammanställning av forskning kring skogsbrukets effekter framkommer att det svenska skogsbruket är utarmande och att dagens schablonartade hänsyn är alltför bristfällig. Det går inte att med de skogsbruksmetoder som används idag klara miljömålen och kraven på bevarande av skogens biologiska mångfald. Trots detta har utvärderingen tagits till intäkt, av exempelvis skogsnäringen, för att den svenska modellen fungerar då den visar att vissa skogslevande arter klarar skogsbruket. Att en stor mängd arter missgynnas och hotas och att det saknas långsiktig forskning talar man dock tyst om. Istället fortsätter man att måla upp en bild av svenskt skogsbruk som hållbart och ett internationellt föredöme. En verklighetsbild som växt sig stark genom bland annat en stark kollegialitet.

För att det svenska skogsbruket ska bli långsiktigt hållbart anser vi att det måste förändras i grunden, samtidigt som avverkningstrycket på skogslandskapet måste minska. Ett nytt skogsbruk, varierat och byggt på metoder och inriktningar som präglas av en stark och specifik artinriktad miljöhänsyn, måste utvecklas och införas. Arealen produktiv skogsmark som långsiktigt används enbart för naturvård måste öka betydligt, särskilt nedan fjällskogarna. En omfattande naturvårdsinriktad forskning och en nationell miljöövervakning måste upprättas i syfte att övervaka och utvärdera skogsbrukets effekter. Det gäller inte minst vad som händer med de rödlistade arterna; idag kan vi för de flesta bara använda expertbedömningar.

Skogsnäringen har haft över 40 år på sig och ännu inte lyckats nå ett hållbart skogsbruk. Istället har man skapat ett biologiskt starkt fragmenterat skogslandskap. I den konsekvensanalys (SKA 15) som Skogsstyrelsen tagit fram redovisas en än mer biologiskt skrämmande framtid med sänkta avverkningsåldrar och ökad areal med täta granplanteringar. Det brukade skogslandskapet verkar bli alltmer ensartat i framtiden. Skog över 80 år kommer att saknas utanför reservat, åtminstone i södra Sverige. De täta virkesplantagerna gör också att bär- och svamprik skog blir en bristvara.

Det är dags att skogsindustrins monopol i skogen bryts upp och att ett gemensamt samhällsansvar tas för vår skog, vår gemensamma naturresurs. Detta genom att naturvårdens företrädare, miljölagstiftningen och Naturvårdsverket ges ett betydligt större inflytande över skogen än vad man har idag. De sista kvarvarande skogarna med höga naturvärden måste bevaras, arterna skyddas och skogslandskapet restaureras.

Michael Nilsson, Sven G Nilsson, Per Petersson`;

const readingAbilityText3 = `## Det finns ett hem dit stormens brus

Jag var ju inte precis van att ha slips så det kändes ju. Trångt. Som om morsan försökt knyta helt halsen av mig för att stoppa alla svärorden från att komma ut just idag. Och nysvartkostymen också. En med kuddar inuti som skulle vara axelbreda och fylla ut tomtyget lite. En kostym att växa i, med upplagda byxor. Att ha till konfirmationen min, sen i sommar, också. Så. Fast det var bara februari och jag var inte precis på god fot med nån gud, för min morfar var död.

Men hon satt där i kapellet, morsan, på första bänk och rättade till filten över mormor, och dalta, fast tanten skulle ha haft det bättre om hon fått stanna på sjukhemmet över det hela. Inte sådär bli utdragen genom snön för att sitta med rullstolen i mittgången och inte förstå vem som. Vad som. Att det ju var morfar. I lådan där frammanför henne nu. En Arnt Adolf Moström, pojken från Vargträsk. Han som mormor slösat bort sig på, som morsan sa. En som la hela förtjänsten från sin första vinter i skogen på en svartblank nygitarr, skokrämsgitarren kallad, och for runt med den på varenda dans och missionsmöte som fanns.

Och förbannat trångt i halsen är det. Nästan en gråtklump. Som när jag var en lillunge bara. Och jävla skit som, för alltihop. Och för morsan som, sådär hur hon håller på. Torkar med vitnäsduken där underläppen mormors hänger lite, som på en häst nästan. Jo. Morsan torkar hela hakan denna. Duttar på. Och daltar.

Så.
Men dirigerar minsann också. Inte ens farsan fick ha bruna skor idag, fast de svarta var:
- Lika små nu som vid bröllope!
Enligt honom.
Nej. Det ska vara. Som gitarrsvart. Fast alla vet att hon tycker bättre om cerise själv.
Noga. Fast ingen jävel ser oss. Utom han därframme och hon, morfars flamma, därbak. Vi är inga här, utom dom, och familjen. Hela familjen i och för sig, för moster Iris är utsläppt från dårhuset också. Farsan och jag var till Ume och hämta hem henne i morse. Och jag fick ta mig väntrumskaffe i en vit plastmugg och nyåkerskakor, medan farsan stod invid glasluckan och förklara, först för en, och sedan för nästa kärring som blev inringd av den första på nåt vis. Men dagpermission ändå. Ett okej till slut. Och farsan fick skriva på papper innan vi kunde åka också. Lånepapper sådär. Vi har henne till klockan sju.

Min mosters hår har lång ljus utväxt innerst, men mest är det färgat rödbrunt och flätat som på en flicka, i två flätor. Hon har en stor blåmönstrad ylletröja under den prassliga sommarkappan i bilen, men sedan svart linne och svarta byxor bara, i kapellet. Inte någon kjol eller nåt som morsan. Ingen bh heller. Och Iris röker sina Camel var-hon-vill, även under tiden andakten pågår.

Dom hade en brorsa förut, systrarna, en som liknade mig. Men han gick inte att behålla. Han placerades som fosterbarn i Bastuträsk och blidde påkörd av tåget. På bilder ser han ut som en jävla Elvis. Med skokrämsgitarren morfars och den där frisyren, på gräsmattan bakom deras hus. Mormor kallade oss båda bara för pajken, förut:
- Men hur ä de me pajken då?
Så.
Och hon menade då alltså honom, sonen sin, eller mig, dottersonen, vilken som. Fram till sista hjärnblödningen. Nu kan hon säga några ord bara. Sådanadär ord från när hon var barn i Umbyn. Från innan n'Arnt och före teveservicen med guldkant och läskflaskorna jag brukade få hämta mig i källartrappan hemma hos dom. Hos mormorn min, och han, morfar Arnt.

Men bara dumord nu, från en idiottid utan el.
Och morsan är en idiot. Broderar skitfula korsstygns-renar och kåtor och sätter upp det i gummiramar av rött, och ibland grönt, under väggklockan i köket. Vill vara särskild på nåt vis. Vika ut det där gamla.

Och jag vill faan inte föreställa mig morfar i den där lådan. Och prästen bara säger, och säger, och säger, saker:
- Jesus. Bla, bla.
- Vila. Yttersta dagen.
Han försöker låta allvarlig, som om han talar om en nära vän, en viktig man, och. Slipsen! Den måste lös snart. Dessutom fryser vi alla. Moster Iris sitter och håller om sig själv. Farsan har ett ben som darrar. Mormor gråter. Och morsan duttar sin morsa i ansiktet med näsduken än, det bara håller på.

I psalmerna hörs mest morfars flamma. Det enda nöjet här är att småglo på henne, för hon rödnar i hela ansiktet och tittar ner då. Skäms väl. På byn säger folk att det hände i sängen hos henne. Som under tiden dom låg med varann då. Att morfar dog av kåthet. Utmattad. Men sådana synder nämner inte prästen. Bara omtänksam far och saknad make. Annan smörja. Inte en lista på spänningar precis.

Inte ens musiken morfars. Så att. Som inget.
Men till slut är det över. Vi har ganska bråttom. Morsan har gjort älgsteken med rönnbärsgelé och mandelpotatis hemma. Vi ska äta. Sen till både hemmet och dårhuset också, i lagom tider.

Men ändå. Flamman, Gun, går fram till morsan med plastkassen hon håller i. Och dom står där, ett par meter från kapelldörren i skenet av utelampan. Dom två. Och flamman försöker säga något. Att Zündappen är till besvär, eller kanske att. Tja, i alla fall nåt. Nåt som gjorde att morsan skulle ha flugit på na, om morsan nu varit en sån som visa nåt ibland.
Men farsan sa bara:
- Åk me na du Tommy och hämt'an.
Så att.
Och jag fick stå en bit ifrån och hålla plastkassen hennes medan flamman skrapa alla rutorna på sin hundraförtitvåa. Jag fick stå över älgsteken, och bara se på när hon rörde sig sådär runt bilen. Stå och undra. Och inte så värst gammal var hon, eller så. Vad jag kunde se. Som moster Iris kanske, fast med lite mera kropp och hud och så. Större.

Sen satte vi oss i bilen och frös en stund, för skiten ville inte starta så hon fick pumpa på gasen och ha sig. Men sen så. Och varmluften kom igång efter ett tag. Svetten bara rakt genom min vitskjorta, och nykavajen också, faktiskt. Fick loss slipsen i alla fall och så ner i fickan med den. Lite luft ändå. Och bilradion också. Men hon var som tyst. Och jag med.

Självklart skulle Zündappen bli min nu. Och den var ju som van. Hittade nästan själv hem till henne, om, ifall att.

Och när vi hade kört förbi tågstation där i Nyåker sa jag:
- Du?
Men hon var som blyg av sig och sa inget.
Snön föll. Och flingorna var vita i strålkastarljuset men syntes inte alls i mörkret bredvid oss. Jag stack fingret genom plasten i kassen hennes. Alltså först en seg slags grop i handtaget bara, men sen flera fingerhål, utan att det var meningen riktigt, utan bara, ändå, som blev.

Och det var vid Ledusjön hon bodde. I ett vitputsat hus med farstubro av järn.

*Stina Stoor*

*Zündapp = mopedmärke*
`;

const readingAbilityText4 = `
## Erinran till redovisningskonsult

**Referat av disciplinämndens ärende med dnr 2/2011, beslut meddelat 23 maj 2011.**

NN är ensam styrelseledamot i ett bolag som bedriver redovisningsverksamhet. NN är medlem i FAR och auktoriserad redovisningskonsult.

FAR:s kvalitetsnämnd för redovisningsverksamhet har anmält NN till FAR:s disciplinämnd. Skälet till detta är att kvalitetsnämnden konstaterat att årsredovisning för hans bolag vid upprepade tillfällen överlämnats till bolagets revisor efter den i lagen angivna tidpunkten.

Kvalitetsnämnden har lämnat in bolagets årsredovisningshandlingar för räkenskapsåren 2006/2007, 2007/2008 och 2008/2009.

NN har yttrat sig över anmälan och bland annat anfört följande. Han bedriver sedan 1986 en egen redovisningsbyrå med några anställda. Företaget har under de två-tre senaste åren expanderat kraftigt samtidigt som NN arbetat med sin egen yrkesutveckling, vilken resulterat i medlemskapet i FAR som auktoriserad redovisningskonsult. Dessa förhållanden har medfört en kraftig anhopning av utvecklings- och arbetsuppgifter för honom personligen, vilket i sin tur inneburit eftersläpningar i årsredovisningsarbetet. Den löpande redovisningen i bolaget har hela tiden skötts dagligen genom anställd personal.

NN har framhållit att bolaget numera har förstärkt sina interna resurser och att de brister i den egna redovisningen som framkommit i kvalitetskontrollen snart kommer att vara åtgärdade.

Disciplinämnden meddelade NN en erinran med följande motivering:

> Anmälan avser redovisningen i NN:s egen verksamhet och alltså inte hans uppdragsverksamhet. Enligt disciplinämndens uppfattning är försummelserna, låt vara upprepade, inte av sådan art att det finns anledning att utesluta NN ur FAR. Det får dock anses anmärkningsvärt att en redovisningskonsult inte följer gällande bestämmelser beträffande årsredovisningen i sitt eget aktiebolag. Vad NN har anfört om orsakerna till förseningarna innebär inte att han kan undgå disciplinär åtgärd. Disciplinämnden finner att erinran är en tillräcklig åtgärd.

*FAR = branschorganisationen för revisorer och rådgivare*
`;

const readingAbilityText5 = `
## Akademiskt skrivande

År 2015 utkom antologin *The future of scholarly writing* i vilken 17 skribenter från många olika amerikanska universitet frågar sig hur de som samhällsvetare och humanister bättre ska kunna kommunicera dels med varandra, dels med en större allmänhet. Samtidigt som de sinsemellan är mycket olika är de alla eniga om att det inte (så som de anser) ska göras genom att närma sig naturvetenskapen och bala med data, diagram och termer som ”prefrontala cortex”. Snarare gäller det att utnyttja sin främsta resurs, sin språkliga känslighet, utan att behöva dra en skarp gräns mellan att å ena sidan framföra argument, göra en tolkning eller presentera en analys och å andra sidan gestalta med mer skönlitterära medel.

Vi har alla fått lära oss att vetenskap förutsätter opersonlighet och objektivitet. Vad det innebär tydliggjorde min favoritsociolog Arlie Russell Hochschild redan 1983 i boken *The managed heart. The commercialization of human feeling*. Hon beskriver hur man vid de första obduktioner som unga läkarstudenter deltar i försöker minimera det känslomässiga obehaget genom att täcka över ansikte och könsorgan, ibland också händerna, på liket och därmed avpersonalisera det. Sedan drar hon en parallell till det vetenskapliga skrivandet. Vetenskapligt skrivande har, menar hon, en likartad funktion: ”Det är en utvidgad form för institutionell kontroll av känslor. Den flitiga användningen av passiva verbformer, undvikandet av ordet ’jag’, förkärleken för latiniserade substantiv och det abstrakta framför det konkreta är drag som distanserar läsaren från ämnet och stänger känslorna ute. För att framstå som vetenskapliga måste skribenterna följa konventioner som hämmar det känslomässiga engagemanget. Det finns skäl till att man skriver ’illa’.”

Akademiker kan mycket väl förhålla sig självironiskt till det akademiska språket. University of Chicago har en ”virtuell akademiker” som riktar sig till lärare och doktorander med tjänsten ”Veckans mening”. ”Skriv din egen mening!” lyder uppmaningen. ”Eller är du för lat för att göra det själv? Den virtuella akademikern kan göra det åt dig!” Instruktionen är enkel. Man går in på nätet, väljer ett ord eller uttryck från var och en av fyra listor och klickar: ”Skriv den!” Angelika Bammer, professor i tvärvetenskaplig humaniora och komparativ litteratur, valde en dag ”lingvistisk transparens”, ”postkapitalistisk hegemoni”, ”konstruktion” och ”epistemologi”, klickade och fick meningen: ”Den postkapitalistiska hegemonins epistemologi kan förstås som en konstruktion av lingvistisk transparens.” Hon fick också några uppmuntrande ord på vägen. ”Din övertygande behandling av den postkapitalistiska hegemonins epistemologi kommer att få många efterföljare.”

Vetenskaplig jargong är ändå långtifrån det enda problemet. Nästan lika illa är det när orden mestadels är hämtade från vardagsspråket men meningarna har krånglats till för att verka mer vetenskapliga. Mitt älsklingsexempel är: ”Primärgruppen är ojämlikhetens viktigaste grund till kvinnans nackdel.” Vad betyder det? Väl inget märkvärdigare än att det är i familjen som kvinnan riskerar att bli berövad jämställdhet?

Men om man som akademiker vill skriva på andra sätt handlar det inte bara om språket. Det handlar lika ofta om att vilja bryta sig ur vad Hochschild kallar en ”institutionell kontroll av känslor”. Man kan vilja få utrymme för det personliga, förmedla sitt engagemang, sin entusiasm för sitt ämne, man kan vilja ge plats åt det sinnliga. Man kan helt enkelt vilja få skriva mer essäistiskt.

I Finland är essäistiken en stolt tradition som lockat många akademiker, bland dem filosofen Georg Henrik von Wright (vars bok *Vetenskapen och förnuftet* från 1986 fick stor uppmärksamhet även i Sverige), och som fortfarande har många utövare och läsare. Den som för mig bäst symboliserar vad det essäistiska står för är Erni Zilliaucs, professor i grekisk och modern litteratur. Under det tidiga 1900-talet började han skriva om Odyssevs hemresa från trojanska kriget till sitt eget Ithaka. En av de grekiska öar han besökte var Korfu, som ofta identifierats som Odysseéns Skeria, den ö där Odyssevs efter sitt skeppsbrott ska ha drivit i land. För Zilliacus var det inte nog att se Skeria, han lät sig ros ut från kusten och kastade sig i havet, han ville själv driva i land, han ville på sin egen kropp uppleva hur det kunde ha känts för den skeppsbrutne Odyssevs. Hans förhållningssätt var sant essäistiskt. Han satsade, han var inte rädd för att sätta sig själv på spel.

Han förstod också att essäistiskt skrivande inte bara har med intellektet att göra, att också sinnena och känslorna behöver mobiliseras. Kanske tänkte han rentav som en modern filosof, den amerikanska nyaristotelikern Martha Nussbaum, att det inte finns något motsatsförhållande mellan tanke och känsla, att de snarare är två sidor av samma mynt. *Båda* är kunskapsinstrument.

Att jag själv dragits till essäistiken beror ändå inte bara - kanske inte ens i första hand - på att den ger utrymme åt både känsla och kropp, utan i lika hög grad på att den gynnar det konkreta, detalien eller den åskådliggörande anekdoten. Om vi får veta att 700 000 brittiska soldater stupade i första världskriget är det bara en statistisk uppgift, men hur det verkligen upplevdes förmedlas ypperligt i en episod i Virginia Nicholsons bok *Singled out. How the million women survived without men after the First World War*: ”En dag år 1917 sammankallades avgångsklassen i en flickskola i Bournemouth högtidligen av den kvinnliga rektorn. Rektorn blickade ut över skaran, där de flesta var sorgklädda eftersom de hade förlorat åtminstone en nära anhörig i kriget, och så sade hon: ’Jag har kommit för att meddela er något fruktansvärt. Det är bara en av tio bland er som kan hoppas på att nånsin bli gift. Det är inte en gissning, det är statistik. Nästan alla de män som hade kunnat gifta sig med er har stupat. Ni får bana er väg i livet så gott ni kan. Kriget har öppnat nya dörrar för kvinnor, men det kommer att finnas många fördomar. Ni får lov att sträva, ni får lov att kämpa’.”

Det är en anekdot med många dimensioner. Rektorns ord drabbar - ganska brutalt, måste man säga - unga kvinnor som redan drabbats av kriget med insikten att de kommer att drabbas ytterligare, men samtidigt pekar de framåt mot det som brukar kallas 1920-talets nya kvinna.

Essäisten är alltid inställd på att kommunicera. Essäisten talar inte nödvändigtvis i jagform men finns ändå där som ett jag, en röst, som talar till läsaren, som bryr sig om läsaren, vill gå i dialog med läsaren. Vetenskapligt skrivande är oironiskt. Först säger man vad man vill säga, sedan säger man det, sedan säger man att man sagt det. Den essäistiska texten kan tillåta sig en gnutta lekfullhet. Det betyder inte att den populariserar, snarare följer den det motto för företaget Deloitte Touche som jag för många år sedan såg på en annonspelare: ”We don’t make the complex simple, we make it understandable.” Den är inte tesdrivande, den är ofta prövande, undersökande, den kan tillåta sig utvikningar, den strävar inte efter att täppa till varje lucka i resonemangen för den räknar inte med den felfinnande opponenten, utan med en välvilligt intresserad läsare som kan associera vidare. Någon gnutta av samma tillit kunde kanske få plats också i det vetenskapliga skrivandet?

*Merete Mazzarella*
`;

const readingAbilityText6 = `# Nya yrken

I tider av stora samhällsförändringar skapar människor ofta nya sätt att försörja sig. Det är just därför som historiker och arkeologer brukar indela mänsklighetens historia utifrån vad den huvudsakliga försörjningskällan varit; så betecknar till exempel "den neolitiska revolutionen” jordbruksarbetets genomslag på bred front.

Även den tidigmoderna perioden (cirka 1500 till 1800) såg en rad nya försörjningskällor födas. I Natasha Kordas bok *Labors lost. Women’s work and the early modern English stage* ges en fascinerande inblick i hur det manliga skådespelaryrket föddes och professionaliserades i England omkring år 1600. Samtidigt belyser Korda hur flera andra yrken också etablerades vid denna tid. Många av dem var kvinnoyrken. Men framför allt visar författaren hur motståndet mot skådespeleri, lyxvaror och annat som ansågs vara nytt färgade uppfattningarna om vad som var manligt respektive kvinnligt, och vilka konsekvenser detta har fått för vår bild av en person som befann sig mitt i denna omvälvande tid, nämligen Shakespeare. Dennes verk står i och för sig inte i centrum för analysen, men Korda, som är professor i engelska vid Wesleyan University, bidrar ändå till att ge Shakespeares texter en ny och djupare klangbotten.

1500- och 1600-talets England var fortfarande präglat av jordbruk, skråhantverk och reglerad handel. Men det var samtidigt den plats där nya konsumtionsvanor fick fäste och nya konsumtionsvaror började bjudas ut, den plats där det moderna samhället och den moderna människan uppstod. Många av dessa nyheter kan knytas just till teaterhusen i London. Det var här som de nyskrivna skådespelen uppfördes, det var för teatern som rekvisita och paljettbeprydda scenkläder skapades, det var på teatern man kunde se högreståndspersoner visa upp sina raffinerade spetskragar och spetsmanschetter, och det var här som högljutt ropande gatuförsäljerskor bjöd ut sina matvaror, drycker och godsaker. Människor kunde nu försörja sig på sätt som tidigare inte varit möjliga: genom att tvätta och stärka ömtåliga spetsar, genom att låna ut pengar mot ränta till teaterproducenterna, genom att sälja nya matvaror på gatorna, och genom att stå på scenen och "apa sig". Det var en omvälvande tid, lika omvälvande som vår egen där vi också ser nya försörjningskällor och yrkestitlar födas. Vi behöver bara tänka på vad man på 1950-talet skulle ha sagt om arbeten som webbansvarig eller dataspelskonstruktör!

1500-talets nya försörjningsmöjligheter omfattades inte av de traditionella skråna, som fanns inte bara i England utan runtom i Europas städer. Ännu viktigare var att dessa nya yrken inte ansågs hedervärda utan snarare föraktliga. Rekvisita var, menade många, något som förfalskade varor, och stärkta kragar uppfattades som främmande och onödiga - kanske därför att de tillverkades av invandrarkvinnor från Holland. Gatuförsäljerskornas tjut ansågs utgöra illegitima försäljningsmetoder som inkräktade på skrånas områden genom att utsätta deras varor för konkurrens. Följaktligen förtalades de nya försörjningskällorna på olika sätt, bland annat i ekivoka grafiska blad.

Många av de nya yrkena var dock förutsättningar för teaterlivets enastående blomstring under denna tid, och de innehades, väl att märka, nästan uteslutande av kvinnor. Inte minst viktiga var de kvinnliga kreditgivarna, som investerade i teaterhus och pjäsförfattare. Korda lyfter här fram hur Shakespeare framställer Portia (i *Köpmannen i Venedig*) som en professionell penningutlänerska, som till skillnad mot Shylock är extremt noggrann med sina affärer. Portia får förkroppsliga den nya form av bokföring som började användas vid denna tid, liksom protestantiska ideal som noggrannhet och exakthet. Men att dessa nya kvinnorarbeten var viktiga betyder inte att de erkändes som viktiga - tvärtom. Framför allt erkände skådespelarbranschen inte sin egen likhet med de kvinnliga yrkesutövarna, eftersom den var inblandad i en kamp om det egna yrkets heder.

Om skådespelare sades nämligen att de "lekte" snarare än arbetade, och att det var lata, eftersom de undvek hederligt arbete. En skådespelare ansågs sälja något som var fiktivt och därmed falskt. En skådespelare låtsades vara någon han inte var, och han var i så måtto lik den (kvinna) som tillverkade scenrekvisita. En skådespelare skrek och gjorde sig till, precis som en gatuförsäljerska. Just på grund av alla dessa besvärande likheter ansträngde sig skådespelare och pjäsförfattare för att på alla sätt distansera sig från de obehagliga men framgångsrika kvinnorna. En nutida sociolog skulle ha sagt om skådespelarna ägnade sig åt professionaliseringsstrategier, på ungefär samma sätt som 1700- och 1800-talets läkare försökte markera skillnaden mellan sig och kloka gummor eller kvacksalvare.

Korda visar att skådespelarna, som alla var män, på olika sätt dolde likheten och markerade olikheten mellan sig själva och dessa kvinnor som myllrade kring teaterhusen. Detta markerande av olikhet kopplad till kön är just det man menar när man säger att genus skapas av människor i konkreta situationer. Att genus i så hög grad konstruerades på och runt den elisabetanska scenen är intressant av flera skäl. För det första har Shakespeares dramer ofta beskrivits som renodlat manliga produkter: författaren var man och skådespelarna var män - även de som gjorde kvinnorollerna. Korda visar häremot att arbetande kvinnor var intensivt närvarande i kulisserna, och att det i vissa fall var de som möjliggjorde teatern (genom sina lån). För det andra genomsyrades teaterlivet och dramerna av föreställningar om kvinnor och kvinnlighet, och de flätades samman med föreställningar om manlighet och vad ett hedervärt arbete bestod i. Om vi inte förmår uppfatta dessa nyanser, missar vi något viktigt. För det tredje visar Korda hur ett framgångsrikt professionaliseringsarbete från teatermannens sida bidragit till att sudda ut det kvinnliga arbetet ur historieskrivningen. Shakespeare och den elisabetanska teatern var beroende av kvinnors arbete, samtidigt som de framgångsrikt dolde betydelsen av detta arbete.

En utbredd tveksamhet inför det konstgjorda och påhittade gjorde att människor som försörjde sig genom att utnyttja behovet av det konstgjorda och påhittade uppfattades som dubiösa i det dåtida samhället. Detta skapade en kulturell dynamik, genom vilken "det manliga” och "det kvinnliga” fick nya och delvis paradoxala innebörder. Det finns mycket som talar för att samma dynamik var verksam även i fråga om andra arbetsformer som uppstod under denna tid. Det faktum att vi idag tänker på fogdar, tulltjänstemän och räntmästare som manliga yrken beror inte bara på att de ofta innehades av män utan även på att de på ett tidigt stadium färgades som "manliga”. Kordas insats består i att skickligt ha frilagt ett exempel på en sådan process.

Maria Ågren`;

export function getExam2024Spring() {
  const exam: Exam[] = [
    /**
     * Test Pass 1
     *
     * Word comprehension
     */
    {
      testPass: 1,
      question: 1,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**dispyt**
- A. brist
- B. gräl
- C. tvekan
- D. besvikelse
- E. undantag
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 1,
      question: 2,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**angeläget**
- A. tydligt
- B. utmanande
- C. informativt
- D. noggrant
- E. viktigt
`,
        },
      ],
      answer: "E",
    },
    {
      testPass: 1,
      question: 3,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**supplement**
- A. överskott
- B. urval
- C. innehåll
- D. tillägg
- E. understöd
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 1,
      question: 4,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**aktad**
- A. respekterad
- B. högtidlig
- C. artig
- D. försiktig
- E. undanskymd
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 1,
      question: 5,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**rata**
- A. granska
- B. avvisa
- C. fastställa
- D. ifrågasätta
- E. samordna
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 1,
      question: 6,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**illa åtgången**
- A. helt uttorkad
- B. nästan slut
- C. mycket ledsen
- D. svårt angripen
- E. lämnad utanför
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 1,
      question: 7,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**bärkraft**
- A. avlagring
- B. prestation
- C. tryck
- D. hållbarhet
- E. försörjning
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 1,
      question: 8,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**vegetera**
- A. tala gåtfullt
- B. vara generös
- C. leva i overksamhet
- D. besvära i onödan
- E. sprida oro
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 1,
      question: 9,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**egalitär**
- A. jämlik
- B. tillfällig
- C. obekymrad
- D. välvillig
- E. ursprunglig
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 1,
      question: 10,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**kavalkad**
- A. kort historia
- B. utvald grupp
- C. lång rad
- D. tapper skara
- E. begränsad mängd
`,
        },
      ],
      answer: "C",
    },

    /**
     * Test Pass 1
     *
     * Reading ability #1
     */
    {
      testPass: 1,
      question: 11,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText1,
            },
            {
              type: "text",
              text: `
            **Vad av följande är vesiklar ett exempel på, om man följer textens resonemang?**
- A. Att ett kroppsligt förlopp kan rubbas utan egentlig orsak.
- B. Att cellerna kan använda en och samma process för olika syften.
- C. Att kroppsegna ämnen kan bromsa en pågående sjukdomsprocess.
- D. Att främmande ämnen kan både skada och stärka cellerna.
`,
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 1,
      question: 12,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText1,
            },
            {
              type: "text",
              text: `
**Vad skulle kunna bli användbart vid behandling av vaskulit, enligt Maria Mossbergs forskningsresultat?**
- A. Ökad aktivitetsgrad hos vesiklar.
- B. Speciellt odlad blodplasma.
- C. Redan tillgängliga mediciner.
- D. Vesiklars rengörande funktion.
`,
            },
          ],
        },
      ],
      answer: "C",
    },

    /**
     * Test Pass 1
     *
     * Reading ability #2
     */
    {
      testPass: 1,
      question: 13,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText2,
            },
            {
              type: "text",
              text: `
**Vad påpekar textförfattarna om de hänsynsytor som av naturvårdsskäl undantas från avverkning?**
- A. De är alltför olika och inte tillräckligt artrika.
- B. De är inte unika nog att klassas som nyckelbiotoper.
- C. De är inte placerade där hotet mot skogen är som störst.
- D. De är alltför utspridda och inte tillräckligt stora.
`,
            },
          ],
        },
      ],
      answer: "D",
    },

    {
      testPass: 1,
      question: 14,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText2,
            },
            {
              type: "text",
              text: `
**Vad kritiserar textförfattarna när det gäller ”den svenska skogsbruksmodellen”?**
- A. Att modellen har en otydlig målsättning.
- B. Att det råder obalans mellan skogsnäringens och naturvårdens intressen.
- C. Att modellen bygger på otidsenlig forskning.
- D. Att det saknas visioner om skogslandskapets framtid.
`,
            },
          ],
        },
      ],
      answer: "B",
    },

    {
      testPass: 1,
      question: 15,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText2,
            },
            {
              type: "text",
              text: `
**Textförfattarna anser att den svenska skogen inte brukas på ett hållbart sätt i dag. Vad uppfattar de som det huvudsakliga problemet?**
- A. Produktionstakten, som ständigt minskar den totala skogsarealen i Sverige.
- B. Skogsindustrins utsläpp, som sprider farliga ämnen i ett ömtåligt landskap.
- C. Sättet att avverka, vilket allvarligt skadar den biologiska mångfalden i skogen.
- D. Avsaknaden av oberoende forskning, vilket leder till ett ensidigt skogsbruk.
`,
            },
          ],
        },
      ],
      answer: "C",
    },

    {
      testPass: 1,
      question: 16,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText2,
            },
            {
              type: "text",
              text: `
**Vilken av följande förändringar av det svenska skogsbruket efterlyser textförfattarna?**
- A. Att EU:s naturvårdsdirektiv anpassas till svenska förhållanden.
- B. Att forskningen inriktas på att utveckla alternativ till skogsråvara.
- C. Att den produktiva skogsmarken utökas och blir mer enhetlig.
- D. Att skogsbolagens påverkan begränsas och att andra samhällsintressen ges större utrymme.
`,
            },
          ],
        },
      ],
      answer: "D",
    },

    /**
     * Test Pass 1
     *
     * Reading ability #3
     */
    {
      testPass: 1,
      question: 17,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText3,
            },
            {
              type: "text",
              text: `
**Hur förhåller sig Tommy till sin morfar, att döma av hans tankar under begravningen?**
- A. Han dömer morfadern för dennes livsval och begravningen väcker hans ilska.
- B. Han är ointresserad av morfadern och drömmer sig bort under begravningen.
- C. Han tänker på sin morfar och känner att begravningen inte gör honom rättvisa.
- D. Han beundrar sin morfar och tänker under begravningen på hans liv.
`,
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 1,
      question: 18,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText3,
            },
            {
              type: "text",
              text: `
**Vilket svarsförslag överensstämmer bäst med hur Tommy uppfattar sin mor?**
- A. Hon är svartsjuk och tänker mest på sig själv.
- B. Hon är dominant och noga med detaljerna.
- C. Hon är självuppoffrande och döljer sina egna behov.
- D. Hon är nonchalant och vill framstå som finare än hon är.
`,
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 1,
      question: 19,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText3,
            },
            {
              type: "text",
              text: `
**Vilken mening sammanfattar begravningen bäst, om man utgår från textens beskrivning?**
- A. Det är en enkel ceremoni med endast närmast sörjande och en opersonlig präst.
- B. Det är en högtidlig begravning med uppklädda besökare och en värdig präst.
- C. Det är en stillsam ceremoni utan musik med en kortfattad präst.
- D. Det är en sorgtyngd begravning med gråtande deltagare och en empatisk präst.
`,
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 1,
      question: 20,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText3,
            },
            {
              type: "text",
              text: `
**Vilken är den rimligaste tolkningen av Tommys tankar och beteenden efter begravningsceremonins slut?**
- A. Att han är nyfiken på Gun.
- B. Att han struntar i Gun.
- C. Att han tycker synd om Gun.
- D. Att han är sur på Gun.
`,
            },
          ],
        },
      ],
      answer: "A",
    },

    /**
     * Test Pass 1
     *
     * Sentence completion
     */
    {
      testPass: 1,
      question: 21,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Flera av berättelserna i Eva Adolfssons essäsamling Till skilda orter (1998) tycks vara självbiografiskt _____.**
- A. engagerade
- B. beroende
- C. sammanhållna
- D. förankrade
`,
        },
      ],
      answer: "D",
    },

    {
      testPass: 1,
      question: 22,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Det nya med detta sätt att ta fram en översiktsplan är att innehållet ska vara baserat på uppdaterade och relevanta _____. Dessutom fungerar planen som ett verktyg för att _____ de lokala aktörerna, och därmed fånga upp medborgarperspektivet.**
- A. kartor - moderera
- B. fakta - reglera
- C. data - involvera
- D. studier - exkludera
`,
        },
      ],
      answer: "C",
    },

    {
      testPass: 1,
      question: 23,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Förslaget till _____ av den gamla trädgården utgick från de rådande förutsättningarna, och _____ de möjligheter till _____ och bevarande som ändå fanns.**
- A. odling - bortsåg från - gårdsförsäljning
- B. restaurering - tog fasta på - återställande
- C. uthyrning - gav näring åt - arbetstillfällen
- D. skötsel - fann tröst i - nyskapande
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 1,
      question: 24,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Hur en röst _____ rent akustiskt beror på en mängd olika faktorer. Därför är det svårt att hitta allmängiltiga och objektiva _____ för röststatus som skulle kunna användas kliniskt och pedagogiskt.**
- A. ter sig - kriterier
- B. gör sig - valörer
- C. står sig - nyanser
- D. rör sig - normer
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 1,
      question: 25,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**1842 års folkskolestadga medförde att nästan alla svenska barn lärde sig läsa, skriva och räkna, vilket var _____ i modernitetsbygget.**
- A. omvittnat
- B. bristfälligt
- C. ovärderligt
- D. framställt
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 1,
      question: 26,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Innan resan kunde _____ måste segelfartyget Endeavour föras till den nederländska kolonin Batavia för en reparation som tog två månader _____.**
- A. utformas - i beslag
- B. återupptas - i anspråk
- C. genomdrivas - i retur
- D. avhandlas - i beredskap
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 1,
      question: 27,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Lewi Pethrus fungerade som representant för Pingströrelsen, och hans fysiska närvaro blev ett tecken på att den nya församlingen tillhörde rörelsen. Pethrus symboliska kapital var med andra ord så starkt att han personligen _____ Pingströrelsen.**
- A. besjälade
- B. frammanade
- C. ledsagade
- D. förkroppsligade
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 1,
      question: 28,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Varje språk uttrycker en egen _____. Det ger inte en avbildning punkt för punkt av den utomspråkliga verkligheten, utan lägger ett _____ över verkligheten, vilken alltså inte avbildas, utan _____.**
- A. tidsanda - lager - förvrängs
- B. världsbild - raster - tolkas
- C. livsstil - filter - beskrivs
- D. synvinkel - mönster - nyanseras
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 1,
      question: 29,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Allt som du och jag vet är inte _____ i den meningen att vi kan formulera vad vi vet. Mycket av vår vardagskunskap är _____ eller så kallad tyst kunskap.**
- A. aktuellt - inaktuell
- B. aktivt - retroaktiv
- C. explicit - implicit
- D. ordinärt - extraordinär
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 1,
      question: 30,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Åklagarens besked var oväntat och ledde till spontant jubel hos många Baltimore-bor, som _____ hade väntat sig ännu ett frikännande av våldsamma poliser.**
- A. luttrat
- B. kaxigt
- C. prompt
- D. ivrigt
`,
        },
      ],
      answer: "A",
    },

    /**
     * Test Pass 2
     *
     * Math
     */
    {
      testPass: 2,
      question: 1,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/1.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 2,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/2.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 2,
      question: 3,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/3.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 2,
      question: 4,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/4.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 5,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/5.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 6,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/6.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 7,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/7.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 8,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/8.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 2,
      question: 9,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/9.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 10,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/10.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 11,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/11.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 2,
      question: 12,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/12.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 13,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/13.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 14,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/14.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 15,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/15.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 16,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/16.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 2,
      question: 17,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/17.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 18,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/18.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 2,
      question: 19,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/19.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 20,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/20.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 21,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/21.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 22,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/22.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 23,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/23.png"
              ),
            },
          ],
        },
      ],
      answer: "E",
    },
    {
      testPass: 2,
      question: 24,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/24.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 25,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/25.png"
              ),
            },
          ],
        },
      ],
      answer: "E",
    },
    {
      testPass: 2,
      question: 26,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/26.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 2,
      question: 27,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/27.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 28,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/28.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 29,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/29-31.png"
              ),
            },
            {
              type: "text",
              text: `
**Vilket av svarsförslagen anger de två kommungrupper som var mest lika varandra vad gäller antal tågankomster och genomsnittlig försening?**
- A. Storstäder och Kommuner i tätbefolkad region
- B. Förortskommuner till storstäder och Pendlingskommuner
- C. Pendlingskommuner och Varuproducerande kommuner
- D. Varuproducerande kommuner och Kommuner i tätbefolkad region
`,
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 30,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/29-31.png"
              ),
            },
            {
              type: "text",
              text: `
**Hur många tågankomster finns redovisade för Förortskommuner till storstäder jämfört med Förortskommuner till större städer?**
- A. Hälften så många
- B. Lika många
- C. Dubbelt så många
- D. Tre gånger så många
`,
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 31,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/29-31.png"
              ),
            },
            {
              type: "text",
              text: `
**Hur många minuter sammanlagt var de ankommande tågen försenade i Kommuner i glesbefolkad region?**
- A. 220000 minuter
- B. 330000 minuter
- C. 440000 minuter
- D. 550000 minuter
`,
            },
          ],
        },
      ],
      answer: "B",
    },

    {
      testPass: 2,
      question: 32,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/32-34.png"
              ),
            },
            {
              type: "text",
              text: `
**Vilket svarsförslag beskriver bäst förhållandet mellan opererande, invärtesmedicinska och barnmedicinska specialiteter vad gäller det totala antalet specialistbevis 2012?**

- A. 5:3:1
- B. 5:4:1
- C. 6:4:1
- D. 6:5:1
`,
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 33,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/32-34.png"
              ),
            },
            {
              type: "text",
              text: `
**Identifiera de tre specialiteterna inom invärtesmedicin med flest utfärdade specialistbevis 2011. Hur stor andel utgjorde dessa av det totala antalet specialistbevis inom invärtesmedicin samma år?**

- A. 55 procent
- B. 65 procent
- C. 75 procent
- D. 85 procent
`,
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 34,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/32-34.png"
              ),
            },
            {
              type: "text",
              text: `
**Vilken opererande specialitet hade 2010 flest specialistbevis som hörde till personer som var 65 år eller äldre?**
- A. Kirurgi
- B. Ortopedi
- C. Anestesi och intensivvård
- D. Obstetrik och gynekologi
`,
            },
          ],
        },
      ],
      answer: "A",
    },

    {
      testPass: 2,
      question: 35,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/35-37.png"
              ),
            },
            {
              type: "text",
              text: `
**Hur stort var antalet personer som flyttade inom Västerort jämfört med antalet som flyttade från Söderort till Västerort?**

- A. Fyra gånger så stort
- B. Fem gånger så stort
- C. Sex gånger så stort
- D. Sju gånger så stort
`,
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 2,
      question: 36,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/35-37.png"
              ),
            },
            {
              type: "text",
              text: `
**Hur många fler flyttade inom Stockholms kommun än till Stockholms kommun?**

- A. 34927
- B. 35619
- C. 37247
- D. 42074
`,
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 37,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/35-37.png"
              ),
            },
            {
              type: "text",
              text: `
**Vad blir flyttnettot om man räknar antalet personer som flyttade till Söderort och tar bort antalet som flyttade från Söderort?**

- A. -2168
- B. -967
- C. +1561
- D. +2528
`,
            },
          ],
        },
      ],
      answer: "D",
    },

    {
      testPass: 2,
      question: 38,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/38-40.png"
              ),
            },
            {
              type: "text",
              text: `
**Studera de olika djurslagen med avseende på hur stor andel av den totala slakten som utgjordes av ekologiskt uppfödda djur. Hur stor var den största noterade ökningen av denna andel om man jämför 2009 och 2015?**

- A. 5 procentenheter
- B. 8 procentenheter
- C. 55 procentenheter
- D. 75 procentenheter
`,
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 2,
      question: 39,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/38-40.png"
              ),
            },
            {
              type: "text",
              text: `
**Hur stor andel av slakten av de redovisade ekologiskt uppfödda djurslagen 2014 utgjorde slakten av svin?**

- A. 1/6
- B. 1/4
- C. 1/3
- D. 2/5
`,
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 2,
      question: 40,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/2-kvant/38-40.png"
              ),
            },
            {
              type: "text",
              text: `
**Slakten av ekologiskt uppfödda får och lamm utgör en mindre andel av den totala slakten av får och lamm. Hur stor var den totala slakten av får och lamm 2012?**

- A. 1000 ton
- B. 2000 ton
- C. 4000 ton
- D. 5000 ton
`,
            },
          ],
        },
      ],
      answer: "D",
    },
    /**
     * Test Pass 4
     *
     * test pass 3 was skipped
     *
     * Word comprehension
     */

    {
      testPass: 4,
      question: 1,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**försegla**
- A. upphöra
- B. tillsluta
- C. undersöka
- D. avgöra
- E. omringa
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 2,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**autodidakt**
- A. pålitlig person
- B. mäktig person
- C. egoistisk person
- D. inbunden person
- E. självlärd person
`,
        },
      ],
      answer: "E",
    },
    {
      testPass: 4,
      question: 3,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**gentemot**
- A. nära intill
- B. bortsett från
- C. som alternativ till
- D. med tanke på
- E. i förhållande till
`,
        },
      ],
      answer: "E",
    },
    {
      testPass: 4,
      question: 4,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**utarmad**
- A. fri
- B. farlig
- C. förlamad
- D. fattig
- E. feg
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 5,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**axplock**
- A. slumpartat urval
- B. enformigt arbete
- C. förstahandsval
- D. kvalificerad gissning
- E. stor noggrannhet
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 6,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**exceptionell**
- A. nyanserad
- B. högtidlig
- C. sällsynt
- D. överdriven
- E. uttrycksfull
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 7,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**tillkännage**
- A. anropa
- B. meddela
- C. besvara
- D. instämma
- E. efterfråga
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 8,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**appell**
- A. löfte
- B. misstanke
- C. vädjan
- D. övertygelse
- E. intryck
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 9,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**intrikat**
- A. invecklad
- B. intensiv
- C. inställsam
- D. intressant
- E. inåtvänd
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 10,
      type: "verbal",
      system: SYSTEM_PROMPT_WORD_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: `
**debacle**
- A. klarhet
- B. omröstning
- C. misslyckande
- D. tillfällighet
- E. förbättring
`,
        },
      ],
      answer: "C",
    },

    /**
     * Test Pass 2
     *
     * Reading comprehension #1
     */
    {
      testPass: 4,
      question: 11,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText4,
            },
            {
              type: "text",
              text: `
**Vilken orsak till problemen med årsredovisningarna framhölls av NN?**

- A. Att företaget hade haft brist på redovisningsansvarig personal.
- B. Att kommunikationen hade brustit mellan den redovisningsansvarige och revisorn.
- C. Att den redovisningsansvariges arbetsbörda hade varit för stor.
- D. Att redovisningsansvaret hade hanterats provisoriskt dag för dag.
`,
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 12,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText4,
            },
            {
              type: "text",
              text: `
**Vad uppmärksammade disciplinnämnden särskilt i sin bedömning av ärendet, enligt texten?**

- A. Att NN inte hade insett att försummelserna var ett lagbrott.
- B. Att NN hade varit försumlig inom sitt eget yrkesområde.
- C. Att NN inte hade vidtagit några åtgärder mot försummelserna.
- D. Att NN hade varit medveten om sina försummelser.
`,
            },
          ],
        },
      ],
      answer: "B",
    },

    {
      testPass: 4,
      question: 13,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText5,
            },
            {
              type: "text",
              text: `
**Vilket problem framhåller textförfattaren beträffande det etablerade sättet att skriva akademiskt?**

- A. Att forskare får lägga orimligt mycket tid på att lära sig det vetenskapliga skrivsättet.
- B. Att idealen som vägleder forskares sätt att skriva inte längre belönas inom akademin.
- C. Att den språkliga utformningen inte följer vetenskapens principer för objektivitet.
- D. Att den vetenskapliga stilens krav begränsar textens förmåga att kommunicera med omvärlden.
`,
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 14,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText5,
            },
            {
              type: "text",
              text: `
**Textförfattaren ifrågasätter något som hon anser vara en etablerad men förenklad sanning. Vad?**

- A. Att vetenskapliga framsteg väcker känslomässigt engagemang.
- B. Att riktig vetenskap utesluter ett subjektivt förhållningssätt.
- C. Att gestaltning gör vetenskaplig argumentation mer övertygande.
- D. Att riktig vetenskap alltid har essäistiska inslag.
`,
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 15,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText5,
            },
            {
              type: "text",
              text: `
**Om vi följer textens resonemang, vilket är då det mest rimliga sättet att förstå den "virtuella akademikerns" meningar?**

- A. Som humoristiska men avskräckande exempel.
- B. Som dräpande men ofarliga normbrott.
- C. Som lättsamma försök att presentera nya idéer.
- D. Som underhållande bevis på språkets oändliga mångfald.
`,
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 16,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText5,
            },
            {
              type: "text",
              text: `
**Vilken kvalitet hos essän vill textförfattaren framför allt betona med exemplet ur Virginia Nicholsons bok Singled out?**

- A. Essäns tidlösa karaktär.
- B. Essäns förmåga till konkretion.
- C. Essäns självreflekterande karaktär.
- D. Essäns förmåga till övertalning.
`,
            },
          ],
        },
      ],
      answer: "B",
    },

    {
      testPass: 4,
      question: 17,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText6,
            },
            {
              type: "text",
              text: `
**Vilken roll spelade teatern för etableringen av de nya yrkena, enligt texten?**
- A. Teaterverksamheten skapade behov som tillgodosågs genom de nya yrkena.
- B. Det var på teaterscenerna som de nya yrkena först framträdde för allmänheten.
- C. Teatern och de nya yrkena förenades i kampen mot de etablerade skråna.
- D. Det var tack vare teaterns popularitet som de nya yrkena till slut accepterades.
`,
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 18,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText6,
            },
            {
              type: "text",
              text: `
**Vad var enligt texten en anledning till att skådespelaryrket och de nya yrkena ifrågasattes?**
- A. Allt lustfyllt ansågs strida mot det protestantiska idealet.
- B. Den rådande tidsandan såg ner på det konstlade och tillgjorda.
- C. Männen befarade att deras yrken skulle övertas av de framgångsrika kvinnorna.
- D. Det ansågs fel att synliggöra det kvinnliga, såväl på som utanför teatern.
`,
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 19,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText6,
            },
            {
              type: "text",
              text: `
**Vad var enligt texten utmärkande för den elisabetanska teaterns professionaliseringsarbete?**
- A. Behovet att uppfattas som modern.
- B. Smutskastningen av traditionella försörjningssätt.
- C. Betoningen av de egna styrkorna för att säkra framgång.
- D. Markerandet av skillnader mellan sig själv och andra.
`,
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 20,
      type: "verbal",
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: readingAbilityText6,
            },
            {
              type: "text",
              text: `
**Vad framstår som en viktig poäng i Natasha Kordas bok?**
- A. Att den elisabetanska teaterns kvinnor bedrev en tidig rättighetskamp.
- B. Att den elisabetanska teaterscenen skildrade osedda kvinnors livsvillkor.
- C. Att den elisabetanska teaterns nya yrken stärkte kvinnors ställning i samhället.
- D. Att det elisabetanska teaterlivet byggde på osynliggjort kvinnoarbete.
`,
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 21,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Björnar är allätare, med undantag för jättepandan, som nästan _____ lever av bambuskott.**
- A. avgörande
- B. förbehållslöst
- C. uteslutande
- D. oavbrutet
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 22,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**En grundläggande förutsättning för att en _____ försöksverksamhet ska _____ är att regelverket inte lägger hinder i vägen.**
- A. ändamålsenlig - komma till stånd
- B. betryggande - ta till orda
- C. lagstadgad - äga sin riktighet
- D. framgångsrik - gå om intet
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 23,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Historiskt har läkemedel huvudsakligen _____ på naturprodukter, främst medicinalväxter, men många framställs numera _____ . Läkemedel kan också framställas genom att man utgår från en naturlig substans som _____ .**
- A. baserats - syntetiskt - modifieras
- B. tillverkats - industriellt - stabiliseras
- C. grundlagts - kemiskt - extraheras
- D. skapats - artificiellt - steriliseras
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 24,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**När filosofen Renata Salecl skulle köpa ost i en delikatessbutik drabbades hon av beslutsångest. Utbudet var enormt och butiksinnehavarens råd hjälpte _____ . Det berättar Salecl i sin bok Valfrihetens tyranni.**
- A. på måfå
- B. dito
- C. till nöds
- D. föga
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 25,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Skogshögskolan är väl anpassad till _____ och smyger sig upp i slänten vid skogsbrynet. Byggnadens storlek blir _____ först när man går in genom entrén.**
- A. scenografin - märkvärdig
- B. geologin - uppmärksammad
- C. topografin - märkbar
- D. ekologin - anmärkningsvärd
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 26,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**PISA-rapporten, en av världens största elevstudier, både politiseras och haussas upp i nyhetsartiklar och på opinionssidor. I en studie från Södertörns högskola framkommer hur PISA har blivit ett _____ i den politiska debatten.**
- A. vågspel
- B. långskott
- C. slagträ
- D. lyckokast
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 27,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Fysikernas beskrivning av materien, inbegripet våra hjärnor, handlar enbart om _____ mätbara egenskaper. Ändå kan vi känna doften av en ros. Det mjuka organet inne i skallen rymmer en hel värld av _____ upplevelser som bara är tillgängliga från insidan.**
- A. distinkt - diffusa
- B. autentiskt - skenbara
- C. faktiskt - fiktiva
- D. objektivt - subjektiva
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 28,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Liberalismen är fast _____ i ett antal individuella rättigheter och ett tydligt frihetsideal. Det handlar om rätten att säga och tycka vad man vill, rätten till personlig _____ , rätten att starta föreningar, driva organisationer och bekänna sig till den _____ man föredrar.**
- A. insatt - framgång - åsikt
- B. rotad - integritet - religion
- C. säkrad - egendom - klass
- D. övertygad - utveckling - etnicitet
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 29,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**Med hjälp av ögonbottenfotografering kan man se om en person har _____ , det som i vardagligt tal kallas grön starr.**
- A. artros
- B. glaukom
- C. afasi
- D. psoriasis
`,
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 30,
      type: "verbal",
      system: SYSTEM_PROMPT_SENTENCE_COMPLETION,
      messages: [
        {
          role: "user",
          content: `
**De nya idéerna orsakade _____ bland det egna partiets _____ och fick därför tonas ner så till den milda grad att det slutgiltiga programmet var lika upphetsande som Sjörapporten en stilla sommardag.**
- A. bifall - vapendragare
- B. ramaskri - gräsrötter
- C. hurrarop - påhejare
- D. klagovisor - visselblåsare
`,
        },
      ],
      answer: "B",
    },

    /**
     * Test Pass 5
     *
     * Math
     */
    {
      testPass: 5,
      question: 1,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
4x + 13 = 8x - 31
Vad är x?

- A. -4,5
- B. 1,5
- C. 4,5
- D. 11
`,
        },
      ],
      answer: "D",
    },
    {
      testPass: 5,
      question: 2,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/2.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 3,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/3.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 5,
      question: 4,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
Medelvärdet av 17, 21 och 44 är lika med medelvärdet av 63, 73 och x.
Vilket värde har x?

- A. -54
- B. -27
- C. 0
- D. 71
`,
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 5,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
Vägen mellan Julias hem och Annas hem är 12 km lång. De startar hemifrån samtidigt
för att mötas längs vägen. Julia springer med konstant hastighet och det tar henne
12 minuter att springa 2 km. Anna går med konstant hastighet och det tar henne
24 minuter att gå 2 km. Hur lång tid tar det innan de möts?

- A. 36 minuter
- B. 42 minuter
- C. 48 minuter
- D. 72 minuter
`,
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 6,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/6.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 5,
      question: 7,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/7.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 8,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/8.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 5,
      question: 9,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
Vilket svarsalternativ är en ekvation för en linje som går genom punkten (3, 1)?

- A. y = -x + 4
- B. y = x + 2
- C. y = 2x + 1
- D. y = 3x + 1
      `,
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 10,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/10.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 11,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/11.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 12,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/12.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 13,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
3x > y

Kvantitet I: x
Kvantitet II: y

- A. I är större än II
- B. II är större än I
- C. I är lika med II
- D. informationen är otillräcklig
      `,
        },
      ],
      answer: "D",
    },
    {
      testPass: 5,
      question: 14,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/14.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 15,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/15.png"
              ),
            },
          ],
        },
      ],
      answer: "B",
    },
    {
      testPass: 5,
      question: 16,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
f(x) = 4x + 8
g(x) = 2x + 4
a > 0

Kvantitet I:  f(a)

Kvantitet II:  g(2a)

- A. I är större än II
- B. II är större än I
- C. I är lika med II
- D. informationen är otillräcklig
      `,
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 17,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
En mätserie består av tio heltal mellan 1 och 50. Mätseriens median är 25.

Kvantitet I:  Mätseriens median om det största och det minsta mätvärdet tas bort

Kvantitet II:  25

- A. I är större än II
- B. II är större än I
- C. I är lika med II
- D. informationen är otillräcklig
      `,
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 18,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/18.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 19,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/19.png"
              ),
            },
          ],
        },
      ],
      answer: "D",
    },
    {
      testPass: 5,
      question: 20,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/20.png"
              ),
            },
          ],
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 21,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
x < 0

Kvantitet I:  (x + 4)(x - 2)

Kvantitet II:  (x - 4)(x + 2)

- A. I är större än II
- B. II är större än I
- C. I är lika med II
- D. informationen är otillräcklig
      `,
        },
      ],
      answer: "B",
    },
    {
      testPass: 5,
      question: 22,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
Priset på en vara stiger med 20% per år.

Kvantitet I:  Den tid det tar tills priset har fördubblats

Kvantitet II:  5 år

- A. I är större än II
- B. II är större än I
- C. I är lika med II
- D. informationen är otillräcklig
      `,
        },
      ],
      answer: "B",
    },
    {
      testPass: 5,
      question: 23,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
En förmiddag besöker Roy ett apotek, ett bibliotek och en cykelhandlare. I vilken ordning gör Roy sina besök?

(1) När Roy går till apoteket har han inte varit på biblioteket ännu.
(2) Besöket hos cykelhandlaren är varken först eller sist.

Tillräcklig information för lösningen erhålls

- A. i (1) men ej i (2)
- B. i (2) men ej i (1)
- C. i (1) tillsammans med (2)
- D. i (1) och (2) var för sig
- E. ej genom de båda påståendena
      `,
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 24,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/24.png"
              ),
            },
          ],
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 25,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
En tank innehåller endast olja. Tanken är fylld till 4/7 av sin volym. Hur stor volym har tanken?

(1) För att tanken ska bli helt full måste man fylla på ytterligare 1 200 liter olja.
(2) Om man tömmer ut 200 liter olja ur tanken så kommer den att vara fylld till hälften.

Tillräcklig information för lösningen erhålls

- A. i (1) men ej i (2)
- B. i (2) men ej i (1)
- C. i (1) tillsammans med (2)
- D. i (1) och (2) var för sig
- E. ej genom de båda påståendena
      `,
        },
      ],
      answer: "D",
    },
    {
      testPass: 5,
      question: 26,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
I en stadsdel ligger husen längs gator som går antingen i nord-sydlig eller i öst-västlig riktning. Varje hus ligger längs endast en gata. Vart och ett av husen har antingen ett jämnt eller ett udda nummer. Hur många hus med udda nummer finns det i stadsdelen?

(1) Det finns sammanlagt 150 hus med jämna nummer i stadsdelen. 40 procent av dem ligger längs gator som går i öst-västlig riktning.
(2) Två tredjedelar av husen med udda nummer ligger längs gator som går i nord-sydlig riktning. Längs gator som går i öst-västlig riktning finns det lika många hus med jämna nummer som med udda nummer.

Tillräcklig information för lösningen erhålls

- A. i (1) men ej i (2)
- B. i (2) men ej i (1)
- C. i (1) tillsammans med (2)
- D. i (1) och (2) var för sig
- E. ej genom de båda påståendena
      `,
        },
      ],
      answer: "C",
    },
    {
      testPass: 5,
      question: 27,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: `
Anna och Berit leker med kulor. Hur många kulor har Anna?

(1) Om Anna hade ytterligare 100 kulor, så skulle hon ha tre gånger så många kulor som hon faktiskt har.
(2) Om Anna hade 25 kulor färre, så skulle Berit ha fyra gånger så många kulor som Anna.

Tillräcklig information för lösningen erhålls

- A. i (1) men ej i (2)
- B. i (2) men ej i (1)
- C. i (1) tillsammans med (2)
- D. i (1) och (2) var för sig
- E. ej genom de båda påståendena
      `,
        },
      ],
      answer: "A",
    },
    {
      testPass: 5,
      question: 28,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/28.png"
              ),
            },
          ],
        },
      ],
      answer: "E",
    },

    {
      testPass: 4,
      question: 29,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/29-31.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Studera kategorin Fritidsresor utrikes. Vilket år var dess andel av det totala antalet resor som störst?

- A. 2011
- B. 2012
- C. 2014
- D. 2016
      `,
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 30,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/29-31.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Från 2012 till 2013 minskade det totala antalet resor. Vilken var den enda kategori där antalet ökade mellan dessa år?

- A. Affärsresor utrikes
- B. Fritidsresor utrikes
- C. Affärsresor inrikes
- D. Fritidsresor inrikes
      `,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 31,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/29-31.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Hur fördelade sig antalet resor procentuellt på utrikesresor respektive inrikesresor 2016?

Utrikes    Inrikes
- A. 25 %    75 %
- B. 30 %    70 %
- C. 35 %    65 %
- D. 45 %    55 %
      `,
        },
      ],
      answer: "C",
    },

    {
      testPass: 4,
      question: 32,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/32-34.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Vilka två dödsorsaker angavs för sammanlagt en femtedel av de kungsörnar som inkom till Naturhistoriska riksmuseet 1993–2011?

- A. Illegal jakt och El
- B. Illegal jakt och Vindkraftverk
- C. El och Vindkraftverk
- D. Vindkraftverk och Annan olycka
      `,
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 33,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/32-34.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Vilket var förhållandet mellan antalet kungsörnar med okänd dödsorsak och antalet kungsörnar med känd dödsorsak bland örnarna som påträffades i månaden juni?

- A. 1:2
- B. 2:1
- C. 5:8
- D. 8:5
      `,
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 34,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/32-34.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
För hur stor andel av de kungsörnar som inkom till Naturhistoriska riksmuseet 1993–2011 angavs fyndmånad?

- A. 72 procent
- B. 75 procent
- C. 78 procent
- D. 82 procent
      `,
        },
      ],
      answer: "D",
    },
    {
      testPass: 4,
      question: 35,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/35-37.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Hur stor andel av de som arbetade inom jordbruk, skogsbruk, jakt och fiske i Gävleborgs län 2015 fanns inom jordbruket?

- A. 30 procent
- B. 35 procent
- C. 40 procent
- D. 45 procent
      `,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 36,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/35-37.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Identifiera det län som hade störst andel förvärvsarbetande inom jordbruk, skogsbruk, jakt och fiske av det totala antalet förvärvsarbetande i länet. Hur många förvärvsarbetande fanns det totalt i detta län 2015?

- A. 11 000
- B. 27 000
- C. 43 000
- D. 62 000
      `,
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 37,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/35-37.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
För vilket av följande län gällde år 2015 att var femte person som arbetade inom jordbruk, skogsbruk, jakt och fiske var kvinna?

- A. Stockholms län
- B. Södermanlands län
- C. Kalmar län
- D. Skåne län
      `,
        },
      ],
      answer: "C",
    },
    {
      testPass: 4,
      question: 38,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/38-40-1.png"
              ),
            },
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/38-40-2.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Vilken av följande gårdar stämmer med beskrivningen?

Byggningen eller stugan låg norr om gårdsplanen. Söder om gårdsplanen fanns stall och stallslider.

- A. Kockgård
- B. Stamgården, nordöstra
- C. Ryssgård
- D. Östra Flintgård
      `,
        },
      ],
      answer: "A",
    },
    {
      testPass: 4,
      question: 39,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/38-40-1.png"
              ),
            },
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/38-40-2.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Identifiera det torvhus, torkställning för torv som låg mellan den nordöstra Stamgården och Ryssgård, intill en stuga. Vad fanns 40 meter rakt söder om detta torvhus?

- A. Hemlighus och dyngskåle
- B. Loft
- C. Köksväxter
- D. Vedlider och slipskåle
      `,
        },
      ],
      answer: "B",
    },
    {
      testPass: 4,
      question: 40,
      type: "math",
      system: SYSTEM_PROMPT_MATH,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/38-40-1.png"
              ),
            },
            {
              type: "image",
              image: new URL(
                "https://raw.githubusercontent.com/elitan/hp-ai-benchmark/main/assets/2024-spring/5-kvant/38-40-2.png"
              ),
            },
          ],
        },
        {
          role: "user",
          content: `
Fähuset i Måsgård, fähuset i Ammagård samt det sydligast belägna fähuset i Jerkgård utgör hörnen i ett triangelformat område. Hur stort är detta område?

- A. 4 500 m²
- B. 6 500 m²
- C. 10 500 m²
- D. 13 000 m²
      `,
        },
      ],
      answer: "B",
    },
  ];

  return exam;
}
