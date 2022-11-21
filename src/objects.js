export const users = [
  {
    active: true,
    userName: `Егор Черных`,
    userGames: [`Hitman (2016)`, `серия Tropico `, 'Spore', 'The Simpsons Hit & Run', 'Beyond Good and Evil', 'Zoo Tycoon 2', 'Psychonauts', 'Disney G-Force', 'Sleeping Dogs'],
    userTopics: [`сны`, 'ходьба', 'после людей', 'кунг-фу'],
    userRank: 1,
  },
  {
    active: true,
    userName: `D3mark0`,
    userGames: [`Genshin Impact`],
    userTopics: [`развлечения `, 'скука'],
    userRank: 2,
  },
  {
    active: true,
    userName: `мяувау`,
    userGames: [`Shenmue 1 & 2`, `Fallout 4`, 'BioShock'],
    userTopics: [`уязвимость `, 'самовосприятие', 'деформация', 'тело', 'внешний вид'],
    userRank: 2,
  },
  {
    active: true,
    userName: `Диоген без бочки`,
    userGames: [`Grand Theft Auto: San Andreas`, `The Elder Scrolls V: Skyrim`],
    userTopics: [`Смерть `, 'Память', 'Время', 'Любая тема, которая начинается на букву "П"'],
    userRank: 3,
  },
  {
    active: true,
    userName: `mitreshell`,
    userGames: [`The Elder Scrolls V: Skyrim`, `The Sims 3`, 'Minecraft'],
    userTopics: [`запахи`, 'зима', 'весна', 'что будет после смерти', 'грибная тема', 'чемпион мира по шахматам'],
    userRank: 3,
  },
  {
    active: true,
    userName: `akiaplow`,
    userGames: [`Dark Souls`, `Fortnite`, 'Chibi-Robo!', 'F-Zero GX', 'Metroid Prime', 'Phantasy Star Online'],
    userTopics: [`уличная съёмка`, 'b/w', 'текстуры/макро'],
    userRank: 3,
  },

  {
    active: true,
    userName: `Uberstein`,
    userGames: ['Игры девяностых и нулевых в реалистичном-военном и фэнтезийном сеттингах', `Delta Force`, `Men of War`, 'Arx Fatalis', 'Shadow Tower'],
    userTopics: [`Покинутые и гнетущие пространства`, 'Постановочная портретная съёмка', 'Фотографии баталий и постановки исторически значимых событий'],
    userRank: 4,
  },
  {
    active: true,
    userName: `Константин Ремизов`,
    userGames: [`Metal Gear Solid V: The Phantom Pain`, `Mount And Blade 2: Bannerlord`, 'Neverwinter Nights 2', 'The Good Life', 'Dead Rising', 'Harry Potter and the Chamber of Secrets', "Assassin's Creed: Brotherhood", 'Loki: Heroes of Mythology', 'The Elder Scrolls III: Morrowind', 'The Elder Scrolls IV: Oblivion', 'Empire Earth', 'Grand Theft Auto IV', 'Grand Theft Auto III', 'The Sims 2/3/4', 'Watch Dogs 1/2', 'Dungeon Siege: Legends of Aranna', 'L. A. Noire', 'True Crime: New York City', 'Resident Evil 6', "Din's Legacy", 'XCOM 2', 'Second Life' ],
    userTopics: [`неловкий момент`, 'комиксы', 'история россии', 'эротика', 'еда', 'сказки народов мира', 'двойники', 'деньги', 'утопии', 'самые уродливые фотографии'],
    userRank: 4,
  },
]

export const battles = [
    {
      participants: 
        [
          `Диоген без бочки`,
          `mitreshell`,
        ],
      participantDescription: 
        [
          `Всё начиналось с туманного поля, а закончилось сточной канавой. Грибной коктейль явно оказался лишним\n\n(Для фоток урезал размер изображения, минимизировал прогрузку чанков и напивался случайными зельями до упаду)`,
`сны в ведьмином доме, на сервере greb\n\n~~~~~~~~\n\n(таинственные рисунки жителей вставлены в игру при помощи техники mapart. есть такой сайт https://mc-map.djfun.de/, который позволяет из загруженного изображения сделать файлы внутриигровых карт. этими файлами нужно заменить файлы оригинальных карт в папке data, и можно складывать из них картинки!)`        ],
      game: `Minecraft 1.14.4`,
      battleExpDate: `2022-11-22 23:59`,
      battleName: `Диоген без бочки и mitreshell | Minecraft 1.14.4 | Грибная тема`,
      battleTopic:`Грибная тема`,
      battleCondition: `без модификаций и постобработки`,
      folderPath: `./photos/Диоген без бочки и mitreshell Minecraft/`,
      voteEmbed: `<script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-post="ingameph_polls/40" data-width="100%"></script>`,
      voteExpDate: `2022-11-29 23:59`,
    },
   
    {
      participants: [`Uberstein`, `Константин Ремизов`],
      game: `Mount & Blade II: Bannerlord`,
      battleExpDate: `2022-11-30 23:59`,
      battleName: `Uberstein и Константин Ремизов | Mount & Blade II: Bannerlord | История России`,
      battleTopic:`История России`,
      battleCondition: `от 7 снимков`,
      folderPath: `./photos/Uberstein и Константин Ремизов Bannerlord/`,
      voteEmbed: `https://telegram.org/js/telegram-widget.js?21`,
      voteExpDate: null,
    },
]