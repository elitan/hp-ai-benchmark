import { CoreMessage } from "ai";

interface Exam {
  system: string;
  messages: CoreMessage[];
  answer: string;
}

const SYSTEM_PROMPT_WORD_COMPREHENSION = `Du är en smart elev som skriver högskoleprovet. Du resonerar och svarar på svenska Ditt mål är att alltid svara korrekt för att få alla rätt.

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

/**
 * asd
 */

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

/**
 * https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/
 */
export function getExam2024Spring() {
  const exam: Exam[] = [
    /**
     * Test Pass 1
     *
     * Word comprehension
     */
    {
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
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText1,
        },
        {
          role: "user",
          content: `
**Vad av följande är vesiklar ett exempel på, om man följer textens resonemang?**
- A. Att ett kroppsligt förlopp kan rubbas utan egentlig orsak.
- B. Att cellerna kan använda en och samma process för olika syften.
- C. Att kroppsegna ämnen kan bromsa en pågående sjukdomsprocess.
- D. Att främmande ämnen kan både skada och stärka cellerna.
`,
        },
      ],
      answer: "B",
    },
    {
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText1,
        },
        {
          role: "user",
          content: `
**Vad skulle kunna bli användbart vid behandling av vaskulit, enligt Maria Mossbergs forskningsresultat?**
- A. Ökad aktivitetsgrad hos vesiklar.
- B. Speciellt odlad blodplasma.
- C. Redan tillgängliga mediciner.
- D. Vesiklars rengörande funktion.
`,
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
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText2,
        },
        {
          role: "user",
          content: `
**Vad påpekar textförfattarna om de hänsynsytor som av naturvårdsskäl undantas från avverkning?**
- A. De är alltför olika och inte tillräckligt artrika.
- B. De är inte unika nog att klassas som nyckelbiotoper.
- C. De är inte placerade där hotet mot skogen är som störst.
- D. De är alltför utspridda och inte tillräckligt stora.
`,
        },
      ],
      answer: "D",
    },

    {
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText2,
        },
        {
          role: "user",
          content: `
**Vad kritiserar textförfattarna när det gäller ”den svenska skogsbruksmodellen”?**
- A. Att modellen har en otydlig målsättning.
- B. Att det råder obalans mellan skogsnäringens och naturvårdens intressen.
- C. Att modellen bygger på otidsenlig forskning.
- D. Att det saknas visioner om skogslandskapets framtid.
`,
        },
      ],
      answer: "B",
    },

    {
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText2,
        },
        {
          role: "user",
          content: `
**Textförfattarna anser att den svenska skogen inte brukas på ett hållbart sätt i dag. Vad uppfattar de som det huvudsakliga problemet?**
- A. Produktionstakten, som ständigt minskar den totala skogsarealen i Sverige.
- B. Skogsindustrins utsläpp, som sprider farliga ämnen i ett ömtåligt landskap.
- C. Sättet att avverka, vilket allvarligt skadar den biologiska mångfalden i skogen.
- D. Avsaknaden av oberoende forskning, vilket leder till ett ensidigt skogsbruk.
`,
        },
      ],
      answer: "C",
    },

    {
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText2,
        },
        {
          role: "user",
          content: `
**Vilken av följande förändringar av det svenska skogsbruket efterlyser textförfattarna?**
- A. Att EU:s naturvårdsdirektiv anpassas till svenska förhållanden.
- B. Att forskningen inriktas på att utveckla alternativ till skogsråvara.
- C. Att den produktiva skogsmarken utökas och blir mer enhetlig.
- D. Att skogsbolagens påverkan begränsas och att andra samhällsintressen ges större utrymme.
`,
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
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText3,
        },
        {
          role: "user",
          content: `
**Hur förhåller sig Tommy till sin morfar, att döma av hans tankar under begravningen?**
- A. Han dömer morfadern för dennes livsval och begravningen väcker hans ilska.
- B. Han är ointresserad av morfadern och drömmer sig bort under begravningen.
- C. Han tänker på sin morfar och känner att begravningen inte gör honom rättvisa.
- D. Han beundrar sin morfar och tänker under begravningen på hans liv.
`,
        },
      ],
      answer: "C",
    },
    {
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText3,
        },
        {
          role: "user",
          content: `
**Vilket svarsförslag överensstämmer bäst med hur Tommy uppfattar sin mor?**
- A. Hon är svartsjuk och tänker mest på sig själv.
- B. Hon är dominant och noga med detaljerna.
- C. Hon är självuppoffrande och döljer sina egna behov.
- D. Hon är nonchalant och vill framstå som finare än hon är.
`,
        },
      ],
      answer: "B",
    },
    {
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText3,
        },
        {
          role: "user",
          content: `
