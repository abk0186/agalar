/*
 * agalar.kz: ALL page content lives in this one file.
 * Edit the values below; no build step needed. Just reload the page.
 *
 * Text fields come in pairs: *_ru (Russian) and *_kz (Kazakh).
 * If a *_kz field is empty, the page falls back to the *_ru text.
 * Empty links ("") hide their button automatically.
 *
 * friends[]  - any number of cards (the grid adapts to the count)
 *   name_ru / name_kz  display name
 *   handle             Instagram handle (shown under the name, without "@")
 *   photo              path to the image (square works best), e.g. "assets/friends/x.jpg";
 *                      empty -> local placeholder silhouette
 *   role_ru / role_kz  one short line about what they do (empty -> line hidden)
 *   badge_ru/_kz       custom gold badge text under the name (optional)
 *   handle, role, links are all optional: empty values are simply not rendered
 *   links[]            any number of links, empty url -> skipped:
 *                        { type, url, label?, label_ru?, label_kz? }
 *                        type: instagram | facebook | tiktok | website | business_instagram
 *                        without a label -> round icon button (personal socials)
 *                        with a label    -> small labelled pill (businesses, projects)
 *   (legacy: plain "instagram" / "website" fields still work if links[] is absent)
 *
 * days[]     - program grouped by day
 *   date_ru / date_kz  day heading
 *   items[]
 *     time             free text, e.g. "~09:00–11:00"
 *     title_ru/_kz     what happens
 *     venue_ru/_kz     venue name (optional)
 *     address_ru/_kz   street address, shown as text under the venue (optional)
 *     about_ru/_kz     1–2 lines about the venue (optional)
 *     website          venue website (optional)
 *     map              2GIS / map link (optional)
 *     note_ru/_kz      small gold tag next to the venue, e.g. "Бизнес Тимура" (optional)
 *     links[]          extra links (optional): { label_ru, label_kz, url, type? }
 *                        type: "instagram" -> Instagram icon (default: globe)
 *     distance_km      road distance from the previous point, km (optional; < 10 shown with one decimal)
 *     drive_min        driving time for that leg, minutes (optional; shown next to distance_km)
 *     drive_from_ru/_kz  origin of the leg, e.g. "от Vela House" / "Vela House-тан"
 *                        (set it on every leg; ui.drive_from is only a fallback)
 *                      Distances: OSRM car routing between 2GIS coordinates (07.10.2026); drive times set by the organizer.
 *
 * weather    - live forecast block + background animation (Open-Meteo, no key)
 *   lat / lon / timezone, days[] = visit dates "YYYY-MM-DD"
 * music      - background music (YouTube, starts on the first tap; toggle button)
 *   youtube_id, start (seconds)
 */
