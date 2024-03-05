function solution(S, K) {
  const day = S;

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let weekdaysToMove = weekDays.slice(0, weekDays.indexOf(day));

  let currentDayArray = weekDays
    .splice(weekDays.indexOf(day), weekDays.length - 1)
    .concat(weekdaysToMove);

  let weekdDayCounter = 0;
  let weekDay = "";

  //reparert for-loop
  for (i = K; i > 0; i--) {
    weekdDayCounter++;
    if (weekdDayCounter > 6) {
      weekdDayCounter = 0;
    }
    weekDay = currentDayArray[weekdDayCounter];
  }
  return weekDay;
}

solution("Wed", 7);
