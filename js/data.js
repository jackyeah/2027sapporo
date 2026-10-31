/* ============================================================
   北海道賞雪 2027/01 — 行程資料
   這份檔案是整個網站的「資料來源」，之後要改行程、裝備、
   金額，直接改這裡的物件即可，不需要碰 HTML。
   ============================================================ */

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
    { dateRange: "1/2", name: "洞爺湖畔亭 Toya Kohantei Hotel", note: "面湖房型可遠眺羊蹄山" },
    { dateRange: "1/3", name: "ホテルまほろば Hotel Mahoroba", note: "登別溫泉，螃蟹吃到飽晚餐" },
    { dateRange: "1/4 - 1/6", name: "Bestdayever", note: "富良野雪場旁小木屋" },
    { dateRange: "1/7 - 1/8", name: "東橫INN 北海道札幌站南口", note: "薄野商圈徒步範圍" }
  ],

  // type: charter(包車) / uber / flight / walk
  transportMeta: {
    charter: { label: "包車", color: "coral" },
    uber: { label: "Uber", color: "yamabuki" },
    flight: { label: "飛機", color: "mizu" },
    walk: { label: "步行", color: "wakatake" }
  },

  days: [
    {
      date: "1/2",
      weekday: "六",
      title: "出發日．飛往北海道",
      items: [
        { time: "7:00", place: "台中清泉崗機場", activity: "登機手續" },
        { type: "transport", transport: "flight", label: "JX318　【RMQ】09:00 起飛 → 【CTS】15:55 抵達", note: "入關手續，可能需要排隊等候" },
        { time: "16:30", place: "新千歲機場", activity: "搭包車前往飯店" },
        { type: "transport", transport: "charter", label: "包車前往「洞爺湖」，車程 1.5 小時" },
        { time: "18:00", place: "洞爺湖畔亭飯店", activity: "Check in", note: "從飯店看往湖的方向可遠眺羊蹄山" },
        { time: "17:30-20:30", place: "洞爺湖畔亭飯店", activity: "自助晚餐" },
        { time: "", place: "洞爺湖", activity: "泡湯、湖邊散步看夜景", highlight: true }
      ]
    },
    {
      date: "1/3",
      weekday: "日",
      title: "洞爺湖 → 登別地獄谷",
      items: [
        { time: "7:00-9:00", place: "洞爺湖畔亭飯店", activity: "飯店早餐" },
        { time: "10:00", place: "洞爺湖畔亭飯店", activity: "退房" },
        { time: "10:00-11:00", place: "洞爺湖", activity: "湖畔散步：遠眺羊蹄山、洞爺湖八景、汽船棧橋、湖底軌道；旁邊有小商店街", highlight: true },
        { type: "transport", transport: "charter", label: "包車前往「登別」，車程 1.5 小時" },
        { time: "12:30", place: "Mahoroba", activity: "放行李" },
        { time: "13:00", place: "溫泉市場", activity: "閻魔炒麵（使用北海道小麥平打麵、特製醬汁與當地海鮮快炒）；登別硫磺泉溫泉蛋、蒸蛤蠣、炸牡蠣", highlight: true },
        { time: "15:00-16:30", place: "地獄谷", activity: "拍照、看景", highlight: true },
        { time: "16:30-17:30", place: "登別溫泉街", activity: "貴泉堂本店（鬼怪紀念品）、玉川本店（老字號伴手禮）、閻魔堂（閻魔王機關表演）" },
        { time: "17:30", place: "Mahoroba", activity: "Check in" },
        { time: "18:00", place: "Mahoroba", activity: "自助晚餐：北海道螃蟹吃到飽（長腳蟹、帝王蟹）、生魚片、干貝、甜蝦、鮭魚卵海鮮丼 DIY；開放式廚房現烤海鮮、天婦羅、拉麵、牛排", highlight: true },
        { time: "", place: "", activity: "泡溫泉、休息" }
      ]
    },
    {
      date: "1/4",
      weekday: "一",
      title: "移動日．前進富良野雪場",
      items: [
        { time: "7:00-9:00", place: "Mahoroba", activity: "飯店早餐" },
        { time: "9:30", place: "Mahoroba", activity: "Check out" },
        { type: "transport", transport: "charter", label: "包車前往「富良野市區」，車程 3 小時" },
        { time: "12:30", place: "富良野市區", activity: "午餐" },
        { type: "transport", transport: "charter", label: "包車前往「富良野雪場」，車程 1 小時" },
        { time: "15:30", place: "Rhythm Furano", activity: "雪具租借、尺寸確認、試穿" },
        { time: "16:30", place: "Bestdayever", activity: "Check in" },
        { time: "18:00", place: "Bestdayever", activity: "晚餐" }
      ]
    },
    {
      date: "1/5",
      weekday: "二",
      title: "富良野滑雪 Day 1",
      items: [
        { time: "08:00-09:00", place: "Bestdayever", activity: "起床吃早餐" },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「北の峰」，車程 10 分鐘" },
        { time: "10:00-17:00", place: "北の峰", activity: "快樂滑雪", highlight: true },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「Bestdayever」，車程 10 分鐘" },
        { time: "18:00", place: "Bestdayever", activity: "晚餐" }
      ]
    },
    {
      date: "1/6",
      weekday: "三",
      title: "富良野滑雪 Day 2",
      items: [
        { time: "08:00-09:00", place: "Bestdayever", activity: "起床吃早餐" },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「北の峰」，車程 10 分鐘" },
        { time: "10:00-17:00", place: "北の峰", activity: "快樂滑雪", highlight: true },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「Bestdayever」，車程 10 分鐘" },
        { time: "18:00", place: "Bestdayever", activity: "晚餐" }
      ]
    },
    {
      date: "1/7",
      weekday: "四",
      title: "富良野滑雪 Day 3 → 移動札幌薄野",
      items: [
        { time: "08:00-09:00", place: "Bestdayever", activity: "起床吃早餐" },
        { type: "transport", transport: "uber", label: "搭 Uber 前往「北の峰」，車程 10 分鐘" },
        { time: "10:00-13:00", place: "北の峰", activity: "快樂滑雪", highlight: true },
        { time: "13:30", place: "Rhythm Furano", activity: "歸還雪具" },
        { type: "transport", transport: "charter", label: "包車前往「東橫INN 北海道札幌薄野十字路口」，車程 2 小時" },
        { time: "16:00", place: "東橫INN 北海道札幌站南口", activity: "Check in", note: "班機編號 GK057（原始資料待確認，可能誤植）" },
        { time: "16:30-18:30", place: "狸小路商店街", activity: "逛街、Shopping" },
        { time: "18:30", place: "SHO-RIN 薄野本店", activity: "湯咖哩" },
        {
          time: "20:00",
          place: "薄野街區",
          activity: "看夜景、拍照：薄野十字路口（NIKKA 威士忌大看板）、札幌路面電車、COCONO SUSUKINO、元祖札幌拉麵橫丁、薄野南側霓虹街道",
          highlight: true
        },
        { time: "21:30~", place: "居酒屋", activity: "喝酒、串燒" }
      ]
    },
    {
      date: "1/8",
      weekday: "五",
      title: "自由活動日（規劃中）",
      items: [
        { time: "", place: "小樽？", activity: "行程待規劃", note: "這天目前還是空白，大家一起討論想去哪" }
      ]
    },
    {
      date: "1/9",
      weekday: "六",
      title: "賦歸日",
      items: [
        { time: "9:00", place: "東橫INN 北海道札幌站南口", activity: "Check out" },
        { time: "9:30", place: "", activity: "吃早餐" },
        { type: "transport", transport: "charter", label: "搭車前往「新千歲機場」，車程 1.5 小時" },
        { time: "12:00", place: "新千歲機場", activity: "多留一小時提前抵達，買伴手禮、逛機場" },
        { type: "transport", transport: "flight", label: "【CTS】15:00 起飛 → 【RMQ】18:25 抵達", note: "提早到機場掛行李，出境後再找東西吃、逛免稅" }
      ]
    }
  ],

  checklist: [
    "護照（效期 6 個月以上）",
    "日幣現金 / 信用卡",
    "行動網路 / Wifi 機",
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
    { key: "gearSet", label: "雪板、雪鞋、安全帽", group: "滑雪" },
    { key: "suit", label: "雪衣、雪褲", group: "滑雪" },
    { key: "liftTicket", label: "雪票", group: "滑雪" },
    { key: "hotel1", label: "1/2 洞爺湖畔亭", group: "住宿" },
    { key: "hotel2", label: "1/3 Mahoroba", group: "住宿" },
    { key: "hotel3", label: "1/4-1/6 Bestdayever", group: "住宿" },
    { key: "hotel4", label: "1/7-1/8 東橫INN", group: "住宿" },
    { key: "charter", label: "包車", group: "交通" }
  ],
  expenses: [
    { name: "葉俊緯", coach: "¥49,200", gearSet: "¥25,020 ($5,459)", suit: "-", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥27,610", charter: "¥29,429" },
    { name: "鄭云婷", coach: "¥49,200", gearSet: "¥25,020 ($5,459)", suit: "-", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "", charter: "¥29,429" },
    { name: "吳致養", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", suit: "", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥27,610", charter: "¥29,429" },
    { name: "黃陞漜", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", suit: "", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "", charter: "¥29,429" },
    { name: "陳鋒瑋", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", suit: "", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥27,610", charter: "¥29,429" },
    { name: "劉海蒂", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", suit: "", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "", charter: "¥29,429" },
    { name: "吳思旻", coach: "¥49,200", gearSet: "¥39,060 ($8,523)", suit: "", liftTicket: "", hotel1: "¥28,467", hotel2: "¥17,604", hotel3: "$7,500", hotel4: "¥19,400", charter: "¥29,429" }
  ],
  expenseFootnotes: [
    "教練：訂金 $25,200／尾款 ¥224,000",
    "雪具：已付款 $52,742",
    "1/2 洞爺湖畔亭 ／ 1/3 Mahoroba：agoda 12 月會付款",
    "Bestdayever：已付清給店家",
    "東橫INN ／ 包車：現場付款"
  ],

  // 繳費紀錄：主揪代墊項目（原始表單目前只有分類，金額陸續補登）
  payments: [
    { category: "滑雪教練課訂金", amount: "", payer: "主揪", date: "", note: "待補登" },
    { category: "小木屋住宿", amount: "¥52,500", payer: "主揪", date: "", note: "" },
    { category: "雪具租借", amount: "", payer: "主揪", date: "", note: "待補登" }
  ]
};
