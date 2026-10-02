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
 *     about_ru/_kz     1–2 lines about the venue (optional)
 *     website          venue website (optional)
 *     map              2GIS / map link (optional)
 *     note_ru/_kz      small gold tag next to the venue, e.g. "Бизнес Тимура" (optional)
 *     links[]          extra links (optional): { label_ru, label_kz, url }
 */
window.AGALAR_DATA = {
  meta: {
    arrival:   { date: "10.10", time: "01:35" },
    departure: { date: "11.10", time: "20:30" },
    guests: 7,
    show_handles: false  /* false -> hide the "@handle" line under names (Instagram buttons stay) */
  },

  ui: {
    ru: {
      doc_title: "Братья из Актау в Астане · 10–11 октября",
      eyebrow: "Астана · 10–11 октября 2026",
      hero_title: "Братья из Актау<br>в Астане",
      hero_lead: "Добро пожаловать в столицу! Два дня встреч, памяти, добрых дел и братского тепла.",
      arrival: "Прилёт",
      departure: "Вылет",
      cta_program: "Программа",
      friends_kicker: "Ағалар",
      friends_title: "Наш круг",
      friends_lead: "Братья, которые собираются вместе в эти дни.",
      program_kicker: "Бағдарлама",
      program_title: "Программа визита",
      program_lead: "Время ориентировочное, детали уточняются.",
      btn_instagram: "Instagram",
      btn_website: "Сайт",
      btn_map: "2GIS",
      footer_note: "Время ориентировочное, детали уточняются",
      footer_welcome: "Добро пожаловать, братья!",
      footer_welcome_alt: "Қош келдіңіз, ағайлар!",
      footer_small: "Страница для своих: доступна только по ссылке",
      lang_label: "Язык"
    },
    kz: {
      doc_title: "Ақтаулық ағайлар Астанада · 10–11 қазан",
      eyebrow: "Астана · 10–11 қазан 2026",
      hero_title: "Ақтаулық ағайлар<br>Астанада",
      hero_lead: "Елордаға қош келдіңіздер! Кездесу, тағылым, игі істер мен бауырмалдыққа толы екі күн.",
      arrival: "Ұшып келу",
      departure: "Ұшып кету",
      cta_program: "Бағдарлама",
      friends_kicker: "Ағалар",
      friends_title: "Біздің орта",
      friends_lead: "Осы күндері бас қосатын ағайлар.",
      program_kicker: "Бағдарлама",
      program_title: "Сапар бағдарламасы",
      program_lead: "Уақыт шамамен көрсетілген, мәліметтер нақтыланады.",
      btn_instagram: "Instagram",
      btn_website: "Сайт",
      btn_map: "2GIS",
      footer_note: "Уақыт шамамен көрсетілген, мәліметтер нақтыланады",
      footer_welcome: "Қош келдіңіз, ағайлар!",
      footer_welcome_alt: "Добро пожаловать, братья!",
      footer_small: "Өзімізге арналған бет: тек сілтеме арқылы ашылады",
      lang_label: "Тіл"
    }
  },

  /* Friend roles and links come from the owner (02.10.2026). KZ texts need native review. */
  friends: [
    {
      name_ru: "Акиф", name_kz: "Акиф",
      photo: "assets/friends/akif.jpg",
      role_ru: "Ум, честь и совесть группы",
      role_kz: "Топтың ақылы, ары мен ожданы",
      links: []
    },
    {
      name_ru: "Асет", name_kz: "Асет",
      handle: "assetbegaliyev",
      photo: "assets/friends/assetbegaliyev.jpg",
      role_ru: "Основатель клининговой компании Adal Works: коммерческий клининг, обслуживание объектов и ЖК. IT-предприниматель, сооснователь стартапа Beksar.",
      role_kz: "Adal Works клининг компаниясының негізін қалаушы: коммерциялық клининг, нысандар мен ТҮК-ге қызмет көрсету. IT-кәсіпкер, Beksar стартапының тең құрылтайшысы.",
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
      photo: "assets/friends/kaltayev_t.jpg",
      role_ru: "Владелец бизнесов FARШ, Summer Love и All Off Burger",
      role_kz: "FARШ, Summer Love және All Off Burger бизнестерінің иесі",
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
      photo: "assets/friends/arman_tyutyukov.jpg",
      role_ru: "Компания «Оценка ЕКС»: оценка и экспертиза, профессиональная оценочная деятельность. Международный оценщик REV.",
      role_kz: "«Оценка ЕКС» компаниясы: бағалау және сараптама, кәсіби бағалау қызметі. REV халықаралық бағалаушысы.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/arman_tyutyukov" }
      ]
    },
    {
      name_ru: "Армат", name_kz: "Армат",
      handle: "armat_mendigaziyev",
      photo: "assets/friends/armat_mendigaziyev.jpg",
      role_ru: "Основатель KAZSAFETY: спецодежда и СИЗ, Актау · партнёр PowerUp",
      role_kz: "KAZSAFETY негізін қалаушы: арнайы киім және жеке қорғану құралдары, Ақтау · PowerUp серіктесі",
      links: [
        { type: "instagram", url: "https://www.instagram.com/armat_mendigaziyev" },
        { type: "website", label: "KazSafety", url: "https://kazsafety.kz/" }
      ]
    },
    {
      name_ru: "Ануарбек", name_kz: "Ануарбек",
      handle: "anuarbek_zhalel",
      photo: "assets/friends/anuarbek_zhalel.jpg",
      role_ru: "PR в сфере IT-коммуникаций: всё, что связано с PR.",
      role_kz: "IT-коммуникация саласындағы PR: PR-ға қатысты барлық бағыт.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/anuarbek_zhalel" },
        { type: "business_instagram", label: "AI Sport", url: "https://www.instagram.com/ai.sport.app" }
      ]
    },
    {
      name_ru: "Асылжан", name_kz: "Асылжан",
      handle: "assylzhan1989",
      photo: "assets/friends/assylzhan1989.jpg",
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
      photo: "assets/friends/dmitroff_13.jpg",
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
      photo: "assets/friends/dr.kaikan.jpg",
      role_ru: "Основатель сети стоматологий Dental Pro, челюстно-лицевой хирург.",
      role_kz: "Dental Pro стоматология желісінің негізін қалаушы, жақ-бет хирургы.",
      links: [
        { type: "instagram", url: "https://www.instagram.com/dr.kaikan" },
        { type: "business_instagram", label: "Dental Pro", url: "https://www.instagram.com/dental_pro_astana" }
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
          title_kz: "Әуежайда қарсы алу, трансфер және қонақүйге орналасу"
        },
        {
          time: "08:30",
          title_ru: "Забираем гостей из гостиницы",
          title_kz: "Қонақтарды қонақүйден алып кетеміз"
        },
        {
          time: "~09:00–11:00",
          title_ru: "Завтрак у Армана дома",
          title_kz: "Арманның үйінде таңғы ас"
        },
        {
          time: "~11:00",
          title_ru: "Выезд в музей АЛЖИР, экскурсия",
          title_kz: "«АЛЖИР» мұражайына сапар, экскурсия",
          venue_ru: "Музейно-мемориальный комплекс «АЛЖИР»",
          venue_kz: "«АЛЖИР» мұражай-мемориалдық кешені",
          about_ru: "Мемориал жертвам политических репрессий на месте Акмолинского лагеря жён изменников Родины, через который прошли более 18 тысяч женщин. Село Акмол (Малиновка), ~40 км от Астаны.",
          about_kz: "Саяси қуғын-сүргін құрбандарына арналған мемориал: 18 мыңнан астам әйел өткен Ақмола лагерінің орнында. Ақмол (Малиновка) ауылы, Астанадан ~40 км.",
          website: "https://museum-alzhir.kz/ru/",
          map: "https://2gis.kz/geo/70030076493099387"
        },
        {
          time: "~13:00",
          title_ru: "Зухр-намаз в мечети, Малиновка",
          title_kz: "Ақмол (Малиновка) ауылындағы мешітте бесін намазы"
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
          about_ru: "Премиальные крафтовые бургеры из мраморного мяса. Ул. Сыганак, 60/5, 1 этаж.",
          about_kz: "Мәрмәр еттен жасалған премиум крафт бургерлер. Сығанақ к-сі, 60/5, 1-қабат.",
          website: "https://farsh-burger.kz/",
          map: "https://2gis.kz/astana/firm/70000001050092804"
        },
        {
          time: "~15:30",
          title_ru: "Посещение общежития / школы, построенных братьями",
          title_kz: "Ағайлар салған жатақханаға / мектепке бару"
        },
        {
          time: "19:00–00:00",
          title_ru: "Баня Tengovka Ethno, программа «Алтын шипасы»",
          title_kz: "Tengovka Ethno моншасы, «Алтын шипасы» бағдарламасы",
          venue_ru: "Теньговка Ethno",
          venue_kz: "Теньговка Ethno",
          about_ru: "Комплекс сакских бань: парная на дровах, солёный бассейн, купели и банный чан. Шоссе Алаш, 140/2.",
          about_kz: "Сақ моншалары кешені: отынмен жағылатын бу бөлмесі, тұзды бассейн, купельдер және шан. Алаш тас жолы, 140/2.",
          website: "",
          map: "https://2gis.kz/astana/firm/70000001086785933"
        },
        {
          time: "~00:30",
          title_ru: "Трансфер в гостиницу",
          title_kz: "Қонақүйге трансфер"
        }
      ]
    },
    {
      date_ru: "Воскресенье, 11 октября",
      date_kz: "11 қазан, жексенбі",
      items: [
        {
          time: "~09:00",
          title_ru: "Завтрак в кофейне",
          title_kz: "Кофеханада таңғы ас",
          about_ru: "Место уточняется.",
          about_kz: "Орны нақтыланады."
        },
        {
          time: "~10:00–12:00",
          title_ru: "Благотворительная ярмарка «Игілік жәрмеңкесі»",
          title_kz: "«Игілік жәрмеңкесі» қайырымдылық жәрмеңкесі",
          venue_ru: "ОФ «Ybyrai Joly» · Казмедиа Центр",
          venue_kz: "«Ыбырай жолы» қоғамдық қоры · Қазмедиа орталығы",
          about_ru: "Фонд помогает детям, оставшимся без попечения родителей, получить качественное образование; сборы ярмарки идут на их будущее. Казмедиа Центр, ул. Кунаева, 4.",
          about_kz: "Қор ата-ана қамқорлығынан айырылған балалардың сапалы білім алуына көмектеседі; жәрмеңкеден түскен қаражат олардың болашағына жұмсалады. Қазмедиа орталығы, Д. Қонаев к-сі, 4.",
          website: "",
          map: "https://2gis.kz/astana/firm/70000001018120847",
          links: [
            { label_ru: "Фонд Ybyrai Joly", label_kz: "«Ыбырай жолы» қоры", url: "https://ybyraifund.com/" },
            { label_ru: "Казмедиа Центр", label_kz: "Қазмедиа орталығы", url: "https://qazmedia.kz/ru/" }
          ]
        },
        {
          time: "~12:30",
          title_ru: "Конная прогулка, обед на месте",
          title_kz: "Атпен серуендеу, түскі ас сол жерде"
        },
        {
          time: "~16:30",
          title_ru: "Чай у Асета дома",
          title_kz: "Асеттің үйінде шай"
        },
        {
          time: "18:30",
          title_ru: "Выезд в аэропорт, проводы гостей",
          title_kz: "Әуежайға жол тарту, қонақтарды шығарып салу"
        }
      ]
    }
  ]
};
