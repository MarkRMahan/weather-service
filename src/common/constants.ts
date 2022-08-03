export class URLs {
  public static weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall';
}

export class TemperatureRanges {
  public static coldTemp = 283;
  public static hotTemp = 303;
}

export class Temperatures {
  public static cold = 'Cold';
  public static moderate = 'Moderate';
  public static hot = 'Hot';
}

export class ErrorMessages {
  public static coordinatesMissing =
    'Missing inputs for latitude and/or longitude. Please input both latitude and longitude for a weather report.';
}
