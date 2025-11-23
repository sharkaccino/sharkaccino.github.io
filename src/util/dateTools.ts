const dtf = new Intl.DateTimeFormat(`en-us`, { year: `numeric`, month: `long`, day: `numeric` });

export function getSimplifiedDate(input: Date) {
  // shifts input date to match UTC
	// probably pointless when deployed to a production server, but it makes things more consistent during local dev
	const shifted = new Date(input.getTime() + input.getTimezoneOffset() * 60000);

  return dtf.format(shifted).toLowerCase();
}

export function getUTCDateComponents(input: Date) {
  return {
    year: input.getUTCFullYear(),
    month: input.getUTCMonth() + 1,
    day: input.getUTCDate(),
    hour: input.getUTCHours(),
    minute: input.getUTCMinutes(),
    ms: input.getUTCMilliseconds()
  }
}