**Vilken mening sammanfattar begravningen bäst, om man utgår från textens beskrivning?**
- A. Det är en enkel ceremoni med endast närmast sörjande och en opersonlig präst.
- B. Det är en högtidlig begravning med uppklädda besökare och en värdig präst.
- C. Det är en stillsam ceremoni utan musik med en kortfattad präst.
- D. Det är en sorgtyngd begravning med gråtande deltagare och en empatisk präst.
`,
        },
      ],
      answer: "A",
    },
    {
      system: SYSTEM_PROMPT_READING_COMPREHENSION,
      messages: [
        {
          role: "user",
          content: readingAbilityText3,
        },
        {
          role: "user",
          content: `
**Vilken är den rimligaste tolkningen av Tommys tankar och beteenden efter begravningsceremonins slut?**
- A. Att han är nyfiken på Gun.
- B. Att han struntar i Gun.
- C. Att han tycker synd om Gun.
- D. Att han är sur på Gun.
`,
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "D",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "D",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "A",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "C",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "D",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "A",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "C",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "D",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "A",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "A",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "A",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "D",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "A",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "D",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "C",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "E",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "C",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "E",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "D",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "C",
    },
    {
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
        {
          role: "user",
          content: "Lös denna uppgiften.",
        },
      ],
      answer: "B",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
**Vilket av svarsförslagen anger de två kommungrupper som var mest lika varandra vad gäller antal tågankomster och genomsnittlig försening?**
- A. Storstäder och Kommuner i tätbefolkad region
- B. Förortskommuner till storstäder och Pendlingskommuner
- C. Pendlingskommuner och Varuproducerande kommuner
- D. Varuproducerande kommuner och Kommuner i tätbefolkad region
`,
        },
      ],
      answer: "A",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
**Hur många tågankomster finns redovisade för Förortskommuner till storstäder jämfört med Förortskommuner till större städer?**
- A. Hälften så många
- B. Lika många
- C. Dubbelt så många
- D. Tre gånger så många
`,
        },
      ],
      answer: "C",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
**Hur många minuter sammanlagt var de ankommande tågen försenade i Kommuner i glesbefolkad region?**
- A. 220000 minuter
- B. 330000 minuter
- C. 440000 minuter
- D. 550000 minuter
`,
        },
      ],
      answer: "B",
    },

    {
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
          ],
        },
        {
          role: "user",
          content: `
Vilket svarsförslag beskriver bäst förhållandet mellan opererande, invärtesmedicinska och barnmedicinska specialiteter vad gäller det totala antalet specialistbevis 2012?

- A. 5:3:1
- B. 5:4:1
- C. 6:4:1
- D. 6:5:1
`,
        },
      ],
      answer: "B",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
Identifiera de tre specialiteterna inom invärtesmedicin med flest utfärdade specialistbevis 2011. Hur stor andel utgjorde dessa av det totala antalet specialistbevis inom invärtesmedicin samma år?

- A. 55 procent
- B. 65 procent
- C. 75 procent
- D. 85 procent
`,
        },
      ],
      answer: "C",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
Vilken opererande specialitet hade 2010 flest specialistbevis som hörde till personer som var 65 år eller äldre?
- A. Kirurgi
- B. Ortopedi
- C. Anestesi och intensivvård
- D. Obstetrik och gynekologi
`,
        },
      ],
      answer: "A",
    },

    {
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
          ],
        },
        {
          role: "user",
          content: `
Hur stort var antalet personer som flyttade inom Västerort jämfört med antalet som flyttade från Söderort till Västerort?

- A. Fyra gånger så stort
- B. Fem gånger så stort
- C. Sex gånger så stort
- D. Sju gånger så stort
`,
        },
      ],
      answer: "C",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
Hur många fler flyttade inom Stockholms kommun än till Stockholms kommun?

- A. 34927
- B. 35619
- C. 37247
- D. 42074
`,
        },
      ],
      answer: "A",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
Vad blir flyttnettot om man räknar antalet personer som flyttade till Söderort och tar bort antalet som flyttade från Söderort?

- A. -2168
- B. -967
- C. +1561
- D. +2528
`,
        },
      ],
      answer: "D",
    },

    {
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
          ],
        },
        {
          role: "user",
          content: `
Studera de olika djurslagen med avseende på hur stor andel av den totala slakten som utgjordes av ekologiskt uppfödda djur. Hur stor var den största noterade ökningen av denna andel om man jämför 2009 och 2015?

- A. 5 procentenheter
- B. 8 procentenheter
- C. 55 procentenheter
- D. 75 procentenheter
`,
        },
      ],
      answer: "B",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
Hur stor andel av slakten av de redovisade ekologiskt uppfödda djurslagen 2014 utgjorde slakten av svin?

- A. 1/6
- B. 1/4
- C. 1/3
- D. 2/5
`,
        },
      ],
      answer: "A",
    },
    {
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
          ],
        },
        {
          role: "user",
          content: `
Slakten av ekologiskt uppfödda får och lamm utgör en mindre andel av den totala slakten av får och lamm. Hur stor var den totala slakten av får och lamm 2012?

- A. 1000 ton
- B. 2000 ton
- C. 4000 ton
- D. 5000 ton
`,
        },
      ],
      answer: "D",
    },
  ];

  return exam;
}
