export const getRunnerName = (items, fixtureEventName) => {
  const correspondingFixture = fixtureEventName.find((fixture) =>
    fixture.runners.some(
      (fixtureRunner) =>
        fixtureRunner.selectionId.toString() === items.selectionId,
    ),
  );

  const fixtureRunner = correspondingFixture
    ? correspondingFixture.runners.find(
        (fixtureRunner) =>
          fixtureRunner.selectionId.toString() === items.selectionId,
      )
    : null;

  return fixtureRunner ? fixtureRunner.runnerName : '';
};
export const maskId = (id) => {
  if (!id || id.length < 50) return id; // Ensure ID is long enough
  return `${id.substring(0, 50)}....${id.substring(id.length - 4)}`;
};
export function intToString(num) {
  const n = Number(num);
  if (isNaN(n)) {
    return '';
  }
  if (num < 1000) {
    return num;
  }
  var si = [
    { v: 1e3, s: 'K' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
    { v: 1e18, s: 'E' },
  ];
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].v) {
      break;
    }
  }
  return (
    (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
    si[i].s
  );
}
export const getRunnerDetails = (items, fixtureEventData) => {
  const runnersList = fixtureEventData?.data?.runners;

  if (!runnersList || !Array.isArray(runnersList)) {
    return {
      runnerName: '',
      RunnerPL: 0,
      RunnerPLINR: 0,
    };
  }

  const fixtureRunner = runnersList.find(
    (runner) => runner.selectionId.toString() === items.selectionId.toString(),
  );
  if (fixtureRunner) {
    return {
      runnerName: fixtureRunner.runnerName || '',
      RunnerPL: fixtureRunner.RunnerPL || 0,
      RunnerPLINR: fixtureRunner.RunnerPLINR || 0,
    };
  }

  return {
    runnerName: '',
    RunnerPL: 0,
    RunnerPLINR: 0,
  };
};
export const updateLocalStatus = (setData, id, newStatus) => {
  setData((prevTransactions) =>
    prevTransactions.map((list) =>
      list.id === id ? { ...list, betLock: newStatus } : list,
    ),
  );
};
export const getQueryString = (params) => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null,
      ),
    ),
  ).toString();
};
export const formatNumberWithCommas = (num) => {
  if (isNaN(num) || num === null || num === undefined) return '0'; // Handle invalid cases

  const number = Number(num);
  const formattedNumber = Number.isInteger(number)
    ? number.toString()
    : number.toFixed(2);

  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(formattedNumber);
};
