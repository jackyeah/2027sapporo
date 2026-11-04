/* ============================================================
   北海道賞雪 2027/01 — 行程資料
   這份檔案是整個網站的「資料來源」，之後要改行程、裝備、
   金額，直接改這裡的物件即可，不需要碰 HTML。
   ============================================================ */

/* 旅伴名單：id 對應 localStorage 存的身份、avatar 對應 SVG symbol、
   color 對應 CSS 變數（珊瑚粉/山吹黃/水色/若竹綠），用來上色 Q 版人物的衣服 */
const PEOPLE = [
  { id: "awei", name: "阿緯", fullName: "葉俊緯", avatar: "avatar-awei", color: "mizu", gender: "male" },
  { id: "zhiyang", name: "致養", fullName: "吳致養", avatar: "avatar-zhiyang", color: "yamabuki", gender: "male" },
  { id: "fengwei", name: "鋒瑋", fullName: "陳鋒瑋", avatar: "avatar-fengwei", color: "coral", gender: "male" },
  { id: "yunting", name: "云婷", fullName: "鄭云婷", avatar: "avatar-yunting", avatarAlt: "avatar-yunting-1", color: "coral", gender: "female" },
  { id: "shengzhao", name: "陞漜", fullName: "黃陞漜", avatar: "avatar-shengzhao", color: "wakatake", gender: "female" },
  { id: "haidi", name: "海蒂", fullName: "劉海蒂", avatar: "avatar-haidi", color: "mizu-soft", gender: "female" },
  { id: "simin", name: "思旻", fullName: "吳思旻", avatar: "avatar-simin", color: "yamabuki-soft", gender: "female" }
];

