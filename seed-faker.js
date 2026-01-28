import { fakerKO as faker } from '@faker-js/faker';

const NUM_STUDIES_TO_CREATE = 35;

// const ALLOWED_BACKGROUND_PATHS = [
//   '/images/backgrounds/green.png',
//   '/images/backgrounds/yellow.png',
//   '/images/backgrounds/blue.png',
//   '/images/backgrounds/pink.png',
//   '/images/backgrounds/alvaro.png',
//   '/images/backgrounds/mikey.png',
//   '/images/backgrounds/andrew.png',
//   '/images/backgrounds/chris.png',
// ];

// 1부터 n까지 배열 생성
const xs = (n) => Array.from({ length: n }, (_, i) => i + 1);

// 허용 이모지 타입
const EMOJI_TYPES = ['🔥', '💪', '📚', '✅', '🌱'];

// 문자열 자르기
const slice = (str, max) => str.slice(0, max);

// 랜덤 날짜 문자열
const randomDateString = () =>
  faker.date
    .between({
      from: new Date(2026, 0, 1), // 2026-01-01
      to: new Date(2026, 1, 6), // 2026-02-06
    })
    .toISOString()
    .split('T')[0];

// --------------------
// Study 생성
// --------------------
const makeStudy = () => {
  const studyId = faker.string.ulid();

  const study = {
    id: studyId,
    nickname: slice(faker.person.firstName(), 4),
    title: slice(faker.word.words({ count: 1 }), 6),
    introduction: slice(faker.lorem.sentence(), 100),
    // background: faker.helpers.arrayElement(ALLOWED_BACKGROUND_PATHS),
    password: faker.internet.password({
      length: faker.number.int({ min: 4, max: 10 }),
      memorable: false,
      pattern: /[a-zA-Z0-9]/,
    }),
    totalPoint: faker.number.int({ min: 0, max: 500 }),
    habits: [],
    emojis: [],
  };

  return study;
};

// --------------------
// Habit 생성
// --------------------
const makeHabitsForStudy = (studyId) => {
  const habitCount = faker.number.int({ min: 1, max: 10 });

  return xs(habitCount).map(() => {
    const habitId = faker.string.ulid();

    return {
      id: habitId,
      name: slice(faker.lorem.words({ count: 1 }), 15),
      studyId,
      records: makeHabitRecordsForHabit(habitId),
    };
  });
};

// --------------------
// HabitRecord 생성
// --------------------
const makeHabitRecordsForHabit = (habitId) => {
  const recordCount = faker.number.int({ min: 3, max: 20 });

  return xs(recordCount).map(() => ({
    id: faker.string.ulid(),
    habitId,
    date: randomDateString(),
    isCompleted: faker.datatype.boolean(),
  }));
};

// --------------------
// Emoji 생성
// --------------------
const makeEmojisForStudy = (studyId) => {
  const emojiCount = faker.number.int({ min: 1, max: 5 });

  return xs(emojiCount).map(() => ({
    id: faker.string.ulid(),
    type: faker.helpers.arrayElement(EMOJI_TYPES),
    studyId,
  }));
};

// --------------------
// 메인 실행
// --------------------
function main() {
  console.log('🌱 로컬 시딩 데이터 생성 시작...\n');

  const studies = xs(NUM_STUDIES_TO_CREATE).map(() => {
    const study = makeStudy();
    study.habits = makeHabitsForStudy(study.id);
    study.emojis = makeEmojisForStudy(study.id);
    return study;
  });

  // 전체 출력 (너무 길면 일부만 보고 싶을 수도 있음)
  //   console.dir(studies, { depth: null });

  console.log('\n✅ 생성 완료');
  console.log(`📊 Study: ${studies.length}`);
  console.log(
    `📊 Habit 총 개수: ${studies.reduce((sum, s) => sum + s.habits.length, 0)}`,
  );
}

main();
