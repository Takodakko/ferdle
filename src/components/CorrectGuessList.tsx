function CorrectGuessList(props: {list: string[][]}) {
  const { list } = props;
  const listDisplay = list.map((word) => {
    const stringifiedWord = word.join('');
    return <div key={stringifiedWord}>{stringifiedWord}</div>
  });
  const classForList = listDisplay.length === 0 ? '' : 'correct-list';
console.log(listDisplay[0], 'listDisplay')
  return (
    <div className={classForList}>
      <div>{...listDisplay}</div>
    </div>
  )
};

export default CorrectGuessList;