const TRIP_DATA = {
  title: "北海道賞雪",
  subtitle: "2027 冬 · 洞爺湖 · 登別 · 富良野 · 札幌",
  startDate: "2027-01-02T07:00:00+08:00", // 出發倒數基準（台中清泉崗機場集合時間）
  endDate: "2027-01-09T18:25+08:00",

  flights: [
    {
      direction: "去程",
      date: "1/2 (六)",
      flightNo: "JX318",
      from: { code: "RMQ", name: "台中清泉崗" },
      to: { code: "CTS", name: "新千歲機場" },
      depart: "09:00",
      arrive: "15:55",
      note: "入關手續，新千歲機場可能需要排隊等候"
    },
    {
      direction: "回程",
      date: "1/9 (六)",
      flightNo: "",
      from: { code: "CTS", name: "新千歲機場" },
      to: { code: "RMQ", name: "台中清泉崗" },
      depart: "15:00",
      arrive: "18:25",
      note: "班機編號待確認；提早到機場掛行李，出關後再逛免稅"
    }
  ],

  accommodations: [
    { dateRange: "1/2", name: "洞爺湖畔亭 Toya Kohantei Hotel", note: "面湖房型可遠眺羊蹄山；頂樓有露天溫泉，邊泡湯邊看湖景" },
    { dateRange: "1/3", name: "ホテルまほろば Hotel Mahoroba", note: "登別溫泉，螃蟹吃到飽晚餐" },
    { dateRange: "1/4 - 1/6", name: "Bestdayever", note: "富良野雪場旁小木屋" },
    { dateRange: "1/7 - 1/8", name: "東橫INN 北海道札幌站南口", note: "薄野商圈徒步範圍" }
  ],

  // type: charter(包車) / uber / flight / walk
  transportMeta: {
    charter: { label: "包車", color: "coral" },
    uber: { label: "Uber", color: "yamabuki" },
    flight: { label: "飛機", color: "mizu" },
    walk: { label: "步行", color: "wakatake" },
    ride: { label: "搭車", color: "wakatake" }
  },

  days: [
    {
      date: "1/2",
      weekday: "六",
      title: "出發日．飛往北海道",
      scene: "scene-toya",
      items: [
        { time: "7:00", place: "台中清泉崗機場", activity: "登機手續" },
        { type: "transport", transport: "flight", label: "JX318　【RMQ】09:00 起飛 → 【CTS】15:55 抵達", note: "入關手續，可能需要排隊等候" },
        { time: "16:30", place: "新千歲機場", activity: "搭包車前往飯店" },
        { type: "transport", transport: "charter", label: "包車前往「洞爺湖」，車程 1.5 小時（單程接送 ¥45,000）" },
        { time: "18:00", place: "洞爺湖畔亭飯店", activity: "Check in", note: "從飯店看往湖的方向可遠眺羊蹄山" },
        { time: "17:30-20:30", place: "洞爺湖畔亭飯店", activity: "自助晚餐", note: "懷石小火鍋、小烤肉爐、北海道海鮮，現煮拉麵、甜點、霜淇淋機、刨冰機都有；湖景窗邊座位很熱門，建議提早入座", highlight: true },
        { time: "", place: "洞爺湖畔亭頂樓", activity: "露天溫泉", note: "邊泡湯邊眺望洞爺湖夜景", highlight: true },
        { time: "", place: "洞爺湖", activity: "湖邊散步看夜景", highlight: true }
      ]
    },
    {
      date: "1/3",
      weekday: "日",
      title: "洞爺湖 → 登別地獄谷",
      scene: "scene-jigokudani",
      items: [
        { time: "7:00-9:00", place: "洞爺湖畔亭飯店", activity: "飯店早餐" },
        { time: "10:00", place: "洞爺湖畔亭飯店", activity: "退房" },
        { time: "10:00-11:00", place: "洞爺湖", activity: "湖畔散步，依序逛：", stops: ["遠眺羊蹄山", "洞爺湖八景", "汽船棧橋", "湖底軌道", "小商店街"], highlight: true },
        { type: "transport", transport: "charter", label: "包車前往「登別」，車程 1.5 小時（單程接送 ¥40,000）" },
        { time: "12:30", place: "Mahoroba", activity: "放行李" },
        { time: "13:00", place: "溫泉市場", activity: "閻魔炒麵（使用北海道小麥平打麵、特製醬汁與當地海鮮快炒）；登別硫磺泉溫泉蛋、蒸蛤蠣、炸牡蠣", highlight: true },
        { time: "15:00-16:30", place: "地獄谷", activity: "拍照、看景", highlight: true },
        { time: "16:30-17:30", place: "登別溫泉街", activity: "逛街，依序走：", stops: ["貴泉堂本店（鬼怪紀念品）", "玉川本店（老字號伴手禮）", "閻魔堂（閻魔王機關表演）"] },
        { time: "17:30", place: "Mahoroba", activity: "Check in" },
        { time: "18:00", place: "Mahoroba", activity: "自助晚餐：北海道螃蟹吃到飽（長腳蟹、帝王蟹）、生魚片、干貝、甜蝦、鮭魚卵海鮮丼 DIY；開放式廚房現烤海鮮、天婦羅、拉麵、牛排", highlight: true },
        { time: "", place: "", activity: "泡溫泉、休息" }
      ]
    },
    {
      date: "1/4",
      weekday: "一",
      title: "移動日．前進富良野雪場",
      scene: "scene-travel",
      items: [
        { time: "7:00-9:00", place: "Mahoroba", activity: "飯店早餐" },
        { time: "9:30", place: "Mahoroba", activity: "Check out" },
        { type: "transport", transport: "charter", label: "包車前往「富良野市區」，車程 3 小時（本日約 8 小時包車，總費用 ¥75,000）" },
        { time: "12:30", place: "富良野市區", activity: "午餐", note: "待討論，可參考美食清單", foodLink: "furano" },
        { type: "transport", transport: "charter", label: "包車前往「富良野雪場」，車程 1 小時" },
        { time: "15:30", place: "Rhythm Furano", activity: "雪具租借、尺寸確認、試穿" },
        { type: "transport", transport: "charter", label: "包車前往「CoopSapporo 超市 富良野店」，車程 14 分鐘" },
        { time: "16:00-16:40", place: "CoopSapporo 超市 富良野店", activity: "採買食材，一起帶回民宿" },
        { type: "transport", transport: "charter", label: "包車前往「Bestdayever」" },
        { time: "17:00", place: "Bestdayever", activity: "Check in" },
        { time: "18:00", place: "Bestdayever", activity: "晚餐", note: "待討論，可參考美食清單", foodLink: "furano" }
      ]
    },
    {
      date: "1/5",
      weekday: "二",
      title: "富良野滑雪 Day 1",
      scene: "scene-snowboard-1",
      items: [
        { time: "08:00-09:00", place: "Bestdayever", activity: "起床吃早餐" },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「北の峰」，車程 10 分鐘" },
        { time: "09:00-12:00", place: "北の峰", activity: "教練課", highlight: true },
        { time: "12:00-13:00", place: "北の峰", activity: "午餐休息" },
        { time: "13:00-16:00", place: "北の峰", activity: "教練課", highlight: true },
        { time: "16:00-17:00", place: "北の峰", activity: "自由滑雪" },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「森林精靈露台（ニングルテラス）」" },
        { time: "18:00", place: "森林精靈露台（ニングルテラス）", activity: "夜間點燈散策、手作工坊小店", note: "園區內有賣小吃，可以在這邊先墊墊肚子", highlight: true },
        { time: "19:00", place: "ふらの歓寒村（Kan Kan Mura）", activity: "雪地點燈活動", highlight: true },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「Bestdayever」，車程 10 分鐘" },
        { time: "20:00", place: "Bestdayever", activity: "晚餐", note: "待討論，可參考美食清單", foodLink: "furano" }
      ]
    },
    {
      date: "1/6",
      weekday: "三",
      title: "富良野滑雪 Day 2",
      scene: "scene-snowboard-2",
      items: [
        { time: "08:00-09:00", place: "Bestdayever", activity: "起床吃早餐" },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「北の峰」，車程 10 分鐘" },
        { time: "09:00-12:00", place: "北の峰", activity: "教練課", highlight: true },
        { time: "12:00-13:00", place: "北の峰", activity: "午餐休息" },
        { time: "13:00-17:00", place: "北の峰", activity: "自由滑雪", highlight: true },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「Bestdayever」，車程 10 分鐘" },
        { time: "18:00", place: "Bestdayever", activity: "晚餐", note: "待討論，可參考美食清單", foodLink: "furano" }
      ]
    },
    {
      date: "1/7",
      weekday: "四",
      title: "富良野滑雪 Day 3 → 移動札幌薄野",
      scene: "scene-snowboard-3",
      planNote: "自由行彈性行程，兩種方案都列出來，當天可依現場狀況再決定",
      plans: [
        {
          id: "slope-lunch",
          label: "方案一：雪場用餐",
          items: [
            { time: "08:00-09:00", place: "Bestdayever", activity: "起床吃早餐" },
            { type: "transport", transport: "uber", label: "搭 Uber 前往「北の峰」，車程 10 分鐘" },
            { time: "10:00-12:00", place: "北の峰", activity: "快樂滑雪", highlight: true },
            { time: "12:00-13:00", place: "北の峰", activity: "午餐", note: "雪場內用餐，餐廳選擇依現場為主" },
            { time: "13:00-14:00", place: "北の峰", activity: "快樂滑雪", highlight: true },
            { time: "14:00", place: "Rhythm Furano", activity: "歸還雪具" },
            { type: "transport", transport: "charter", label: "包車回「Bestdayever」拿行李" },
            { time: "14:30", place: "Bestdayever", activity: "拿行李、Check out" },
            { type: "transport", transport: "uber", label: "搭 Uber 前往「YUMA（遊馬）」，車程約 5-10 分鐘" },
            { time: "14:45-15:15", place: "YUMA（遊馬）", activity: "體驗狗狗拉雪橇", note: "官網冬季最後報到時間為 15:00，體驗約 20-30 分鐘，建議 14:45 前抵達較保險；需事先電話預約 0167-23-5110", highlight: true, needsBooking: true },
            { type: "transport", transport: "charter", label: "包車前往「東橫INN 北海道札幌薄野十字路口」，車程 2 小時（單程接送 ¥46,000）" },
            { time: "17:15", place: "東橫INN 北海道札幌站南口", activity: "Check in", note: "班機編號 GK057（原始資料待確認，可能誤植）" },
            { time: "17:45-18:25", place: "狸小路商店街", activity: "逛街、Shopping" },
            { time: "18:25-18:45", place: "ボークス札幌ショールーム", activity: "volks 公仔模型店", note: "PIVOT CROSS 6F，大通駅步行約 2 分鐘；<a href=\"https://maps.app.goo.gl/cPWtv4hqPiAcy2W79\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>" },
            { time: "18:45-19:05", place: "ちいかわらんど 札幌パルコ店", activity: "吉伊卡哇周邊商店", note: "札幌PARCO本館地下2F，大通駅直結；2025/7 改裝後疑似改為事前預約制，請上官網或電話 011-213-0313 確認入場方式；<a href=\"https://maps.app.goo.gl/Yyask5Y449bMp9DR9\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>", needsBooking: true },
            { time: "19:05-19:25", place: "大通公園／札幌電視塔", activity: "電視塔夜景、天橋拍照", note: "電視塔前的人行天橋是日劇《First Love 初戀》取景地，晴道走過這座橋尋找投幣洗衣店", highlight: true },
            { time: "19:45", place: "SHO-RIN 薄野本店", activity: "湯咖哩", note: "不定休，且湯售完即打烊，建議事先訂位", needsBooking: true },
            {
              time: "21:15",
              place: "薄野街區",
              activity: "看夜景、拍照：薄野十字路口（NIKKA 威士忌大看板）、札幌路面電車、COCONO SUSUKINO、元祖札幌拉麵橫丁、薄野南側霓虹街道",
              highlight: true
            },
            { time: "22:45~", place: "居酒屋", activity: "喝酒、串燒" }
          ]
        },
        {
          id: "town-lunch",
          label: "方案二：市區用餐",
          items: [
            { time: "08:00-09:00", place: "Bestdayever", activity: "起床吃早餐" },
            { type: "transport", transport: "uber", label: "搭 Uber 前往「北の峰」，車程 10 分鐘" },
            { time: "10:00-13:00", place: "北の峰", activity: "快樂滑雪", highlight: true },
            { time: "13:30", place: "Rhythm Furano", activity: "歸還雪具" },
            { type: "transport", transport: "charter", label: "包車前往「富良野市區」，車程約 15 分鐘" },
            { time: "14:00", place: "富良野市區", activity: "午餐", note: "待討論，可參考美食清單", foodLink: "furano" },
            { type: "transport", transport: "charter", label: "包車回「Bestdayever」拿行李" },
            { time: "15:00", place: "Bestdayever", activity: "拿行李、Check out" },
            { type: "transport", transport: "charter", label: "包車前往「東橫INN 北海道札幌薄野十字路口」，車程 2 小時（單程接送 ¥46,000）" },
            { time: "17:00", place: "東橫INN 北海道札幌站南口", activity: "Check in", note: "班機編號 GK057（原始資料待確認，可能誤植）" },
            { time: "17:30-18:10", place: "狸小路商店街", activity: "逛街、Shopping" },
            { time: "18:10-18:30", place: "ボークス札幌ショールーム", activity: "volks 公仔模型店", note: "PIVOT CROSS 6F，大通駅步行約 2 分鐘；<a href=\"https://maps.app.goo.gl/cPWtv4hqPiAcy2W79\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>" },
            { time: "18:30-18:50", place: "ちいかわらんど 札幌パルコ店", activity: "吉伊卡哇周邊商店", note: "札幌PARCO本館地下2F，大通駅直結；2025/7 改裝後疑似改為事前預約制，請上官網或電話 011-213-0313 確認入場方式；<a href=\"https://maps.app.goo.gl/Yyask5Y449bMp9DR9\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>", needsBooking: true },
            { time: "18:50-19:10", place: "大通公園／札幌電視塔", activity: "電視塔夜景、天橋拍照", note: "電視塔前的人行天橋是日劇《First Love 初戀》取景地，晴道走過這座橋尋找投幣洗衣店", highlight: true },
            { time: "19:30", place: "SHO-RIN 薄野本店", activity: "湯咖哩", note: "不定休，且湯售完即打烊，建議事先訂位", needsBooking: true },
            {
              time: "21:00",
              place: "薄野街區",
              activity: "看夜景、拍照：薄野十字路口（NIKKA 威士忌大看板）、札幌路面電車、COCONO SUSUKINO、元祖札幌拉麵橫丁、薄野南側霓虹街道",
              highlight: true
            },
            { time: "22:30~", place: "居酒屋", activity: "喝酒、串燒" }
          ]
        }
      ]
    },
    {
      date: "1/8",
      weekday: "五",
      title: "自由活動日：小樽 or 札幌",
      scene: "scene-tbd",
      planNote: "這天沒有包車，交通以 JR／巴士為主；札幌雪祭要 2/4-2/11 才開始，不過市區幾個會場的ホワイトイルミネーション（白色燈飾）1 月仍在展出，晚上可以安排過去看",
      plans: [
        {
          id: "otaru",
          label: "方案一：小樽",
          items: [
            { time: "08:00-09:00", place: "東橫INN", activity: "起床吃早餐" },
            { type: "transport", transport: "ride", label: "搭 JR 前往「小樽駅」，車程約 35 分鐘" },
            { time: "09:45-10:15", place: "三角市場", activity: "海鮮早市、海鮮丼", note: "JR小樽駅旁，以新鮮海膽、帝王蟹及豪華海鮮丼聞名；<a href=\"https://maps.app.goo.gl/7qii2Y9oG7diXLYs6\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>" },
            { time: "10:15-11:00", place: "小樽運河", activity: "運河散策、拍照", note: "沿岸保留復古石造倉庫，冬季白雪與煤氣燈交織；<a href=\"https://maps.app.goo.gl/ofiSEMWCHacASSAG9\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>", highlight: true },
            { time: "11:00-11:30", place: "小樽浮世繪美術館", activity: "逛浮世繪展覽（可視興趣彈性跳過）", note: "收藏葛飾北齋等名家作品；<a href=\"https://maps.app.goo.gl/ZXCCBekR1XoPWT5r5\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>" },
            {
              time: "11:30-18:30",
              place: "小樽市區",
              activity: "自由逛街＋覓食：午餐、晚餐都看到什麼吃什麼，不特別排定，逛到哪吃到哪",
              note: "堺町通り商店街沿途可順遊以下幾間特色店，純參考不用每間都排；兩間オルゴール堂冬季約 18:00 打烊，建議安排在下午較早時段，傍晚留給蒸氣鐘拍照、雪景漫步；<a href=\"https://maps.app.goo.gl/q23VrpgVncU815dB6\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>",
              foodLink: "otaru",
              stops: [
                { name: "三角市場／渡海家 拉麵", map: "https://maps.app.goo.gl/qFCS4Mm4smRy9jW46" },
                { name: "ポプラファーム小樽店 哈蜜瓜冰淇淋", map: "https://maps.app.goo.gl/YVuM2bcshN9LMxDq9" },
                { name: "ちいかわもぐもぐ本舗 小樽店", map: "https://maps.app.goo.gl/pTsM19btoabbwpkRA" },
                { name: "SNOOPY茶屋 小樽店", map: "https://maps.app.goo.gl/UD2HqVktEy7HnJVc9" },
                { name: "小樽オルゴール堂蒸気からくり時計", map: "https://maps.app.goo.gl/J8CCXNP465eWRzAT7" },
                { name: "小樽オルゴール堂 本館", map: "https://maps.app.goo.gl/arHtz6bzMWL9m4mA8" },
                { name: "オルゴール堂海鳴楼", map: "https://maps.app.goo.gl/JvBhQEPqhR6faEnD7" }
              ]
            },
            { time: "19:00-19:48", place: "天狗山", activity: "搭纜車看夜景", note: "日本新三大夜景之一；冬季上山末班纜車 19:48，下山末班 20:00，建議晚餐後直接前往，不要太晚；<a href=\"https://maps.app.goo.gl/w6o7pMmhCVdetj3H7\" target=\"_blank\" rel=\"noopener\">Google 地圖</a>", highlight: true },
            { type: "transport", transport: "ride", label: "搭 JR 返回「札幌駅」，車程約 35 分鐘（小樽末班車 23:08，時間很寬裕）" },
            { time: "21:00~", place: "札幌市區", activity: "自由活動", note: "回到札幌後沒有安排行程，可自由逛薄野、看ホワイトイルミネーション（白色燈飾）或回飯店休息" }
          ]
        },
        {
          id: "sapporo-snowmobile",
          label: "方案二：札幌雪上摩托車",
          items: [
            { time: "08:00-09:00", place: "東橫INN", activity: "起床吃早餐" },
            { type: "transport", transport: "ride", label: "雪上摩托車行程專車接送，前往「定山溪」，車程約 60-80 分鐘" },
            { time: "10:30-11:30", place: "定山溪", activity: "雪上摩托車體驗", note: "需事先線上或電話報名，並確認是否含飯店接送", highlight: true, needsBooking: true },
            { time: "11:30-13:00", place: "定山溪", activity: "溫泉足湯、午餐" },
            { type: "transport", transport: "ride", label: "搭乘じょうてつバス返回「札幌駅」，車程約 60-80 分鐘" },
            { time: "14:30", place: "大通公園／狸小路", activity: "自由活動，也可改去円山動物園（冬季企鵝散步）或白色戀人公園" },
            { time: "17:30", place: "札幌市區", activity: "晚餐", note: "待討論，可參考美食清單", foodLink: "sapporo" },
            { type: "transport", transport: "ride", label: "搭 JR北海道巴士「啓明線」直達「もいわ山ロープウェイ」，車程約 37 分鐘，僅 17-19 時夜景班次（一天約 3 班，建議出發前查好時刻）" },
            { time: "19:30", place: "藻岩山", activity: "搭纜車＋迷你登山纜車上山頂看夜景", note: "日本新三大夜景之一，回程留意末班車時間；沿路行經駅前通／南一条通也能順便看到ホワイトイルミネーション", highlight: true }
          ]
        }
      ]
    },
    {
      date: "1/9",
      weekday: "六",
      title: "賦歸日",
      scene: "scene-flight-home",
      items: [
        { time: "9:00", place: "東橫INN 北海道札幌站南口", activity: "Check out" },
        { time: "9:30", place: "", activity: "吃早餐" },
        { type: "transport", transport: "ride", label: "搭 JR 快速 Airport 前往「新千歲機場」，車程約 40 分鐘（非包車，當天沒有包車費用）" },
        { time: "12:00", place: "新千歲機場", activity: "多留一小時提前抵達，買伴手禮、逛機場" },
        { time: "12:30", place: "新千歲機場 國內線航廈 4F", activity: "雪初音 SNOWMIKU SKY TOWN", note: "宣傳北海道觀光大使「雪未來（初音未來）」的精品店＋博物館；從國際線航廈走過去約 10 分鐘", people: ["yunting"] },
        { type: "transport", transport: "flight", label: "【CTS】15:00 起飛 → 【RMQ】18:25 抵達", note: "提早到機場掛行李，出境後再找東西吃、逛免稅" }
      ]
    }
  ],

  // 美食口袋名單（討論用，尚未指定到哪一餐），依地區分頁籤、依性質分類配色
  foodOptions: {
    regions: [
      {
        id: "furano",
        label: "富良野",
        groups: [
          {
            category: "咖哩",
            color: "yamabuki",
            items: [
              { name: "湯咖哩 Furanoya", desc: "到北海道一定要吃的名物，富良野市區裡非常有名的店，口味不輸札幌大城市。口味很多，不知道要點什麼的話，通常雞肉湯咖哩最受歡迎。", map: "https://maps.app.goo.gl/k4GgGoMpkGgV1XuGA" },
              { name: "SURYA印度咖哩", desc: "尼泊爾式咖哩，搭配 nam 餅皮。如果你沒在日本吃過印度咖哩，一定要來試試，店員都是尼泊爾當地人，口味非常道地，nam 都是現烤出來的，讓人想一吃再吃。", map: "https://maps.app.goo.gl/KWjoRYeigjkb8B1v6" },
              { name: "唯我獨尊", desc: "可以說是富良野最有名的咖哩店，牛舌咖哩非常特別，不知道要點什麼的話就點什麼都有的綜合咖哩吧～～", map: "https://maps.app.goo.gl/oWtaY8jx8ssffsnY6" }
            ]
          },
          {
            category: "燒烤・鐵板燒",
            color: "coral",
            items: [
              { name: "てっぱん・お好み焼き まさ屋", desc: "富良野人氣鐵板燒店，簡單的英文也能電話訂位，最有名的是火焰豬肉，上菜時全場都會安靜，非常熱鬧且戲劇化的上菜～", map: "https://maps.app.goo.gl/jQr4vXFanVDp8Wzh7" },
              { name: "忍火 燒肉店", desc: "市區燒肉最推的一家，店家有會講英文的服務人員，點餐可以用 iPad，來到日本當然一定要吃一餐要吃燒肉啦！", map: "https://maps.app.goo.gl/MFPjiWgmzJE2ZTEU7" }
            ]
          },
          {
            category: "義式・麵食",
            color: "mizu",
            items: [
              { name: "Rincontro", desc: "富良野最好吃的義大利麵，曾經上過米其林指南推薦，對義大利麵的麵體一點都不馬虎，小小的店就有十幾種不同的義大利麵體種類，座位很少，最好需要訂位。店裡常常放著義大利文的廣播，配上道地的食物，彷彿一秒飛到義大利～", map: "https://maps.app.goo.gl/ptWwPKQc7c2fq77M9" },
              { name: "ピザ製作所ZIZI", desc: "小小的房子，充滿義大利跟家的味道。老闆是一對和藹可親的老夫妻，老爺爺真的是特地去義大利學回來的手藝～", map: "https://maps.app.goo.gl/qd3t7uCBjyim2ecC7" },
              { name: "支那虎", desc: "我最愛的拉麵店，離開富良野太久就會想念的味道，就像台灣的滷肉飯一樣，每次我都點沾麵加でべそ飯，真是一絕！", map: "https://maps.app.goo.gl/XpdVkYXKzjbmYCjL9" }
            ]
          },
          {
            category: "在地美食・市集",
            color: "wakatake",
            items: [
              { name: "市場食堂", desc: "應該是我在富良野生活，一年吃過最多次的餐廳，每次想不到吃什麼就去吃市場食堂，滑完雪雪場餐廳人擠人，也是去吃市場食堂後再回家，它就是市場旁附設的餐廳，觀光客不太會去吃，但是備受當地人喜愛。平民美食，CP值高到破表！", map: "https://maps.app.goo.gl/jwhG4XCUsVxKWGGH7" },
              { name: "迴轉壽司店 トピカル", desc: "不可思議的迴轉壽司，富良野身處內陸，但是竟然有 CP 值這麼高又新鮮的店，但這家要提早排隊，非常多人。", map: "https://maps.app.goo.gl/jsn6AphzVDqaU76A6" },
              { name: "富良野農夫市集 フラノマルシェ", desc: "有點像集合商店的地方，裡面有小餐廳也有蠻多在地商品可以逛，沒有訂位的時候，可以來這邊吃吃喝喝順便小逛一下～", map: "https://maps.app.goo.gl/M5jro6Dr3wjPwXse7" },
              { name: "地方料理居酒屋 Kumagera", desc: "超級人氣店家，也上過米其林推薦，最好需要預約，其中生牛肉丼是必吃的招牌，山賊鍋也是這邊的名物！", map: "https://maps.app.goo.gl/FgW1NBe6eGYXQqqw8" }
            ]
          },
          {
            category: "便利・自煮",
            color: "neutral",
            items: [
              { name: "便利商店", desc: "想省時間或簡單解決一餐時的備案，超商便當、關東煮、飯糰都是選項。" },
              { name: "超市購買，回去料理", desc: "去超市買食材回 Bestdayever 自己煮，輕鬆吃、也能省一餐外食預算。", maps: ["https://maps.app.goo.gl/Ejn3VDM5nR71UriC8", "https://maps.app.goo.gl/9MJpqsG2RozikhQg8"] }
            ]
          }
        ]
      },
      {
        id: "sapporo",
        label: "札幌/薄野",
        groups: [
          {
            category: "成吉思汗烤肉",
            color: "coral",
            items: [
              { name: "成吉思汗だるま 5・5店", desc: "以北海道特色的成吉思汗烤羊肉聞名。使用傳統炭火鐵鍋燒烤鮮嫩羊肉，搭配洋蔥、青蔥及特製醬汁，香氣十足。", map: "https://maps.app.goo.gl/XzVD7YqBNs5LfoXv6" }
            ]
          },
          {
            category: "湯咖哩",
            color: "yamabuki",
            items: [
              { name: "Suage+ 湯咖喱", desc: "札幌人氣湯咖哩名店，以濃郁香料湯頭、鮮嫩雞腿及大塊北海道蔬菜聞名，食材多以串燒呈現，風味獨特。", map: "https://maps.app.goo.gl/DgxiPQksP27AhhUt6" }
            ]
          },
          {
            category: "拉麵",
            color: "wakatake",
            items: [
              { name: "麺屋雪風 すすきの本店", desc: "札幌人氣拉麵名店，以濃厚味噌湯頭搭配香氣十足的炒香蔬菜聞名，麵條Q彈有嚼勁，是薄野必吃的拉麵之一。", map: "https://maps.app.goo.gl/MrwrUd8TSxFsj23d6" }
            ]
          },
          {
            category: "甜點・伴手禮",
            color: "mizu",
            items: [
              { name: "札幌農学校 JR札幌駅店", desc: "位於JR札幌站內的人氣甜點店，以北海道牛奶餅乾及現烤起司蛋糕聞名，奶香濃郁，是旅客購買伴手禮的熱門選擇。", map: "https://maps.app.goo.gl/izNqSY2Btpa2oswR8" }
            ]
          }
        ]
      },
      {
        id: "otaru",
        label: "小樽",
        groups: [
          {
            category: "海鮮・市場",
            color: "coral",
            items: [
              { name: "三角市場", desc: "位於JR小樽站旁的傳統海鮮市場，以新鮮海膽、帝王蟹及豪華海鮮丼聞名，是品嚐北海道海鮮美食的熱門景點。", map: "https://maps.app.goo.gl/7qii2Y9oG7diXLYs6" }
            ]
          },
          {
            category: "拉麵",
            color: "wakatake",
            items: [
              { name: "渡海家", desc: "小樽人氣拉麵店，以清爽鮮美的湯頭、細緻麵條及香嫩叉燒聞名，風味層次豐富，是當地特色拉麵名店。", map: "https://maps.app.goo.gl/qFCS4Mm4smRy9jW46" }
            ]
          },
          {
            category: "甜點・主題商店",
            color: "mizu",
            items: [
              { name: "ポプラファーム小樽店 哈蜜瓜冰淇淋", desc: "北海道人氣哈密瓜甜點店，以香甜多汁的哈密瓜搭配濃郁牛奶霜淇淋聞名，造型吸睛，是小樽熱門打卡美食。", map: "https://maps.app.goo.gl/YVuM2bcshN9LMxDq9" },
              { name: "SNOOPY茶屋 小樽店", desc: "以史努比為主題的特色商店，販售可愛限定周邊、甜點及伴手禮，融合日式風格與療癒氛圍，是粉絲必訪景點。", map: "https://maps.app.goo.gl/UD2HqVktEy7HnJVc9" }
            ]
          }
        ]
      },
      {
        id: "photo-spots",
        label: "拍照地點",
        groups: [
          {
            category: "洞爺湖・登別（1/2-1/3）",
            color: "mizu",
            items: [
              { name: "洞爺湖畔", desc: "飯店頂樓露天溫泉可邊泡湯邊眺望洞爺湖夜景；隔天上午湖畔散策能遠眺羊蹄山、走訪湖底軌道與汽船棧橋，湖景日夜皆美。" },
              { name: "登別地獄谷", desc: "荒涼奇特的地熱地貌，蒸氣裊裊，視覺張力十足，白天拍照氛圍感很強。1/3 15:00-16:30 行程內。" }
            ]
          },
          {
            category: "富良野（1/4-1/7）",
            color: "yamabuki",
            items: [
              { name: "森林精靈露台（ニングルテラス）", desc: "夜間點燈散策，森林中的木屋造景溫馨浪漫，很適合拍人像。1/5 18:00 行程內。" }
            ]
          },
          {
            category: "小樽（1/8）",
            color: "wakatake",
            items: [
              { name: "小樽運河", desc: "沿岸復古石造倉庫搭配冬季白雪與煤氣燈，氛圍感十足，是小樽最經典的拍照景點。1/8 10:15-11:00 行程內。", map: "https://maps.app.goo.gl/ofiSEMWCHacASSAG9" },
              { name: "天狗山夜景", desc: "日本新三大夜景之一，山頂視野遼闊，夜晚纜車＋夜景很適合拍一組有紀念性的合照。1/8 19:00-19:48 行程內。", map: "https://maps.app.goo.gl/w6o7pMmhCVdetj3H7" }
            ]
          },
          {
            category: "札幌（1/7-1/8）",
            color: "coral",
            items: [
              { name: "大通公園／電視塔天橋", desc: "電視塔前的人行天橋是日劇《First Love 初戀》取景地，晚上有電視塔夜景加持，都會感十足。1/7 傍晚行程內。" },
              { name: "薄野十字路口", desc: "NIKKA 威士忌大看板、路面電車、霓虹街景，很有日劇感的都市夜景。1/7 晚上行程內。" },
              { name: "藻岩山夜景", desc: "日本新三大夜景之一，山頂視野極佳，但班次較少需抓緊時間，為 1/8 方案二的備案景點。" }
            ]
          }
        ]
      }
    ]
  },

  checklist: [
    "護照（效期 6 個月以上）",
    "日幣現金 / 信用卡",
    "行動網路 / eSim",
    "雪衣雪褲",
    "護臀、護膝（必備）",
    "暖暖包",
    "常備藥品",
    "相機、記憶卡、行動電源",
    "飯店 / 包車預訂確認信",
    "伴手禮採購清單"
  ],

  // 滑雪裝備
  gear: {
    rental: {
      title: "可租借的部分",
      note: "3 天租金參考",
      items: [
        { name: "雪板", price: "¥19,980" },
        { name: "雪鞋", price: "" },
        { name: "安全帽", price: "¥5,040" },
        { name: "雪衣", price: "¥7,020", note: "會常滑再考慮自己買" },
        { name: "雪褲", price: "¥7,020", note: "會常滑再考慮自己買" }
      ]
    },
    selfPrepare: {
      title: "要自己準備的部分",
      note: "參考價格（NT$）",
      items: [
        { name: "雪鏡", price: "700-2500" },
        { name: "毛帽", price: "", note: "頭會怕冷；或拿下面罩拍照時可以戴上，頭髮比較好看" },
        { name: "面罩", price: "200-400" },
        { name: "內層衣物", price: "", note: "吸濕排汗" },
        { name: "中層衣物", price: "", note: "保暖排汗" },
        { name: "內層手套", price: "300", note: "選可以觸碰手機螢幕的款式" },
        { name: "外層手套", price: "500", note: "可選有掛繩款式方便攜帶" },
        { name: "內搭褲", price: "" },
        { name: "雪襪", price: "250" },
        { name: "護臀", price: "700-1300", note: "超重要，一定要準備" },
        { name: "護膝", price: "300-600", note: "必備" },
        { name: "護肘", price: "" },
        { name: "護腕", price: "400", note: "手腕很容易撐到會痛；或選有保護效果的外層手套" }
      ]
    }
  },

  // 金額紀錄：7 人份分攤明細（保留原始幣別字串，不自動換算加總）
  expenseColumns: [
    { key: "coach", label: "教練", group: "滑雪" },
    { key: "gearSet", label: "雪具租借", group: "滑雪" },
    { key: "liftTicket", label: "雪票", group: "滑雪" },
    { key: "hotel1", label: "1/2 洞爺湖畔亭", group: "住宿" },
    { key: "hotel2", label: "1/3 Mahoroba", group: "住宿" },
    { key: "hotel3", label: "1/4-1/6 Bestdayever", group: "住宿" },
    { key: "hotel4", label: "1/7-1/8 東橫INN", group: "住宿" },
    { key: "charter", label: "包車", group: "交通" }
  ],
  expenses: [
    { name: "阿緯", coach: "¥49,200", gearSet: "¥25,020 ($5,459)", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥27,610", charter: "¥29,429" },
    { name: "云婷", coach: "¥49,200", gearSet: "¥25,020 ($5,459)", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "", charter: "¥29,429" },
    { name: "致養", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥27,610", charter: "¥29,429" },
    { name: "陞漜", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "", charter: "¥29,429" },
    { name: "鋒瑋", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥27,610", charter: "¥29,429" },
    { name: "海蒂", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "", charter: "¥29,429" },
    { name: "思旻", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥19,400", charter: "¥29,429" }
  ],
  expenseFootnotes: [
    "教練：訂金 $25,200／尾款 ¥224,000",
    "雪具租借：¥25,020 為雪板、雪鞋、安全帽（阿緯、云婷雪衣雪褲自備）；¥39,060 為雪板、雪鞋、安全帽、雪衣、雪褲全套，已付款 $52,742",
    "1/2 洞爺湖畔亭 ／ 1/3 Mahoroba：agoda 12 月會付款",
    "Bestdayever：已付清給店家",
    "東橫INN ／ 包車：現場付款"
  ],

  // 繳費紀錄：主揪代墊項目（原始表單目前只有分類，金額陸續補登）
  payments: [
    { category: "滑雪教練課訂金", amount: "$25,200", payer: "主揪", date: "", note: "" },
    { category: "小木屋住宿", amount: "¥52,500", payer: "主揪", date: "", note: "" },
    { category: "雪具租借", amount: "$52,742", payer: "主揪", date: "", note: "" }
  ]
};
