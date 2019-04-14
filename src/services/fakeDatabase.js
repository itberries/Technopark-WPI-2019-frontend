const fakeDatabase = {
  user: {
    id: 9999,
    score: 777,
  },
  userState: {
    sectionId: 1,
    subsectionId: 1,
    stepId: 1,
  },
  sections: [
    {
      id: 1,
      name: 'basic',
      subsections: [
        {
          id: 1,
          id_section: 1,
          name: 'Информация и ее свойства',
          parentId: 0,
          childId: 2,
        },
        {
          id: 2,
          id_section: 1,
          name: 'Информационные процессы',
          parentId: 1,
          childId: 3,
        },
        {
          id: 3,
          id_section: 1,
          name: 'Всемирная паутина',
          parentId: 2,
          childId: 4,
        },
        {
          id: 4,
          id_section: 1,
          name: 'Представление информации',
          parentId: 3,
          childId: 5,
        },
        {
          id: 5,
          id_section: 1,
          name: 'Двоичное кодирование',
          parentId: 4,
          childId: 6,
        },
        {
          id: 6,
          id_section: 1,
          name: 'Измерение информации',
          parentId: 5,
          childId: 7,
        },
        {
          id: 7,
          id_section: 1,
          name: 'Основные компоненты комьютера',
          parentId: 6,
          childId: 8,
        },
        {
          id: 8,
          id_section: 1,
          name: 'Персональный компьютер',
          parentId: 7,
          childId: 9,
        },
        {
          id: 9,
          id_section: 1,
          name: 'ПО компьютера',
          parentId: 8,
          childId: 10,
        },
        {
          id: 10,
          id_section: 1,
          name: 'Файлы и файловые структуры',
          parentId: 9,
          childId: 0,
        },
      ],
      parentId: 0,
      childId: 2,
    },
    {
      id: 2,
      name: 'intermediate',
      subsections: [
        {
          id: 11,
          id_section: 2,
          name: 'Системы счисления',
          parentId: 0,
          childId: 12,
        },
        {
          id: 12,
          id_section: 2,
          name: 'Элементы алгебры логики',
          parentId: 11,
          childId: 0,
        },
      ],
      parentId: 1,
      childId: 3,
    },
    {
      id: 3,
      name: 'advanced',
      subsections: [
        {
          id: 13,
          id_section: 3,
          name: 'Основы моделирования',
          parentId: 0,
          childId: 0,
        },
      ],
      parentId: 2,
      childId: 0,
    },
  ],
  steps: {
    currentStep: {
      id: 1,
      name: 'Информация и сигнал',
      type: 'theory',
      parentId: 0,
      childId: 2,
    },
    stepResponses: [
      {
        id: 1,
        name: 'Информация и сигнал',
        type: 'theory',
        parentId: 0,
        childId: 2,
      },
      {
        id: 2,
        name: 'Игра: информация и сигнал',
        type: 'interactive',
        parentId: 1,
        childId: 3,
      },
      {
        id: 3,
        name: 'Виды информации',
        type: 'theory',
        parentId: 2,
        childId: 4,
      },
      {
        id: 4,
        name: 'Игра: виды информации',
        type: 'interactive',
        parentId: 3,
        childId: 5,
      },
      {
        id: 5,
        name: 'Свойства информации',
        type: 'theory',
        parentId: 4,
        childId: 0,
      },
    ],
  },
  cards: [
    {
      id: 1,
      note:
        'Информация (от лат. informatio - осведомление, разъяснение) - широкое понятие, имеющее много трактовок. В обыденной жизни под информацией понимают всякого рода сообщения, сведения о чем-либо, которые получают и передают люди. Содержится в речи людей, текстах книг, звуках и видах природы, показаниях приборов.',
      image:
        'http://economic-definition.com/Images/Forex_Otzovik/270/970/3684052398-Informaciya..jpg',
      parentId: 0,
      childId: 2,
    },
    {
      id: 2,
      note:
        'Каждый материальный объект, с которым происходят изменения, становится источником информации либо об окружающей среде, либо о происходящих в этом объекте процессах. Эту информацию мы получаем в виде сигналов - изменений физических величин (давления, температуры, цвета и т.д.) Различают световые, звуковые, тепловые, механические и другие типы сигналов.',
      image: 'https://ds03.infourok.ru/uploads/ex/11a4/0002e44b-20d6bb97/640/img8.jpg',
      parentId: 1,
      childId: 3,
    },
    {
      id: 3,
      note:
        'Информация для человека - это содержание сигналов (сообщения), воспринимаемых человеком непосредственно или с помощью специальных устройств, расширяющее его знания об окружающем мире и протекающих в нем процессах.',
      image: 'https://lawbooks.news/files/uch_group50/uch_pgroup107/uch_uch496/image/image001.jpg',
      parentId: 2,
      childId: 4,
    },
    {
      id: 4,
      note:
        'Сигналы могут быть непрерывными и дискретными. Непрерывный сигнал принимает бесконечное множество значений из некоторого диапазона. Между значениями, которые он принимает, нет разрывов. Дискретный сигнал принимает конечное число значений. Все значения дискретного сигнала можно пронумеровать целыми числами.',
      image: 'http://mabi.vspu.ru/files/2017/12/Bezyimyannyiy-9-1.png',
      parentId: 3,
      childId: 0,
    },
  ],
};

export default fakeDatabase;
