interface ICharacter {}

interface IProps {
  data: ICharacter;
}

function CharacterMenuItem({ data }: IProps) {
  return <div>CharacterMenuItem</div>;
}
export default CharacterMenuItem;
