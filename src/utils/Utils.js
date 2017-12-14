
export function generateRandomNumber(max)
{
  return Math.floor(Math.random()*max);
}

export function generateNumberOfSoldiers(max)
{
  return generateRandomNumber(max);
}

export function generateRowPositionOfSoldiers(nos, max)
{
  var rows = [];
  for(var i=0; i< nos; i++)
  {
    rows.push(generateRandomNumber(max));
  }

  return rows;
}

export function generateColumnPositionOfSoldiers(nos, max)
{
  var columns =[];
  for(var i=0; i< nos; i++)
  {
    columns.push(generateRandomNumber(max));
  }
  return columns;
}