window.AGALAR_DATA = {
  meta: {
    arrival:   { date: "10.10", time: "01:35" },
    departure: { date: "11.10", time: "20:30" },
    guests: 7,
    show_handles: false  /* false -> hide the "@handle" line under names (Instagram buttons stay) */
  },

  weather: {
    lat: 51.1694, lon: 71.4491, timezone: "Asia/Almaty",
    days: ["2026-10-10", "2026-10-11"]
  },

  /* Guest info: Astana vs Aktau weather on the visit days (weather.days).
   * JS refreshes from Open-Meteo on load; "fallback" is the forecast baked in on 09.10 13:11 (Asia/Almaty).
   * day = daily max, eve = temperature at evening_hour local time, min = daily min, pp = max precipitation probability %,
   * rain = precipitation sum mm, wind = max wind m/s, code = WMO weather code. */
  guest_info: {
    astana: { lat: 51.17, lon: 71.45 },
    aktau:  { lat: 43.65, lon: 51.17 },
    evening_hour: 20,
    fallback: {
      fetched: "09.10 13:11",
      astana: { day: [10.6, 14.0], eve: [5.8, 6.6], min: [1.0, 1.3], pp: [0, 0], rain: [0.0, 0.0], wind: [2.55, 2.8], code: [3, 3] },
      aktau:  { day: [24.3, 23.7], eve: [20.4, 18.7], min: [15.2, 13.3], pp: [10, 0], rain: [0.0, 0.0], wind: [4.31, 3.4], code: [3, 1] }
    }
  },

  music: {
    youtube_id: "azYCSJdY3GM",   /* «Dombyra 100 | OYU Special» */
    start: 6                     /* seconds */
  },

  ui: {
    ru: {
      doc_title: "Братья из Актау в Астане · 10–11 октября",
      eyebrow: "Астана · 10–11 октября 2026",
      hero_title: "Братья из Актау<br>в Астане",
      hero_lead: "Предприниматели из Астаны приветствуют коллег из Актау.",
      arrival: "Прилёт",
      departure: "Вылет",
      cta_program: "Программа",
      friends_kicker: "",
      friends_title: "Наш круг",
      friends_lead: "Братья, которые собираются вместе в эти дни.",
      program_kicker: "",
      program_title: "Программа визита",
      program_lead: "Время ориентировочное, детали уточняются.",
      btn_instagram: "Instagram",
      btn_website: "Сайт",
      btn_map: "2GIS",
      footer_note: "Время ориентировочное, детали уточняются",
      footer_welcome: "Добро пожаловать, братья!",
      footer_welcome_alt: "Қош келдіңіз, ағалар!",
      footer_small: "Страница для своих: доступна только по ссылке",
      lang_label: "Язык",
      quote_text: "С гостем в дом приходит благодать",
      weather_title: "Погода в Астане",
      weather_lead: "Прогноз на дни визита, обновляется автоматически.",
      weather_now: "Сейчас в Астане",
      weather_feels: "ощущается как",
      weather_wind: "ветер",
      weather_wind_max: "Ветер до",
      weather_precip: "Вероятность осадков",
      weather_ms: "м/с",
      weather_loading: "Загружаем прогноз…",
      weather_pending: "Прогноз на эти дни появится ближе к дате визита.",
      weather_error: "Не удалось загрузить прогноз. Попробуйте обновить страницу позже.",
      weather_source: "Данные: Open-Meteo · обновлено",
      gi_title: "Информация для гостей",
      gi_lead: "Погода в Астане и Актау в дни визита",
      gi_text: "Уважаемые братья! В дни визита в Астане днём около {day}, а вечером около {eve} — на {diff}° прохладнее, чем в Актау. Ночью и ранним утром — около {night}. Просим учесть это и взять с собой верхнюю одежду — осеннюю утеплённую куртку.",
      gi_text_same: "Уважаемые братья! В дни визита в Астане днём около {day}, а вечером около {eve} — примерно как в Актау. Ночью и ранним утром — около {night}, так что лёгкая куртка пригодится.",
      gi_city_astana: "Астана",
      gi_city_aktau: "Актау",
      gi_daytime: "Днём",
      gi_evening: "Вечером, 20:00",
      gi_diff: "холоднее на {n}°",
      gi_diff_same: "почти одинаково",
      gi_in_astana: "В Астане",
      gi_wind: "ветер до {n} м/с",
      gi_precip: "осадки {n}%",
      gi_pack_title: "Что взять с собой",
      gi_pack_jacket: "Осенняя утеплённая куртка",
      gi_pack_hat: "Шапка или капюшон — на вечер и раннее утро",
      gi_pack_umbrella: "Зонт — возможен дождь",
      gi_pack_no_umbrella: "Зонт, по прогнозу, не понадобится",
      gi_pack_wind: "Ветрено, до {n} м/с — пригодится ветровка",
      gi_src_live: "Прогноз: Open-Meteo · обновлено {time}",
      gi_src_static: "Прогноз: Open-Meteo · данные на {time}",
      music_on: "Включить музыку",
      music_off: "Выключить музыку",
      drive_from: "от предыдущей точки",
      drive_km: "км",
      drive_min: "мин",
      drive_h: "ч",
      drive_dist_label: "Расстояние по дороге",
      drive_time_label: "Время в пути"
    },
    kz: {
      doc_title: "Ақтаулық ағалар Астанада · 10–11 қазан",
      eyebrow: "Астана · 10–11 қазан 2026",
      hero_title: "Ақтаулық ағалар<br>Астанада",
      hero_lead: "Астаналық кәсіпкерлер Ақтаудан келген әріптестерін қарсы алады.",
      arrival: "Ұшып келу",
      departure: "Ұшып кету",
      cta_program: "Бағдарлама",
      friends_kicker: "Ағалар",
      friends_title: "Біздің орта",
      friends_lead: "Осы күндері бас қосатын ағалар.",
      program_kicker: "Бағдарлама",
      program_title: "Сапар бағдарламасы",
      program_lead: "Уақыт шамамен көрсетілген, мәліметтер нақтыланады.",
      btn_instagram: "Instagram",
      btn_website: "Сайт",
      btn_map: "2GIS",
      footer_note: "Уақыт шамамен көрсетілген, мәліметтер нақтыланады",
      footer_welcome: "Қош келдіңіз, ағалар!",
      footer_welcome_alt: "Добро пожаловать, братья!",
      footer_small: "Өзімізге арналған бет: тек сілтеме арқылы ашылады",
      lang_label: "Тіл",
      quote_text: "Қонақ келсе — құт келер",
      weather_title: "Астанадағы ауа райы",
      weather_lead: "Сапар күндеріне арналған болжам, өздігінен жаңарып тұрады.",
      weather_now: "Қазір Астанада",
      weather_feels: "сезілуі",
      weather_wind: "жел",
      weather_wind_max: "Жел",
      weather_precip: "Жауын-шашын ықтималдығы",
      weather_ms: "м/с",
      weather_loading: "Болжам жүктелуде…",
      weather_pending: "Бұл күндердің болжамы сапар жақындағанда шығады.",
      weather_error: "Болжамды жүктеу мүмкін болмады. Бетті кейінірек жаңартып көріңіз.",
      weather_source: "Дереккөз: Open-Meteo · жаңартылды",
      gi_title: "Қонақтарға ақпарат",
      gi_lead: "Сапар күндері Астана мен Ақтаудағы ауа райы",
      gi_text: "Құрметті ағалар! Сапар күндері Астанада күндіз шамамен {day}, кешке қарай шамамен {eve} — бұл Ақтаудағыдан {diff}° салқын. Түнде және таңертең ерте ауа температурасы {night} шамасында. Соны ескеріп, сырт киім — жылы күздік күрте ала келуіңізді сұраймыз.",
      gi_text_same: "Құрметті ағалар! Сапар күндері Астанада күндіз шамамен {day}, кешке қарай шамамен {eve} — Ақтаумен шамалас. Түнде және таңертең ерте ауа температурасы {night} шамасында, сондықтан жеңіл күрте артық болмайды.",
      gi_city_astana: "Астана",
      gi_city_aktau: "Ақтау",
      gi_daytime: "Күндіз",
      gi_evening: "Кешке, 20:00",
      gi_diff: "{n}° салқын",
      gi_diff_same: "шамалас",
      gi_in_astana: "Астанада",
      gi_wind: "жел {n} м/с дейін",
      gi_precip: "жауын-шашын {n}%",
      gi_pack_title: "Өзіңізбен бірге алыңыз",
      gi_pack_jacket: "Жылы күздік күрте",
      gi_pack_hat: "Кешке және ерте таңға — бас киім немесе капюшон",
      gi_pack_umbrella: "Қолшатыр — жаңбыр жаууы мүмкін",
      gi_pack_no_umbrella: "Болжам бойынша қолшатыр қажет болмайды",
      gi_pack_wind: "Жел {n} м/с дейін — желден қорғайтын күрте керек болады",
      gi_src_live: "Болжам: Open-Meteo · жаңартылды {time}",
      gi_src_static: "Болжам: Open-Meteo · {time} мәліметі",
      music_on: "Музыканы қосу",
      music_off: "Музыканы өшіру",
      drive_from: "алдыңғы нүктеден",
      drive_km: "км",
      drive_min: "мин",
      drive_h: "сағ",
      drive_dist_label: "Жолдағы қашықтық",
      drive_time_label: "Жолдағы уақыт"
    }
  },

  /* Friend roles and links come from the owner (02.10.2026). KZ texts need native review. */
  friends: [
    {
      name_ru: "Акиф", name_kz: "Акиф",
      photo: "/v-3cg4dwoa/assets/friends/akif.jpg",
      role_ru: "КМС по вольной борьбе",
      role_kz: "Еркін күрестен спорт шеберлігіне үміткер",
      links: []
    },
    {
      name_ru: "Асет", name_kz: "Асет",
      handle: "assetbegaliyev",
      photo: "/v-3cg4dwoa/assets/friends/assetbegaliyev.jpg",
      role_ru: "Основатель клининговой компании Adal Works, IT-предприниматель, сооснователь стартапа Beksar.",
      role_kz: "Adal Works клининг компаниясының негізін қалаушы, IT-кәсіпкер, Beksar стартапының тең құрылтайшысы.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/assetbegaliyev" },
        { type: "facebook",  url: "https://www.facebook.com/asset.begaliyev" },
        { type: "tiktok",    label_ru: "Эко-активизм", label_kz: "Эко-белсенділік", url: "https://www.tiktok.com/@qazaq2701" },
        { type: "website",   label: "Adal Works", url: "https://adalworks.kz" },
        { type: "business_instagram", label: "Beksar", url: "https://www.instagram.com/beksar.kz" }
      ]
    },
    {
      name_ru: "Тимур", name_kz: "Тимур",
      handle: "kaltayev_t",
      photo: "/v-3cg4dwoa/assets/friends/kaltayev_t.jpg",
      role_ru: "Владелец бизнесов FARШ и All Off Burger (бургерные), а также Summer Love (замороженный йогурт)",
      role_kz: "FARШ және All Off Burger (бургерханалар), сондай-ақ Summer Love (мұздатылған йогурт) бизнестерінің иесі",
      links: [
        { type: "instagram", url: "https://www.instagram.com/kaltayev_t" },
        { type: "business_instagram", label: "FARШ", url: "https://www.instagram.com/farsh_burger_kz" },
        { type: "business_instagram", label: "Summer Love", url: "https://www.instagram.com/summerlove_kz" },
        { type: "business_instagram", label: "All Off Burger", url: "https://www.instagram.com/alloff_burger" }
      ]
    },
    {
      name_ru: "Арман", name_kz: "Арман",
      handle: "arman_tyutyukov",
      photo: "/v-3cg4dwoa/assets/friends/arman_tyutyukov.jpg",
      role_ru: "Компания «Оценка ЕКС»: оценка и экспертиза, профессиональная оценочная деятельность. Международный оценщик REV.",
      role_kz: "«Оценка ЕКС» компаниясы: бағалау және сараптама, кәсіби бағалау қызметі. REV халықаралық бағалаушысы.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/arman_tyutyukov" }
      ]
    },
    {
      name_ru: "Армат", name_kz: "Армат",
      handle: "armat_mendigaziyev",
      photo: "/v-3cg4dwoa/assets/friends/armat_mendigaziyev.jpg",
      role_ru: "Основатель KAZSAFETY: спецодежда и СИЗ, Актау · партнёр PowerUp (станции зарядки телефонов)",
      role_kz: "KAZSAFETY негізін қалаушы: арнайы киім және жеке қорғану құралдары, Ақтау · PowerUp серіктесі (телефон зарядтау станциялары)",
      links: [
        { type: "instagram", url: "https://www.instagram.com/armat_mendigaziyev" },
        { type: "website", label: "KazSafety", url: "https://kazsafety.kz/" }
      ]
    },
    {
      name_ru: "Ануарбек", name_kz: "Ануарбек",
      handle: "anuarbek_zhalel",
      photo: "/v-3cg4dwoa/assets/friends/anuarbek_zhalel.jpg",
      role_ru: "PR в сфере IT-коммуникаций: всё, что связано с PR.",
      role_kz: "IT-коммуникация саласындағы PR: PR-ға қатысты барлық бағыт.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/anuarbek_zhalel" },
        { type: "facebook",  url: "https://www.facebook.com/share/1A4Dn68h7a/" },
        { type: "business_instagram", label: "AI Sport", url: "https://www.instagram.com/ai.sport.app" }
      ]
    },
    {
      name_ru: "Асылжан", name_kz: "Асылжан",
      handle: "assylzhan1989",
      photo: "/v-3cg4dwoa/assets/friends/assylzhan1989.jpg",
      role_ru: "Аренда автомобилей на месторождениях и снабжение продуктами вахтовых посёлков.",
      role_kz: "Кен орындарында көлік жалға беру және вахталық кенттерді азық-түлікпен қамтамасыз ету.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/assylzhan1989" }
        /* company name / links: TBD */
      ]
    },
    {
      name_ru: "Дима", name_kz: "Дима",
      handle: "dmitroff_13",
      photo: "/v-3cg4dwoa/assets/friends/dmitroff_13.jpg",
      role_ru: "Основатель бренда Pro Athletic: мужская и женская спортивная и лайфстайл-одежда.",
      role_kz: "Pro Athletic брендінің негізін қалаушы: ерлер мен әйелдерге арналған спорттық және лайфстайл киім.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/dmitroff_13" },
        { type: "business_instagram", label: "Pro Athletic", url: "https://www.instagram.com/pro.athletic.fitness" }
      ]
    },
    {
      name_ru: "Азамат", name_kz: "Азамат",
      handle: "dr.kaikan",
      photo: "/v-3cg4dwoa/assets/friends/dr.kaikan.jpg",
      role_ru: "Основатель сети стоматологий Dental Pro, челюстно-лицевой хирург.",
      role_kz: "Dental Pro стоматология желісінің негізін қалаушы, жақ-бет хирургы.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/dr.kaikan" },
        { type: "business_instagram", label: "Dental Pro", url: "https://www.instagram.com/dental_pro_astana" }
      ]
    },
    {
      name_ru: "Айвар", name_kz: "Айвар",
      handle: "moto_zra",
      photo: "/v-3cg4dwoa/assets/friends/moto_zra.jpg",
      role_ru: "Основатель AVA auto glass (автостёкла в Астане и Петропавловске) и кофейни Taksofon в Новоишимском",
      role_kz: "AVA auto glass (Астана мен Петропавлдағы автоәйнектер) және Новоишимдегі Taksofon кофеханасының негізін қалаушы",
      links: [
        { type: "instagram", url: "https://www.instagram.com/moto_zra/" },
        { type: "business_instagram", label: "AVA auto glass", url: "https://www.instagram.com/avtostekla.v.astane/" },
        { type: "business_instagram", label: "Steklolux", url: "https://www.instagram.com/steklolux_sko/" },
        { type: "business_instagram", label: "Taksofon", url: "https://www.instagram.com/taksofon.novoishimka/" }
      ]
    },
    {
      name_ru: "Ермахан", name_kz: "Ермахан",
      handle: "ermahan_sarybaevich",
      photo: "/v-3cg4dwoa/assets/friends/ermahan_sarybaevich.jpg",
      role_ru: "Владелец магазинов Picasso (женская обувь, верхняя одежда и сумки) и Picasso Kids (детская обувь) в Астане",
      role_kz: "Астанадағы Picasso (әйелдер аяқ киімі, сырт киім мен сөмкелер) және Picasso Kids (балалар аяқ киімі) дүкендерінің иесі",
      links: [
        { type: "instagram", url: "https://www.instagram.com/ermahan_sarybaevich/" },
        { type: "business_instagram", label: "Picasso", url: "https://www.instagram.com/picasso.kz2/" },
        { type: "business_instagram", label: "Picasso Kids", url: "https://www.instagram.com/picasso.kids2/" }
      ]
    },
    {
      name_ru: "Тимур", name_kz: "Тимур",
      handle: "timasatybaldyuly",
      photo: "/v-3cg4dwoa/assets/friends/timasatybaldyuly.jpg",
      role_ru: "Владелец производственной компании «ЦелинМаш»: насосное оборудование и блочно-модульные насосные станции",
      role_kz: "«ЦелинМаш» өндірістік компаниясының иесі: сорғы жабдықтары және блоктық-модульдік сорғы станциялары",
      links: [
        { type: "instagram", url: "https://www.instagram.com/timasatybaldyuly/" },
        { type: "website", label: "ЦелинМаш", url: "https://pkcm.kz/" }
      ]
    }
  ],

  days: [
    {
      date_ru: "Суббота, 10 октября",
      date_kz: "10 қазан, сенбі",
      items: [
        {
          time: "01:35",
          title_ru: "Встреча в аэропорту, трансфер и заселение в гостиницу",
          title_kz: "Әуежайда қарсы алу, трансфер және қонақүйге орналасу",
          venue_ru: "Asyr Turan Hotel",
          venue_kz: "Asyr Turan Hotel",
          address_ru: "ул. Абикен Бектуров, 4/1",
          address_kz: "Әбікен Бектұров к-сі, 4/1",
          map: "https://2gis.kz/astana/geo/70000001110563732",
          distance_km: 13,
          drive_min: 25,
          drive_from_ru: "от аэропорта",
          drive_from_kz: "әуежайдан"
        },
        {
          time: "08:30",
          title_ru: "Забираем гостей из гостиницы",
          title_kz: "Қонақтарды қонақүйден алып кетеміз",
          venue_ru: "Asyr Turan Hotel",
          venue_kz: "Asyr Turan Hotel",
          address_ru: "ул. Абикен Бектуров, 4/1",
          address_kz: "Әбікен Бектұров к-сі, 4/1",
          map: "https://2gis.kz/astana/geo/70000001110563732"
        },
        {
          time: "~09:00–11:00",
          title_ru: "Завтрак у Армана дома",
          title_kz: "Арманның үйінде таңғы ас",
          venue_ru: "Vela House, таунхаус",
          venue_kz: "Vela House, таунхаус",
          address_ru: "ул. Никола Тесла, 1",
          address_kz: "Никола Тесла к-сі, 1",
          map: "https://2gis.kz/astana/geo/70030076391877278/71.434769,51.059728",
          distance_km: 9.9,
          drive_min: 25,
          drive_from_ru: "от гостиницы Asyr Turan",
          drive_from_kz: "Asyr Turan қонақүйінен"
        },
        {
          time: "~11:00",
          title_ru: "Выезд в музей АЛЖИР, экскурсия",
          title_kz: "«АЛЖИР» мұражайына сапар, экскурсия",
          venue_ru: "Музейно-мемориальный комплекс «АЛЖИР»",
          venue_kz: "«АЛЖИР» мұражай-мемориалдық кешені",
          address_ru: "с. Акмол, ул. Линейная, 2Б",
          address_kz: "Ақмол ауылы, Линейная к-сі, 2Б",
          about_ru: "Мемориал жертвам политических репрессий на месте Акмолинского лагеря жён изменников Родины, через который прошли более 18 тысяч женщин. Село Акмол (Малиновка), ~40 км от Астаны.",
          about_kz: "Саяси қуғын-сүргін құрбандарына арналған мемориал: 18 мыңнан астам әйел өткен Ақмола лагерінің орнында. Ақмол (Малиновка) ауылы, Астанадан ~40 км.",
          website: "https://museum-alzhir.kz/ru/",
          map: "https://2gis.kz/geo/70030076493099387",
          distance_km: 46,
          drive_min: 50,
          drive_from_ru: "от Vela House",
          drive_from_kz: "Vela House-тан"
        },
        {
          time: "~13:30",
          title_ru: "Возвращение в город",
          title_kz: "Қалаға оралу"
        },
        {
          time: "14:30",
          title_ru: "Обед в FARШ, Абу-Даби Плаза",
          title_kz: "FARШ-та түскі ас, Абу-Даби Плаза",
          note_ru: "Бизнес Тимура",
          note_kz: "Тимурдың бизнесі",
          venue_ru: "FARШ · ТЦ Abu Dhabi Plaza",
          venue_kz: "FARШ · Abu Dhabi Plaza СО",
          address_ru: "ул. Сыганак, 60/5, 1 этаж",
          address_kz: "Сығанақ к-сі, 60/5, 1-қабат",
          about_ru: "Премиальные крафтовые бургеры из мраморного мяса.",
          about_kz: "Мәрмәр еттен жасалған премиум крафт бургерлер.",
          website: "https://farsh-burger.kz/",
          map: "https://2gis.kz/astana/firm/70000001050092804",
          distance_km: 37,
          drive_min: 50,
          drive_from_ru: "от музея «АЛЖИР»",
          drive_from_kz: "«АЛЖИР» мұражайынан"
        },
        {
          time: "15:30",
          title_ru: "Посещение школы Spectrum International School",
          title_kz: "Spectrum International School мектебіне бару",
          venue_ru: "Spectrum International School",
          venue_kz: "Spectrum International School",
          address_ru: "просп. Ракымжан Кошкарбаев, 11",
          address_kz: "Рақымжан Қошқарбаев даңғылы, 11",
          map: "https://2gis.kz/astana/geo/70000001024311451/71.479073,51.126933",
          distance_km: 4.8,
          drive_min: 15,
          drive_from_ru: "от FARШ",
          drive_from_kz: "FARШ-тан"
        },
        {
          time: "17:00",
          title_ru: "Посещение школы Harmony Global School",
          title_kz: "Harmony Global School мектебіне бару",
          venue_ru: "Harmony Global School",
          venue_kz: "Harmony Global School",
          address_ru: "просп. Ракымжан Кошкарбаев, 6",
          address_kz: "Рақымжан Қошқарбаев даңғылы, 6",
          map: "https://2gis.kz/astana/geo/70000001113778269",
          distance_km: 1.2,
          drive_min: 5,
          drive_from_ru: "от Spectrum International School",
          drive_from_kz: "Spectrum International School-дан"
        },
        {
          time: "19:00–00:00",
          title_ru: "Баня Ozen Premium",
          title_kz: "Ozen Premium моншасы",
          venue_ru: "Ozen Premium",
          venue_kz: "Ozen Premium",
          address_ru: "с. Кызылсуат, ул. Жас Тилек, 27",
          address_kz: "Қызылсуат ауылы, Жас Тілек к-сі, 27",
          website: "",
          map: "https://2gis.kz/astana/geo/70000001117452895",
          distance_km: 16,
          drive_min: 30,
          drive_from_ru: "от Harmony Global School",
          drive_from_kz: "Harmony Global School-дан"
        },
        {
          time: "~00:30",
          title_ru: "Трансфер в гостиницу",
          title_kz: "Қонақүйге трансфер",
          venue_ru: "Asyr Turan Hotel",
          venue_kz: "Asyr Turan Hotel",
          address_ru: "ул. Абикен Бектуров, 4/1",
          address_kz: "Әбікен Бектұров к-сі, 4/1",
          map: "https://2gis.kz/astana/geo/70000001110563732",
          distance_km: 17,
          drive_min: 30,
          drive_from_ru: "от Ozen Premium",
          drive_from_kz: "Ozen Premium-нан"
        }
      ]
    },
    {
      date_ru: "Воскресенье, 11 октября",
      date_kz: "11 қазан, жексенбі",
      items: [
        {
          time: "08:30",
          title_ru: "Забираем гостей из гостиницы",
          title_kz: "Қонақтарды қонақүйден алып кетеміз",
          venue_ru: "Asyr Turan Hotel",
          venue_kz: "Asyr Turan Hotel",
          address_ru: "ул. Абикен Бектуров, 4/1",
          address_kz: "Әбікен Бектұров к-сі, 4/1",
          map: "https://2gis.kz/astana/geo/70000001110563732"
        },
        {
          time: "~09:00",
          title_ru: "Завтрак в Master Coffee",
          title_kz: "Master Coffee-де таңғы ас",
          venue_ru: "Master Coffee",
          venue_kz: "Master Coffee",
          address_ru: "ул. Шамши Калдаяков, 3",
          address_kz: "Шәмші Қалдаяқов к-сі, 3",
          map: "https://2gis.kz/astana/geo/70000001105208365",
          distance_km: 5.4,
          drive_min: 20,
          drive_from_ru: "от гостиницы Asyr Turan",
          drive_from_kz: "Asyr Turan қонақүйінен"
        },
        {
          time: "~10:00–12:00",
          title_ru: "Благотворительная ярмарка «Игілік жәрмеңкесі»",
          title_kz: "«Игілік жәрмеңкесі» қайырымдылық жәрмеңкесі",
          venue_ru: "ОФ «Ybyrai Joly» · Казмедиа Центр",
          venue_kz: "«Ыбырай жолы» қоғамдық қоры · Қазмедиа орталығы",
          address_ru: "ул. Кунаева, 4",
          address_kz: "Д. Қонаев к-сі, 4",
          about_ru: "Фонд помогает детям, оставшимся без попечения родителей, получить качественное образование; сборы ярмарки идут на их будущее.",
          about_kz: "Қор ата-ана қамқорлығынан айырылған балалардың сапалы білім алуына көмектеседі; жәрмеңкеден түскен қаражат олардың болашағына жұмсалады.",
          website: "",
          map: "https://2gis.kz/astana/firm/70000001018120847",
          distance_km: 4.0,
          drive_min: 10,
          drive_from_ru: "от Master Coffee",
          drive_from_kz: "Master Coffee-ден",
          links: [
            { label_ru: "Фонд Ybyrai Joly", label_kz: "«Ыбырай жолы» қоры", url: "https://ybyraifund.com/" },
            { label_ru: "Казмедиа Центр", label_kz: "Қазмедиа орталығы", url: "https://qazmedia.kz/ru/" }
          ]
        },
        {
          time: "~13:00",
          title_ru: "Конная прогулка, обед на месте",
          title_kz: "Атпен серуендеу, түскі ас сол жерде",
          address_ru: "пос. Караоткель, ул. Женис, 32",
          address_kz: "Қараөткел ауылы, Жеңіс к-сі, 32",
          map: "https://2gis.kz/astana/geo/70000001101400596/71.214796,51.138278",
          distance_km: 20,
          drive_min: 40,
          drive_from_ru: "от Казмедиа Центра",
          drive_from_kz: "Қазмедиа орталығынан",
          links: [
            { type: "instagram", label: "Dala Tynysy", url: "https://www.instagram.com/dala.tynysy/" }
          ]
        },
        {
          time: "~16:30",
          title_ru: "Чай у Асета дома",
          title_kz: "Асеттің үйінде шай",
          address_ru: "ул. Камбар Ата, 2",
          address_kz: "Қамбар Ата к-сі, 2",
          map: "https://2gis.kz/astana/geo/9570784907493903/71.235774,51.122416",
          distance_km: 3.2,
          drive_min: 10,
          drive_from_ru: "от Dala Tynysy",
          drive_from_kz: "Dala Tynysy-дан"
        },
        {
          time: "18:30",
          title_ru: "Выезд в аэропорт, проводы гостей",
          title_kz: "Әуежайға жол тарту, қонақтарды шығарып салу",
          distance_km: 25,
          drive_min: 25,
          drive_from_ru: "до аэропорта",
          drive_from_kz: "әуежайға дейін"
        }
      ]
    }
  ]
};
