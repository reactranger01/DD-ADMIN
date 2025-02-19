export const getQueryString = (params) => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null,
      ),
    ),
  ).toString();
};
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
